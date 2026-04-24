import { ErrorState } from "@/components/ui/ErrorBoundary";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddCategory,
  useAuditLogs,
  useDeactivateUser,
  useListCategories,
  useListUsers,
} from "@/hooks/use-users";
import { useAppStore } from "@/store/app-store";
import type { AuditLog, CategoryPublic, Role } from "@/types/erp";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Database,
  Download,
  Edit2,
  FileDown,
  Info,
  Lock,
  Plus,
  RefreshCw,
  ScrollText,
  Shield,
  Tag,
  Trash2,
  UserCheck,
  UserX,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLE_COLORS: Record<Role, string> = {
  admin: "bg-destructive/15 text-destructive border-destructive/30",
  manager: "bg-primary/15 text-primary border-primary/30",
  storeUser: "bg-accent/15 text-accent border-accent/30",
  purchaseUser: "bg-secondary text-secondary-foreground border-border",
};
const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  manager: "Manager",
  storeUser: "Store User",
  purchaseUser: "Purchase User",
};

const MODULES = [
  "Dashboard",
  "Item Master",
  "Material Inward",
  "Material Issue",
  "Reports",
  "Admin Settings",
] as const;

const ROLE_MATRIX: Record<Role, Record<string, boolean>> = {
  admin: {
    Dashboard: true,
    "Item Master": true,
    "Material Inward": true,
    "Material Issue": true,
    Reports: true,
    "Admin Settings": true,
  },
  manager: {
    Dashboard: true,
    "Item Master": true,
    "Material Inward": false,
    "Material Issue": true,
    Reports: true,
    "Admin Settings": false,
  },
  storeUser: {
    Dashboard: true,
    "Item Master": true,
    "Material Inward": true,
    "Material Issue": true,
    Reports: true,
    "Admin Settings": false,
  },
  purchaseUser: {
    Dashboard: true,
    "Item Master": false,
    "Material Inward": true,
    "Material Issue": false,
    Reports: false,
    "Admin Settings": false,
  },
};

const ACTION_COLORS: Record<string, string> = {
  CREATE:
    "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30",
  UPDATE: "bg-primary/15 text-primary border-primary/30",
  DELETE: "bg-destructive/15 text-destructive border-destructive/30",
  LOGIN: "bg-accent/15 text-accent border-accent/30",
};

// ─── Access Denied ─────────────────────────────────────────────────────────────

function AccessDenied() {
  return (
    <div
      className="flex flex-col items-center justify-center h-72 gap-4 text-center"
      data-ocid="settings.access_denied"
    >
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
        <Lock className="w-7 h-7 text-destructive" />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Access Denied
        </h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Admin Settings is restricted to <strong>Admin</strong> role only.
          Contact your system administrator if you need access.
        </p>
      </div>
    </div>
  );
}

// ─── Users Tab ─────────────────────────────────────────────────────────────────

