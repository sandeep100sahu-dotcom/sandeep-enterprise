import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, k as useComposedRefs, l as composeEventHandlers, m as createSlottable, n as createContextScope, i as cn, o as buttonVariants, p as useAppStore, f as useItems, q as useCategories, s as useLowStockItems, t as useDeactivateItem, T as TriangleAlert, B as Button, v as Search, I as Input, X, w as Select, x as SelectTrigger, y as SelectValue, z as SelectContent, D as SelectItem, E as TableSkeleton, g as Package, F as ChevronRight, G as ue, h as Badge, H as useAddItem, J as useUpdateItem, K as Label } from "./index-B0qZHuNS.js";
import { E as ErrorState } from "./ErrorBoundary-Gphkjqh3.js";
import { R as Root, W as WarningProvider, C as Content, T as Title, D as Description, a as Close, c as createDialogScope, P as Portal, O as Overlay, b as Trigger, d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle, i as DialogFooter } from "./dialog-C13pSRLy.js";
import { S as Separator } from "./separator-BQN91TkL.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-CS9BgOPc.js";
import { A as ArrowUpDown, T as Textarea } from "./textarea-DPuVSgF5.js";
import { a as useItemLedger } from "./use-inventory-C9j3WEcF.js";
import { F as Funnel } from "./funnel-C_qsXYUg.js";
import { T as TrendingDown } from "./trending-down-E6I0CFjn.js";
import { T as Tag, P as Pen } from "./tag-ByJfKoQ9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "m21 8-4-4-4 4", key: "1c9v7m" }],
  ["path", { d: "M17 4v16", key: "7dpous" }]
];
const ArrowDownUp = createLucideIcon("arrow-down-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode$1);
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
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const EMPTY_FORM = {
  code: "",
  name: "",
  category: "",
  subcategory: "",
  description: "",
  unit: "PCS",
  brand: "",
  size: "",
  rackLocation: "",
  minimumStock: 10,
  preferredSupplier: "",
  gstHsn: "",
  photo: "",
  isActive: true
};
const UNITS = [
  "PCS",
  "SET",
  "KG",
  "MTR",
  "LTR",
  "CAN",
  "BOX",
  "PKT",
  "NOS",
  "PAIR"
];
function StockBadge({ stock, min }) {
  if (stock === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-[10px] h-5 px-1.5", children: "OUT" });
  if (stock < min)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded alert-red", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
      "LOW"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded alert-green", children: "OK" });
}
function validateForm(form) {
  const errors = {};
  if (!form.code.trim()) errors.code = "Item Code is required";
  if (!form.name.trim()) errors.name = "Item Name is required";
  if (Number.isNaN(Number(form.minimumStock)) || Number(form.minimumStock) < 0)
    errors.minimumStock = "Must be a valid number";
  return errors;
}
function generateCode(category, index) {
  const prefix = category ? category.slice(0, 3).toUpperCase() : "ITM";
  return `${prefix}-${String(index).padStart(4, "0")}`;
}
function ItemFormModal({
  open,
  onClose,
  editItem,
  categories,
  itemCount
}) {
  var _a;
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [autoCode, setAutoCode] = reactExports.useState(true);
  const [photoPreview, setPhotoPreview] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const subcategories = ((_a = categories.find((c) => c.name === form.category)) == null ? void 0 : _a.subcategories) ?? [];
  reactExports.useEffect(() => {
    if (editItem) {
      const {
        id: _id,
        currentStock: _cs,
        lastPurchaseRate: _lpr,
        ...rest
      } = editItem;
      setForm(rest);
      setPhotoPreview(editItem.photo || "");
      setAutoCode(false);
    } else {
      setForm(EMPTY_FORM);
      setPhotoPreview("");
      setAutoCode(true);
    }
    setErrors({});
  }, [editItem]);
  reactExports.useEffect(() => {
    if (autoCode && !editItem) {
      setForm((f) => ({
        ...f,
        code: generateCode(f.category, itemCount + 1)
      }));
    }
  }, [autoCode, itemCount, editItem]);
  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) {
      setErrors((e) => ({ ...e, [k]: void 0 }));
    }
  };
  const handlePhoto = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a3;
      const result = (_a3 = ev.target) == null ? void 0 : _a3.result;
      setPhotoPreview(result);
      setField("photo", result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (editItem) {
      await updateItem.mutateAsync({ ...editItem, ...form });
      ue.success("Item updated successfully");
    } else {
      await addItem.mutateAsync(form);
      ue.success(`Item "${form.name}" added successfully`);
    }
    onClose();
  };
  const isPending = addItem.isPending || updateItem.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[92vh] overflow-y-auto",
      "data-ocid": "items.form.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: editItem ? "Edit Item" : "Add New Item" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Item Code *" }),
                !editItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAutoCode((v) => !v),
                    className: cn(
                      "text-[10px] px-2 py-0.5 rounded-full border transition-colors",
                      autoCode ? "bg-primary/10 border-primary/30 text-primary" : "border-border text-muted-foreground"
                    ),
                    "data-ocid": "items.form.auto_code.toggle",
                    children: autoCode ? "Auto" : "Manual"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.code,
                  onChange: (e) => !autoCode && setField("code", e.target.value),
                  placeholder: "e.g. BRG-0148",
                  readOnly: autoCode && !editItem,
                  className: cn(
                    "font-mono text-sm",
                    autoCode && !editItem && "bg-muted/40 text-muted-foreground",
                    errors.code && "border-destructive"
                  ),
                  "data-ocid": "items.form.code.input"
                }
              ),
              errors.code && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] text-destructive",
                  "data-ocid": "items.form.code.field_error",
                  children: errors.code
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Item Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.name,
                  onChange: (e) => setField("name", e.target.value),
                  placeholder: "Full item name",
                  className: cn(errors.name && "border-destructive"),
                  "data-ocid": "items.form.name.input"
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] text-destructive",
                  "data-ocid": "items.form.name.field_error",
                  children: errors.name
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.category,
                  onValueChange: (v) => {
                    setField("category", v);
                    setField("subcategory", "");
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "items.form.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.name, children: c.name }, c.id)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Subcategory" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.subcategory,
                  onValueChange: (v) => setField("subcategory", v),
                  disabled: subcategories.length === 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "items.form.subcategory.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectValue,
                      {
                        placeholder: subcategories.length === 0 ? "Select category first" : "Select subcategory"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: subcategories.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.brand,
                  onChange: (e) => setField("brand", e.target.value),
                  placeholder: "Brand name",
                  "data-ocid": "items.form.brand.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Unit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.unit,
                  onValueChange: (v) => setField("unit", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "items.form.unit.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Size / Specification" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.size,
                  onChange: (e) => setField("size", e.target.value),
                  placeholder: "e.g. 25x52x15mm",
                  "data-ocid": "items.form.size.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Rack Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.rackLocation,
                  onChange: (e) => setField("rackLocation", e.target.value),
                  placeholder: "e.g. A-01-03",
                  "data-ocid": "items.form.rack.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Minimum Stock *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: form.minimumStock,
                  onChange: (e) => setField("minimumStock", Number(e.target.value)),
                  className: cn(errors.minimumStock && "border-destructive"),
                  "data-ocid": "items.form.minstock.input"
                }
              ),
              errors.minimumStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] text-destructive",
                  "data-ocid": "items.form.minstock.field_error",
                  children: errors.minimumStock
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "GST / HSN Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.gstHsn,
                  onChange: (e) => setField("gstHsn", e.target.value),
                  placeholder: "e.g. 84821011",
                  "data-ocid": "items.form.hsn.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Preferred Supplier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.preferredSupplier,
                onChange: (e) => setField("preferredSupplier", e.target.value),
                placeholder: "Supplier name",
                "data-ocid": "items.form.supplier.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Full Technical Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: form.description,
                onChange: (e) => setField("description", e.target.value),
                placeholder: "Detailed specifications, part numbers, compatibility notes…",
                rows: 3,
                className: "text-sm resize-none",
                "data-ocid": "items.form.description.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Item Photo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-20 h-20 rounded-md border-2 border-dashed border-border flex items-center justify-center bg-muted/30 shrink-0 overflow-hidden",
                    photoPreview && "border-primary/40"
                  ),
                  children: photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: photoPreview,
                      alt: "Preview",
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-muted-foreground/40" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      var _a2;
                      return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                    },
                    "data-ocid": "items.form.photo.upload_button",
                    children: photoPreview ? "Change Photo" : "Upload Photo"
                  }
                ),
                photoPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "text-destructive hover:text-destructive h-7",
                    onClick: () => {
                      setPhotoPreview("");
                      setField("photo", "");
                    },
                    "data-ocid": "items.form.photo.remove_button",
                    children: "Remove"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "JPG, PNG up to 2MB" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handlePhoto
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "items.form.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isPending,
                "data-ocid": "items.form.submit_button",
                children: isPending ? editItem ? "Saving…" : "Adding…" : editItem ? "Save Changes" : "Add Item"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function ItemDetailPanel({
  item,
  onClose,
  onEdit,
  onDeactivate
}) {
  const { data: ledger } = useItemLedger(item.id);
  const stockStatus = item.currentStock === 0 ? "critical" : item.currentStock < item.minimumStock ? "low" : "ok";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "items.detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pr-6", children: [
          item.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.photo,
              alt: item.name,
              className: "w-14 h-14 rounded-md object-cover border border-border shrink-0"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-md bg-muted/40 border border-border flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-6 h-6 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-base leading-snug", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-primary mt-0.5", children: item.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: item.isActive ? "secondary" : "outline",
                  className: "text-[10px] h-4",
                  children: item.isActive ? "Active" : "Inactive"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { stock: item.currentStock, min: item.minimumStock })
            ] })
          ] })
        ] }) }),
        stockStatus !== "ok" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "rounded-md px-3 py-2 flex items-center gap-2",
              stockStatus === "critical" ? "alert-red" : "alert-amber"
            ),
            "data-ocid": "items.detail.stock_alert",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: stockStatus === "critical" ? "Stock is ZERO — immediate reorder required." : "Stock below minimum level — reorder recommended." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          {
            label: "Current Stock",
            value: String(item.currentStock),
            unit: item.unit,
            highlight: stockStatus !== "ok"
          },
          {
            label: "Min Stock",
            value: String(item.minimumStock),
            unit: item.unit
          },
          {
            label: "Last Rate",
            value: `₹${item.lastPurchaseRate.toLocaleString()}`,
            unit: `/${item.unit}`
          }
        ].map(({ label, value, unit, highlight }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "rounded-md p-2.5 text-center",
              highlight ? "bg-destructive/10 border border-destructive/20" : "bg-muted/30"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: cn(
                    "font-bold text-sm font-mono",
                    highlight && "text-destructive"
                  ),
                  children: value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: unit })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Specifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
            { label: "Category", value: item.category },
            { label: "Subcategory", value: item.subcategory },
            { label: "Brand", value: item.brand },
            { label: "Size", value: item.size },
            { label: "Rack Location", value: item.rackLocation },
            { label: "GST / HSN", value: item.gstHsn }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-sm px-2.5 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium mt-0.5 truncate", children: value || "—" })
          ] }, label)) }),
          item.preferredSupplier && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-sm px-2.5 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Preferred Supplier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium mt-0.5", children: item.preferredSupplier })
          ] }),
          item.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-sm px-2.5 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1", children: "Technical Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed", children: item.description })
          ] })
        ] }),
        ledger && ledger.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Recent Transactions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-md overflow-hidden", children: ledger.slice(0, 4).map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-3 py-2 text-xs border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "inline-block w-1.5 h-1.5 rounded-full shrink-0",
                        tx.transactionType === "inward" ? "bg-green-500" : "bg-destructive"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground truncate", children: tx.refId })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: cn(
                        "font-mono font-semibold",
                        tx.qty > 0 ? "text-green-600 dark:text-green-400" : "text-destructive"
                      ),
                      children: [
                        tx.qty > 0 ? "+" : "",
                        tx.qty
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-mono", children: [
                    "= ",
                    tx.balanceAfter
                  ] })
                ] })
              ]
            },
            tx.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          item.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              size: "sm",
              onClick: () => onDeactivate(item),
              "data-ocid": "items.detail.deactivate_button",
              children: "Deactivate"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => onEdit(item),
              "data-ocid": "items.detail.edit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              "data-ocid": "items.detail.close_button",
              children: "Close"
            }
          )
        ] })
      ]
    }
  ) });
}
function ItemsPage() {
  const { globalSearchQuery } = useAppStore();
  const [localSearch, setLocalSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sortField, setSortField] = reactExports.useState("code");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [formOpen, setFormOpen] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [detailItem, setDetailItem] = reactExports.useState(null);
  const [confirmDeactivate, setConfirmDeactivate] = reactExports.useState(
    null
  );
  const search = localSearch || globalSearchQuery;
  const { data: items, isLoading, error } = useItems(search);
  const { data: categories } = useCategories();
  const { data: lowStockItems } = useLowStockItems();
  const deactivateItem = useDeactivateItem();
  const handleEditFromDetail = (item) => {
    setDetailItem(null);
    setEditItem(item);
    setFormOpen(true);
  };
  const handleDeactivateConfirm = async () => {
    if (!confirmDeactivate) return;
    await deactivateItem.mutateAsync(confirmDeactivate.id);
    ue.success(`"${confirmDeactivate.name}" deactivated`);
    setConfirmDeactivate(null);
    setDetailItem(null);
  };
  const filtered = (items ?? []).filter((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter)
      return false;
    if (statusFilter === "active" && !item.isActive) return false;
    if (statusFilter === "inactive" && item.isActive) return false;
    if (statusFilter === "low" && item.currentStock >= item.minimumStock)
      return false;
    return true;
  }).sort((a, b) => {
    let cmp = 0;
    if (sortField === "code") cmp = a.code.localeCompare(b.code);
    else if (sortField === "name") cmp = a.name.localeCompare(b.name);
    else if (sortField === "currentStock")
      cmp = a.currentStock - b.currentStock;
    else if (sortField === "lastPurchaseRate")
      cmp = a.lastPurchaseRate - b.lastPurchaseRate;
    return sortDir === "asc" ? cmp : -cmp;
  });
  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3 text-muted-foreground/50 inline ml-1" });
    return sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3 text-primary inline ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownUp, { className: "w-3 h-3 text-primary inline ml-1" });
  };
  if (error)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: "Failed to load items. Please try again." });
  const lowStockCount = (lowStockItems ?? []).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "items.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Item Master" }),
          lowStockCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStatusFilter("low"),
              className: "flex items-center gap-1.5 alert-amber rounded-full px-2.5 py-1 text-xs font-semibold hover:opacity-80 transition-opacity",
              "data-ocid": "items.low_stock.badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
                lowStockCount,
                " Low Stock"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          filtered.length,
          " of ",
          (items ?? []).length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => {
            setEditItem(null);
            setFormOpen(true);
          },
          className: "gap-2 shrink-0",
          "data-ocid": "items.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Item"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 flex-wrap items-center",
        "data-ocid": "items.filters.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-52", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by code, name, brand…",
                value: localSearch,
                onChange: (e) => setLocalSearch(e.target.value),
                className: "pl-8 h-8 text-sm",
                "data-ocid": "items.search.input"
              }
            ),
            localSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setLocalSearch(""),
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SelectTrigger,
              {
                className: "w-44 h-8 text-sm",
                "data-ocid": "items.category.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 mr-1.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
              (categories ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.name, children: c.name }, c.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tabs,
            {
              value: statusFilter,
              onValueChange: (v) => setStatusFilter(v),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "all",
                    className: "text-xs px-3 h-6",
                    "data-ocid": "items.filter.all.tab",
                    children: "All"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "active",
                    className: "text-xs px-3 h-6",
                    "data-ocid": "items.filter.active.tab",
                    children: "Active"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "inactive",
                    className: "text-xs px-3 h-6",
                    "data-ocid": "items.filter.inactive.tab",
                    children: "Inactive"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "low",
                    className: "text-xs px-3 h-6",
                    "data-ocid": "items.filter.low.tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3 mr-1" }),
                      "Low Stock"
                    ]
                  }
                )
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden", "data-ocid": "items.table", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 8, rows: 8 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4",
        "data-ocid": "items.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: search || categoryFilter !== "all" || statusFilter !== "all" ? "No items match your filters" : "No items yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search || categoryFilter !== "all" || statusFilter !== "all" ? "Try clearing your filters to see all items" : "Add your first item to get started" })
          ] }),
          !search && categoryFilter === "all" && statusFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setFormOpen(true),
              "data-ocid": "items.empty_state.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                "Add First Item"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 sticky top-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "th",
            {
              className: "text-left py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground",
              onClick: () => toggleSort("code"),
              onKeyDown: (e) => e.key === "Enter" && toggleSort("code"),
              children: [
                "Code ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "code" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "th",
            {
              className: "text-left py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground",
              onClick: () => toggleSort("name"),
              onKeyDown: (e) => e.key === "Enter" && toggleSort("name"),
              children: [
                "Item Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "name" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell whitespace-nowrap", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell whitespace-nowrap", children: "Unit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden xl:table-cell whitespace-nowrap", children: "Brand" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "th",
            {
              className: "text-right py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground",
              onClick: () => toggleSort("currentStock"),
              onKeyDown: (e) => e.key === "Enter" && toggleSort("currentStock"),
              children: [
                "Stock ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "currentStock" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell whitespace-nowrap", children: "Min" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "th",
            {
              className: "text-right py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none hidden lg:table-cell whitespace-nowrap hover:text-foreground",
              onClick: () => toggleSort("lastPurchaseRate"),
              onKeyDown: (e) => e.key === "Enter" && toggleSort("lastPurchaseRate"),
              children: [
                "Last Rate ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "lastPurchaseRate" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-muted-foreground font-medium text-center whitespace-nowrap", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 w-7" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((item, i) => {
          const isLow = item.currentStock < item.minimumStock;
          const isOut = item.currentStock === 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              tabIndex: 0,
              className: cn(
                "border-b border-border/40 hover:bg-muted/30 cursor-pointer transition-colors",
                isOut && "bg-destructive/5",
                isLow && !isOut && "bg-accent/5",
                !item.isActive && "opacity-60"
              ),
              onClick: () => setDetailItem(item),
              onKeyDown: (e) => e.key === "Enter" && setDetailItem(item),
              "data-ocid": `items.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-primary font-semibold whitespace-nowrap", children: item.code }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 max-w-[200px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground truncate", children: [
                    item.size && `${item.size} · `,
                    item.rackLocation
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 hidden md:table-cell text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.category }),
                  item.subcategory && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70", children: item.subcategory })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden lg:table-cell text-muted-foreground", children: item.unit }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden xl:table-cell text-muted-foreground", children: item.brand || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: cn(
                      "py-2.5 px-3 text-right font-mono font-bold",
                      isOut ? "text-destructive" : isLow ? "text-accent" : "text-foreground"
                    ),
                    children: item.currentStock
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono text-muted-foreground hidden sm:table-cell", children: item.minimumStock }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono text-muted-foreground hidden lg:table-cell", children: item.lastPurchaseRate > 0 ? `₹${item.lastPurchaseRate.toLocaleString()}` : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StockBadge,
                  {
                    stock: item.currentStock,
                    min: item.minimumStock
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground/50" }) })
              ]
            },
            item.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/50 px-3 py-2 flex items-center justify-between bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
          "Showing ",
          filtered.length,
          " items",
          filtered.length !== (items ?? []).length && ` (filtered from ${(items ?? []).length})`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-destructive inline-block" }),
            "Out of Stock"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent inline-block" }),
            "Below Minimum"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
            "Click row to view details"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemFormModal,
      {
        open: formOpen,
        onClose: () => {
          setFormOpen(false);
          setEditItem(null);
        },
        editItem,
        categories: categories ?? [],
        itemCount: (items ?? []).length
      }
    ),
    detailItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemDetailPanel,
      {
        item: detailItem,
        onClose: () => setDetailItem(null),
        onEdit: handleEditFromDetail,
        onDeactivate: (item) => setConfirmDeactivate(item)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!confirmDeactivate,
        onOpenChange: (o) => !o && setConfirmDeactivate(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "items.deactivate.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Deactivate Item?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to deactivate",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: confirmDeactivate == null ? void 0 : confirmDeactivate.name }),
              " ",
              "(",
              confirmDeactivate == null ? void 0 : confirmDeactivate.code,
              ")? The item will no longer appear in active inventory but its history will be preserved."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "items.deactivate.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeactivateConfirm,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "items.deactivate.confirm_button",
                children: "Deactivate"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ItemsPage as default
};
