/**
 * Plumtek API Client v2
 * Centralized HTTP Client and router proxy.
 * Delegate implementations have been modularized under src/services/
 */

import type { QueryFunctionContext } from "@tanstack/react-query";
export type { ProductSpec, ProductImage, ProductDocument, ProductVideo, ApiProduct, PaginatedProductsResponse } from "../types/product";
export type { ApiCategory, ApiBrand, ApiPageSeo } from "../types/category";
export type { AdminUser, InventoryItem, AdminDashboardStats, AdminDashboardResponse } from "../types/inventory";
export type { ApiEnquiry } from "../types/enquiry";
export type { ApiCareerJob, ApiCareerApplication } from "../types/career";
export type { CareerApplicationPayload } from "../services/career.service";
export type { ApiClient } from "../types/client";
export type { ApiTestimonial } from "../types/testimonial";

import { UserService } from "../services/user.service";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { EnquiryService } from "../services/enquiry.service";
import { CareerService } from "../services/career.service";
import { ClientService } from "../services/client.service";
import { TestimonialService } from "../services/testimonial.service";
import { DashboardService } from "../services/dashboard.service";
import { InventoryService } from "../services/inventory.service";

// ─────────────────────────────────────────────────────────────
// HTTP CLIENT
// ─────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? "" : "http://127.0.0.1:8787");

export const apiUrl = (path: string) => {
  const cleanPath = path.startsWith("/api/") && !path.startsWith("/api/v1/")
    ? path.replace("/api/", "/api/v1/")
    : path;
  return `${API_BASE}${cleanPath}`;
};

