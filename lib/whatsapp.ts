/**
 * WhatsApp lead routing helper for Maa Sheetla Agency & Sunrise Fab Tex.
 * Formats clean, contextual enquiry messages direct to the sales desks.
 */

export const OFFICE_NUMBERS = {
  surat: "919151003198",
  kanpur: "919151060273",
  ahmedabad: "919559650752",
  founder: "919616415615", // Manish Kanodia
  sales: "919559650752",   // Amit Agarwal
};

const DEFAULT_WHATSAPP_NUMBER = OFFICE_NUMBERS.surat;

export interface WhatsAppContextOptions {
  shopName?: string;
  city?: string;
  category?: string;
  firm?: "Maa Sheetla" | "Sunrise Tex Fab" | "Sunrise Fab Tex" | "Both";
  designCode?: string;
  targetNumber?: string;
}

export function createWhatsAppLink(context: string, options?: WhatsAppContextOptions): string {
  let message = `Hello Maa Sheetla Agency / Sunrise Fab Tex — I'm enquiring about ${context}.`;

  if (options?.designCode) {
    message += ` (Design: ${options.designCode})`;
  }
  if (options?.firm) {
    message += ` [Counter: ${options.firm}]`;
  }
  if (options?.shopName) {
    message += ` Shop: ${options.shopName}.`;
  }
  if (options?.city) {
    message += ` City: ${options.city}.`;
  }
  if (options?.category) {
    message += ` Category Interest: ${options.category}.`;
  }

  const phone = options?.targetNumber || DEFAULT_WHATSAPP_NUMBER;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
