import { O as useQuery, Q as useQueryClient, U as useMutation } from "./index-B0qZHuNS.js";
const SEED_GRNS = [
  {
    id: "1",
    grnNo: "GRN-2025-0041",
    supplierId: "sup1",
    supplierName: "SKF Distributors",
    invoiceNo: "INV-SKF-2025-441",
    challanNo: "DC-441",
    date: "2025-04-20",
    items: [
      {
        itemId: "1",
        itemCode: "BRG-0147",
        itemName: "Bearing Deep Groove Ball 6205 ZZ",
        qty: 20,
        rate: 850,
        gst: 18,
        total: 20060
      }
    ],
    qcStatus: "approved",
    createdBy: "store.user",
    createdAt: "2025-04-20T09:15:00Z"
  },
  {
    id: "2",
    grnNo: "GRN-2025-0042",
    supplierId: "sup2",
    supplierName: "Parker Hannifin India",
    invoiceNo: "INV-PHI-2025-221",
    challanNo: "DC-221",
    date: "2025-04-22",
    items: [
      {
        itemId: "2",
        itemCode: "HYD-0231",
        itemName: "Hydraulic Cylinder Seal Kit",
        qty: 5,
        rate: 2200,
        gst: 18,
        total: 12980
      }
    ],
    qcStatus: "pending",
    createdBy: "store.user",
    createdAt: "2025-04-22T11:00:00Z"
  },
  {
    id: "3",
    grnNo: "GRN-2025-0043",
    supplierId: "sup3",
    supplierName: "Gates Distributors",
    invoiceNo: "INV-GD-2025-119",
    challanNo: "DC-119",
    date: "2025-04-23",
    items: [
      {
        itemId: "5",
        itemCode: "V-BLT-112",
        itemName: "V-Belt B-58",
        qty: 12,
        rate: 320,
        gst: 12,
        total: 4300.8
      }
    ],
    qcStatus: "approved",
    createdBy: "store.user",
    createdAt: "2025-04-23T14:30:00Z"
  }
];
const SEED_ISSUES = [
  {
    id: "1",
    issueSlipNo: "ISS-2025-0118",
    date: "2025-04-23",
    department: "Rolling Mill",
    machineName: "Shearing Machine SHR-01",
    issueType: "emergencyBreakdown",
    items: [
      {
        itemId: "1",
        itemCode: "BRG-0147",
        itemName: "Bearing Deep Groove Ball 6205 ZZ",
        qty: 2
      }
    ],
    requestedBy: "Ramesh Kumar",
    issuedBy: "Suresh Patel",
    purpose: "Emergency bearing replacement after breakdown",
    status: "completed",
    createdAt: "2025-04-23T08:45:00Z"
  },
  {
    id: "2",
    issueSlipNo: "ISS-2025-0119",
    date: "2025-04-23",
    department: "Maintenance",
    machineName: "Hydraulic Press HP-03",
    issueType: "normal",
    items: [
      {
        itemId: "2",
        itemCode: "HYD-0231",
        itemName: "Hydraulic Cylinder Seal Kit",
        qty: 1
      }
    ],
    requestedBy: "Anil Sharma",
    issuedBy: "Suresh Patel",
    purpose: "Scheduled PM seal replacement",
    status: "completed",
    createdAt: "2025-04-23T10:20:00Z"
  },
  {
    id: "3",
    issueSlipNo: "ISS-2025-0120",
    date: "2025-04-24",
    department: "Electrical",
    machineName: "Motor Control Panel MCP-02",
    issueType: "normal",
    items: [
      {
        itemId: "3",
        itemCode: "ELC-0089",
        itemName: "Contactor 3-Phase 40A",
        qty: 2
      }
    ],
    requestedBy: "Vijay Singh",
    issuedBy: "Suresh Patel",
    purpose: "Contactor failure replacement",
    status: "pending",
    createdAt: "2025-04-24T07:30:00Z"
  }
];
function useGRNs() {
  return useQuery({
    queryKey: ["grns"],
    queryFn: async () => SEED_GRNS,
    placeholderData: []
  });
}
function useAddGRN() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (grn) => ({
      ...grn,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grns"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    }
  });
}
function useUpdateGRNQCStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => ({
      id,
      status
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grns"] });
    }
  });
}
function useIssues() {
  return useQuery({
    queryKey: ["issues"],
    queryFn: async () => SEED_ISSUES,
    placeholderData: []
  });
}
function useAddIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (issue) => ({
      ...issue,
      id: Date.now().toString(),
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    }
  });
}
function useItemLedger(itemId) {
  return useQuery({
    queryKey: ["ledger", itemId],
    queryFn: async () => [
      {
        id: "1",
        itemId,
        transactionType: "inward",
        refId: "GRN-2025-0041",
        qty: 20,
        balanceAfter: 45,
        createdAt: "2025-04-20T09:15:00Z"
      },
      {
        id: "2",
        itemId,
        transactionType: "issue",
        refId: "ISS-2025-0118",
        qty: -2,
        balanceAfter: 43,
        createdAt: "2025-04-23T08:45:00Z"
      }
    ],
    enabled: !!itemId
  });
}
export {
  useItemLedger as a,
  useGRNs as b,
  useAddGRN as c,
  useUpdateGRNQCStatus as d,
  useAddIssue as e,
  useIssues as u
};