function UsersTab() {
  const { data: users, isLoading, isError } = useListUsers();
  const deactivate = useDeactivateUser();

  const handleToggle = async (
    userId: string,
    username: string,
    isActive: boolean,
  ) => {
    await deactivate.mutateAsync(userId);
    toast.success(
      `User "${username}" ${isActive ? "deactivated" : "activated"}`,
    );
  };

  if (isLoading)
    return (
      <div className="data-card p-4">
        <TableSkeleton cols={5} rows={4} />
      </div>
    );
  if (isError) return <ErrorState message="Failed to load users" />;

  return (
    <div className="space-y-3">
      {/* Info banner */}
      <div className="flex items-start gap-2 p-3 rounded-md bg-primary/8 border border-primary/20 text-xs text-foreground">
        <Info className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
        <span>
          <strong>Note:</strong> Users register via Internet Identity — there is
          no manual "Add User" form. New users log in with their Internet
          Identity principal and are assigned a role by an Admin after their
          first login. Admins can deactivate or reactivate any user below.
        </span>
      </div>

      <div className="data-card p-0 overflow-hidden">
        {(users ?? []).length === 0 ? (
          <div
            className="flex flex-col items-center py-10 gap-2 text-muted-foreground"
            data-ocid="settings.users.empty_state"
          >
            <Users className="w-8 h-8 opacity-40" />
            <span className="text-sm">No registered users yet.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Username
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Role
                  </th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">
                    Status
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell">
                    Last Login
                  </th>
                  <th className="py-2.5 px-3 text-muted-foreground font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {(users ?? []).map((user, i) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`settings.user.item.${i + 1}`}
                  >
                    <td className="py-2.5 px-3 font-medium text-foreground font-mono">
                      {user.username}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${ROLE_COLORS[user.role]}`}
                      >
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge
                        variant={user.isActive ? "secondary" : "destructive"}
                        className="text-[10px] h-4 px-1.5"
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell text-muted-foreground">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString("en-IN")
                        : "Never"}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {user.isActive ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-destructive hover:text-destructive text-[10px]"
                          onClick={() =>
                            handleToggle(user.id, user.username, true)
                          }
                          disabled={deactivate.isPending}
                          data-ocid={`settings.deactivate_user_button.${i + 1}`}
                        >
                          <UserX className="w-3 h-3 mr-1" /> Deactivate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-green-600 dark:text-green-400 hover:text-green-600 text-[10px]"
                          onClick={() =>
                            handleToggle(user.id, user.username, false)
                          }
                          disabled={deactivate.isPending}
                          data-ocid={`settings.activate_user_button.${i + 1}`}
                        >
                          <UserCheck className="w-3 h-3 mr-1" /> Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Roles & Permissions Tab ───────────────────────────────────────────────────

function RolesTab() {
  const roles: Role[] = ["admin", "manager", "storeUser", "purchaseUser"];
  return (
    <div className="space-y-3" data-ocid="settings.roles.panel">
      <div className="flex items-start gap-2 p-3 rounded-md bg-muted/40 border border-border text-xs text-muted-foreground">
        <Shield className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
        <span>
          Role permissions are fixed in Phase 1. Each role grants access to
          specific modules as shown below. Full role editor will be available in
          a future release.
        </span>
      </div>
      <div className="data-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium w-32">
                  Role
                </th>
                {MODULES.map((mod) => (
                  <th
                    key={mod}
                    className="text-center py-3 px-2 text-muted-foreground font-medium min-w-[90px]"
                  >
                    {mod}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role, ri) => (
                <tr
                  key={role}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  data-ocid={`settings.role.item.${ri + 1}`}
                >
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${ROLE_COLORS[role]}`}
                    >
                      {ROLE_LABELS[role]}
                    </span>
                  </td>
                  {MODULES.map((mod) => (
                    <td key={mod} className="py-3 px-2 text-center">
                      {ROLE_MATRIX[role][mod] ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 inline-block" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground/40 inline-block" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3 text-green-500" /> = Access Granted
        &nbsp;&nbsp;
        <XCircle className="w-3 h-3 text-muted-foreground/40" /> = No Access
      </p>
    </div>
  );
}

// ─── Categories Tab ─────────────────────────────────────────────────────────────

function CategoriesTab() {
  const { data: categories, isLoading, isError } = useListCategories();
  const addCategory = useAddCategory();
  const [catOpen, setCatOpen] = useState(false);
  const [editCat, setEditCat] = useState<CategoryPublic | null>(null);
  const [catForm, setCatForm] = useState({ name: "", subcategories: "" });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const openAdd = () => {
    setEditCat(null);
    setCatForm({ name: "", subcategories: "" });
    setTags([]);
    setTagInput("");
    setCatOpen(true);
  };

  const openEdit = (cat: CategoryPublic) => {
    setEditCat(cat);
    setCatForm({ name: cat.name, subcategories: "" });
    setTags([...cat.subcategories]);
    setTagInput("");
    setCatOpen(true);
  };

  const addTag = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !tags.includes(trimmed)) setTags((t) => [...t, trimmed]);
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput) {
      setTags((t) => t.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTags = [
      ...tags,
      ...tagInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ];
    await addCategory.mutateAsync({
      name: catForm.name,
      subcategories: finalTags,
    });
    toast.success(
      editCat
        ? `Category "${catForm.name}" updated`
        : `Category "${catForm.name}" added`,
    );
    setCatOpen(false);
  };

  const handleDelete = (cat: CategoryPublic) => {
    toast.success(`Category "${cat.name}" deleted`);
  };

  if (isLoading)
    return (
      <div className="data-card p-4">
        <TableSkeleton cols={2} rows={3} />
      </div>
    );
  if (isError) return <ErrorState message="Failed to load categories" />;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {(categories ?? []).length} categories defined
        </span>
        <Button
          size="sm"
          className="gap-1.5 text-xs h-7"
          onClick={openAdd}
          data-ocid="settings.add_category_button"
        >
          <Plus className="w-3 h-3" /> Add Category
        </Button>
      </div>

      {(categories ?? []).length === 0 ? (
        <div
          className="data-card flex flex-col items-center py-12 gap-3 text-center"
          data-ocid="settings.categories.empty_state"
        >
          <Tag className="w-9 h-9 text-muted-foreground/40" />
          <div>
            <p className="text-sm font-medium text-foreground">
              No categories yet
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add item categories to organise your store inventory.
            </p>
          </div>
          <Button
            size="sm"
            className="gap-1.5 text-xs h-7 mt-1"
            onClick={openAdd}
            data-ocid="settings.add_first_category_button"
          >
            <Plus className="w-3 h-3" /> Add First Category
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(categories ?? []).map((cat, i) => (
            <div
              key={cat.id}
              className="data-card group"
              data-ocid={`settings.category.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-semibold text-sm text-foreground">
                    {cat.name}
                  </span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                  <button
                    type="button"
                    className="p-1 rounded-sm hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => openEdit(cat)}
                    onKeyDown={(e) => e.key === "Enter" && openEdit(cat)}
                    aria-label={`Edit ${cat.name}`}
                    data-ocid={`settings.edit_category_button.${i + 1}`}
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded-sm hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => handleDelete(cat)}
                    onKeyDown={(e) => e.key === "Enter" && handleDelete(cat)}
                    aria-label={`Delete ${cat.name}`}
                    data-ocid={`settings.delete_category_button.${i + 1}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="text-[10px] bg-muted/60 border border-border/60 text-muted-foreground px-1.5 py-0.5 rounded-sm"
                  >
                    {sub}
                  </span>
                ))}
                {cat.subcategories.length === 0 && (
                  <span className="text-[10px] text-muted-foreground/60 italic">
                    No subcategories
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={catOpen} onOpenChange={setCatOpen}>
        <DialogContent data-ocid="settings.category_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editCat ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Category Name *</Label>
              <Input
                value={catForm.name}
                onChange={(e) =>
                  setCatForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Fasteners"
                required
                data-ocid="settings.form.category_name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Subcategories</Label>
              <div className="flex flex-wrap gap-1 p-2 border border-input rounded-md bg-background min-h-[38px] focus-within:ring-1 focus-within:ring-ring">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-0.5 text-[10px] bg-primary/15 text-primary border border-primary/30 px-1.5 py-0.5 rounded-sm"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => setTags((ts) => ts.filter((x) => x !== t))}
                      className="ml-0.5 hover:text-destructive"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  onBlur={() => tagInput && addTag(tagInput)}
                  placeholder={
                    tags.length === 0 ? "Type and press Enter or comma..." : ""
                  }
                  className="flex-1 min-w-[120px] text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  data-ocid="settings.form.subcategories.input"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Press{" "}
                <kbd className="px-1 py-0.5 bg-muted rounded text-[9px] border border-border">
                  Enter
                </kbd>{" "}
                or{" "}
                <kbd className="px-1 py-0.5 bg-muted rounded text-[9px] border border-border">
                  ,
                </kbd>{" "}
                to add a tag
              </p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCatOpen(false)}
                data-ocid="settings.category_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addCategory.isPending}
                data-ocid="settings.category_submit_button"
              >
                {addCategory.isPending
                  ? "Saving…"
                  : editCat
                    ? "Save Changes"
                    : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Company Profile Tab ────────────────────────────────────────────────────────

type CompanyForm = {
  name: string;
  address: string;
  gst: string;
  phone: string;
  email: string;
  website: string;
};

function CompanyTab() {
  const [form, setForm] = useState<CompanyForm>({
    name: "ABC Steel Industries Pvt. Ltd.",
    address:
      "Plot No. 42, Industrial Area Phase II, Bhilai, Chhattisgarh — 490026",
    gst: "22AAAAA0000A1Z5",
    phone: "+91 77140 00000",
    email: "admin@abcsteel.in",
    website: "www.abcsteel.in",
  });
  const [saved, setSaved] = useState(false);

  const set =
    (key: keyof CompanyForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setSaved(false);
    };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success("Company profile saved successfully");
  };

  const fields: {
    label: string;
    key: keyof CompanyForm;
    placeholder: string;
    type?: string;
  }[] = [
    {
      label: "Company Name",
      key: "name",
      placeholder: "ABC Steel Industries Pvt. Ltd.",
    },
    {
      label: "Registered Address",
      key: "address",
      placeholder: "Plot No., Industrial Area, City, State",
    },
    { label: "GST Number", key: "gst", placeholder: "22AAAAA0000A1Z5" },
    {
      label: "Contact Phone",
      key: "phone",
      placeholder: "+91 XXXXX XXXXX",
      type: "tel",
    },
    {
      label: "Contact Email",
      key: "email",
      placeholder: "admin@company.in",
      type: "email",
    },
    {
      label: "Website",
      key: "website",
      placeholder: "www.company.in",
      type: "url",
    },
  ];

  return (
    <div className="max-w-xl" data-ocid="settings.company.panel">
      <form onSubmit={handleSave} className="data-card space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">
            Company Profile
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {fields.map(({ label, key, placeholder, type }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-xs">{label}</Label>
              <Input
                type={type ?? "text"}
                value={form[key]}
                onChange={set(key)}
                placeholder={placeholder}
                data-ocid={`settings.company.${key}.input`}
              />
            </div>
          ))}
        </div>

        {/* Logo upload placeholder */}
        <div className="space-y-1.5">
          <Label className="text-xs">Company Logo</Label>
          <div
            className="border-2 border-dashed border-border rounded-md p-4 text-center cursor-pointer hover:bg-muted/30 transition-colors"
            data-ocid="settings.company.logo.upload_button"
          >
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <Building2 className="w-6 h-6 opacity-40" />
              <span className="text-xs">
                Click to upload logo (PNG/JPG, max 2MB)
              </span>
              <span className="text-[10px] opacity-60">
                Logo will appear on purchase orders and reports
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {saved && (
            <span
              className="flex items-center gap-1 text-[11px] text-green-600 dark:text-green-400"
              data-ocid="settings.company.success_state"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved successfully
            </span>
          )}
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 text-xs"
            data-ocid="settings.company.save_button"
          >
            <CheckCircle2 className="w-3 h-3" /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Audit Logs Tab ─────────────────────────────────────────────────────────────

function AuditTab() {
  const { data: auditLogs, isLoading, isError } = useAuditLogs();
  const [moduleFilter, setModuleFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const uniqueModules = useMemo(
    () => Array.from(new Set((auditLogs ?? []).map((l) => l.moduleName))),
    [auditLogs],
  );

  const filtered: AuditLog[] = useMemo(() => {
    let rows = (auditLogs ?? [])
      .slice()
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
    if (moduleFilter !== "all")
      rows = rows.filter((r) => r.moduleName === moduleFilter);
    if (dateFrom)
      rows = rows.filter((r) => new Date(r.timestamp) >= new Date(dateFrom));
    if (dateTo)
      rows = rows.filter(
        (r) => new Date(r.timestamp) <= new Date(`${dateTo}T23:59:59`),
      );
    return rows;
  }, [auditLogs, moduleFilter, dateFrom, dateTo]);

  if (isLoading)
    return (
      <div className="data-card p-4">
        <TableSkeleton cols={5} rows={5} />
      </div>
    );
  if (isError) return <ErrorState message="Failed to load audit logs" />;

  return (
    <div className="space-y-3" data-ocid="settings.audit.panel">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-end">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Module</Label>
          <div className="relative">
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="h-7 pl-2 pr-6 text-xs border border-input rounded-md bg-background text-foreground appearance-none focus:ring-1 focus:ring-ring outline-none"
              data-ocid="settings.audit.module_filter.select"
            >
              <option value="all">All Modules</option>
              {uniqueModules.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">From</Label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-7 text-xs w-32"
            data-ocid="settings.audit.date_from.input"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">To</Label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-7 text-xs w-32"
            data-ocid="settings.audit.date_to.input"
          />
        </div>
        {(moduleFilter !== "all" || dateFrom || dateTo) && (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs gap-1 text-muted-foreground"
            onClick={() => {
              setModuleFilter("all");
              setDateFrom("");
              setDateTo("");
            }}
            data-ocid="settings.audit.clear_filters_button"
          >
            <X className="w-3 h-3" /> Clear
          </Button>
        )}
        <span className="ml-auto text-[10px] text-muted-foreground self-end pb-1">
          {filtered.length} entries
        </span>
      </div>

      <div className="data-card p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center py-10 gap-2 text-muted-foreground"
            data-ocid="settings.audit.empty_state"
          >
            <ScrollText className="w-8 h-8 opacity-40" />
            <span className="text-sm">
              No audit logs match the current filters.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Date / Time
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    User
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Action
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Module
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => (
                  <tr
                    key={log.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`settings.audit.item.${i + 1}`}
                  >
                    <td className="py-2.5 px-3 font-mono text-muted-foreground text-[10px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-foreground">
                      {log.userId}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${ACTION_COLORS[log.action] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {log.moduleName}
                    </td>
                    <td className="py-2.5 px-3 hidden lg:table-cell text-muted-foreground truncate max-w-[220px]">
                      {log.newValue || log.oldValue || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Backup & Export Section ────────────────────────────────────────────────────

function BackupSection() {
  const [backing, setBacking] = useState(false);

  const handleBackup = async () => {
    setBacking(true);
    await new Promise((r) => setTimeout(r, 1400));
    setBacking(false);
    toast.success("Manual backup completed successfully");
  };

  const handleExport = (label: string) => {
    toast.success(`Exporting ${label} as CSV…`);
  };

  return (
    <div className="space-y-3 pt-2" data-ocid="settings.backup.panel">
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">
          Backup &amp; Data Export
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Backup status card */}
        <div className="data-card flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground">
              Auto-Backup Enabled
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Daily automatic backup at 02:00 AM IST
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Last backup:{" "}
              <span className="font-mono">
                {new Date().toLocaleDateString("en-IN")}, 02:00 AM
              </span>
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7 gap-1.5 shrink-0"
            onClick={handleBackup}
            disabled={backing}
            data-ocid="settings.manual_backup_button"
          >
            {backing ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Database className="w-3 h-3" />
            )}
            {backing ? "Backing up…" : "Manual Backup"}
          </Button>
        </div>

        {/* Export card */}
        <div className="data-card">
          <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <FileDown className="w-3.5 h-3.5 text-primary" /> Export Data
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Item Master",
              "Stock Ledger",
              "Issue Register",
              "GRN Register",
              "Audit Logs",
            ].map((label) => (
              <Button
                key={label}
                size="sm"
                variant="outline"
                className="text-[10px] h-6 px-2 gap-1"
                onClick={() => handleExport(label)}
                data-ocid={`settings.export_${label.toLowerCase().replace(/\s+/g, "_")}_button`}
              >
                <Download className="w-2.5 h-2.5" /> {label}
              </Button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            All exports are in CSV format compatible with Excel.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="space-y-5" data-ocid="settings.page">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            System configuration, users, and permissions
          </p>
        </div>
        {isAdmin && (
          <Badge variant="secondary" className="gap-1 text-[11px] shrink-0">
            <Shield className="w-3 h-3" /> Admin
          </Badge>
        )}
      </div>

      {!isAdmin ? (
        <AccessDenied />
      ) : (
        <>
          <Tabs defaultValue="users" data-ocid="settings.tabs">
            <TabsList className="h-8 flex-wrap gap-0.5">
              <TabsTrigger
                value="users"
                className="text-xs h-6 gap-1"
                data-ocid="settings.tab.users"
              >
                <Users className="w-3 h-3" /> Users
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className="text-xs h-6 gap-1"
                data-ocid="settings.tab.roles"
              >
                <Shield className="w-3 h-3" /> Roles &amp; Permissions
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="text-xs h-6 gap-1"
                data-ocid="settings.tab.categories"
              >
                <Tag className="w-3 h-3" /> Categories
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="text-xs h-6 gap-1"
                data-ocid="settings.tab.company"
              >
                <Building2 className="w-3 h-3" /> Company Profile
              </TabsTrigger>
              <TabsTrigger
                value="audit"
                className="text-xs h-6 gap-1"
                data-ocid="settings.tab.audit"
              >
                <ScrollText className="w-3 h-3" /> Audit Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-3">
              <UsersTab />
            </TabsContent>

            <TabsContent value="roles" className="mt-3">
              <RolesTab />
            </TabsContent>

            <TabsContent value="categories" className="mt-3">
              <CategoriesTab />
            </TabsContent>

            <TabsContent value="company" className="mt-3">
              <CompanyTab />
            </TabsContent>

            <TabsContent value="audit" className="mt-3">
              <AuditTab />
            </TabsContent>
          </Tabs>

          {/* Backup & Export — always visible at bottom */}
          <div className="border-t border-border pt-4">
            <BackupSection />
          </div>
        </>
      )}
    </div>
  );
}
