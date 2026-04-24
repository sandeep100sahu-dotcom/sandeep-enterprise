import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Types "../types/inventory";
import ItemTypes "../types/items";
import Common "../types/common";

module {
  // ─── GRN helpers ────────────────────────────────────────────────────────────

  public func grnToPublic(entry : Types.GRNEntry) : Types.GRNEntryPublic {
    {
      id = entry.id;
      grnNo = entry.grnNo;
      supplierId = entry.supplierId;
      invoiceNo = entry.invoiceNo;
      challanNo = entry.challanNo;
      date = entry.date;
      items = entry.items;
      qcStatus = entry.qcStatus;
      createdBy = entry.createdBy;
      createdAt = entry.createdAt;
    };
  };

  public func issueToPublic(entry : Types.IssueEntry) : Types.IssueEntryPublic {
    {
      id = entry.id;
      issueSlipNo = entry.issueSlipNo;
      date = entry.date;
      department = entry.department;
      machineName = entry.machineName;
      issueType = entry.issueType;
      items = entry.items;
      requestedBy = entry.requestedBy;
      issuedBy = entry.issuedBy;
      purpose = entry.purpose;
      status = entry.status;
      createdAt = entry.createdAt;
    };
  };

  public func addGRN(
    grns : Map.Map<Common.EntityId, Types.GRNEntry>,
    nextId : Nat,
    req : Types.AddGRNRequest,
    grnNo : Text,
    createdBy : Text,
  ) : Common.EntityId {
    let now = Time.now();
    let entry : Types.GRNEntry = {
      id = nextId;
      grnNo;
      var supplierId = req.supplierId;
      var invoiceNo = req.invoiceNo;
      var challanNo = req.challanNo;
      date = req.date;
      items = req.items;
      var qcStatus = req.qcStatus;
      createdBy;
      createdAt = now;
    };
    grns.add(nextId, entry);
    nextId;
  };

  public func updateGRNQCStatus(
    grns : Map.Map<Common.EntityId, Types.GRNEntry>,
    id : Common.EntityId,
    status : Common.QCStatus,
  ) : Bool {
    switch (grns.get(id)) {
      case null false;
      case (?entry) {
        entry.qcStatus := status;
        true;
      };
    };
  };

  public func getGRN(
    grns : Map.Map<Common.EntityId, Types.GRNEntry>,
    id : Common.EntityId,
  ) : ?Types.GRNEntryPublic {
    switch (grns.get(id)) {
      case null null;
      case (?e) ?grnToPublic(e);
    };
  };

  public func listGRNs(
    grns : Map.Map<Common.EntityId, Types.GRNEntry>,
  ) : [Types.GRNEntryPublic] {
    grns.values().map<Types.GRNEntry, Types.GRNEntryPublic>(func(e) { grnToPublic(e) }).toArray();
  };

  // ─── Issue helpers ────────────────────────────────────────────────────────

  public func addIssue(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
    nextId : Nat,
    req : Types.AddIssueRequest,
    issueSlipNo : Text,
    issuedBy : Text,
  ) : Common.EntityId {
    let now = Time.now();
    let entry : Types.IssueEntry = {
      id = nextId;
      issueSlipNo;
      date = now;
      var department = req.department;
      var machineName = req.machineName;
      issueType = req.issueType;
      items = req.items;
      var requestedBy = req.requestedBy;
      issuedBy;
      var purpose = req.purpose;
      var status = "issued";
      createdAt = now;
    };
    issues.add(nextId, entry);
    nextId;
  };

  public func getIssue(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
    id : Common.EntityId,
  ) : ?Types.IssueEntryPublic {
    switch (issues.get(id)) {
      case null null;
      case (?e) ?issueToPublic(e);
    };
  };

  public func listIssues(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
  ) : [Types.IssueEntryPublic] {
    issues.values().map<Types.IssueEntry, Types.IssueEntryPublic>(func(e) { issueToPublic(e) }).toArray();
  };

  // ─── Stock transaction helpers ─────────────────────────────────────────────

  public func recordStockTransaction(
    transactions : List.List<Types.StockTransaction>,
    nextId : Nat,
    itemId : Common.EntityId,
    txType : Common.TransactionType,
    refId : Common.EntityId,
    qty : Nat,
    balanceAfter : Nat,
  ) : () {
    let tx : Types.StockTransaction = {
      id = nextId;
      itemId;
      transactionType = txType;
      refId;
      qty;
      balanceAfter;
      createdAt = Time.now();
    };
    transactions.add(tx);
  };

  public func getItemLedger(
    transactions : List.List<Types.StockTransaction>,
    itemId : Common.EntityId,
  ) : [Types.StockTransaction] {
    transactions.filter(func(tx : Types.StockTransaction) : Bool {
      tx.itemId == itemId
    }).toArray();
  };

  // ─── Today counts ─────────────────────────────────────────────────────────

  public func getTodayInwardCount(
    grns : Map.Map<Common.EntityId, Types.GRNEntry>,
    dayStartNs : Int,
  ) : Nat {
    grns.values().filter(func(e : Types.GRNEntry) : Bool {
      e.createdAt >= dayStartNs
    }).size();
  };

  public func getTodayIssueCount(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
    dayStartNs : Int,
  ) : Nat {
    issues.values().filter(func(e : Types.IssueEntry) : Bool {
      e.createdAt >= dayStartNs
    }).size();
  };

  // ─── Analytics ────────────────────────────────────────────────────────────

  public func getDeptConsumption(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
    items : Map.Map<Common.EntityId, ItemTypes.Item>,
  ) : [Common.DeptConsumptionStat] {
    let deptMap = Map.empty<Text, { var qty : Nat; var value : Float }>();
    for ((_, entry) in issues.entries()) {
      let dept = entry.department;
      let acc = switch (deptMap.get(dept)) {
        case (?a) a;
        case null {
          let a = { var qty = 0; var value = 0.0 };
          deptMap.add(dept, a);
          a;
        };
      };
      for (line in entry.items.values()) {
        acc.qty += line.qty;
        let rate = switch (items.get(line.itemId)) {
          case (?item) item.lastPurchaseRate;
          case null 0.0;
        };
        acc.value += rate * line.qty.toFloat();
      };
    };
    deptMap.entries().map<(Text, { var qty : Nat; var value : Float }), Common.DeptConsumptionStat>(
      func((dept, acc)) {
        { department = dept; totalQty = acc.qty; totalValue = acc.value };
      }
    ).toArray();
  };

  // Nanoseconds per month (30 days approximation): 30*24*60*60*1_000_000_000
  let nsPerMonth : Int = 2_592_000_000_000_000;

  public func getMonthlyConsumption(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
    items : Map.Map<Common.EntityId, ItemTypes.Item>,
    months : Nat,
  ) : [Common.MonthlyConsumption] {
    let now = Time.now();
    let monthsInt : Int = months.toInt();
    // Build month buckets: bucket 0 = oldest, bucket (months-1) = current
    let buckets = Array.tabulate(
      months,
      func(_i : Nat) : { var qty : Nat; var value : Float } { { var qty = 0; var value = 0.0 } },
    );
    for ((_, entry) in issues.entries()) {
      let age : Int = now - entry.createdAt;
      if (age >= 0) {
        let monthsAgo : Int = age / nsPerMonth;
        if (monthsAgo < monthsInt) {
          let bucketIdx : Nat = (monthsInt - 1 - monthsAgo).toNat();
          for (line in entry.items.values()) {
            buckets[bucketIdx].qty += line.qty;
            let rate = switch (items.get(line.itemId)) {
              case (?item) item.lastPurchaseRate;
              case null 0.0;
            };
            buckets[bucketIdx].value += rate * line.qty.toFloat();
          };
        };
      };
    };
    // Build month labels
    Array.tabulate(
      months,
      func(i : Nat) : Common.MonthlyConsumption {
        let monthsAgo : Int = (months.toInt() - 1) - i.toInt();
        let monthLabel = if (monthsAgo == 0) "Current" else "M-" # monthsAgo.toText();
        {
          month = monthLabel;
          totalQty = buckets[i].qty;
          totalValue = buckets[i].value;
        };
      },
    );
  };

  public func getTopUsedItems(
    issues : Map.Map<Common.EntityId, Types.IssueEntry>,
    items : Map.Map<Common.EntityId, ItemTypes.Item>,
    limit : Nat,
  ) : [Common.ItemUsageStat] {
    let usageMap = Map.empty<Common.EntityId, { var qty : Nat }>();
    for ((_, entry) in issues.entries()) {
      for (line in entry.items.values()) {
        let acc = switch (usageMap.get(line.itemId)) {
          case (?a) a;
          case null {
            let a = { var qty = 0 };
            usageMap.add(line.itemId, a);
            a;
          };
        };
        acc.qty += line.qty;
      };
    };
    let stats = usageMap.entries().map(
      func((itemId, acc) : (Common.EntityId, { var qty : Nat })) : Common.ItemUsageStat {
        let (code, name) = switch (items.get(itemId)) {
          case (?item) (item.code, item.name);
          case null ("", "");
        };
        { itemId; itemCode = code; itemName = name; totalQty = acc.qty };
      }
    ).toArray();
    // Sort descending by totalQty
    let sorted = stats.sort(func(a : Common.ItemUsageStat, b : Common.ItemUsageStat) : { #less; #equal; #greater } {
      if (a.totalQty > b.totalQty) #less
      else if (a.totalQty < b.totalQty) #greater
      else #equal;
    });
    if (sorted.size() <= limit) sorted
    else sorted.sliceToArray(0, limit.toInt());
  };

  // ─── Monthly purchase (GRN-based) ─────────────────────────────────────────

  public func getMonthlyPurchase(
    grns : Map.Map<Common.EntityId, Types.GRNEntry>,
    months : Nat,
  ) : [Common.MonthlyConsumption] {
    let now = Time.now();
    let monthsInt : Int = months.toInt();
    let buckets = Array.tabulate(
      months,
      func(_i : Nat) : { var qty : Nat; var value : Float } { { var qty = 0; var value = 0.0 } },
    );
    for ((_, entry) in grns.entries()) {
      let age : Int = now - entry.createdAt;
      if (age >= 0) {
        let monthsAgo : Int = age / nsPerMonth;
        if (monthsAgo < monthsInt) {
          let bucketIdx : Nat = (monthsInt - 1 - monthsAgo).toNat();
          for (line in entry.items.values()) {
            buckets[bucketIdx].qty += line.qty;
            buckets[bucketIdx].value += line.total;
          };
        };
      };
    };
    Array.tabulate(
      months,
      func(i : Nat) : Common.MonthlyConsumption {
        let monthsAgo : Int = (months.toInt() - 1) - i.toInt();
        let monthLabel = if (monthsAgo == 0) "Current" else "M-" # monthsAgo.toText();
        {
          month = monthLabel;
          totalQty = buckets[i].qty;
          totalValue = buckets[i].value;
        };
      },
    );
  };

  // ─── Dead stock ────────────────────────────────────────────────────────────

  public func getDeadStockItemIds(
    transactions : List.List<Types.StockTransaction>,
    thresholdNs : Int,
    now : Int,
  ) : Map.Map<Common.EntityId, Bool> {
    let lastTx = Map.empty<Common.EntityId, Int>();
    for (tx in transactions.values()) {
      switch (lastTx.get(tx.itemId)) {
        case null { lastTx.add(tx.itemId, tx.createdAt) };
        case (?existing) {
          if (tx.createdAt > existing) {
            lastTx.add(tx.itemId, tx.createdAt);
          };
        };
      };
    };
    let deadSet = Map.empty<Common.EntityId, Bool>();
    for ((itemId, lastTime) in lastTx.entries()) {
      if (now - lastTime >= thresholdNs) {
        deadSet.add(itemId, true);
      };
    };
    deadSet;
  };
};
