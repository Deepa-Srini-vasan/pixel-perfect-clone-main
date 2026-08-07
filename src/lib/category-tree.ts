import type { Category } from "./category";

export interface CategoryTreeItem {
  category: Category;
  children: CategoryTreeItem[];
}

export function buildCategoryTree(categories: Category[]): CategoryTreeItem[] {
  const map = new Map<number, CategoryTreeItem>();
  const nodes = categories.map((category) => ({ category, children: [] as CategoryTreeItem[] }));

  nodes.forEach((node) => map.set(node.category.id, node));

  const roots: CategoryTreeItem[] = [];
  nodes.forEach((node) => {
    if (node.category.parentId && map.has(node.category.parentId)) {
      const parent = map.get(node.category.parentId);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  const sortTree = (items: CategoryTreeItem[]) => {
    items.sort((a, b) => (a.category.displayOrder ?? 0) - (b.category.displayOrder ?? 0) || a.category.name.localeCompare(b.category.name));
    items.forEach((item) => sortTree(item.children));
  };

  sortTree(roots);
  return roots;
}

export function getLeafCategoryIds(tree: CategoryTreeItem[]): number[] {
  const ids: number[] = [];
  const visit = (items: CategoryTreeItem[]) => {
    items.forEach((item) => {
      if (item.children.length === 0) {
        ids.push(item.category.id);
      } else {
        visit(item.children);
      }
    });
  };
  visit(tree);
  return ids;
}

export function getCategoryPath(categories: Category[], categoryId: number): string[] {
  const map = new Map(categories.map((category) => [category.id, category]));
  const path: string[] = [];
  let current = map.get(categoryId);
  while (current) {
    path.unshift(current.name);
    current = current.parentId ? map.get(current.parentId) : undefined;
  }
  return path;
}

export interface CategoryOption {
  id: number;
  name: string;
  depth: number;
}

export function flattenCategoryOptions(categories: CategoryTreeItem[] | Category[]): CategoryOption[] {
  const rawCategories = categories.map((item) => {
    return "category" in item ? item.category : item;
  });

  const tree = buildCategoryTree(rawCategories);
  const options: CategoryOption[] = [];

  const visit = (items: CategoryTreeItem[], depth = 0) => {
    items.forEach((item) => {
      options.push({ id: item.category.id, name: item.category.name, depth });
      if (item.children.length > 0) {
        visit(item.children, depth + 1);
      }
    });
  };

  visit(tree);
  return options;
}
