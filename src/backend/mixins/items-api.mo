import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import ItemTypes "../types/items";
import ItemLib "../lib/items";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  items : Map.Map<Common.EntityId, ItemTypes.Item>,
  nextItemId : { var value : Nat },
) {
  /// List all active items (all authenticated users)
  public query ({ caller }) func listItems() : async [ItemTypes.ItemPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.listItems(items);
  };

  /// Search items by keyword (all authenticated users)
  public query ({ caller }) func searchItems(searchTerm : Text) : async [ItemTypes.ItemPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.searchItems(items, searchTerm);
  };

  /// Get single item by id (all authenticated users)
  public query ({ caller }) func getItem(id : Common.EntityId) : async ?ItemTypes.ItemPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.getItem(items, id);
  };

  /// Add a new item (Admin, StoreUser)
  public shared ({ caller }) func addItem(req : ItemTypes.AddItemRequest) : async Common.EntityId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextItemId.value;
    nextItemId.value += 1;
    ItemLib.addItem(items, id, req);
  };

  /// Update existing item (Admin, StoreUser)
  public shared ({ caller }) func updateItem(id : Common.EntityId, req : ItemTypes.UpdateItemRequest) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.updateItem(items, id, req);
  };

  /// Deactivate / soft-delete an item (Admin only)
  public shared ({ caller }) func deactivateItem(id : Common.EntityId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    ItemLib.deactivateItem(items, id);
  };

  /// Upload / replace item photo (Admin, StoreUser)
  public shared ({ caller }) func uploadItemPhoto(id : Common.EntityId, photo : Storage.ExternalBlob) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (items.get(id)) {
      case null false;
      case (?item) {
        item.photo := ?photo;
        item.updatedAt := Time.now();
        true;
      };
    };
  };

  /// Get all low-stock items (all authenticated users)
  public query ({ caller }) func getLowStockItems() : async [ItemTypes.ItemPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ItemLib.getLowStockItems(items);
  };
};