export const getAuthHeaders = () => ({});

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
    credentials: "include",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed with status ${response.status}`);
  }
  return payload as T;
}

// ─────────────────────────────────────────────────────────────
// RE-EXPORTS FOR BACKWARD COMPATIBILITY
// ─────────────────────────────────────────────────────────────

export {
  UserService,
  ProductService,
  CategoryService,
  EnquiryService,
  CareerService,
  ClientService,
  TestimonialService,
  DashboardService,
  InventoryService,
};

// Auth & Users
export const loginAdmin = UserService.loginAdmin;
export const logoutAdmin = UserService.logoutAdmin;
export const fetchCurrentUser = UserService.fetchCurrentUser;
export const fetchAdminUsers = UserService.fetchAdminUsers;
export const createAdminUser = UserService.createAdminUser;
export const updateAdminUser = UserService.updateAdminUser;
export const deleteAdminUser = UserService.deleteAdminUser;
export const fetchAdminActivityLogs = UserService.fetchAdminActivityLogs;
export const fetchActivityLogs = UserService.fetchAdminActivityLogs;

// Products
export const fetchProducts = ProductService.fetchProducts;
export const fetchProductBySlug = ProductService.fetchProductBySlug;
export const fetchAdminProducts = ProductService.fetchAdminProducts;
export const createProduct = ProductService.createProduct;
export const createAdminProduct = ProductService.createProduct;
export const updateProduct = ProductService.updateProduct;
export const updateAdminProduct = ProductService.updateProduct;
export const deleteProduct = ProductService.deleteProduct;
export const deleteAdminProduct = ProductService.deleteProduct;
export const fetchAdminBrands = ProductService.fetchAdminBrands;
export const createAdminBrand = ProductService.createAdminBrand;
export const updateAdminBrand = ProductService.updateAdminBrand;

// Categories
export const fetchCategories = CategoryService.fetchCategories;
export const fetchAdminCategories = CategoryService.fetchAdminCategories;
export const createCategory = CategoryService.createCategory;
export const updateCategory = CategoryService.updateCategory;
export const deleteCategory = CategoryService.deleteCategory;

// Clients
export const fetchPublicClients = ClientService.fetchPublicClients;
export const fetchAdminClients = ClientService.fetchAdminClients;
export const createAdminClient = ClientService.createAdminClient;
export const updateAdminClient = ClientService.updateAdminClient;
export const deleteAdminClient = ClientService.deleteAdminClient;

// Testimonials
export const fetchPublicTestimonials = TestimonialService.fetchPublicTestimonials;
export const fetchAdminTestimonials = TestimonialService.fetchAdminTestimonials;
export const createAdminTestimonial = TestimonialService.createAdminTestimonial;
export const updateAdminTestimonial = TestimonialService.updateAdminTestimonial;
export const deleteAdminTestimonial = TestimonialService.deleteAdminTestimonial;

// Careers
export const fetchPublicCareerJobs = CareerService.fetchPublicCareerJobs;
export const submitCareerApplication = CareerService.submitCareerApplication;
export const fetchAdminCareerJobs = CareerService.fetchAdminCareerJobs;
export const createAdminCareerJob = CareerService.createAdminCareerJob;
export const updateAdminCareerJob = CareerService.updateAdminCareerJob;
export const deleteAdminCareerJob = CareerService.deleteAdminCareerJob;
export const fetchAdminApplications = CareerService.fetchAdminApplications;
export const updateCareerApplication = CareerService.updateAdminApplication;

// Enquiries
export const submitEnquiry = EnquiryService.submitEnquiry;
export const fetchAdminEnquiries = EnquiryService.fetchAdminEnquiries;
export const fetchAdminEnquiryById = EnquiryService.fetchAdminEnquiryById;
export const updateAdminEnquiry = EnquiryService.updateAdminEnquiry;
export const replyToEnquiry = EnquiryService.replyAdminEnquiry;
export const deleteAdminEnquiry = EnquiryService.deleteAdminEnquiry;

// Dashboard
export const fetchAdminDashboard = DashboardService.fetchAdminDashboard;

// Inventory
export const fetchAdminInventory = InventoryService.fetchAdminInventory;
export const updateInventory = InventoryService.updateInventory;

// SEO & Settings
export const fetchPageSeo = UserService.fetchPageSeo;
export const fetchAdminSeoPages = UserService.fetchAdminSeoPages;
export const fetchAdminSeoPage = UserService.fetchAdminSeoPage;
export const updateAdminSeoPage = UserService.updateAdminSeoPage;
export const fetchAdminSettings = UserService.fetchAdminSettings;
export const updateAdminSettings = UserService.updateAdminSettings;

// Query keys
export const productBySlugQueryKey = (slug: string) => ["product", slug] as const;
export const productsQueryKey = (params: any = {}) => ["products", params] as const;
export const categoriesQueryKey = () => ["categories"] as const;
export const adminProductsQueryKey = (params: any = {}) => ["admin", "products", params] as const;
export const adminCategoriesQueryKey = () => ["admin", "categories"] as const;
export const adminBrandsQueryKey = () => ["admin", "brands"] as const;
export const adminEnquiriesQueryKey = (params: any = {}) => ["admin", "enquiries", params] as const;
export const adminInventoryQueryKey = (params: any = {}) => ["admin", "inventory", params] as const;
export const adminCareerJobsQueryKey = () => ["admin", "career-jobs"] as const;
export const adminCareerAppsQueryKey = (params: any = {}) => ["admin", "career-apps", params] as const;
export const adminClientsQueryKey = () => ["admin", "clients"] as const;
export const adminTestimonialsQueryKey = () => ["admin", "testimonials"] as const;
export const adminSeoQueryKey = (pageKey?: string) => ["admin", "seo", pageKey ?? "all"] as const;
export const adminSettingsQueryKey = (group?: string) => ["admin", "settings", group ?? "all"] as const;
export const adminUsersQueryKey = () => ["admin", "users"] as const;
export const adminActivityLogsQueryKey = (page = 1) => ["admin", "activity-logs", page] as const;

export async function fetchProductBySlugFn({ queryKey }: QueryFunctionContext<readonly ["product", string]>) {
  return fetchProductBySlug(queryKey[1]);
}

export async function fetchCategoriesFn() {
  return fetchCategories();
}

export const resolveProductImageUrl = (imageKey: string | null | undefined): string => {
  if (!imageKey) return "/placeholder.svg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/")) {
    return imageKey;
  }
  return apiUrl(`/uploads/${imageKey}`);
};
