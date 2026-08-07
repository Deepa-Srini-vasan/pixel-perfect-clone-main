import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import * as api from "../lib/api";

// Mock the API module
vi.mock("../lib/api", () => ({
  loginAdmin: vi.fn(),
  logoutAdmin: vi.fn(),
  fetchCurrentUser: vi.fn(),
}));

const createWrapper = () => AuthProvider;

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with null user and loading true", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it("should login user successfully", async () => {
    const mockUser = {
      id: 1,
      email: "admin@plumtek.com",
      name: "Admin",
      role: "admin",
    };

    vi.mocked(api.loginAdmin).mockResolvedValueOnce({ user: mockUser });
    vi.mocked(api.fetchCurrentUser).mockResolvedValueOnce({ user: mockUser });

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login("admin@plumtek.com", "admin123");
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it("should logout user successfully", async () => {
    const mockUser = {
      id: 1,
      email: "admin@plumtek.com",
      name: "Admin",
      role: "admin",
    };

    vi.mocked(api.fetchCurrentUser).mockResolvedValueOnce({ user: mockUser });
    vi.mocked(api.loginAdmin).mockResolvedValueOnce({ user: mockUser });
    vi.mocked(api.logoutAdmin).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    // First login
    await act(async () => {
      await result.current.login("admin@plumtek.com", "admin123");
    });

    // Then logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(api.logoutAdmin).toHaveBeenCalled();
  });

  it("should handle login error", async () => {
    vi.mocked(api.loginAdmin).mockRejectedValueOnce(
      new Error("Invalid credentials")
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.login("admin@plumtek.com", "wrong");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    expect(result.current.user).toBeNull();
  });

  it("should refresh user on demand", async () => {
    const mockUser = {
      id: 1,
      email: "admin@plumtek.com",
      name: "Admin",
      role: "admin",
    };

    vi.mocked(api.fetchCurrentUser).mockResolvedValue({ user: mockUser });

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.refreshUser();
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it("should set user to null on refresh error (unauthenticated)", async () => {
    vi.mocked(api.fetchCurrentUser).mockRejectedValue(
      new Error("Unauthorized")
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.refreshUser();
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });
  });
});
