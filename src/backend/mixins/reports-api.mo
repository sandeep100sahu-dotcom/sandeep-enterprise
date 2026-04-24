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
  items : Map.Map<Common.EntityId, ItemTypes.Item>,
  grns : Map.Map<Common.EntityId, InvTypes.GRNEntry>,
  issues : Map.Map<Common.EntityId, InvTypes.IssueEntry>,
  stockTransactions : List.List<InvTypes.StockTransaction>,
) {
  /// Full current stock report (all authenticated users)
  public query ({ caller }) func getCurrentStock() : async [ItemTypes.ItemPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.listItems(items);
  };

  /// Low stock report (all authenticated users)
  public query ({ caller }) func getLowStockReport() : async [ItemTypes.ItemPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.getLowStockItems(items);
  };

  /// Item ledger: all transactions for a specific item (all authenticated users)
  public query ({ caller }) func getItemLedgerReport(itemId : Common.EntityId) : async [InvTypes.StockTransaction] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getItemLedger(stockTransactions, itemId);
  };

  /// Department consumption report with optional date-range filter (all authenticated users)
  public query ({ caller }) func getDeptConsumptionReport(fromTs : Common.Timestamp, toTs : Common.Timestamp) : async [Common.DeptConsumptionStat] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Filter issues to the date range then aggregate
    let filteredIssues = Map.empty<Common.EntityId, InvTypes.IssueEntry>();
    for ((id, entry) in issues.entries()) {
      if (entry.createdAt >= fromTs and entry.createdAt <= toTs) {
        filteredIssues.add(id, entry);
      };
    };
    InvLib.getDeptConsumption(filteredIssues, items);
  };

  /// Monthly purchase / inward report (all authenticated users)
  public query ({ caller }) func getMonthlyPurchaseReport(months : Nat) : async [Common.MonthlyConsumption] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getMonthlyPurchase(grns, months);
  };

  /// Dead / non-moving stock report (all authenticated users)
  public query ({ caller }) func getDeadStockReport(thresholdDays : Nat) : async [ItemTypes.ItemPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    let thresholdNs : Int = thresholdDays.toInt() * 24 * 60 * 60 * 1_000_000_000;
    let deadSet = InvLib.getDeadStockItemIds(stockTransactions, thresholdNs, now);
    // Items with no transactions at all are also dead stock if they have any stock
    items.values().filter(func(item : ItemTypes.Item) : Bool {
      item.isActive and (deadSet.containsKey(item.id) or (not stockTransactions.any(func(tx : InvTypes.StockTransaction) : Bool { tx.itemId == item.id })))
    }).map<ItemTypes.Item, ItemTypes.ItemPublic>(func(item) { ItemLib.toPublic(item) }).toArray();
  };
};
