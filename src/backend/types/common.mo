import Time "mo:core/Time";

module {
  public type Timestamp = Time.Time;
  public type EntityId = Nat;

  public type Role = {
    #admin;
    #storeUser;
    #purchaseUser;
    #manager;
  };

  public type IssueType = {
    #normal;
    #emergencyBreakdown;
    #directConsumable;
  };

  public type QCStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type TransactionType = {
    #inward;
    #issue;
  };

  public type DashboardStats = {
    totalActiveItems : Nat;
    currentStockValue : Float;
    lowStockCount : Nat;
    todayInwardCount : Nat;
    todayIssueCount : Nat;
    nonMovingCount : Nat;
  };

  public type MonthlyConsumption = {
    month : Text;
    totalQty : Nat;
    totalValue : Float;
  };

  public type ItemUsageStat = {
    itemId : EntityId;
    itemCode : Text;
    itemName : Text;
    totalQty : Nat;
  };

  public type DeptConsumptionStat = {
    department : Text;
    totalQty : Nat;
    totalValue : Float;
  };
};
