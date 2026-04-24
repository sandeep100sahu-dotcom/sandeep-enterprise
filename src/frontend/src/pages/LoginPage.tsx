import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store/app-store";
import type { Role } from "@/types/erp";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Eye, EyeOff, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";

const DEMO_USERS: Record<
  string,
  { password: string; role: Role; lastLogin: string }
> = {
  admin: {
    password: "admin123",
    role: "admin",
    lastLogin: "2025-04-24T07:30:00Z",
  },
  "store.user": {
    password: "store123",
    role: "storeUser",
    lastLogin: "2025-04-24T08:00:00Z",
  },
  "purchase.user": {
    password: "purchase123",
    role: "purchaseUser",
    lastLogin: "2025-04-23T15:45:00Z",
  },
  manager: {
    password: "manager123",
    role: "manager",
    lastLogin: "2025-04-24T09:00:00Z",
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useInternetIdentity();
  const { setCurrentUser } = useAppStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("storeUser");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Demo auth: validate against seed users
    const user = DEMO_USERS[username];
    if (!user || user.password !== password) {
      setError("Invalid username or password. Try: admin / admin123");
      setIsLoading(false);
      return;
    }
    if (user.role !== role) {
      setError(
        `This user is registered as ${user.role.replace(/([A-Z])/g, " $1").trim()}, not ${role.replace(/([A-Z])/g, " $1").trim()}`,
      );
      setIsLoading(false);
      return;
    }

    setCurrentUser({
      principal: `demo-${username}`,
      username,
      role: user.role,
      lastLoginAt: user.lastLogin,
    });

    navigate({ to: "/" });
    setIsLoading(false);
  };

  const handleIILogin = () => {
    login();
  };

  return (
    <div className="min-h-screen flex bg-background" data-ocid="login.page">
      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-col justify-between w-96 bg-sidebar border-r border-sidebar-border p-8 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-sidebar-primary">
              <Package className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-sidebar-foreground leading-none">
                Sandeep Enterprise
              </p>
              <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest mt-0.5">
                And Co.
              </p>
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-sidebar-foreground leading-tight mb-3">
            Sandeep Enterprise
            <br />
            And Co.
          </h2>
          <p className="text-sm text-sidebar-foreground/60 leading-relaxed">
            Centralized inventory, material tracking, and operations management
            for industrial plant stores.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { label: "Item Master & Stock Control", icon: "📦" },
              { label: "Material Inward & GRN", icon: "📥" },
              { label: "Issue Tracking & Consumption", icon: "📤" },
              { label: "Reports & Analytics", icon: "📊" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 text-sm text-sidebar-foreground/70"
              >
                <span className="text-base">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="border-t border-sidebar-border pt-4">
            <p className="text-[10px] text-sidebar-foreground/40">
              Phase 1 — Core Operations
            </p>
            <p className="text-xs text-sidebar-foreground/50 mt-0.5">
              Item Master · Inventory · Issue · Reports
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
              <Package className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground leading-none">
                Sandeep Enterprise And Co.
              </p>
            </div>
          </div>

          {!forgotMode ? (
            <div className="data-card" data-ocid="login.form_card">
              <div className="mb-6">
                <h1 className="font-display text-xl font-bold text-foreground">
                  Sign In
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Access your store management portal
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="username" className="text-xs font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    data-ocid="login.username.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="pr-9"
                      data-ocid="login.password.input"
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Login As</Label>
                  <Select
                    value={role}
                    onValueChange={(v) => setRole(v as Role)}
                  >
                    <SelectTrigger data-ocid="login.role.select">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="storeUser">Store User</SelectItem>
                      <SelectItem value="purchaseUser">
                        Purchase User
                      </SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div
                    className="alert-red rounded-sm px-3 py-2 flex items-center gap-2"
                    data-ocid="login.error_state"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="text-xs">{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-ocid="login.submit_button"
                >
                  {isLoading ? "Signing in…" : "Sign In"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => setForgotMode(true)}
                    data-ocid="login.forgot_password_button"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleIILogin}
                  disabled={isLoggingIn}
                  data-ocid="login.internet_identity_button"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {isLoggingIn
                    ? "Opening Internet Identity…"
                    : "Sign in with Internet Identity"}
                </Button>
              </div>

              {/* Demo hint */}
              <div className="mt-4 p-3 rounded-sm bg-muted/50 border border-border/50">
                <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                  Demo: admin / admin123 (Admin)
                  <br />
                  store.user / store123 (Store User)
                  <br />
                  manager / manager123 (Manager)
                </p>
              </div>
            </div>
          ) : (
            <div className="data-card" data-ocid="login.forgot_password_card">
              <div className="mb-6">
                <h1 className="font-display text-xl font-bold text-foreground">
                  Reset Password
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Contact your system administrator to reset your password.
                </p>
              </div>
              <div className="alert-amber rounded-sm px-4 py-3 mb-4">
                <p className="text-sm font-medium">Contact Admin</p>
                <p className="text-xs mt-1 opacity-80">
                  Please contact your plant ERP administrator or IT department
                  to reset your account password.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setForgotMode(false)}
                data-ocid="login.back_to_login_button"
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
