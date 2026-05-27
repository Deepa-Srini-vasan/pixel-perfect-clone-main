import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { fetchAdminDashboard, type AdminDashboardActivity, type AdminDashboardStats } from "@/lib/api";
import { Package, Mail, AlertCircle, Users, Settings, Activity, TrendingUp, Clock, type LucideIcon } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchAdminDashboard,
    refetchInterval: 30000,
  });

  const stats: AdminDashboardStats = data?.stats ?? {
    total_products: 0,
    total_categories: 0,
    total_enquiries: 0,
    unread_enquiries: 0,
    new_enquiries: 0,
    low_stock_items: 0,
    total_inventory: 0,
  };
  const activities: AdminDashboardActivity[] = data?.recentActivity || [];

  const statCards = [
    {
      title: "Total Products",
      value: stats.total_products || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Categories",
      value: stats.total_categories || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Enquiries",
      value: stats.total_enquiries || 0,
      icon: Mail,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Unread Enquiries",
      value: stats.unread_enquiries || 0,
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Low Stock Items",
      value: stats.low_stock_items || 0,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Inventory",
      value: stats.total_inventory || 0,
      icon: Package,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  const getActionLabel = (action: string) => {
    const labels = new Map<string, string>([
      ["create", "Created"],
      ["update", "Updated"],
      ["delete", "Deleted"],
    ]);
    return labels.get(action) || action;
  };

  const getEntityIcon = (entityType: string) => {
    const icons = new Map<string, LucideIcon>([
      ["product", Package],
      ["category", TrendingUp],
      ["inventory", AlertCircle],
      ["user", Users],
      ["settings", Settings],
    ]);
    return icons.get(entityType) || Activity;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name || user?.email}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in your store today.</p>
        {isLoading ? (
          <p className="text-xs text-muted-foreground mt-2">Loading dashboard metrics...</p>
        ) : null}
        {isError ? (
          <p className="text-xs text-destructive mt-2">
            Unable to load dashboard counts. {error instanceof Error ? error.message : "Check API server and admin authentication."}
          </p>
        ) : null}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-foreground">{card.value.toLocaleString()}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest actions in your admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => {
                const IconComponent = getEntityIcon(activity.entity_type);
                return (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border transition hover:bg-muted/50">
                    <div className="p-2 rounded-lg bg-muted">
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {getActionLabel(activity.action)} {activity.entity_type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.name ? `by ${activity.name}` : "System"}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(activity.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/admin/products" className="block p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Manage Products</p>
              <p className="text-sm text-muted-foreground">Add, edit, or delete products</p>
            </div>
          </div>
        </a>

        <a href="/admin/enquiries" className="block p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-foreground">View Enquiries</p>
              <p className="text-sm text-muted-foreground">Respond to customer inquiries</p>
            </div>
          </div>
        </a>

        <a href="/admin/inventory" className="block p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Manage Inventory</p>
              <p className="text-sm text-muted-foreground">Track and update stock levels</p>
            </div>
          </div>
        </a>

        <a href="/admin/settings" className="block p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Settings</p>
              <p className="text-sm text-muted-foreground">Configure site settings</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
