import Common "common";
import Principal "mo:core/Principal";

module {
  public type UserProfile = {
    id : Principal;
    var username : Text;
    role : Common.Role;
    var isActive : Bool;
    var lastLoginAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type UserProfilePublic = {
    id : Principal;
    username : Text;
    role : Common.Role;
    isActive : Bool;
    lastLoginAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type Category = {
    id : Common.EntityId;
    var name : Text;
    var subcategories : [Text];
    createdAt : Common.Timestamp;
  };

  public type CategoryPublic = {
    id : Common.EntityId;
    name : Text;
    subcategories : [Text];
    createdAt : Common.Timestamp;
  };

  public type AddCategoryRequest = {
    name : Text;
    subcategories : [Text];
  };

  public type AuditLog = {
    id : Common.EntityId;
    userId : Principal;
    action : Text;
    moduleName : Text;
    entityId : Common.EntityId;
    oldValue : Text;
    newValue : Text;
    timestamp : Common.Timestamp;
  };
};
