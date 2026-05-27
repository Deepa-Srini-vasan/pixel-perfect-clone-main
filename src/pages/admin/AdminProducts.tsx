import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Edit, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  adminProductsQueryKey,
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  fetchCategories,
  type ApiProduct,
  updateAdminProduct,
} from "@/lib/api";
import { categoryImageLookup, productImageLookup, resolveProductImage } from "@/lib/catalog-assets";

const imageOptions = Array.from(productImageLookup.keys());

const emptyForm = {
  name: "",
  slug: "",
  category: "",
  shortDescription: "",
  description: "",
  highlightsText: "",
  specsText: "",
  imageKey: imageOptions[0] ?? "",
  imageData: "",
  isFeatured: false,
};

type ProductFormState = typeof emptyForm;



const toFormState = (product?: ApiProduct): ProductFormState => {
  const rawHighlights = product?.highlights;
  let parsedHighlights: string[] = [];
  if (Array.isArray(rawHighlights)) {
    parsedHighlights = rawHighlights;
  } else if (rawHighlights && typeof rawHighlights === "object") {
    parsedHighlights = Object.values(rawHighlights).map(String);
  } else if (typeof rawHighlights === "string") {
    parsedHighlights = [rawHighlights];
  }

  const rawSpecs = product?.specs;
  let parsedSpecs: Array<{ label: string; value: string }> = [];
  if (Array.isArray(rawSpecs)) {
    parsedSpecs = rawSpecs;
  } else if (rawSpecs && typeof rawSpecs === "object") {
    parsedSpecs = Object.entries(rawSpecs).map(([label, value]) => ({
      label,
      value: String(value),
    }));
  }

  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category: product?.category ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    highlightsText: parsedHighlights.join("\n"),
    specsText: parsedSpecs.map((spec) => `${spec.label}: ${spec.value}`).join("\n"),
    imageKey: product?.imageKey ?? imageOptions[0] ?? "",
    imageData: product?.imageData ?? "",
    isFeatured: Boolean(product?.isFeatured),
  };
};



