import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/users";
import UserLib "../lib/users";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  categories : Map.Map<Common.EntityId, UserTypes.Category>,
  auditLogs : List.List<UserTypes.AuditLog>,
  nextCategoryId : { var value : Nat },
  nextAuditLogId : { var value : Nat },
) {
  /// Get own profile (any authenticated user)
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfilePublic {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    switch (userProfiles.get(caller)) {
      case null null;
      case (?p) ?UserLib.profileToPublic(p);
    };
  };

  /// Save / update own profile name (any authenticated user — auto-registers on first call)
  public shared ({ caller }) func saveCallerUserProfile(username : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let now = Time.now();
    switch (userProfiles.get(caller)) {
      case (?existing) {
        existing.username := username;
        existing.lastLoginAt := ?now;
      };
      case null {
        // First user to register auto-becomes admin via AccessControl, default role #storeUser for others
        let role : Common.Role = if (AccessControl.isAdmin(accessControlState, caller)) #admin else #storeUser;
        let profile : UserTypes.UserProfile = {
          id = caller;
          var username;
          role;
          var isActive = true;
          var lastLoginAt = ?now;
          createdAt = now;
        };
        userProfiles.add(caller, profile);
      };
    };
  };

  /// Get profile by principal (Admin only)
  public query ({ caller }) func getUserProfile(userId : Principal) : async ?UserTypes.UserProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (userProfiles.get(userId)) {
      case null null;
      case (?p) ?UserLib.profileToPublic(p);
    };
  };

  /// List all users (Admin only)
  public query ({ caller }) func listUsers() : async [UserTypes.UserProfilePublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.listUsers(userProfiles);
  };

  /// Deactivate a user account (Admin only)
  public shared ({ caller }) func deactivateUser(userId : Principal) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let result = UserLib.deactivateUser(userProfiles, userId);
    if (result) {
      let logId = nextAuditLogId.value;
      nextAuditLogId.value += 1;
      UserLib.recordAuditLog(auditLogs, logId, caller, "deactivateUser", "users", 0, userId.toText(), "deactivated", Time.now());
    };
    result;
  };

  /// List all categories (all authenticated users)
  public query ({ caller }) func listCategories() : async [UserTypes.CategoryPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.listCategories(categories);
  };

  /// Add category (Admin only)
  public shared ({ caller }) func addCategory(req : UserTypes.AddCategoryRequest) : async Common.EntityId {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let id = nextCategoryId.value;
    nextCategoryId.value += 1;
    let catId = UserLib.addCategory(categories, id, req);
    let logId = nextAuditLogId.value;
    nextAuditLogId.value += 1;
    UserLib.recordAuditLog(auditLogs, logId, caller, "addCategory", "categories", catId, "", req.name, Time.now());
    catId;
  };

  /// Update category (Admin only)
  public shared ({ caller }) func updateCategory(id : Common.EntityId, name : Text, subcategories : [Text]) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let result = UserLib.updateCategory(categories, id, name, subcategories);
    if (result) {
      let logId = nextAuditLogId.value;
      nextAuditLogId.value += 1;
      UserLib.recordAuditLog(auditLogs, logId, caller, "updateCategory", "categories", id, "", name, Time.now());
    };
    result;
  };

  /// Delete category (Admin only)
  public shared ({ caller }) func deleteCategory(id : Common.EntityId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let result = UserLib.deleteCategory(categories, id);
    if (result) {
      let logId = nextAuditLogId.value;
      nextAuditLogId.value += 1;
      UserLib.recordAuditLog(auditLogs, logId, caller, "deleteCategory", "categories", id, id.toText(), "deleted", Time.now());
    };
    result;
  };

  /// Get audit logs (Admin only)
  public query ({ caller }) func getAuditLogs() : async [UserTypes.AuditLog] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.getAuditLogs(auditLogs);
  };
};
