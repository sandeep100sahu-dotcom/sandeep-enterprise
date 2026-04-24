import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Item = {
    id : Common.EntityId;
    code : Text;
    var name : Text;
    var category : Text;
    var subcategory : Text;
    var description : Text;
    var unit : Text;
    var brand : Text;
    var size : Text;
    var rackLocation : Text;
    var minimumStock : Nat;
    var preferredSupplier : Text;
    var gstHsn : Text;
    var photo : ?Storage.ExternalBlob;
    var currentStock : Nat;
    var lastPurchaseRate : Float;
    var isActive : Bool;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type ItemPublic = {
    id : Common.EntityId;
    code : Text;
    name : Text;
    category : Text;
    subcategory : Text;
    description : Text;
    unit : Text;
    brand : Text;
    size : Text;
    rackLocation : Text;
    minimumStock : Nat;
    preferredSupplier : Text;
    gstHsn : Text;
    photo : ?Storage.ExternalBlob;
    currentStock : Nat;
    lastPurchaseRate : Float;
    isActive : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type AddItemRequest = {
    code : Text;
    name : Text;
    category : Text;
    subcategory : Text;
    description : Text;
    unit : Text;
    brand : Text;
    size : Text;
    rackLocation : Text;
    minimumStock : Nat;
    preferredSupplier : Text;
    gstHsn : Text;
    photo : ?Storage.ExternalBlob;
  };

  public type UpdateItemRequest = {
    name : Text;
    category : Text;
    subcategory : Text;
    description : Text;
    unit : Text;
    brand : Text;
    size : Text;
    rackLocation : Text;
    minimumStock : Nat;
    preferredSupplier : Text;
    gstHsn : Text;
    photo : ?Storage.ExternalBlob;
  };
};
