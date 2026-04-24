import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface MonthlyConsumption {
    month: string;
    totalValue: number;
    totalQty: bigint;
}
export interface ItemUsageStat {
    itemId: EntityId;
    totalQty: bigint;
    itemCode: string;
    itemName: string;
}
export type Timestamp = bigint;
export interface IssueLineItem {
    qty: bigint;
    itemId: EntityId;
    itemCode: string;
}
export interface AuditLog {
    id: EntityId;
    action: string;
    oldValue: string;
    moduleName: string;
    userId: Principal;
    newValue: string;
    entityId: EntityId;
    timestamp: Timestamp;
}
export interface CategoryPublic {
    id: EntityId;
    name: string;
    createdAt: Timestamp;
    subcategories: Array<string>;
}
export type EntityId = bigint;
export interface AddItemRequest {
    minimumStock: bigint;
    subcategory: string;
    code: string;
    name: string;
    size: string;
    unit: string;
    description: string;
    rackLocation: string;
    category: string;
    gstHsn: string;
    brand: string;
    photo?: ExternalBlob;
    preferredSupplier: string;
}
export interface SupplierPublic {
    id: EntityId;
    name: string;
    createdAt: Timestamp;
    contactPerson: string;
    email: string;
    gstin: string;
    address: string;
    ledgerBalance: number;
    phone: string;
}
export interface ItemPublic {
    id: EntityId;
    minimumStock: bigint;
    subcategory: string;
    code: string;
    name: string;
    createdAt: Timestamp;
    size: string;
    unit: string;
    description: string;
    rackLocation: string;
    isActive: boolean;
    updatedAt: Timestamp;
    lastPurchaseRate: number;
    category: string;
    gstHsn: string;
    brand: string;
    photo?: ExternalBlob;
    currentStock: bigint;
    preferredSupplier: string;
}
export interface GRNLineItem {
    qty: bigint;
    itemId: EntityId;
    total: number;
    rate: number;
    gstPercent: number;
    itemCode: string;
}
export interface DeptConsumptionStat {
    totalValue: number;
    totalQty: bigint;
    department: string;
}
export interface UpdateSupplierRequest {
    name: string;
    contactPerson: string;
    email: string;
    gstin: string;
    address: string;
    phone: string;
}
export interface IssueEntryPublic {
    id: EntityId;
    status: string;
    issueType: IssueType;
    issueSlipNo: string;
    date: Timestamp;
    createdAt: Timestamp;
    issuedBy: string;
    items: Array<IssueLineItem>;
    department: string;
    purpose: string;
    machineName: string;
    requestedBy: string;
}
export interface UpdateItemRequest {
    minimumStock: bigint;
    subcategory: string;
    name: string;
    size: string;
    unit: string;
    description: string;
    rackLocation: string;
    category: string;
    gstHsn: string;
    brand: string;
    photo?: ExternalBlob;
    preferredSupplier: string;
}
export interface AddSupplierRequest {
    name: string;
    contactPerson: string;
    email: string;
    gstin: string;
    address: string;
    phone: string;
}
export interface AddIssueRequest {
    issueType: IssueType;
    items: Array<IssueLineItem>;
    department: string;
    purpose: string;
    machineName: string;
    requestedBy: string;
}
export interface AddCategoryRequest {
    name: string;
    subcategories: Array<string>;
}
export interface StockTransaction {
    id: EntityId;
    qty: bigint;
    itemId: EntityId;
    transactionType: TransactionType;
    createdAt: Timestamp;
    balanceAfter: bigint;
    refId: EntityId;
}
export interface DashboardStats {
    currentStockValue: number;
    totalActiveItems: bigint;
    lowStockCount: bigint;
    todayIssueCount: bigint;
    todayInwardCount: bigint;
    nonMovingCount: bigint;
}
export interface UserProfilePublic {
    id: Principal;
    username: string;
    lastLoginAt?: Timestamp;
    createdAt: Timestamp;
    role: Role;
    isActive: boolean;
}
export interface GRNEntryPublic {
    id: EntityId;
    challanNo: string;
    date: Timestamp;
    createdAt: Timestamp;
    createdBy: string;
    invoiceNo: string;
    qcStatus: QCStatus;
    grnNo: string;
    items: Array<GRNLineItem>;
    supplierId: EntityId;
}
export interface AddGRNRequest {
    challanNo: string;
    date: Timestamp;
    invoiceNo: string;
    qcStatus: QCStatus;
    items: Array<GRNLineItem>;
    supplierId: EntityId;
}
export enum IssueType {
    normal = "normal",
    emergencyBreakdown = "emergencyBreakdown",
    directConsumable = "directConsumable"
}
export enum QCStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Role {
    manager = "manager",
    admin = "admin",
    purchaseUser = "purchaseUser",
    storeUser = "storeUser"
}
export enum TransactionType {
    inward = "inward",
    issue = "issue"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCategory(req: AddCategoryRequest): Promise<EntityId>;
    addGRN(req: AddGRNRequest): Promise<EntityId>;
    addIssue(req: AddIssueRequest): Promise<EntityId>;
    addItem(req: AddItemRequest): Promise<EntityId>;
    addSupplier(req: AddSupplierRequest): Promise<EntityId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deactivateItem(id: EntityId): Promise<boolean>;
    deactivateUser(userId: Principal): Promise<boolean>;
    deleteCategory(id: EntityId): Promise<boolean>;
    deleteSupplier(id: EntityId): Promise<boolean>;
    getAuditLogs(): Promise<Array<AuditLog>>;
    getCallerUserProfile(): Promise<UserProfilePublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentStock(): Promise<Array<ItemPublic>>;
    getDashboardStats(): Promise<DashboardStats>;
    getDeadStockReport(thresholdDays: bigint): Promise<Array<ItemPublic>>;
    getDeptConsumption(): Promise<Array<DeptConsumptionStat>>;
    getDeptConsumptionReport(fromTs: Timestamp, toTs: Timestamp): Promise<Array<DeptConsumptionStat>>;
    getGRN(id: EntityId): Promise<GRNEntryPublic | null>;
    getIssue(id: EntityId): Promise<IssueEntryPublic | null>;
    getItem(id: EntityId): Promise<ItemPublic | null>;
    getItemLedger(itemId: EntityId): Promise<Array<StockTransaction>>;
    getItemLedgerReport(itemId: EntityId): Promise<Array<StockTransaction>>;
    getLowStockItems(): Promise<Array<ItemPublic>>;
    getLowStockReport(): Promise<Array<ItemPublic>>;
    getMonthlyConsumption(months: bigint): Promise<Array<MonthlyConsumption>>;
    getMonthlyPurchaseReport(months: bigint): Promise<Array<MonthlyConsumption>>;
    getSupplier(id: EntityId): Promise<SupplierPublic | null>;
    getTopUsedItems(limit: bigint): Promise<Array<ItemUsageStat>>;
    getUserProfile(userId: Principal): Promise<UserProfilePublic | null>;
    isCallerAdmin(): Promise<boolean>;
    listCategories(): Promise<Array<CategoryPublic>>;
    listGRNs(): Promise<Array<GRNEntryPublic>>;
    listIssues(): Promise<Array<IssueEntryPublic>>;
    listItems(): Promise<Array<ItemPublic>>;
    listSuppliers(): Promise<Array<SupplierPublic>>;
    listUsers(): Promise<Array<UserProfilePublic>>;
    saveCallerUserProfile(username: string): Promise<void>;
    searchItems(searchTerm: string): Promise<Array<ItemPublic>>;
    updateCategory(id: EntityId, name: string, subcategories: Array<string>): Promise<boolean>;
    updateGRNQCStatus(id: EntityId, status: QCStatus): Promise<boolean>;
    updateItem(id: EntityId, req: UpdateItemRequest): Promise<boolean>;
    updateSupplier(id: EntityId, req: UpdateSupplierRequest): Promise<boolean>;
    uploadItemPhoto(id: EntityId, photo: ExternalBlob): Promise<boolean>;
}
