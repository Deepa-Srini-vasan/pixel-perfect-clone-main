import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Careers from "../pages/Careers";
import { submitCareerApplication } from "../lib/api";

vi.mock("../lib/api", async () => {
  const actual = await vi.importActual<typeof import("../lib/api")>("../lib/api");
  return {
    ...actual,
    submitCareerApplication: vi.fn(),
  };
});

describe("Careers page", () => {
  beforeEach(() => {
    vi.mocked(submitCareerApplication).mockReset();
    vi.mocked(submitCareerApplication).mockResolvedValue({ success: true });
  });

  it("submits applicant details to the HR endpoint", async () => {
    render(
      <MemoryRouter>
        <Careers />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Sales Executive" },
    });
    fireEvent.change(screen.getByPlaceholderText(/years of experience/i), {
      target: { value: "3 years" },
    });
    fireEvent.change(screen.getByPlaceholderText(/cover letter/i), {
      target: { value: "I am excited to join your team." },
    });
    fireEvent.click(screen.getByLabelText(/i agree/i));
    fireEvent.click(screen.getByRole("button", { name: /submit application/i }));

    await waitFor(() => {
      expect(submitCareerApplication).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "9876543210",
        position: "Sales Executive",
        experience: "3 years",
        coverLetter: "I am excited to join your team.",
      });
    });
  });
});
