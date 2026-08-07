import { describe, expect, it } from 'vitest';
import { buildCategoryTree, flattenCategoryOptions, getCategoryPath, getLeafCategoryIds } from '@/lib/category-tree';

describe('category tree helpers', () => {
  it('builds a nested tree and resolves leaf categories', () => {
    const categories = [
      { id: 1, name: 'Pipes', slug: 'pipes', parentId: null, description: '', displayOrder: 1, isActive: true },
      { id: 2, name: 'PPR Pipes', slug: 'ppr-pipes', parentId: 1, description: '', displayOrder: 1, isActive: true },
      { id: 3, name: 'HDPE Pipes', slug: 'hdpe-pipes', parentId: 1, description: '', displayOrder: 2, isActive: true },
      { id: 4, name: 'PVC Fittings', slug: 'pvc-fittings', parentId: null, description: '', displayOrder: 2, isActive: true },
    ];

    const tree = buildCategoryTree(categories as never[]);

    expect(tree).toHaveLength(2);
    expect(tree[0].children[0].category.name).toBe('PPR Pipes');
    expect(getLeafCategoryIds(tree)).toEqual([2, 3, 4]);
    expect(getCategoryPath(categories as never[], 2)).toEqual(['Pipes', 'PPR Pipes']);
  });

  it('flattens nested options with indentation for parent-child selection', () => {
    const categories = [
      { id: 1, name: 'Pipes', slug: 'pipes', parentId: null, description: '', displayOrder: 1, isActive: true },
      { id: 2, name: 'PPR Pipes', slug: 'ppr-pipes', parentId: 1, description: '', displayOrder: 1, isActive: true },
      { id: 3, name: 'HDPE Pipes', slug: 'hdpe-pipes', parentId: 1, description: '', displayOrder: 2, isActive: true },
    ];

    const options = flattenCategoryOptions(categories as never[]);

    expect(options).toEqual([
      { id: 1, name: 'Pipes', depth: 0 },
      { id: 2, name: 'PPR Pipes', depth: 1 },
      { id: 3, name: 'HDPE Pipes', depth: 1 },
    ]);
  });
});
