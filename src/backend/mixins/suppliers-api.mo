import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SupplierTypes "../types/suppliers";
import SupplierLib "../lib/suppliers";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  suppliers : Map.Map<Common.EntityId, SupplierTypes.Supplier>,
  nextSupplierId : { var value : Nat },
) {
  /// List all suppliers (all authenticated users)
  public query ({ caller }) func listSuppliers() : async [SupplierTypes.SupplierPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.listSuppliers(suppliers);
  };

  /// Get single supplier by id (all authenticated users)
  public query ({ caller }) func getSupplier(id : Common.EntityId) : async ?SupplierTypes.SupplierPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.getSupplier(suppliers, id);
  };

  /// Add a new supplier (Admin, PurchaseUser)
  public shared ({ caller }) func addSupplier(req : SupplierTypes.AddSupplierRequest) : async Common.EntityId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextSupplierId.value;
    nextSupplierId.value += 1;
    SupplierLib.addSupplier(suppliers, id, req);
  };

  /// Update supplier (Admin, PurchaseUser)
  public shared ({ caller }) func updateSupplier(id : Common.EntityId, req : SupplierTypes.UpdateSupplierRequest) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.updateSupplier(suppliers, id, req);
  };

  /// Delete supplier (Admin only)
  public shared ({ caller }) func deleteSupplier(id : Common.EntityId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    SupplierLib.deleteSupplier(suppliers, id);
  };
};
