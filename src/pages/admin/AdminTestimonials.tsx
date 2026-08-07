import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Star, Search, Loader2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  fetchAdminTestimonials, createAdminTestimonial, updateAdminTestimonial, deleteAdminTestimonial,
  adminTestimonialsQueryKey, type ApiTestimonial,
} from "@/lib/api";

const emptyForm = { name: "", company: "", designation: "", rating: 5, message: "", isFeatured: false };

function StarSelector({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onChange(s)}>
          <Star className={`w-5 h-5 transition-colors ${s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300 fill-slate-100"}`} />
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
      ))}
    </div>
  );
}

export default function AdminTestimonials() {
  const qc = useQueryClient();
  const [showDialog, setShowDialog]   = useState(false);
  const [editing, setEditing]         = useState<ApiTestimonial | null>(null);
  const [form, setForm]               = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Queries ── */
  const { data, isLoading, error } = useQuery({
    queryKey: adminTestimonialsQueryKey(),
    queryFn:  fetchAdminTestimonials,
  });
  const testimonials = data?.testimonials ?? [];

  /* ── Mutations ── */
  const createMut = useMutation({
    mutationFn: (d: typeof emptyForm) => createAdminTestimonial({
      name: d.name, company: d.company || undefined, designation: d.designation || undefined,
      rating: d.rating, message: d.message, isFeatured: d.isFeatured,
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: adminTestimonialsQueryKey() }); setShowDialog(false); },
  });

  const updateMut = useMutation({
    mutationFn: (d: typeof emptyForm) => updateAdminTestimonial(editing!.id, {
      name: d.name, company: d.company || undefined, designation: d.designation || undefined,
      rating: d.rating, message: d.message, is_featured: d.isFeatured ? 1 : 0,
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: adminTestimonialsQueryKey() }); setShowDialog(false); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteAdminTestimonial(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: adminTestimonialsQueryKey() }),
  });

  const toggleFeaturedMut = useMutation({
    mutationFn: (t: ApiTestimonial) => updateAdminTestimonial(t.id, { is_featured: t.is_featured ? 0 : 1 }),
    onSuccess:  () => qc.invalidateQueries({ queryKey: adminTestimonialsQueryKey() }),
  });

  /* ── Helpers ── */
  const openNew = () => { setEditing(null); setForm(emptyForm); setShowDialog(true); };
  const openEdit = (t: ApiTestimonial) => {
    setEditing(t);
    setForm({ name: t.name, company: t.company ?? "", designation: t.designation ?? "", rating: t.rating, message: t.message, isFeatured: Boolean(t.is_featured) });
    setShowDialog(true);
  };
  const save = () => {
    if (!form.name.trim() || !form.message.trim()) return;
    editing ? updateMut.mutate(form) : createMut.mutate(form);
  };

  const filtered = testimonials.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.company ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSaving = createMut.isPending || updateMut.isPending;
  const avgRating = testimonials.length ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1) : "—";
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
  const featuredCount = testimonials.filter(t => t.is_featured).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage customer testimonials shown on the website.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: testimonials.length },
          { label: "Featured", value: featuredCount },
          { label: "5-Star Reviews", value: fiveStarCount },
          { label: "Avg Rating", value: avgRating },
        ].map(({ label, value }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search testimonials..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-sm text-center py-8">Failed to load testimonials. Is the API server running?</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No testimonials found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(t => (
                <div key={t.id}
                  className={`border rounded-xl p-5 relative ${t.is_featured ? "border-amber-200 bg-amber-50/30" : "border-slate-100"}`}
                >
                  {t.is_featured === 1 && (
                    <span className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      FEATURED
                    </span>
                  )}
                  <Quote className="w-6 h-6 text-blue-200 mb-2" />
                  <p className="text-slate-700 text-sm leading-relaxed line-clamp-3 mb-3">{t.message}</p>
                  <StarDisplay rating={t.rating} />
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    {t.company && <p className="text-slate-500 text-xs">{t.company}</p>}
                    {t.designation && <p className="text-slate-400 text-xs">{t.designation}</p>}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => toggleFeaturedMut.mutate(t)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${t.is_featured ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {t.is_featured ? "★ Featured" : "☆ Feature"}
                    </button>
                    <div className="ml-auto flex gap-1">
                      <button onClick={() => openEdit(t)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { if (confirm("Delete this testimonial?")) deleteMut.mutate(t.id); }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Name *</label>
                <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Company</label>
                <Input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="ABC Corp, Chennai" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Designation</label>
              <Input value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} placeholder="Managing Director" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Rating *</label>
              <StarSelector rating={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Testimonial *</label>
              <Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Share their experience with Plumtek..." rows={4} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isFeatured} onCheckedChange={v => setForm(p => ({ ...p, isFeatured: v }))} />
              <span className="text-sm text-slate-700">Feature on website</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={save} disabled={!form.name.trim() || !form.message.trim() || isSaving} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? "Save Changes" : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
