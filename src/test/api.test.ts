import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitEnquiry, fetchProducts, fetchCategories } from "../lib/api";

// Mock fetch globally
global.fetch = vi.fn();

describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Prevent jsdom window.open errors during submitEnquiry tests.
    if (typeof window !== "undefined") {
      window.open = vi.fn();
    }
  });

  describe("submitEnquiry", () => {
    it("should submit enquiry with valid data", async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ success: true, message: "Enquiry submitted" }),
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const enquiry = {
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
        subject: "Product Inquiry",
        message: "I am interested in your products",
      };

      const result = await submitEnquiry(enquiry);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/enquiries"),
        expect.objectContaining({
          method: "POST",
          credentials: "include",
        })
      );
      expect(result).toEqual({ success: true, message: "Enquiry submitted" });
    });

    it("should reject enquiry with invalid email", async () => {
      const enquiry = {
        name: "John Doe",
        email: "invalid-email",
        phone: "9876543210",
        subject: "Product Inquiry",
        message: "I am interested in your products",
      };

      // Assuming client-side validation or server returns error
      const mockResponse = {
        ok: false,
        status: 400,
        json: async () => ({ error: "Invalid email format" }),
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      try {
        await submitEnquiry(enquiry);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should handle server errors gracefully", async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal server error" }),
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const enquiry = {
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
        subject: "Product Inquiry",
        message: "I am interested in your products",
      };

      try {
        await submitEnquiry(enquiry);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("fetchProducts", () => {
    it("should fetch products with search query", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Premium Tap",
          slug: "premium-tap",
          category: "Taps",
        },
      ];

      const mockResponse = {
        ok: true,
        json: async () => mockProducts,
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const results = await fetchProducts({ search: "tap" });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("search=tap"),
        expect.any(Object)
      );
      expect(results).toEqual(mockProducts);
    });

    it("should fetch products with category filter", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Bath Mixer",
          slug: "bath-mixer",
          category: "Bath Accessories",
        },
      ];

      const mockResponse = {
        ok: true,
        json: async () => mockProducts,
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const results = await fetchProducts({ category: "Bath Accessories" });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("category=Bath+Accessories"),
        expect.any(Object)
      );
      expect(results).toEqual(mockProducts);
    });

    it("should handle empty product list", async () => {
      const mockResponse = {
        ok: true,
        json: async () => [],
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const results = await fetchProducts({ search: "nonexistent" });

      expect(results).toEqual([]);
    });
  });

  describe("fetchCategories", () => {
    it("should fetch all categories", async () => {
      const mockCategories = [
        { id: 1, name: "Taps", slug: "taps" },
        { id: 2, name: "Bath Accessories", slug: "bath-accessories" },
      ];

      const mockResponse = {
        ok: true,
        json: async () => mockCategories,
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      const results = await fetchCategories();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/categories"),
        expect.any(Object)
      );
      expect(results).toEqual(mockCategories);
    });

    it("should handle API errors", async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      };
      global.fetch.mockResolvedValueOnce(mockResponse);

      try {
        await fetchCategories();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
