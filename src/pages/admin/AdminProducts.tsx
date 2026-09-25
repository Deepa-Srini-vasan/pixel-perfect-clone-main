import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildCategoryTree } from "@/lib/category-tree";
import type { Category } from "@/lib/category";
import { Check, Edit, Plus, Trash2, Upload, Search, Filter, ChevronLeft, ChevronRight, Package, Tag } from "lucide-react";
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
  videoUrl: "",
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
    videoUrl: product?.videoUrl ?? "",
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

const ITEMS_PER_PAGE = 24;

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: adminProductsQueryKey(),
    queryFn: () => fetchAdminProducts({ limit: 1000 }),
  });
  const { data: categoriesData } = useQuery({ queryKey: ["admin-categories"], queryFn: fetchCategories });

  const products = data?.products ?? [];
  const categoryOptions = useMemo(() => categoriesData?.categories ?? [], [categoriesData]) as Category[];
  const categoryTree = useMemo(() => buildCategoryTree(categoryOptions), [categoryOptions]);

  /* Search & Filter & Pagination States */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [savingImage, setSavingImage] = useState(false);

  /* Filtered Products */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  /* Pagination math */
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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
      await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey() });
      setDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<ApiProduct> }) => updateAdminProduct(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey() });
      setDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey() });
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
    const selectedCatObj = categoryOptions.find((cat) => cat.name === form.category);
    const payload = {
      slug: form.slug || form.name,
      name: form.name,
      category: form.category,
      categoryId: selectedCatObj?.id ?? editingProduct?.categoryId ?? null,
      shortDescription: form.shortDescription,
      description: form.description,
      highlights: parseHighlights(form.highlightsText),
      specs: parseSpecs(form.specsText),
      videoUrl: form.videoUrl.trim() || null,
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
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl font-bold text-foreground">Products Catalog</h1>
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-extrabold px-3 py-1 border border-blue-200">
              {products.length} Products in Database
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Manage product listings, specs, images, and category assignments.</p>
        </div>
        <Button onClick={openCreate} className="rounded-full px-6 uppercase tracking-[2px] shadow-md">
          <Plus className="h-4 w-4 mr-1" />
          Add Product
        </Button>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-card border border-border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, SKU, or category..."
            className="pl-10 pr-4 py-2 text-sm bg-background border-border rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 bg-background border border-border rounded-xl text-sm font-medium text-foreground outline-none w-full md:w-56"
          >
            <option value="all">All Categories ({products.length})</option>
            {categoryOptions.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="py-12 text-center rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading products from database...
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pageProducts.map((product) => (
              <div key={product.id} className="rounded-3xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-start gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/20 flex items-center justify-center">
                      <img
                        src={resolveProductImage(product.imageKey, product.imageData)}
                        alt={product.name}
                        className="h-full w-full object-contain p-2"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <h2 className="mt-1 line-clamp-2 font-heading text-base font-bold text-foreground">{product.name}</h2>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.shortDescription}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {product.isFeatured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold">
                        <Check className="h-3 w-3" />
                        Featured
                      </span>
                    ) : null}
                    {product.sku && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium">
                        <Tag className="h-3 w-3 text-slate-400" />
                        {product.sku}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => openEdit(product)}>
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1 rounded-xl" onClick={() => handleDelete(product)} disabled={deleteMutation.isPending}>
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 rounded-2xl">
            <p className="text-xs font-medium text-muted-foreground">
              Showing <span className="font-bold text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
              <span className="font-bold text-foreground">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> of{" "}
              <span className="font-bold text-foreground">{filteredProducts.length}</span> products
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="text-xs font-bold text-foreground px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-card rounded-3xl border border-border p-8">
          <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-1">No products found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
            No products matched your search term or category filter. Try clearing filters or creating a new product.
          </p>
          <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }} variant="outline" size="sm" className="rounded-xl">
            Reset Search Filters
          </Button>
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>Manage product details, specifications, images, and category placement.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Product name" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Slug</label>
                <Input value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="product-slug" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Category *</label>
                <select
                  value={form.category}
                  onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select a category</option>
                  {categoryTree.map((node) => (
                    <option key={node.category.id} value={node.category.name}>
                      {node.category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Short Description</label>
                <Textarea value={form.shortDescription} onChange={(event) => setForm((prev) => ({ ...prev, shortDescription: event.target.value }))} rows={3} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Full Description</label>
                <Textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} rows={4} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Highlights (one per line)</label>
                <Textarea value={form.highlightsText} onChange={(event) => setForm((prev) => ({ ...prev, highlightsText: event.target.value }))} rows={3} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-foreground">Specs (Label: Value per line)</label>
                <Textarea value={form.specsText} onChange={(event) => setForm((prev) => ({ ...prev, specsText: event.target.value }))} rows={3} />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Featured Product</p>
                  <p className="text-xs text-muted-foreground">Show in homepage curated sections</p>
                </div>
                <Switch checked={form.isFeatured} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isFeatured: checked }))} />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-border bg-muted/20 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Product Image</p>
                <p className="mt-1 text-xs text-muted-foreground">Upload a new image file or select an image asset key.</p>
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
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 text-center transition-colors hover:border-primary">
                <Upload className="h-5 w-5 text-primary" />
                <span className="mt-2 text-sm font-medium text-foreground">Upload image file</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => void handleFileUpload(event.target.files?.[0] ?? null)}
                />
              </label>
              {savingImage ? <p className="text-xs text-muted-foreground">Preparing image...</p> : null}
              <div className="overflow-hidden rounded-2xl border border-border bg-white p-3">
                <img src={activeImage} alt="Preview" className="h-44 w-full object-contain" />
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
