import Common "common";

module {
  public type Supplier = {
    id : Common.EntityId;
    var name : Text;
    var contactPerson : Text;
    var phone : Text;
    var email : Text;
    var address : Text;
    var gstin : Text;
    var ledgerBalance : Float;
    createdAt : Common.Timestamp;
  };

  public type SupplierPublic = {
    id : Common.EntityId;
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : Text;
    address : Text;
    gstin : Text;
    ledgerBalance : Float;
    createdAt : Common.Timestamp;
  };

  public type AddSupplierRequest = {
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : Text;
    address : Text;
    gstin : Text;
  };

  public type UpdateSupplierRequest = {
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : Text;
    address : Text;
    gstin : Text;
  };
};
