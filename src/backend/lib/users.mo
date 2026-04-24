import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/users";
import Common "../types/common";

module {
  public func profileToPublic(profile : Types.UserProfile) : Types.UserProfilePublic {
    {
      id = profile.id;
      username = profile.username;
      role = profile.role;
      isActive = profile.isActive;
      lastLoginAt = profile.lastLoginAt;
      createdAt = profile.createdAt;
    };
  };

  public func categoryToPublic(cat : Types.Category) : Types.CategoryPublic {
    {
      id = cat.id;
      name = cat.name;
      subcategories = cat.subcategories;
      createdAt = cat.createdAt;
    };
  };

  public func getOrCreateProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    username : Text,
    role : Common.Role,
  ) : Types.UserProfilePublic {
    let now = Time.now();
    switch (profiles.get(caller)) {
      case (?existing) {
        existing.username := username;
        existing.lastLoginAt := ?now;
        profileToPublic(existing);
      };
      case null {
        let profile : Types.UserProfile = {
          id = caller;
          var username;
          role;
          var isActive = true;
          var lastLoginAt = ?now;
          createdAt = now;
        };
        profiles.add(caller, profile);
        profileToPublic(profile);
      };
    };
  };

  public func updateLastLogin(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    now : Common.Timestamp,
  ) : () {
    switch (profiles.get(caller)) {
      case null ();
      case (?p) {
        p.lastLoginAt := ?now;
      };
    };
  };

  public func deactivateUser(
    profiles : Map.Map<Principal, Types.UserProfile>,
    userId : Principal,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null false;
      case (?p) {
        p.isActive := false;
        true;
      };
    };
  };

  public func listUsers(
    profiles : Map.Map<Principal, Types.UserProfile>,
  ) : [Types.UserProfilePublic] {
    profiles.values().map<Types.UserProfile, Types.UserProfilePublic>(
      func(p) { profileToPublic(p) }
    ).toArray();
  };

  public func addCategory(
    categories : Map.Map<Common.EntityId, Types.Category>,
    nextId : Nat,
    req : Types.AddCategoryRequest,
  ) : Common.EntityId {
    let cat : Types.Category = {
      id = nextId;
      var name = req.name;
      var subcategories = req.subcategories;
      createdAt = Time.now();
    };
    categories.add(nextId, cat);
    nextId;
  };

  public func updateCategory(
    categories : Map.Map<Common.EntityId, Types.Category>,
    id : Common.EntityId,
    name : Text,
    subcategories : [Text],
  ) : Bool {
    switch (categories.get(id)) {
      case null false;
      case (?cat) {
        cat.name := name;
        cat.subcategories := subcategories;
        true;
      };
    };
  };

  public func deleteCategory(
    categories : Map.Map<Common.EntityId, Types.Category>,
    id : Common.EntityId,
  ) : Bool {
    switch (categories.get(id)) {
      case null false;
      case _ {
        categories.remove(id);
        true;
      };
    };
  };

  public func listCategories(
    categories : Map.Map<Common.EntityId, Types.Category>,
  ) : [Types.CategoryPublic] {
    categories.values().map<Types.Category, Types.CategoryPublic>(
      func(c) { categoryToPublic(c) }
    ).toArray();
  };

  public func recordAuditLog(
    auditLogs : List.List<Types.AuditLog>,
    nextId : Nat,
    userId : Principal,
    action : Text,
    moduleName : Text,
    entityId : Common.EntityId,
    oldValue : Text,
    newValue : Text,
    now : Common.Timestamp,
  ) : () {
    let log : Types.AuditLog = {
      id = nextId;
      userId;
      action;
      moduleName;
      entityId;
      oldValue;
      newValue;
      timestamp = now;
    };
    auditLogs.add(log);
  };

  public func getAuditLogs(
    auditLogs : List.List<Types.AuditLog>,
  ) : [Types.AuditLog] {
    auditLogs.toArray();
  };
};
