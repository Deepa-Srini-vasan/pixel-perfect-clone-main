export type AdminRole = "super_admin" | "admin" | "hr_manager" | "marketing" | "inventory" | "manager" | "staff";

/**
 * Route-level permission matrix.
 * "*" means all routes are accessible.
 * Routes listed must match the `to` field in navItems exactly.
 */
const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["*"],
  admin: [
    "/admin",
    "/admin/products",
    "/admin/categories",
    "/admin/subcategories",
    "/admin/inventory",
    "/admin/enquiries",
    "/admin/careers",
    "/admin/clients",
    "/admin/testimonials",
    "/admin/activity-logs",
    "/admin/settings",
    // Note: /admin/users is super_admin only
  ],
  hr_manager: [
    "/admin",
    "/admin/careers",
  ],
  marketing: [
    "/admin",
    "/admin/clients",
    "/admin/testimonials",
    "/admin/enquiries",
  ],
  inventory: [
    "/admin",
    "/admin/products",
    "/admin/categories",
    "/admin/subcategories",
    "/admin/inventory",
  ],
  manager: [
    "/admin",
    "/admin/enquiries",
    "/admin/careers",
    "/admin/clients",
    "/admin/testimonials",
  ],
  staff: [
    "/admin",
    "/admin/enquiries",
  ],
};

export function normalizeRole(role?: string | null): AdminRole {
  const validRoles: AdminRole[] = ["super_admin", "admin", "hr_manager", "marketing", "inventory", "manager", "staff"];
  if (role && validRoles.includes(role as AdminRole)) return role as AdminRole;
  return "staff";
}

export function canAccessAdminRoute(role?: string | null, path?: string | null): boolean {
  const normalizedRole = normalizeRole(role);
  if (!path) return false;

  const permissions = ROLE_PERMISSIONS[normalizedRole] ?? [];
  if (permissions.includes("*")) return true;

  // Exact match
  if (permissions.includes(path)) return true;

  // Prefix match for nested routes (e.g. /admin/products/edit/1)
  return permissions.some((p) => p !== "/admin" && path.startsWith(p + "/"));
}

/**
 * Returns the ordered nav items a given role can see.
 * This mirrors the navItems array in AdminLayout.tsx — keep in sync.
 */
export function getAdminNavigationItems(role?: string | null) {
  const normalizedRole = normalizeRole(role);
  const items = [
    { label: "Dashboard",      to: "/admin",                icon: "LayoutDashboard" },
    { label: "Products",       to: "/admin/products",       icon: "Package" },
    { label: "Categories",     to: "/admin/categories",     icon: "Tag" },
    { label: "Subcategories",  to: "/admin/subcategories",  icon: "Tag" },
    { label: "Inventory",      to: "/admin/inventory",      icon: "BarChart3" },
    { label: "Enquiries",      to: "/admin/enquiries",      icon: "Mail" },
    { label: "Careers",        to: "/admin/careers",        icon: "Briefcase" },
    { label: "Clients",        to: "/admin/clients",        icon: "Building2" },
    { label: "Testimonials",   to: "/admin/testimonials",   icon: "Quote" },
    { label: "Activity Logs",  to: "/admin/activity-logs",  icon: "BarChart3" },
    { label: "Users",          to: "/admin/users",          icon: "Users" },
    { label: "Settings",       to: "/admin/settings",       icon: "Settings" },
  ];
  return items.filter((item) => canAccessAdminRoute(normalizedRole, item.to));
}
