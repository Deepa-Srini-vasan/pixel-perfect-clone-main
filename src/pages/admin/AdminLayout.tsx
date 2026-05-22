import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Mail, LogOut, ShoppingBag, BarChart3, Settings, Users, Tag, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Inventory", to: "/admin/inventory", icon: BarChart3 },
  { label: "Enquiries", to: "/admin/enquiries", icon: Mail },
  { label: "Activity Logs", to: "/admin/activity-logs", icon: BarChart3 },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background lg:pl-[280px]">
      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] flex flex-col border-r border-border bg-card transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[2px] text-muted-foreground">PLUMtek</p>
            <h1 className="font-heading text-lg font-bold text-foreground">Admin Panel</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 pb-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-secondary lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Signed in as</p>
              <p className="text-sm font-semibold text-foreground">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>

        <main className="flex-1 bg-muted/20 px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
