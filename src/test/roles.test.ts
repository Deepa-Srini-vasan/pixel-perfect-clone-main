import { describe, expect, it } from "vitest";
import { canAccessAdminRoute, getAdminNavigationItems } from "../lib/roles";

describe("admin role permissions", () => {
  it("allows the HR manager to access the career section only", () => {
    const hrItems = getAdminNavigationItems("hr_manager");

    expect(canAccessAdminRoute("hr_manager", "/admin")).toBe(true);
    expect(canAccessAdminRoute("hr_manager", "/admin/careers")).toBe(true);
    expect(canAccessAdminRoute("hr_manager", "/admin/products")).toBe(false);
    expect(hrItems.some((item) => item.to === "/admin/careers")).toBe(true);
    expect(hrItems.some((item) => item.to === "/admin/products")).toBe(false);
  });

  it("allows admins to access the full admin area", () => {
    expect(canAccessAdminRoute("admin", "/admin/products")).toBe(true);
    expect(canAccessAdminRoute("admin", "/admin/careers")).toBe(true);
  });
});
