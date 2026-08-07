import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService, FetchProductsParams } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { ClientService } from "../services/client.service";
import { CareerService, AdminApplicationsParams } from "../services/career.service";
import { EnquiryService, AdminEnquiriesParams } from "../services/enquiry.service";
import { InventoryService, AdminInventoryParams } from "../services/inventory.service";
import { UserService } from "../services/user.service";

import {
  productsQueryKey,
  categoriesQueryKey,
  adminClientsQueryKey,
  adminCareerJobsQueryKey,
  adminEnquiriesQueryKey,
  adminInventoryQueryKey,
  adminActivityLogsQueryKey
} from "../lib/api";

// 1. useProducts hook
export function useProducts(params: FetchProductsParams = {}) {
  return useQuery({
    queryKey: productsQueryKey(params),
    queryFn: () => ProductService.fetchProducts(params),
  });
}

// 2. useCategories hook
export function useCategories() {
  return useQuery({
    queryKey: categoriesQueryKey(),
    queryFn: () => CategoryService.fetchCategories(),
  });
}

// 3. useClients hook
export function useClients() {
  return useQuery({
    queryKey: adminClientsQueryKey(),
    queryFn: () => ClientService.fetchPublicClients(),
  });
}

// 4. useCareers hook
export function useCareers() {
  return useQuery({
    queryKey: adminCareerJobsQueryKey(),
    queryFn: () => CareerService.fetchPublicCareerJobs(),
  });
}

// 5. useAdminEnquiries hook
export function useAdminEnquiries(params: AdminEnquiriesParams = {}) {
  return useQuery({
    queryKey: adminEnquiriesQueryKey(params),
    queryFn: () => EnquiryService.fetchAdminEnquiries(params),
  });
}

// 6. useAdminInventory hook
export function useAdminInventory(params: AdminInventoryParams = {}) {
  return useQuery({
    queryKey: adminInventoryQueryKey(params),
    queryFn: () => InventoryService.fetchAdminInventory(params),
  });
}

// 7. useAdminActivityLogs hook
export function useAdminActivityLogs(page = 1, limit = 50) {
  return useQuery({
    queryKey: adminActivityLogsQueryKey(page),
    queryFn: () => UserService.fetchAdminActivityLogs(page, limit),
  });
}
