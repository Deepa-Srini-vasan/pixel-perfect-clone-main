import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { apiUrl, getAuthHeaders } from "@/lib/api";

interface SettingValue {
  [key: string]: string;
}

export default function AdminSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Map<string, string>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading } = useQuery<{ settings: SettingValue }>({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch(apiUrl("/api/admin/settings"), {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    },
  });

  useEffect(() => {
    if (data?.settings) {
      setSettings(new Map(Object.entries(data.settings)));
    }
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(apiUrl("/api/admin/settings"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(Object.fromEntries(settings)),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  };

  const handleToggle = (key: string, checked: boolean) => {
    setSettings((prev) => {
      const next = new Map(prev);
      next.set(key, checked ? "true" : "false");
      return next;
    });
  };

  if (!user) return <div>Please log in</div>;

  const settingGroups: {[key: string]: Array<[string, string]>} = {
    "Site Information": [
      ["site_name", "Site Name"],
      ["site_email", "Support Email"],
      ["site_phone", "Phone Number"],
      ["site_address", "Address"],
      ["site_description", "Site Description"],
    ],
    "Business Settings": [
      ["currency", "Currency"],
      ["vat_rate", "VAT Rate (%)"],
      ["items_per_page", "Items Per Page"],
    ],
    Notifications: [["enquiry_email_notifications", "Email alerts for new enquiries"]],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure site-wide settings and preferences</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          {Object.entries(settingGroups).map(([groupName, fields]) => (
            <Card key={groupName}>
              <CardHeader>
                <CardTitle>{groupName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map(([key, label]) => (
                  <div key={key}>
                    <label className="text-sm font-medium block mb-1">{label}</label>
                    {key === "enquiry_email_notifications" ? (
                      <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-3">
                        <Checkbox
                          checked={settings.get(key) === "true"}
                          onCheckedChange={(checked) => handleToggle(key, checked === true)}
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">Enable notification emails</p>
                          <p className="text-xs text-muted-foreground">Send an email whenever a new enquiry is submitted.</p>
                        </div>
                      </div>
                    ) : key === "site_description" || key === "site_address" ? (
                      <Textarea
                        value={settings.get(key) || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={settings.get(key) || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        type={key === "vat_rate" || key === "items_per_page" ? "number" : "text"}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} size="lg" className="gap-2">
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save All Settings
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
