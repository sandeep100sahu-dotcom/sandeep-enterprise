import Map "mo:core/Map";
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
) {
  /// Get summary dashboard statistics (all authenticated users)
  public query ({ caller }) func getDashboardStats() : async Common.DashboardStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    var totalActiveItems : Nat = 0;
    var currentStockValue : Float = 0.0;
    var lowStockCount : Nat = 0;
    var nonMovingCount : Nat = 0;

    let now = Time.now();
    let ninetyDaysNs : Int = 90 * 24 * 60 * 60 * 1_000_000_000;

    for ((_, item) in items.entries()) {
      if (item.isActive) {
        totalActiveItems += 1;
        currentStockValue += item.lastPurchaseRate * item.currentStock.toFloat();
        if (item.currentStock < item.minimumStock) {
          lowStockCount += 1;
        };
        if (now - item.updatedAt >= ninetyDaysNs) {
          nonMovingCount += 1;
        };
      };
    };

    let dayStartNs : Int = now - (now % (24 * 60 * 60 * 1_000_000_000));
    let todayInwardCount = InvLib.getTodayInwardCount(grns, dayStartNs);
    let todayIssueCount = InvLib.getTodayIssueCount(issues, dayStartNs);

    {
      totalActiveItems;
      currentStockValue;
      lowStockCount;
      todayInwardCount;
      todayIssueCount;
      nonMovingCount;
    };
  };

  /// Get monthly consumption trend data for chart (all authenticated users)
  public query ({ caller }) func getMonthlyConsumption(months : Nat) : async [Common.MonthlyConsumption] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getMonthlyConsumption(issues, items, months);
  };

  /// Get top N most used items (all authenticated users)
  public query ({ caller }) func getTopUsedItems(limit : Nat) : async [Common.ItemUsageStat] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getTopUsedItems(issues, items, limit);
  };

  /// Get department-wise issue/consumption breakdown (all authenticated users)
  public query ({ caller }) func getDeptConsumption() : async [Common.DeptConsumptionStat] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvLib.getDeptConsumption(issues, items);
  };
};
