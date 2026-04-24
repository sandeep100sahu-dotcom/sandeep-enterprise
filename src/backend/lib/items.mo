import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/items";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public func toPublic(item : Types.Item) : Types.ItemPublic {
    {
      id = item.id;
      code = item.code;
      name = item.name;
      category = item.category;
      subcategory = item.subcategory;
      description = item.description;
      unit = item.unit;
      brand = item.brand;
      size = item.size;
      rackLocation = item.rackLocation;
      minimumStock = item.minimumStock;
      preferredSupplier = item.preferredSupplier;
      gstHsn = item.gstHsn;
      photo = item.photo;
      currentStock = item.currentStock;
      lastPurchaseRate = item.lastPurchaseRate;
      isActive = item.isActive;
      createdAt = item.createdAt;
      updatedAt = item.updatedAt;
    };
  };

  public func addItem(
    items : Map.Map<Common.EntityId, Types.Item>,
    nextId : Nat,
    req : Types.AddItemRequest,
  ) : Common.EntityId {
    let now = Time.now();
    let item : Types.Item = {
      id = nextId;
      code = req.code;
      var name = req.name;
      var category = req.category;
      var subcategory = req.subcategory;
      var description = req.description;
      var unit = req.unit;
      var brand = req.brand;
      var size = req.size;
      var rackLocation = req.rackLocation;
      var minimumStock = req.minimumStock;
      var preferredSupplier = req.preferredSupplier;
      var gstHsn = req.gstHsn;
      var photo = req.photo;
      var currentStock = 0;
      var lastPurchaseRate = 0.0;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    items.add(nextId, item);
    nextId;
  };

  public func updateItem(
    items : Map.Map<Common.EntityId, Types.Item>,
    id : Common.EntityId,
    req : Types.UpdateItemRequest,
  ) : Bool {
    switch (items.get(id)) {
      case null false;
      case (?item) {
        item.name := req.name;
        item.category := req.category;
        item.subcategory := req.subcategory;
        item.description := req.description;
        item.unit := req.unit;
        item.brand := req.brand;
        item.size := req.size;
        item.rackLocation := req.rackLocation;
        item.minimumStock := req.minimumStock;
        item.preferredSupplier := req.preferredSupplier;
        item.gstHsn := req.gstHsn;
        item.photo := req.photo;
        item.updatedAt := Time.now();
        true;
      };
    };
  };

  public func deactivateItem(
    items : Map.Map<Common.EntityId, Types.Item>,
    id : Common.EntityId,
  ) : Bool {
    switch (items.get(id)) {
      case null false;
      case (?item) {
        item.isActive := false;
        item.updatedAt := Time.now();
        true;
      };
    };
  };

  public func getItem(
    items : Map.Map<Common.EntityId, Types.Item>,
    id : Common.EntityId,
  ) : ?Types.ItemPublic {
    switch (items.get(id)) {
      case null null;
      case (?item) ?toPublic(item);
    };
  };

  public func listItems(
    items : Map.Map<Common.EntityId, Types.Item>,
  ) : [Types.ItemPublic] {
    let iter = items.values().filter(func(item : Types.Item) : Bool { item.isActive });
    iter.map<Types.Item, Types.ItemPublic>(func(item) { toPublic(item) }).toArray();
  };

  public func searchItems(
    items : Map.Map<Common.EntityId, Types.Item>,
    searchTerm : Text,
  ) : [Types.ItemPublic] {
    let lower = searchTerm.toLower();
    let iter = items.values().filter(func(item : Types.Item) : Bool {
      item.isActive and (
        item.name.toLower().contains(#text lower) or
        item.code.toLower().contains(#text lower) or
        item.category.toLower().contains(#text lower) or
        item.brand.toLower().contains(#text lower) or
        item.description.toLower().contains(#text lower)
      )
    });
    iter.map<Types.Item, Types.ItemPublic>(func(item) { toPublic(item) }).toArray();
  };

  public func getLowStockItems(
    items : Map.Map<Common.EntityId, Types.Item>,
  ) : [Types.ItemPublic] {
    let iter = items.values().filter(func(item : Types.Item) : Bool {
      item.isActive and item.currentStock < item.minimumStock
    });
    iter.map<Types.Item, Types.ItemPublic>(func(item) { toPublic(item) }).toArray();
  };

  public func adjustStock(
    items : Map.Map<Common.EntityId, Types.Item>,
    itemId : Common.EntityId,
    delta : Int,
  ) : Bool {
    switch (items.get(itemId)) {
      case null false;
      case (?item) {
        let newStock : Int = item.currentStock.toInt() + delta;
        if (newStock < 0) {
          false;
        } else {
          item.currentStock := newStock.toNat();
          item.updatedAt := Time.now();
          true;
        };
      };
    };
  };

  public func updateLastPurchaseRate(
    items : Map.Map<Common.EntityId, Types.Item>,
    itemId : Common.EntityId,
    rate : Float,
  ) : () {
    switch (items.get(itemId)) {
      case null ();
      case (?item) {
        item.lastPurchaseRate := rate;
        item.updatedAt := Time.now();
      };
    };
  };
};
