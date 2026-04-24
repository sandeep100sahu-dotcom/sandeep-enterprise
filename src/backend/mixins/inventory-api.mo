import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import InvTypes "../types/inventory";
import ItemTypes "../types/items";
import InvLib "../lib/inventory";
import ItemLib "../lib/items";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  grns : Map.Map<Common.EntityId, InvTypes.GRNEntry>,
  issues : Map.Map<Common.EntityId, InvTypes.IssueEntry>,
  stockTransactions : List.List<InvTypes.StockTransaction>,
  items : Map.Map<Common.EntityId, ItemTypes.Item>,
  nextGrnId : { var value : Nat },
  nextIssueId : { var value : Nat },
  nextTxId : { var value : Nat },
) {
  /// List all GRNs (StoreUser, Admin, Manager)
  public query ({ caller }) func listGRNs() : async [InvTypes.GRNEntryPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.listGRNs(grns);
  };

  /// Get single GRN (StoreUser, Admin, Manager)
  public query ({ caller }) func getGRN(id : Common.EntityId) : async ?InvTypes.GRNEntryPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getGRN(grns, id);
  };

  /// Create new GRN inward entry (Admin, StoreUser)
  public shared ({ caller }) func addGRN(req : InvTypes.AddGRNRequest) : async Common.EntityId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextGrnId.value;
    nextGrnId.value += 1;
    // Generate GRN number: GRN-YYYYNNNN
    let now = Time.now();
    let yearSecs = now / 1_000_000_000 / (365 * 24 * 3600);
    let year = 1970 + yearSecs.toNat();
    let grnNo = "GRN-" # year.toText() # padNat(id, 4);
    let createdBy = caller.toText();
    let grnId = InvLib.addGRN(grns, id, req, grnNo, createdBy);

    // If GRN is immediately approved, update stock
    if (req.qcStatus == #approved) {
      applyGRNStock(grnId, req.items, req.supplierId);
    };
    grnId;
  };

  /// Update QC status on a GRN — on approve, increase stock + update rates + supplier ledger
  public shared ({ caller }) func updateGRNQCStatus(id : Common.EntityId, status : Common.QCStatus) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (grns.get(id)) {
      case null false;
      case (?entry) {
        let wasApproved = entry.qcStatus == #approved;
        let updated = InvLib.updateGRNQCStatus(grns, id, status);
        if (updated and status == #approved and not wasApproved) {
          applyGRNStock(id, entry.items, entry.supplierId);
        };
        updated;
      };
    };
  };

  /// List all issue entries (all authenticated users)
  public query ({ caller }) func listIssues() : async [InvTypes.IssueEntryPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.listIssues(issues);
  };

  /// Get single issue entry (all authenticated users)
  public query ({ caller }) func getIssue(id : Common.EntityId) : async ?InvTypes.IssueEntryPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getIssue(issues, id);
  };

  /// Create new issue entry — reduces stock (Admin, StoreUser)
  public shared ({ caller }) func addIssue(req : InvTypes.AddIssueRequest) : async Common.EntityId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextIssueId.value;
    nextIssueId.value += 1;
    let now = Time.now();
    let yearSecs = now / 1_000_000_000 / (365 * 24 * 3600);
    let year = 1970 + yearSecs.toNat();
    let issueSlipNo = "ISS-" # year.toText() # padNat(id, 4);
    let issuedBy = caller.toText();
    let issueId = InvLib.addIssue(issues, id, req, issueSlipNo, issuedBy);

    // Reduce stock for each line item
    for (line in req.items.values()) {
      let ok = ItemLib.adjustStock(items, line.itemId, -(line.qty.toInt()));
      if (ok) {
        let balAfter = switch (items.get(line.itemId)) {
          case (?item) item.currentStock;
          case null 0;
        };
        let txId = nextTxId.value;
        nextTxId.value += 1;
        InvLib.recordStockTransaction(stockTransactions, txId, line.itemId, #issue, issueId, line.qty, balAfter);
      };
    };
    issueId;
  };

  /// Get stock ledger for a specific item (all authenticated users)
  public query ({ caller }) func getItemLedger(itemId : Common.EntityId) : async [InvTypes.StockTransaction] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getItemLedger(stockTransactions, itemId);
  };

  // ─── Private helpers ────────────────────────────────────────────────────

  private func padNat(n : Nat, width : Nat) : Text {
    let s = n.toText();
    let sLen = s.size();
    let padding = if (sLen >= width) "" else {
      var pad = "";
      var i = 0;
      let needed = width - sLen;
      while (i < needed) {
        pad := pad # "0";
        i += 1;
      };
      pad;
    };
    padding # s;
  };

  private func applyGRNStock(
    grnId : Common.EntityId,
    lineItems : [InvTypes.GRNLineItem],
    supplierId : Common.EntityId,
  ) : () {
    var totalGrnValue : Float = 0.0;
    for (line in lineItems.values()) {
      let ok = ItemLib.adjustStock(items, line.itemId, line.qty.toInt());
      if (ok) {
        ItemLib.updateLastPurchaseRate(items, line.itemId, line.rate);
        let balAfter = switch (items.get(line.itemId)) {
          case (?item) item.currentStock;
          case null 0;
        };
        let txId = nextTxId.value;
        nextTxId.value += 1;
        InvLib.recordStockTransaction(stockTransactions, txId, line.itemId, #inward, grnId, line.qty, balAfter);
      };
      totalGrnValue += line.total;
    };
  };
};
