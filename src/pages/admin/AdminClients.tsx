import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Building2, MapPin, Globe, Star, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  fetchAdminClients, createAdminClient, updateAdminClient, deleteAdminClient,
  adminClientsQueryKey, type ApiClient,
} from "@/lib/api";

const INDUSTRIES = [
  "Builders & Contractors", "Plumbing Dealers", "Industrial Projects",
  "Infrastructure", "Facility Management", "Water Treatment",
  "Hospitality", "Healthcare", "Retail & Commercial",
];

const emptyForm = { name: "", industry: "", location: "", websiteUrl: "", isFeatured: false };

export default function AdminClients() {
  const qc = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing]       = useState<ApiClient | null>(null);
  const [form, setForm]             = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Queries ── */
  const { data, isLoading, error } = useQuery({
    queryKey: adminClientsQueryKey(),
    queryFn:  fetchAdminClients,
  });
  const clients = data?.clients ?? [];

  /* ── Mutations ── */
  const createMut = useMutation({
    mutationFn: (d: typeof emptyForm) => createAdminClient({ ...d, name: d.name }),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: adminClientsQueryKey() }); setShowDialog(false); },
  });

  const updateMut = useMutation({
    mutationFn: (d: typeof emptyForm) => updateAdminClient(editing!.id, {
      name: d.name, industry: d.industry, location: d.location,
      website_url: d.websiteUrl, is_featured: d.isFeatured ? 1 : 0,
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: adminClientsQueryKey() }); setShowDialog(false); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteAdminClient(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: adminClientsQueryKey() }),
  });

  const toggleFeaturedMut = useMutation({
    mutationFn: (c: ApiClient) => updateAdminClient(c.id, { is_featured: c.is_featured ? 0 : 1 }),
    onSuccess:  () => qc.invalidateQueries({ queryKey: adminClientsQueryKey() }),
  });

  /* ── Helpers ── */
  const openNew = () => { setEditing(null); setForm(emptyForm); setShowDialog(true); };
  const openEdit = (c: ApiClient) => {
    setEditing(c);
    setForm({ name: c.name, industry: c.industry ?? "", location: c.location ?? "", websiteUrl: c.website_url ?? "", isFeatured: Boolean(c.is_featured) });
    setShowDialog(true);
  };
  const save = () => {
    if (!form.name.trim()) return;
    editing ? updateMut.mutate(form) : createMut.mutate(form);
  };
  const remove = (id: number) => { if (confirm("Delete this client?")) deleteMut.mutate(id); };

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.industry ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.location  ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSaving = createMut.isPending || updateMut.isPending;

  /* ── Stats ── */
  const featuredCount  = clients.filter(c => c.is_featured).length;
  const industries     = new Set(clients.map(c => c.industry).filter(Boolean)).size;
  const locations      = new Set(clients.map(c => c.location).filter(Boolean)).size;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Partners</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage client logos and featured partnerships displayed on the website.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: clients.length,  icon: Building2, color: "blue"    },
          { label: "Featured",      value: featuredCount,   icon: Star,       color: "amber"   },
          { label: "Industries",    value: industries,      icon: Building2,  color: "emerald" },
          { label: "Locations",     value: locations,       icon: MapPin,     color: "violet"  },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${color}-50`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-sm text-center py-8">Failed to load clients. Is the API server running?</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No clients found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(client => (
                <div key={client.id}
                  className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-all group relative"
                >
                  {/* Featured badge */}
                  {client.is_featured === 1 && (
                    <span className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      FEATURED
                    </span>
                  )}

                  {/* Logo placeholder / initial */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold mb-3 shadow-sm">
                    {client.name[0]}
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">{client.name}</h3>

                  <div className="mt-1.5 space-y-1">
                    {client.industry && (
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                        <Building2 className="w-3.5 h-3.5" />{client.industry}
                      </div>
                    )}
                    {client.location && (
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />{client.location}
                      </div>
                    )}
                    {client.website_url && (
                      <div className="flex items-center gap-1.5 text-[12px] text-blue-500">
                        <Globe className="w-3.5 h-3.5" />
                        <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[120px]">
                          {client.website_url.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50">
                    <button onClick={() => toggleFeaturedMut.mutate(client)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${client.is_featured ? "bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {client.is_featured ? "★ Featured" : "☆ Feature"}
                    </button>
                    <div className="flex gap-1 ml-auto">
                      <button onClick={() => openEdit(client)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => remove(client.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Client" : "Add Client"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Company Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Kannan Constructions" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Industry</label>
              <select
                value={form.industry}
                onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Location</label>
              <Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Coimbatore, Tamil Nadu" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Website URL</label>
              <Input value={form.websiteUrl} onChange={e => setForm(p => ({ ...p, websiteUrl: e.target.value }))} placeholder="https://example.com" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isFeatured} onCheckedChange={v => setForm(p => ({ ...p, isFeatured: v }))} />
              <span className="text-sm text-slate-700">Featured on website</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={save} disabled={!form.name.trim() || isSaving} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? "Save Changes" : "Add Client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
