export interface Category {
  id: number;
  name: string;
  slug?: string;
  parentId?: number | null;
  parentName?: string | null;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
  count?: number;
}
