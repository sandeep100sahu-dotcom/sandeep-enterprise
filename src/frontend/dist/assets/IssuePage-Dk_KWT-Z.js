import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, T as TriangleAlert, B as Button, E as TableSkeleton, P as PackageOpen, M as ChevronDown, N as ChevronUp, h as Badge, i as cn, w as Select, x as SelectTrigger, y as SelectValue, z as SelectContent, D as SelectItem, I as Input, X, f as useItems, K as Label, G as ue } from "./index-B0qZHuNS.js";
import { d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle, i as DialogFooter } from "./dialog-C13pSRLy.js";
import { S as Separator } from "./separator-BQN91TkL.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-CS9BgOPc.js";
import { A as ArrowUpDown, T as Textarea } from "./textarea-DPuVSgF5.js";
import { u as useIssues, e as useAddIssue } from "./use-inventory-C9j3WEcF.js";
import { C as CircleCheck, I as Info } from "./info-Dk1C8fc1.js";
import { C as Clock } from "./clock-DH_XNXHT.js";
import { T as Trash2 } from "./trash-2-B8n47Ivl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const DEPARTMENTS = [
  "Production",
  "Maintenance",
  "Quality",
  "Electrical",
  "Mechanical",
  "Administration",
  "Others"
];
const ISSUE_TYPE_META = {
  normal: {
    label: "Normal",
    badgeClass: "bg-primary/15 text-primary border-primary/30 border",
    rowClass: "",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3" })
  },
  emergencyBreakdown: {
    label: "Emergency Breakdown",
    badgeClass: "bg-destructive/15 text-destructive border-destructive/30 border font-semibold",
    rowClass: "bg-accent/8",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" })
  },
  directConsumable: {
    label: "Direct Consumable",
    badgeClass: "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30",
    rowClass: "",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
  }
};
function IssueBadge({ type }) {
  const meta = ISSUE_TYPE_META[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap",
        meta.badgeClass
      ),
      children: [
        meta.icon,
        meta.label
      ]
    }
  );
}
function StatusBadge({ status }) {
  if (status === "completed")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      " Completed"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] text-accent font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    " Pending"
  ] });
}
function IssueDetailDialog({
  issue,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "issue.detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: issue.issueSlipNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IssueBadge, { type: issue.issueType })
        ] }) }),
        issue.issueType === "emergencyBreakdown" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-red rounded-md px-3 py-2 text-xs flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Emergency Breakdown — This issue was created under an emergency situation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-6 gap-y-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", value: issue.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Department", value: issue.department }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Machine / Equipment", value: issue.machineName || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: issue.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Requested By", value: issue.requestedBy }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Issued By", value: issue.issuedBy }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Purpose", value: issue.purpose || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 text-muted-foreground", children: [
            "Created: ",
            new Date(issue.createdAt).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2", children: [
            "Items Issued (",
            issue.items.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 text-muted-foreground font-medium", children: "#" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 text-muted-foreground font-medium", children: "Item Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 text-muted-foreground font-medium", children: "Item Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 text-muted-foreground font-medium", children: "Qty" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: issue.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono text-primary", children: item.itemCode }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-foreground", children: item.itemName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-right font-semibold", children: item.qty })
                ]
              },
              `${item.itemId}-${i}`
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: onClose,
            "data-ocid": "issue.detail.close_button",
            children: "Close"
          }
        ) })
      ]
    }
  ) });
}
function Field({
  label,
  value,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] uppercase tracking-wide mb-0.5", children: label }),
    children ?? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: value })
  ] });
}
function IssueLineRow({
  line,
  idx,
  items,
  onChange,
  onRemove
}) {
  var _a;
  const [search, setSearch] = reactExports.useState("");
  const filtered = search ? items.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase())
  ) : items;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/20 rounded-md border border-border/60 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: [
        "Item ",
        idx + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onRemove,
          className: "text-muted-foreground hover:text-destructive transition-smooth p-0.5 rounded",
          "aria-label": "Remove item",
          "data-ocid": `issue.form.remove_line.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-7 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Item Code / Name" }),
        line.itemId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 h-8 px-2 bg-card border border-border rounded-sm text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary shrink-0", children: line.itemCode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate flex-1", children: line.itemName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onChange("itemId", ""),
              className: "shrink-0 text-muted-foreground hover:text-foreground",
              "aria-label": "Clear item",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-xs pr-6",
              placeholder: "Search item…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              "data-ocid": `issue.form.item.search.${idx + 1}`
            }
          ),
          search && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-50 left-0 top-full mt-1 w-full max-h-44 overflow-y-auto bg-popover border border-border rounded-md shadow-lg", children: filtered.slice(0, 8).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors flex items-center justify-between gap-2",
              onClick: () => {
                onChange("itemId", item.id);
                setSearch("");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary mr-2", children: item.code }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: item.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-muted-foreground text-[10px]", children: [
                  item.currentStock,
                  " ",
                  item.unit
                ] })
              ]
            },
            item.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: line.qty,
            onChange: (e) => onChange("qty", Number(e.target.value)),
            min: 1,
            className: "h-8 text-xs",
            "data-ocid": `issue.form.qty.input.${idx + 1}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Unit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 flex items-center px-2 bg-muted/40 rounded text-xs text-muted-foreground border border-border/50", children: ((_a = items.find((i) => i.id === line.itemId)) == null ? void 0 : _a.unit) ?? "—" })
      ] })
    ] }),
    line.stockWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "alert-red rounded px-2 py-1.5 text-[11px] flex items-center gap-1.5",
        "data-ocid": `issue.form.stock_warning.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
          line.stockWarning
        ]
      }
    )
  ] });
}
function generateSlipNo() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const seq = String(Math.floor(Math.random() * 9e3) + 1e3);
  return `ISS-${year}${seq}`;
}
function CreateIssueDialog({
  open,
  onClose
}) {
  const { data: allItems } = useItems();
  const addIssue = useAddIssue();
  const [form, setForm] = reactExports.useState({
    issueSlipNo: generateSlipNo(),
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    department: "",
    machineName: "",
    issueType: "normal",
    requestedBy: "",
    issuedBy: "",
    purpose: "",
    otherDepartment: ""
  });
  const [lineItems, setLineItems] = reactExports.useState([
    { itemId: "", itemCode: "", itemName: "", qty: 1 }
  ]);
  const itemsForSearch = reactExports.useMemo(
    () => (allItems ?? []).map((i) => ({
      id: i.id,
      code: i.code,
      name: i.name,
      currentStock: i.currentStock,
      unit: i.unit
    })),
    [allItems]
  );
  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const updateLine = (idx, field, val) => {
    setLineItems((prev) => {
      const updated = [...prev];
      const line = { ...updated[idx], [field]: val };
      if (field === "itemId") {
        const item = (allItems ?? []).find((i) => i.id === String(val));
        if (item) {
          line.itemCode = item.code;
          line.itemName = item.name;
          line.stockWarning = line.qty > item.currentStock ? `Insufficient stock: only ${item.currentStock} ${item.unit} available` : void 0;
        } else {
          line.itemCode = "";
          line.itemName = "";
          line.stockWarning = void 0;
        }
      }
      if (field === "qty") {
        const item = (allItems ?? []).find((i) => i.id === line.itemId);
        if (item) {
          line.stockWarning = Number(val) > item.currentStock ? `Insufficient stock: only ${item.currentStock} ${item.unit} available` : void 0;
        }
      }
      updated[idx] = line;
      return updated;
    });
  };
  const addLine = () => setLineItems((l) => [
    ...l,
    { itemId: "", itemCode: "", itemName: "", qty: 1 }
  ]);
  const removeLine = (idx) => setLineItems((l) => l.filter((_, j) => j !== idx));
  const hasWarnings = lineItems.some((l) => !!l.stockWarning);
  const resolvedDepartment = form.department === "Others" ? form.otherDepartment : form.department;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasWarnings) {
      ue.warning(
        "Issuing with insufficient stock — proceeding with override"
      );
    }
    const cleanItems = lineItems.filter((l) => l.itemId).map(({ stockWarning: _w, ...rest }) => rest);
    if (cleanItems.length === 0) {
      ue.error("Add at least one item to issue");
      return;
    }
    await addIssue.mutateAsync({
      issueSlipNo: form.issueSlipNo,
      date: form.date,
      department: resolvedDepartment || form.department,
      machineName: form.machineName,
      issueType: form.issueType,
      requestedBy: form.requestedBy,
      issuedBy: form.issuedBy,
      purpose: form.purpose,
      items: cleanItems
    });
    ue.success(`Issue slip ${form.issueSlipNo} created`);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[92vh] overflow-y-auto",
      "data-ocid": "issue.add.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: "New Material Issue Slip" }) }),
        form.issueType === "emergencyBreakdown" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "alert-red rounded-md px-3 py-2.5 flex items-center gap-2 text-xs font-medium",
            "data-ocid": "issue.form.emergency_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Emergency Breakdown Issue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-normal opacity-80", children: "This issue will be flagged as critical in machine history." })
              ] })
            ]
          }
        ),
        form.issueType === "directConsumable" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "alert-green rounded-md px-3 py-2.5 flex items-center gap-2 text-xs",
            "data-ocid": "issue.form.consumable_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Direct Consumable Issue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-normal opacity-80", children: "Items will be charged directly to department consumption." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Issue Slip No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.issueSlipNo,
                  onChange: (e) => setField("issueSlipNo", e.target.value),
                  required: true,
                  className: "font-mono h-8 text-xs",
                  "data-ocid": "issue.form.slip_no.input"
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
                  onChange: (e) => setField("date", e.target.value),
                  required: true,
                  className: "h-8 text-xs",
                  "data-ocid": "issue.form.date.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Issue Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.issueType,
                  onValueChange: (v) => setField("issueType", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 text-xs",
                        "data-ocid": "issue.form.type.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "normal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 text-primary" }),
                        "Normal"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "emergencyBreakdown", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-destructive" }),
                        "Emergency Breakdown"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "directConsumable", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-green-600" }),
                        "Direct Consumable"
                      ] }) })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Department" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.department,
                  onValueChange: (v) => setField("department", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 text-xs",
                        "data-ocid": "issue.form.dept.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select department" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                  ]
                }
              )
            ] }),
            form.department === "Others" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Specify Department" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.otherDepartment,
                  onChange: (e) => setField("otherDepartment", e.target.value),
                  placeholder: "Enter department name",
                  className: "h-8 text-xs",
                  required: true,
                  "data-ocid": "issue.form.other_dept.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Machine / Equipment Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.machineName,
                  onChange: (e) => setField("machineName", e.target.value),
                  placeholder: "e.g. Shearing Machine SHR-01 (optional)",
                  className: "h-8 text-xs",
                  "data-ocid": "issue.form.machine.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Purpose" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: form.purpose,
                  onChange: (e) => setField("purpose", e.target.value),
                  placeholder: "Reason / purpose of this issue…",
                  rows: 2,
                  className: "text-xs resize-none",
                  "data-ocid": "issue.form.purpose.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Requested By" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.requestedBy,
                  onChange: (e) => setField("requestedBy", e.target.value),
                  placeholder: "Operator / engineer name",
                  required: true,
                  className: "h-8 text-xs",
                  "data-ocid": "issue.form.requested_by.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Issued By" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.issuedBy,
                  onChange: (e) => setField("issuedBy", e.target.value),
                  placeholder: "Store person name",
                  required: true,
                  className: "h-8 text-xs",
                  "data-ocid": "issue.form.issued_by.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold", children: [
                "Items to Issue",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                  "(",
                  lineItems.length,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "h-6 text-xs px-2 gap-1",
                  onClick: addLine,
                  "data-ocid": "issue.form.add_line_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    " Add Item"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "issue.form.line_items", children: lineItems.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              IssueLineRow,
              {
                line,
                idx,
                items: itemsForSearch,
                onChange: (field, val) => updateLine(idx, field, val),
                onRemove: () => removeLine(idx)
              },
              `line-${line.itemId || idx}`
            )) }),
            hasWarnings && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-2 alert-amber rounded px-3 py-2 text-[11px] flex items-center gap-1.5",
                "data-ocid": "issue.form.override_warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                  "Stock warning active — submission allowed with override. Verify quantities before proceeding."
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "issue.add.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: addIssue.isPending,
                className: cn(
                  form.issueType === "emergencyBreakdown" && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                ),
                "data-ocid": "issue.add.submit_button",
                children: addIssue.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }),
                  "Saving…"
                ] }) : "Create Issue Slip"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function FiltersBar({
  filterType,
  setFilterType,
  filterDept,
  setFilterDept,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: filterType,
        onValueChange: (v) => setFilterType(v),
        "data-ocid": "issue.filter_tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "all",
              className: "text-[11px] h-5 px-2.5",
              "data-ocid": "issue.filter.all.tab",
              children: "All"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "normal",
              className: "text-[11px] h-5 px-2.5",
              "data-ocid": "issue.filter.normal.tab",
              children: "Normal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "emergencyBreakdown",
              className: "text-[11px] h-5 px-2",
              "data-ocid": "issue.filter.emergency.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-2.5 h-2.5 mr-1" }),
                "Emergency"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "directConsumable",
              className: "text-[11px] h-5 px-2",
              "data-ocid": "issue.filter.consumable.tab",
              children: "Consumable"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterDept, onValueChange: setFilterDept, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectTrigger,
        {
          className: "h-7 text-xs w-[150px]",
          "data-ocid": "issue.filter.dept.select",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All departments" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All departments" }),
        DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: dateFrom,
          onChange: (e) => setDateFrom(e.target.value),
          className: "h-7 text-xs w-[120px]",
          "data-ocid": "issue.filter.date_from.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "–" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: dateTo,
          onChange: (e) => setDateTo(e.target.value),
          className: "h-7 text-xs w-[120px]",
          "data-ocid": "issue.filter.date_to.input"
        }
      )
    ] }),
    (filterType !== "all" || filterDept !== "all" || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          setFilterType("all");
          setFilterDept("all");
          setDateFrom("");
          setDateTo("");
        },
        className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth",
        "data-ocid": "issue.filter.clear_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
          " Clear"
        ]
      }
    )
  ] });
}
function IssuePage() {
  const { data: issues, isLoading } = useIssues();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [detailIssue, setDetailIssue] = reactExports.useState(null);
  const [filterType, setFilterType] = reactExports.useState("all");
  const [filterDept, setFilterDept] = reactExports.useState("all");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const filtered = reactExports.useMemo(() => {
    let list = issues ?? [];
    if (filterType !== "all")
      list = list.filter((i) => i.issueType === filterType);
    if (filterDept !== "all")
      list = list.filter((i) => i.department === filterDept);
    if (dateFrom) list = list.filter((i) => i.date >= dateFrom);
    if (dateTo) list = list.filter((i) => i.date <= dateTo);
    list = [...list].sort((a, b) => {
      const aEmergency = a.issueType === "emergencyBreakdown" ? 0 : 1;
      const bEmergency = b.issueType === "emergencyBreakdown" ? 0 : 1;
      if (aEmergency !== bEmergency) return aEmergency - bEmergency;
      return sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });
    return list;
  }, [issues, filterType, filterDept, dateFrom, dateTo, sortDir]);
  const emergencyCount = (issues ?? []).filter(
    (i) => i.issueType === "emergencyBreakdown"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "issue.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Material Issue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          (issues == null ? void 0 : issues.length) ?? 0,
          " total issue slips",
          emergencyCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 inline-flex items-center gap-1 text-destructive text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
            emergencyCount,
            " emergency"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setAddOpen(true),
          className: "gap-2 shrink-0",
          "data-ocid": "issue.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Issue Slip"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FiltersBar,
      {
        filterType,
        setFilterType,
        filterDept,
        setFilterDept,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden", "data-ocid": "issue.table", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 8, rows: 5 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-3",
        "data-ocid": "issue.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No material issues recorded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: filterType !== "all" || filterDept !== "all" || dateFrom || dateTo ? "Try clearing the filters" : "Create the first issue slip to get started" }),
          filterType === "all" && filterDept === "all" && !dateFrom && !dateTo && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setAddOpen(true),
              "data-ocid": "issue.empty_add_button",
              children: "Create Issue Slip"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium whitespace-nowrap", children: "Slip No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSortDir((d) => d === "desc" ? "asc" : "desc"),
            className: "flex items-center gap-1 hover:text-foreground transition-colors",
            "data-ocid": "issue.sort.date_button",
            children: [
              "Date",
              sortDir === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-2.5 h-2.5 opacity-40" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Department" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell", children: "Machine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Issue Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell", children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell", children: "Issued By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2.5 px-3 text-muted-foreground font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((issue, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          onClick: () => setDetailIssue(issue),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ")
              setDetailIssue(issue);
          },
          tabIndex: 0,
          className: cn(
            "border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer",
            issue.issueType === "emergencyBreakdown" && "bg-destructive/5 hover:bg-destructive/10"
          ),
          "data-ocid": `issue.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-primary font-medium whitespace-nowrap", children: issue.issueSlipNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap", children: issue.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-foreground font-medium", children: issue.department }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden md:table-cell text-muted-foreground truncate max-w-[140px]", children: issue.machineName || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IssueBadge, { type: issue.issueType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] px-1.5 py-0 font-mono",
                children: issue.items.length
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden lg:table-cell text-muted-foreground", children: issue.issuedBy }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: issue.status }) })
          ]
        },
        issue.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreateIssueDialog, { open: addOpen, onClose: () => setAddOpen(false) }),
    detailIssue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      IssueDetailDialog,
      {
        issue: detailIssue,
        onClose: () => setDetailIssue(null)
      }
    )
  ] });
}
export {
  IssuePage as default
};
