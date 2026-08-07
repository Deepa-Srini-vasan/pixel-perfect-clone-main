import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { apiUrl, getAuthHeaders } from "@/lib/api";
import type { Category } from "@/lib/category";
import { buildCategoryTree, flattenCategoryOptions, type CategoryTreeItem } from "@/lib/category-tree";

export default function AdminCategories() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", displayOrder: 0, parentId: null as number | null });
  const [isSaving, setIsSaving] = useState(false);

  const { data: categories = [], isLoading, refetch } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(apiUrl("/api/admin/categories"), {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      return data.categories.map((category: Category & { display_order?: number; is_active?: number; parent_name?: string }) => ({
        ...category,
        description: category.description ?? "",
        displayOrder: category.displayOrder ?? category.display_order ?? 0,
        isActive: category.isActive ?? Boolean(category.is_active),
        parentName: category.parentName ?? category.parent_name ?? null,
      }));
    },
  });

  const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);
  const categoryOptions = useMemo(() => flattenCategoryOptions(categoryTree), [categoryTree]);

  const renderCategoryRows = (nodes: CategoryTreeItem[], depth = 0): React.ReactNode[] =>
    nodes.flatMap((node) => [
      <div
        key={node.category.id}
        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        <div className="flex-1">
          <p className="font-semibold text-foreground">{node.category.name}</p>
          {node.category.description ? (
            <p className="text-sm text-muted-foreground">{node.category.description}</p>
          ) : node.category.parentName ? (
            <p className="text-sm text-muted-foreground">Parent: {node.category.parentName}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleOpenDialog(node.category)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(node.category.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>,
      ...renderCategoryRows(node.children, depth + 1),
    ]);

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        displayOrder: category.displayOrder,
        parentId: category.parentId ?? null,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", displayOrder: 0, parentId: null });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const method = editingCategory ? "PUT" : "POST";
      const url = editingCategory
        ? apiUrl(`/api/admin/categories/${editingCategory.id}`)
        : apiUrl("/api/admin/categories");

      const payload = {
        name: formData.name,
        description: formData.description,
        displayOrder: formData.displayOrder,
        parentId: formData.parentId,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Failed to save category");
      }

      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await fetch(apiUrl(`/api/admin/categories/${id}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete category");
      refetch();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (!user) return <div>Please log in</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Categories</h1>
          <p className="text-muted-foreground mt-1">Manage product categories</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No categories found</p>
          ) : (
            <div className="space-y-2">
              {renderCategoryRows(categoryTree)}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Category name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Parent Category</label>
              <select
                className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.parentId ?? ""}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="">Top-level category</option>
                {categoryOptions.map((option) => (
                  <option key={option.id} value={option.id} disabled={editingCategory?.id === option.id}>
                    {" ".repeat(option.depth * 3)}{option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving || !formData.name}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
