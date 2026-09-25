import {
  LayoutDashboard, Package, Mail, Settings, Users, Tag,
  Briefcase, Building2, Quote, Activity, LucideIcon
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  permission?: string;
  children?: NavItem[];
}

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard.view"
  },
  {
    label: "Products",
    to: "/admin/products",
    icon: Package,
    permission: "products.view"
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: Tag,
    permission: "categories.view"
  },
  {
    label: "Subcategories",
    to: "/admin/subcategories",
    icon: Tag,
    permission: "categories.view"
  },
  {
    label: "Inventory",
    to: "/admin/inventory",
    icon: Activity, // Use Activity for inventory
    permission: "inventory.view"
  },
  {
    label: "Enquiries",
    to: "/admin/enquiries",
    icon: Mail,
    permission: "enquiries.view"
  },
  {
    label: "Careers",
    to: "/admin/careers",
    icon: Briefcase,
    permission: "careers.view"
  },
  {
    label: "Clients",
    to: "/admin/clients",
    icon: Building2,
    permission: "clients.view"
  },
  {
    label: "Testimonials",
    to: "/admin/testimonials",
    icon: Quote,
    permission: "testimonials.view"
  },
  {
    label: "Activity Logs",
    to: "/admin/activity-logs",
    icon: Activity,
    permission: "activity_logs.view"
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
    permission: "users.view"
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
    permission: "settings.view"
  }
];
