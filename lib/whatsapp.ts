/**
 * WhatsApp lead routing helper for Maa Sheetla Agency.
 * Formats clean, contextual enquiry messages direct to the sales desk.
 */

const WHATSAPP_NUMBER = "919825144001";

export interface WhatsAppContextOptions {
  shopName?: string;
  city?: string;
  category?: string;
  firm?: "Maa Sheetla" | "Sunrise Tex Fab" | "Both";
  designCode?: string;
}

export function createWhatsAppLink(context: string, options?: WhatsAppContextOptions): string {
  let message = `Hello Maa Sheetla Agency — I'm enquiring about ${context}.`;

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

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