const parseHighlights = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const parseSpecs = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label?.trim() ?? "", value: rest.join(":").trim() };
    })
    .filter((item) => item.label && item.value);

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Unable to read image file"));
    reader.readAsDataURL(file);
  });

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: adminProductsQueryKey, queryFn: fetchAdminProducts });
  const { data: categoriesData } = useQuery({ queryKey: ["admin-categories"], queryFn: fetchCategories });
  const products = data?.products ?? [];
  const categoryOptions = useMemo(() => categoriesData?.categories ?? [], [categoriesData]);
  const categorySuggestions = useMemo(
    () => Array.from(new Set([...categoryOptions.map((category) => category.name), ...products.map((product) => product.category)])).sort(),
    [categoryOptions, products],
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [savingImage, setSavingImage] = useState(false);

  useEffect(() => {
    if (!dialogOpen) {
      setEditingProduct(null);
      setForm(emptyForm);
      setSavingImage(false);
    }
  }, [dialogOpen]);

  const createMutation = useMutation({
    mutationFn: createAdminProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey });
      setDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<ApiProduct> }) => updateAdminProduct(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey });
      setDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey });
    },
  });

  const openCreate = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (product: ApiProduct) => {
    setEditingProduct(product);
    setForm(toFormState(product));
    setDialogOpen(true);
  };

  const handleFileUpload = async (file?: File | null) => {
    if (!file) return;
    setSavingImage(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setForm((prev) => ({ ...prev, imageData: dataUrl, imageKey: "" }));
    } finally {
      setSavingImage(false);
    }
  };

  const handleSave = async () => {
    const selectedCategory = categoryOptions.find((category) => category.name === form.category);
    const payload = {
      slug: form.slug || form.name,
      name: form.name,
      category: form.category,
      categoryId: selectedCategory?.id ?? editingProduct?.categoryId ?? null,
      shortDescription: form.shortDescription,
      description: form.description,
      highlights: parseHighlights(form.highlightsText),
      specs: parseSpecs(form.specsText),
      imageKey: form.imageData ? "" : form.imageKey,
      imageData: form.imageData,
      isFeatured: form.isFeatured,
    };

    if (editingProduct) {
      await updateMutation.mutateAsync({ id: editingProduct.id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const handleDelete = async (product: ApiProduct) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    await deleteMutation.mutateAsync(product.id);
  };

  const busy = createMutation.isPending || updateMutation.isPending;
  const activeImage = resolveProductImage(form.imageKey, form.imageData) || categoryImageLookup.get(form.category);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create, edit, and delete product listings from the admin panel.</p>
        </div>
        <Button onClick={openCreate} className="rounded-full px-6 uppercase tracking-[2px]">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">Loading products...</div>
        ) : null}
        {products.map((product) => (
          <div key={product.id} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-start gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/20">
                <img src={resolveProductImage(product.imageKey, product.imageData)} alt={product.name} className="h-full w-full object-contain p-2" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[2px] text-muted-foreground">{product.category}</p>
                <h2 className="mt-1 line-clamp-2 font-heading text-lg font-bold text-foreground">{product.name}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-2">
              {product.isFeatured ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Check className="h-3 w-3" />
                  Featured
                </span>
              ) : null}
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">{product.slug}</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => openEdit(product)}>
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(product)} disabled={deleteMutation.isPending}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>Manage product information, images, and featured flags from one form.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Product name" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Slug</label>
                <Input value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="product-slug" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <input
                  list="categorySuggestions"
                  value={form.category}
                  onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                  placeholder="Category name"
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <datalist id="categorySuggestions">
                  {categorySuggestions.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Short Description</label>
                <Textarea value={form.shortDescription} onChange={(event) => setForm((prev) => ({ ...prev, shortDescription: event.target.value }))} rows={3} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} rows={5} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Highlights (one per line)</label>
                <Textarea value={form.highlightsText} onChange={(event) => setForm((prev) => ({ ...prev, highlightsText: event.target.value }))} rows={4} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Specs (Label: Value per line)</label>
                <Textarea value={form.specsText} onChange={(event) => setForm((prev) => ({ ...prev, specsText: event.target.value }))} rows={4} />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Featured Product</p>
                  <p className="text-xs text-muted-foreground">Show on homepage featured sections</p>
                </div>
                <Switch checked={form.isFeatured} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isFeatured: checked }))} />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-border bg-muted/20 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Product Image</p>
                <p className="mt-1 text-xs text-muted-foreground">Upload a new image or use one of the existing image keys.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[2px] text-muted-foreground">Image Key</label>
                <select
                  value={form.imageKey}
                  onChange={(event) => setForm((prev) => ({ ...prev, imageKey: event.target.value, imageData: "" }))}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  disabled={Boolean(form.imageData)}
                >
                  {imageOptions.map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background px-4 py-8 text-center transition-colors hover:border-primary">
                <Upload className="h-5 w-5 text-primary" />
                <span className="mt-3 text-sm font-medium text-foreground">Upload image file</span>
                <span className="mt-1 text-xs text-muted-foreground">Saved as base64 in the database</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => void handleFileUpload(event.target.files?.[0] ?? null)}
                />
              </label>
              {savingImage ? <p className="text-xs text-muted-foreground">Preparing image...</p> : null}
              <div className="overflow-hidden rounded-2xl border border-border bg-white p-3">
                <img src={activeImage} alt="Preview" className="h-52 w-full object-contain" />
              </div>
              <div className="rounded-2xl border border-border bg-white p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Category suggestions</p>
                <p className="mt-1">{categoryImageLookup.get(form.category) ? "Category image available" : "No category image mapping yet"}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void handleSave()} disabled={busy}>
              Save Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
