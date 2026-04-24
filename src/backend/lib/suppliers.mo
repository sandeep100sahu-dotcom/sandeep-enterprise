import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/suppliers";
import Common "../types/common";

module {
  public func toPublic(supplier : Types.Supplier) : Types.SupplierPublic {
    {
      id = supplier.id;
      name = supplier.name;
      contactPerson = supplier.contactPerson;
      phone = supplier.phone;
      email = supplier.email;
      address = supplier.address;
      gstin = supplier.gstin;
      ledgerBalance = supplier.ledgerBalance;
      createdAt = supplier.createdAt;
    };
  };

  public func addSupplier(
    suppliers : Map.Map<Common.EntityId, Types.Supplier>,
    nextId : Nat,
    req : Types.AddSupplierRequest,
  ) : Common.EntityId {
    let now = Time.now();
    let supplier : Types.Supplier = {
      id = nextId;
      var name = req.name;
      var contactPerson = req.contactPerson;
      var phone = req.phone;
      var email = req.email;
      var address = req.address;
      var gstin = req.gstin;
      var ledgerBalance = 0.0;
      createdAt = now;
    };
    suppliers.add(nextId, supplier);
    nextId;
  };

  public func updateSupplier(
    suppliers : Map.Map<Common.EntityId, Types.Supplier>,
    id : Common.EntityId,
    req : Types.UpdateSupplierRequest,
  ) : Bool {
    switch (suppliers.get(id)) {
      case null false;
      case (?s) {
        s.name := req.name;
        s.contactPerson := req.contactPerson;
        s.phone := req.phone;
        s.email := req.email;
        s.address := req.address;
        s.gstin := req.gstin;
        true;
      };
    };
  };

  public func deleteSupplier(
    suppliers : Map.Map<Common.EntityId, Types.Supplier>,
    id : Common.EntityId,
  ) : Bool {
    switch (suppliers.get(id)) {
      case null false;
      case _ {
        suppliers.remove(id);
        true;
      };
    };
  };

  public func getSupplier(
    suppliers : Map.Map<Common.EntityId, Types.Supplier>,
    id : Common.EntityId,
  ) : ?Types.SupplierPublic {
    switch (suppliers.get(id)) {
      case null null;
      case (?s) ?toPublic(s);
    };
  };

  public func listSuppliers(
    suppliers : Map.Map<Common.EntityId, Types.Supplier>,
  ) : [Types.SupplierPublic] {
    suppliers.values().map<Types.Supplier, Types.SupplierPublic>(func(s) { toPublic(s) }).toArray();
  };

  public func updateLedgerBalance(
    suppliers : Map.Map<Common.EntityId, Types.Supplier>,
    id : Common.EntityId,
    delta : Float,
  ) : () {
    switch (suppliers.get(id)) {
      case null ();
      case (?s) {
        s.ledgerBalance := s.ledgerBalance + delta;
      };
    };
  };
};
