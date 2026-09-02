/**
 * WhatsApp lead routing helper for Maa Sheetla Agency & Sunrise Fab Tex Adat.
 * Formats clean, contextual enquiry messages direct to the sales desks.
 */

export const OFFICE_NUMBERS = {
  surat: "919151003198",
  surat_alt: "919151060271",
  kanpur: "919151060273",
  ahmedabad: "919559650752",
  founder: "919616415615", // Manish Kanodia
  saurabh: "919151060276", // Saurabh Chawla
  vatsal: "919151060277",  // Vatsal Jain
};

const DEFAULT_WHATSAPP_NUMBER = OFFICE_NUMBERS.surat;

export interface WhatsAppContextOptions {
  shopName?: string;
  city?: string;
  category?: string;
  firm?: "Maa Sheetla" | "Sunrise Fab Tex" | "Sunrise Fab Tex Adat" | "Both";
  designCode?: string;
  targetNumber?: string;
}

export function createWhatsAppLink(context: string, options?: WhatsAppContextOptions): string {
  let message = `Hello Maa Sheetla Agency / Sunrise Fab Tex Adat — I'm enquiring about ${context}.`;

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
