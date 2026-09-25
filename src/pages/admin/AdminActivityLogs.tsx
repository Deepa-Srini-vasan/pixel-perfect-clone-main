import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Package, Edit, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchActivityLogs } from "@/lib/api";

interface ActivityLog {
  id: number;
  admin_user_id: number;
  action: string;
  entity_type: string;
  entity_id: number | null;
  name: string | null;
  created_at: string;
}

export default function AdminActivityLogs() {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery<{ logs: ActivityLog[] }, Error>({
    queryKey: ["activity-logs"],
    queryFn: () => fetchActivityLogs(200),
    enabled: !!user,
    refetchInterval: 30000,
  });

  const logs = data?.logs ?? [];

  if (!user) return <div>Please log in</div>;

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="w-4 h-4" />;
      case "update":
        return <Edit className="w-4 h-4" />;
      case "delete":
        return <Trash2 className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-muted-foreground mt-1">Audit trail of all admin actions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity ({logs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isError ? (
            <p className="text-center text-red-600 py-8">
              {(error as Error)?.message || "Failed to load activity logs"}
            </p>
          ) : isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : logs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No activity logs found</p>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                  <div className={`p-2 rounded-lg ${getActionColor(log.action)}`}>
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {log.action.charAt(0).toUpperCase() + log.action.slice(1)} {log.entity_type}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {log.entity_id}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      by {log.name || "System"} • {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
