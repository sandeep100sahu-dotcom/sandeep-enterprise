import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, A as ArrowDownToLine, g as Package, i as cn, v as Search, I as Input, w as Select, x as SelectTrigger, y as SelectValue, z as SelectContent, D as SelectItem, K as Label, E as TableSkeleton, F as ChevronRight, G as ue, f as useItems, T as TriangleAlert } from "./index-B0qZHuNS.js";
import { d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle, i as DialogFooter } from "./dialog-C13pSRLy.js";
import { b as useGRNs, c as useAddGRN, d as useUpdateGRNQCStatus } from "./use-inventory-C9j3WEcF.js";
import { C as Clock } from "./clock-DH_XNXHT.js";
import { F as Funnel } from "./funnel-C_qsXYUg.js";
import { C as CircleX } from "./circle-x-B_ilNljy.js";
import { T as Trash2 } from "./trash-2-B8n47Ivl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
const QC_CONFIG = {
  pending: {
    label: "QC Pending",
    className: "bg-accent/15 text-accent border border-accent/30",
    icon: Clock
  },
  approved: {
    label: "Approved",
    className: "bg-green-500/15 text-green-700 border border-green-500/30 dark:text-green-400",
    icon: CircleCheckBig
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/15 text-destructive border border-destructive/30",
    icon: CircleX
  }
};
const BLANK_LINE = {
  itemId: "",
  itemCode: "",
  itemName: "",
  qty: 1,
  rate: 0,
  gst: 18,
  total: 0
};
function calcTotal(line) {
  return line.qty * line.rate * (1 + line.gst / 100);
}
function fmtCurrency(n) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function QCBadge({ status }) {
  const cfg = QC_CONFIG[status];
  const Icon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-medium",
        cfg.className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-2.5 h-2.5" }),
        cfg.label
      ]
    }
  );
}
function GRNDetailDialog({
  grn,
  onClose,
  onApprove,
  onReject,
  isPending
}) {
  const [confirmApprove, setConfirmApprove] = reactExports.useState(false);
  const grandTotal = grn.items.reduce((s, l) => s + l.total, 0);
  const totalQty = grn.items.reduce((s, l) => s + l.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "inward.detail_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: grn.grnNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              grn.supplierName,
              " · ",
              grn.date
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QCBadge, { status: grn.qcStatus })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
          { label: "GRN No", value: grn.grnNo },
          { label: "Date", value: grn.date },
          { label: "Supplier", value: grn.supplierName },
          { label: "Invoice No", value: grn.invoiceNo || "—" },
          { label: "Challan No", value: grn.challanNo || "—" },
          { label: "Recorded By", value: grn.createdBy }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-sm p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: value })
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2", children: [
            "Line Items (",
            grn.items.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-medium text-muted-foreground", children: "Item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 font-medium text-muted-foreground", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 font-medium text-muted-foreground", children: "Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 font-medium text-muted-foreground", children: "GST" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 font-medium text-muted-foreground", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: grn.items.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-primary font-medium", children: line.itemCode }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] truncate max-w-[160px]", children: line.itemName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-right font-mono", children: line.qty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-3 text-right font-mono", children: [
                    "₹",
                    line.rate.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-3 text-right text-muted-foreground", children: [
                    line.gst,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-right font-mono font-semibold", children: fmtCurrency(line.total) })
                ]
              },
              `${line.itemId}-${i}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/20 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-semibold", children: "Grand Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-3 text-right font-mono text-muted-foreground", children: [
                totalQty,
                " units"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-right font-mono font-bold text-foreground", children: fmtCurrency(grandTotal) })
            ] }) })
          ] }) })
        ] }),
        confirmApprove && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-500/10 border border-green-500/30 rounded-sm p-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-green-700 dark:text-green-400 mb-1", children: "Confirm QC Approval" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Stock will increase by",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold", children: [
                  totalQty,
                  " units"
                ] }),
                " ",
                "across",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                  grn.items.length,
                  " item(s)"
                ] }),
                ". This action cannot be undone."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs",
                onClick: () => setConfirmApprove(false),
                "data-ocid": "inward.detail.confirm_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-7 text-xs bg-green-600 hover:bg-green-700 text-white",
                onClick: () => {
                  onApprove(grn.id);
                  setConfirmApprove(false);
                  onClose();
                },
                disabled: isPending,
                "data-ocid": "inward.detail.confirm_button",
                children: isPending ? "Approving…" : "Confirm Approve"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 flex-wrap", children: [
          grn.qcStatus === "pending" && !confirmApprove && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 text-xs border-destructive/50 text-destructive hover:bg-destructive/10",
                onClick: () => {
                  onReject(grn.id);
                  onClose();
                },
                disabled: isPending,
                "data-ocid": "inward.detail.reject_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1.5" }),
                  " Reject"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "h-8 text-xs bg-green-600 hover:bg-green-700 text-white",
                onClick: () => setConfirmApprove(true),
                "data-ocid": "inward.detail.approve_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1.5" }),
                  " Approve"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 text-xs",
              onClick: onClose,
              "data-ocid": "inward.detail.close_button",
              children: "Close"
            }
          )
        ] })
      ]
    }
  ) });
}
function AddGRNDialog({
  open,
  onClose,
  onSubmit,
  isPending
}) {
  const { data: items } = useItems();
  const autoGrnNo = `GRN-${(/* @__PURE__ */ new Date()).getFullYear()}${String(
    Math.floor(Math.random() * 9e3) + 1e3
  )}`;
  const [form, setForm] = reactExports.useState({
    grnNo: autoGrnNo,
    supplierName: "",
    supplierId: "",
    invoiceNo: "",
    challanNo: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    qcStatus: "pending"
  });
  const [lineItems, setLineItems] = reactExports.useState([{ ...BLANK_LINE }]);
  const [supplierQuery, setSupplierQuery] = reactExports.useState("");
  const knownSuppliers = [
    "SKF Distributors",
    "Parker Hannifin India",
    "Gates Distributors",
    "L&T Electrical",
    "Siemens Authorised Dealer"
  ];
  const filteredSuppliers = knownSuppliers.filter(
    (s) => s.toLowerCase().includes(supplierQuery.toLowerCase())
  );
  const showSupplierDropdown = supplierQuery.length > 0 && filteredSuppliers.length > 0 && !knownSuppliers.includes(form.supplierName);
  const updateLine = (idx, field, val) => {
    setLineItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      if (field === "qty" || field === "rate" || field === "gst") {
        next[idx].total = calcTotal(next[idx]);
      }
      if (field === "itemId") {
        const found = (items ?? []).find((i) => i.id === String(val));
        if (found) {
          next[idx].itemCode = found.code;
          next[idx].itemName = found.name;
          next[idx].rate = found.lastPurchaseRate;
          next[idx].gst = 18;
          next[idx].total = calcTotal({
            ...next[idx],
            rate: found.lastPurchaseRate
          });
        }
      }
      return next;
    });
  };
  const addLine = () => setLineItems((l) => [...l, { ...BLANK_LINE }]);
  const removeLine = (idx) => setLineItems((l) => l.filter((_, j) => j !== idx));
  const grandTotal = lineItems.reduce((s, l) => s + l.total, 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.supplierName.trim()) {
      ue.error("Please enter a supplier name");
      return;
    }
    if (lineItems.some((l) => !l.itemId)) {
      ue.error("Please select an item for all line rows");
      return;
    }
    onSubmit({
      ...form,
      items: lineItems,
      createdBy: "store.user"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-3xl max-h-[92vh] overflow-y-auto",
      "data-ocid": "inward.add_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "New GRN Entry" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "GRN No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.grnNo,
                  onChange: (e) => setForm((f) => ({ ...f, grnNo: e.target.value })),
                  required: true,
                  className: "font-mono",
                  "data-ocid": "inward.form.grn_no.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.date,
                  onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                  required: true,
                  "data-ocid": "inward.form.date.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Supplier Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: supplierQuery || form.supplierName,
                  onChange: (e) => {
                    setSupplierQuery(e.target.value);
                    setForm((f) => ({
                      ...f,
                      supplierName: e.target.value,
                      supplierId: ""
                    }));
                  },
                  placeholder: "Type to search or enter new supplier",
                  required: true,
                  "data-ocid": "inward.form.supplier.input"
                }
              ),
              showSupplierDropdown && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-0 right-0 z-50 bg-popover border border-border rounded-sm shadow-lg mt-0.5 py-1", children: filteredSuppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-3 py-1.5 text-xs hover:bg-muted/60 transition-colors",
                  onClick: () => {
                    setForm((f) => ({
                      ...f,
                      supplierName: s,
                      supplierId: s
                    }));
                    setSupplierQuery("");
                  },
                  children: s
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Invoice No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.invoiceNo,
                  onChange: (e) => setForm((f) => ({ ...f, invoiceNo: e.target.value })),
                  placeholder: "Invoice number",
                  "data-ocid": "inward.form.invoice.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Challan No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.challanNo,
                  onChange: (e) => setForm((f) => ({ ...f, challanNo: e.target.value })),
                  placeholder: "Delivery challan number",
                  "data-ocid": "inward.form.challan.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "QC Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.qcStatus,
                  onValueChange: (v) => setForm((f) => ({ ...f, qcStatus: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "inward.form.qc_status.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "QC Pending" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "approved", children: "Approved" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rejected", children: "Rejected" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold", children: [
                "Items — ",
                lineItems.length,
                " line(s)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "h-6 text-xs px-2 gap-1",
                  onClick: addLine,
                  "data-ocid": "inward.form.add_line_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    " Add Row"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 font-medium text-muted-foreground w-[36%]", children: "Item" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 font-medium text-muted-foreground w-[10%]", children: "Qty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 font-medium text-muted-foreground w-[18%]", children: "Rate (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 font-medium text-muted-foreground w-[14%]", children: "GST %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2 font-medium text-muted-foreground w-[16%]", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-8" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lineItems.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/40 last:border-0 bg-background hover:bg-muted/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 px-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: line.itemId,
                          onValueChange: (v) => updateLine(idx, "itemId", v),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                className: "h-7 text-xs",
                                "data-ocid": `inward.form.item.select.${idx + 1}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select item…" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (items ?? []).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: i.id, children: [
                              i.code,
                              " — ",
                              i.name
                            ] }, i.id)) })
                          ]
                        }
                      ),
                      line.itemName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 px-0.5 truncate", children: [
                        line.itemName,
                        " · ",
                        line.itemCode
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        value: line.qty,
                        onChange: (e) => updateLine(idx, "qty", Number(e.target.value)),
                        min: 1,
                        className: "h-7 text-xs w-16",
                        "data-ocid": `inward.form.qty.input.${idx + 1}`
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        value: line.rate,
                        onChange: (e) => updateLine(idx, "rate", Number(e.target.value)),
                        className: "h-7 text-xs w-24",
                        "data-ocid": `inward.form.rate.input.${idx + 1}`
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: String(line.gst),
                        onValueChange: (v) => updateLine(idx, "gst", Number(v)),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 text-xs w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [0, 5, 12, 18, 28].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(g), children: [
                            g,
                            "%"
                          ] }, g)) })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2 text-right font-mono font-semibold", children: fmtCurrency(line.total) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-muted-foreground hover:text-destructive transition-colors p-1",
                        onClick: () => removeLine(idx),
                        "aria-label": "Remove line",
                        "data-ocid": `inward.form.remove_line.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                      }
                    ) })
                  ]
                },
                `line-${idx}-${line.itemId}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/20 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-2 px-3 text-xs font-semibold", children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 text-right font-mono font-bold text-foreground", children: fmtCurrency(grandTotal) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
              ] }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "inward.add_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isPending,
                "data-ocid": "inward.add_submit_button",
                children: isPending ? "Saving…" : "Save GRN"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function InwardPage() {
  const { data: grns, isLoading } = useGRNs();
  const addGRN = useAddGRN();
  const updateQC = useUpdateGRNQCStatus();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [detailGRN, setDetailGRN] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [filterQC, setFilterQC] = reactExports.useState("all");
  const [filterSupplier, setFilterSupplier] = reactExports.useState("all");
  const [filterDateFrom, setFilterDateFrom] = reactExports.useState("");
  const [filterDateTo, setFilterDateTo] = reactExports.useState("");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const suppliers = reactExports.useMemo(() => {
    const names = [...new Set((grns ?? []).map((g) => g.supplierName))];
    return names;
  }, [grns]);
  const filtered = reactExports.useMemo(() => {
    return (grns ?? []).filter((g) => {
      const q = search.toLowerCase();
      const matchSearch = !q || g.grnNo.toLowerCase().includes(q) || g.supplierName.toLowerCase().includes(q) || g.invoiceNo.toLowerCase().includes(q);
      const matchQC = filterQC === "all" || g.qcStatus === filterQC;
      const matchSupplier = filterSupplier === "all" || g.supplierName === filterSupplier;
      const matchFrom = !filterDateFrom || g.date >= filterDateFrom;
      const matchTo = !filterDateTo || g.date <= filterDateTo;
      return matchSearch && matchQC && matchSupplier && matchFrom && matchTo;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [grns, search, filterQC, filterSupplier, filterDateFrom, filterDateTo]);
  const handleQCUpdate = async (id, status) => {
    try {
      await updateQC.mutateAsync({ id, status });
      ue.success(
        status === "approved" ? "GRN approved — stock updated" : "GRN rejected"
      );
    } catch {
      ue.error("Failed to update QC status");
    }
  };
  const handleAddGRN = async (data) => {
    try {
      await addGRN.mutateAsync(data);
      ue.success("GRN created successfully");
      setAddOpen(false);
    } catch {
      ue.error("Failed to create GRN");
    }
  };
  const pendingCount = (grns ?? []).filter(
    (g) => g.qcStatus === "pending"
  ).length;
  const approvedCount = (grns ?? []).filter(
    (g) => g.qcStatus === "approved"
  ).length;
  const totalValue = (grns ?? []).reduce(
    (s, g) => s + g.items.reduce((x, l) => x + l.total, 0),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "inward.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Material Inward" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Goods Receipt Notes (GRN) and QC management" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setAddOpen(true),
          className: "gap-2 shrink-0",
          "data-ocid": "inward.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New GRN"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Total GRNs",
        value: String((grns == null ? void 0 : grns.length) ?? 0),
        icon: ArrowDownToLine,
        color: "text-primary"
      },
      {
        label: "QC Pending",
        value: String(pendingCount),
        icon: Clock,
        color: "text-accent"
      },
      {
        label: "QC Approved",
        value: String(approvedCount),
        icon: CircleCheckBig,
        color: "text-green-600 dark:text-green-400"
      },
      {
        label: "Total Value",
        value: fmtCurrency(totalValue),
        icon: Package,
        color: "text-primary"
      }
    ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-5 h-5 shrink-0", color) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-bold text-foreground truncate", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
      ] })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "inward.filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search GRN No, supplier, invoice…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-8 h-8 text-sm",
              "data-ocid": "inward.search.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filterQC,
            onValueChange: (v) => setFilterQC(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 w-36 text-sm",
                  "data-ocid": "inward.qc_filter.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "QC Status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "QC Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "approved", children: "Approved" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rejected", children: "Rejected" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: cn("h-8 gap-1.5 text-sm", showFilters && "bg-muted"),
            onClick: () => setShowFilters((v) => !v),
            "data-ocid": "inward.filter_toggle.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
              " More Filters"
            ]
          }
        )
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap bg-muted/30 rounded-sm p-2.5 border border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground whitespace-nowrap", children: "Supplier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterSupplier, onValueChange: setFilterSupplier, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-7 w-44 text-xs",
                "data-ocid": "inward.supplier_filter.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Suppliers" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Suppliers" }),
              suppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filterDateFrom,
              onChange: (e) => setFilterDateFrom(e.target.value),
              className: "h-7 text-xs w-36",
              "data-ocid": "inward.date_from.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "to" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filterDateTo,
              onChange: (e) => setFilterDateTo(e.target.value),
              className: "h-7 text-xs w-36",
              "data-ocid": "inward.date_to.input"
            }
          )
        ] }),
        (filterSupplier !== "all" || filterDateFrom || filterDateTo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-7 text-xs text-muted-foreground",
            onClick: () => {
              setFilterSupplier("all");
              setFilterDateFrom("");
              setFilterDateTo("");
            },
            "data-ocid": "inward.clear_filters.button",
            children: "Clear"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "data-card p-0 overflow-hidden",
        "data-ocid": "inward.grn_table",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 7, rows: 5 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 gap-3",
            "data-ocid": "inward.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-10 h-10 text-muted-foreground/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No GRN entries yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: search || filterQC !== "all" ? "No results match your search or filter" : "Record your first material inward to get started" }),
              !search && filterQC === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setAddOpen(true),
                  "data-ocid": "inward.empty_add_button",
                  children: "Create first GRN"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 sticky top-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "GRN No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Supplier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell", children: "Invoice No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell", children: "Items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell", children: "Total Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-muted-foreground font-medium text-center", children: "QC Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-muted-foreground font-medium text-right w-24 hidden lg:table-cell", children: "Actions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-8" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((grn, i) => {
              const rowTotal = grn.items.reduce((s, l) => s + l.total, 0);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors",
                  onClick: () => setDetailGRN(grn),
                  onKeyDown: (e) => e.key === "Enter" && setDetailGRN(grn),
                  tabIndex: 0,
                  "data-ocid": `inward.grn.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-primary font-medium", children: grn.grnNo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-foreground font-medium truncate max-w-[140px]", children: grn.supplierName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden md:table-cell text-muted-foreground font-mono", children: grn.invoiceNo || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: grn.date }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right hidden sm:table-cell font-mono", children: grn.items.length }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right hidden lg:table-cell font-mono font-semibold", children: fmtCurrency(rowTotal) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QCBadge, { status: grn.qcStatus }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right hidden lg:table-cell", children: grn.qcStatus === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-end gap-1",
                        onClick: (e) => e.stopPropagation(),
                        onKeyDown: (e) => e.stopPropagation(),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              className: "h-6 px-2 text-green-600 hover:text-green-700 hover:bg-green-500/10 text-[10px]",
                              onClick: () => handleQCUpdate(grn.id, "approved"),
                              "data-ocid": `inward.approve_button.${i + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                                "Approve"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              className: "h-6 px-2 text-destructive hover:text-destructive hover:bg-destructive/10 text-[10px]",
                              onClick: () => handleQCUpdate(grn.id, "rejected"),
                              "data-ocid": `inward.reject_button.${i + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                                "Reject"
                              ]
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground" }) })
                  ]
                },
                grn.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-t border-border/50 bg-muted/10 flex justify-between text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Showing ",
              filtered.length,
              " of ",
              (grns == null ? void 0 : grns.length) ?? 0,
              " GRNs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium", children: [
              "Filtered Total:",
              " ",
              fmtCurrency(
                filtered.reduce(
                  (s, g) => s + g.items.reduce((x, l) => x + l.total, 0),
                  0
                )
              )
            ] })
          ] })
        ] })
      }
    ),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddGRNDialog,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        onSubmit: handleAddGRN,
        isPending: addGRN.isPending
      }
    ),
    detailGRN && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GRNDetailDialog,
      {
        grn: detailGRN,
        onClose: () => setDetailGRN(null),
        onApprove: (id) => handleQCUpdate(id, "approved"),
        onReject: (id) => handleQCUpdate(id, "rejected"),
        isPending: updateQC.isPending
      }
    )
  ] });
}
export {
  InwardPage as default
};
