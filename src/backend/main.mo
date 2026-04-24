import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

import ItemTypes "types/items";
import SupplierTypes "types/suppliers";
import InvTypes "types/inventory";
import UserTypes "types/users";
import Common "types/common";

import ItemsApi "mixins/items-api";
import SuppliersApi "mixins/suppliers-api";
import InventoryApi "mixins/inventory-api";
import DashboardApi "mixins/dashboard-api";
import ReportsApi "mixins/reports-api";
import UsersApi "mixins/users-api";

actor {
  // Authorization state (first user auto-becomes admin)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure for file/photo uploads
  include MixinObjectStorage();

  // Item Master state
  let items = Map.empty<Common.EntityId, ItemTypes.Item>();
  let nextItemIdRef = { var value : Nat = 1 };

  // Supplier state
  let suppliers = Map.empty<Common.EntityId, SupplierTypes.Supplier>();
  let nextSupplierIdRef = { var value : Nat = 1 };

  // GRN / Inward state
  let grns = Map.empty<Common.EntityId, InvTypes.GRNEntry>();
  let nextGrnIdRef = { var value : Nat = 1 };

  // Issue entries state
  let issues = Map.empty<Common.EntityId, InvTypes.IssueEntry>();
  let nextIssueIdRef = { var value : Nat = 1 };

  // Stock transactions ledger
  let stockTransactions = List.empty<InvTypes.StockTransaction>();
  let nextTxIdRef = { var value : Nat = 1 };

  // User profiles & categories
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();
  let categories = Map.empty<Common.EntityId, UserTypes.Category>();
  let nextCategoryIdRef = { var value : Nat = 1 };

  // Audit logs
  let auditLogs = List.empty<UserTypes.AuditLog>();
  let nextAuditLogIdRef = { var value : Nat = 1 };

  // Mixin inclusions — public API endpoints
  include ItemsApi(accessControlState, items, nextItemIdRef);
  include SuppliersApi(accessControlState, suppliers, nextSupplierIdRef);
  include InventoryApi(accessControlState, grns, issues, stockTransactions, items, nextGrnIdRef, nextIssueIdRef, nextTxIdRef);
  include DashboardApi(accessControlState, items, grns, issues);
  include ReportsApi(accessControlState, items, grns, issues, stockTransactions);
  include UsersApi(accessControlState, userProfiles, categories, auditLogs, nextCategoryIdRef, nextAuditLogIdRef);
};
