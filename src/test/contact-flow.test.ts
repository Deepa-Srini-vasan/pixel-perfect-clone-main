import { describe, expect, it } from "vitest";
import { buildInquiryWhatsAppMessage } from "../lib/api";

describe("buildInquiryWhatsAppMessage", () => {
  it("formats a compact enquiry summary for the central WhatsApp line", () => {
    const message = buildInquiryWhatsAppMessage({
      name: "Asha Kumar",
      email: "asha@example.com",
      phone: "+91 98765 43210",
      subject: "Product enquiry",
      message: "I need a quote for 100 units.",
    });

    expect(message).toContain("New Enquiry from Euro Plumber Tech");
    expect(message).toContain("Asha Kumar");
    expect(message).toContain("+91 98765 43210");
    expect(message).toContain("Product enquiry");
    expect(message).toContain("I need a quote for 100 units.");
  });
});
