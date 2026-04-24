import Common "common";

module {
  public type GRNLineItem = {
    itemId : Common.EntityId;
    itemCode : Text;
    qty : Nat;
    rate : Float;
    gstPercent : Float;
    total : Float;
  };

  public type GRNEntry = {
    id : Common.EntityId;
    grnNo : Text;
    var supplierId : Common.EntityId;
    var invoiceNo : Text;
    var challanNo : Text;
    date : Common.Timestamp;
    items : [GRNLineItem];
    var qcStatus : Common.QCStatus;
    createdBy : Text;
    createdAt : Common.Timestamp;
  };

  public type GRNEntryPublic = {
    id : Common.EntityId;
    grnNo : Text;
    supplierId : Common.EntityId;
    invoiceNo : Text;
    challanNo : Text;
    date : Common.Timestamp;
    items : [GRNLineItem];
    qcStatus : Common.QCStatus;
    createdBy : Text;
    createdAt : Common.Timestamp;
  };

  public type AddGRNRequest = {
    supplierId : Common.EntityId;
    invoiceNo : Text;
    challanNo : Text;
    date : Common.Timestamp;
    items : [GRNLineItem];
    qcStatus : Common.QCStatus;
  };

  public type IssueLineItem = {
    itemId : Common.EntityId;
    itemCode : Text;
    qty : Nat;
  };

  public type IssueEntry = {
    id : Common.EntityId;
    issueSlipNo : Text;
    date : Common.Timestamp;
    var department : Text;
    var machineName : Text;
    issueType : Common.IssueType;
    items : [IssueLineItem];
    var requestedBy : Text;
    issuedBy : Text;
    var purpose : Text;
    var status : Text;
    createdAt : Common.Timestamp;
  };

  public type IssueEntryPublic = {
    id : Common.EntityId;
    issueSlipNo : Text;
    date : Common.Timestamp;
    department : Text;
    machineName : Text;
    issueType : Common.IssueType;
    items : [IssueLineItem];
    requestedBy : Text;
    issuedBy : Text;
    purpose : Text;
    status : Text;
    createdAt : Common.Timestamp;
  };

  public type AddIssueRequest = {
    department : Text;
    machineName : Text;
    issueType : Common.IssueType;
    items : [IssueLineItem];
    requestedBy : Text;
    purpose : Text;
  };

  public type StockTransaction = {
    id : Common.EntityId;
    itemId : Common.EntityId;
    transactionType : Common.TransactionType;
    refId : Common.EntityId;
    qty : Nat;
    balanceAfter : Nat;
    createdAt : Common.Timestamp;
  };
};
