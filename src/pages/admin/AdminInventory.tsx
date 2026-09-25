import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiUrl, getAuthHeaders } from "@/lib/api";

interface InventoryItem {
  id: number;
  product_id: number;
  name: string;
  sku: string;
  quantity_in_stock: number;
  quantity_reserved: number;
  reorder_level: number;
  reorder_quantity: number;
  last_restock: string;
}

export default function AdminInventory() {
  const { user } = useAuth();
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ quantityInStock: 0, reorderLevel: 10 });
  const [isSaving, setIsSaving] = useState(false);

  const { data: inventory = [], isLoading, refetch } = useQuery<InventoryItem[]>({
    queryKey: ["inventory", lowStockOnly],
    queryFn: async () => {
      const query = lowStockOnly ? "?lowStock=true" : "";
      const url = apiUrl(`/api/admin/inventory${query}`);

      const res = await fetch(url, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch inventory");
      const data = await res.json();
      return data.inventory;
    },
  });

  const lowStockCount = inventory.filter((item) => item.quantity_in_stock < item.reorder_level).length;

  const handleOpenDialog = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({ quantityInStock: item.quantity_in_stock, reorderLevel: item.reorder_level });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setIsSaving(true);
    try {
      const res = await fetch(
        apiUrl(`/api/admin/inventory/${editingItem.product_id}`),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({
            quantityInStock: formData.quantityInStock,
            reorderLevel: formData.reorderLevel,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update inventory");
      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving inventory:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <div>Please log in</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage product stock levels</p>
      </div>

      <div className="flex gap-4">
        <Button
          variant={lowStockOnly ? "default" : "outline"}
          onClick={() => setLowStockOnly(!lowStockOnly)}
          className="gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Low Stock Items ({lowStockCount})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({inventory.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : inventory.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No inventory items found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Product</th>
                    <th className="text-left py-3 px-4 font-semibold">In Stock</th>
                    <th className="text-left py-3 px-4 font-semibold">Reserved</th>
                    <th className="text-left py-3 px-4 font-semibold">Reorder Level</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => {
                    const isLow = item.quantity_in_stock < item.reorder_level;
                    return (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.sku}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{item.quantity_in_stock}</td>
                        <td className="py-3 px-4">{item.quantity_reserved}</td>
                        <td className="py-3 px-4">{item.reorder_level}</td>
                        <td className="py-3 px-4">
                          {isLow ? (
                            <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline" onClick={() => handleOpenDialog(item)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Inventory: {editingItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Quantity in Stock</label>
              <Input
                type="number"
                min="0"
                value={formData.quantityInStock}
                onChange={(e) => setFormData({ ...formData, quantityInStock: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Reorder Level</label>
              <Input
                type="number"
                min="0"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
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
