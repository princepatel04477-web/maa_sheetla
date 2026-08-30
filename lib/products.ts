export interface Product {
  id: string;
  designCode: string;
  title: string;
  firm: "Maa Sheetla" | "Sunrise Tex Fab";
  type: "sarees" | "lehengas" | "suits" | "garments";
  fabric: string;
  work: string;
  moq: string;
  description: string;
  image: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // SAREES
  {
    id: "ms-sar-01",
    designCode: "MS-8801",
    title: "Kanjivaram Tissue Silk Saree",
    firm: "Maa Sheetla",
    type: "sarees",
    fabric: "Pure Mulberry Tissue Silk",
    work: "Heavy Antique Zari Jacquard Weave with Meenakari Pallu",
    moq: "6 Pcs / Set",
    description: "Architectural temple border weave designed for high-end boutique bridal counters.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    featured: true,
  },
  {
    id: "st-sar-02",
    designCode: "ST-4420",
    title: "Banarasi Georgette Khaddi Saree",
    firm: "Sunrise Tex Fab",
    type: "sarees",
    fabric: "Viscose Khaddi Georgette",
    work: "Kadwa Cutwork Floral Jaal with Contrast Border",
    moq: "10 Pcs / Assorted",
    description: "Floor-ready weight and drape, packaged for swift volume turn on retail counters.",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=85",
    featured: true,
  },
  {
    id: "ms-sar-03",
    designCode: "MS-8815",
    title: "Pure Organza Hand-Embroidered Saree",
    firm: "Maa Sheetla",
    type: "sarees",
    fabric: "Sheer Silk Organza",
    work: "Scalloped Cutdana & Pearl Border with Sequin Butis",
    moq: "4 Pcs / Set",
    description: "Delicate pastel hues finished with artisanal needlework for luxury evening collections.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "st-sar-04",
    designCode: "ST-4455",
    title: "Surat Dola Silk Foil Printed Saree",
    firm: "Sunrise Tex Fab",
    type: "sarees",
    fabric: "Heavy Dola Silk",
    work: "Metallic Foil Discharge Print with Zari Border",
    moq: "12 Pcs / Box",
    description: "High-margin festive volume seller featuring wrinkle-resistant mill finish.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
  },

  // LEHENGAS
  {
    id: "ms-leh-01",
    designCode: "MS-9904",
    title: "Heritage Crimson Bridal Velvet Lehenga",
    firm: "Maa Sheetla",
    type: "lehengas",
    fabric: "Micro 9000 Silk Velvet",
    work: "Handcrafted Dabka, Zardozi & Moti Embellishment (16 Kali Flare)",
    moq: "2 Pcs / Design",
    description: "Grand bridal masterpiece with double dupatta styling for marquee showroom windows.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85",
    featured: true,
  },
  {
    id: "st-leh-02",
    designCode: "ST-5510",
    title: "Floral Printed Organza Sangeet Lehenga",
    firm: "Sunrise Tex Fab",
    type: "lehengas",
    fabric: "Digital Print Organza Silk",
    work: "Sequins Belt with Cancan-Infused 4.5m Flare",
    moq: "6 Pcs / Set",
    description: "Lightweight, bridesmaid-ready sangeet lehenga in seasonal summer pastels.",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "ms-leh-03",
    designCode: "MS-9922",
    title: "Mirrorwork Georgette Festive Lehenga",
    firm: "Maa Sheetla",
    type: "lehengas",
    fabric: "Pure 60g Blooming Georgette",
    work: "Original Glass Mirror & Resham Threadwork",
    moq: "3 Pcs / Set",
    description: "Premium party-wear silhouette with handcrafted tassel latkans and heavy border.",
    image: "https://images.unsplash.com/photo-1610030469854-c9c0f9ea0465?auto=format&fit=crop&w=1000&q=85",
  },

  // SUITS
  {
    id: "ms-sut-01",
    designCode: "MS-7701",
    title: "Pure Chanderi Silk Anarkali Suit",
    firm: "Maa Sheetla",
    type: "suits",
    fabric: "Handwoven Chanderi & Organza Dupatta",
    work: "Gota Patti & Kashmiri Tilla Neckline",
    moq: "4 Pcs / Set",
    description: "Graceful boutique ensemble with block-printed dupatta and matching silk churidar.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
    featured: true,
  },
  {
    id: "st-sut-02",
    designCode: "ST-3305",
    title: "Heavy Cambric Cotton Straight Kurta Set",
    firm: "Sunrise Tex Fab",
    type: "suits",
    fabric: "60/60 Pure Cambric Cotton",
    work: "Machine Chikankari Embroidery with Malmal Dupatta",
    moq: "8 Pcs / Bundle",
    description: "High-frequency daily wear catalog with breathable summer-tested cotton yarns.",
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "ms-sut-03",
    designCode: "MS-7718",
    title: "Velvet Winter Pakistani Cut Suit",
    firm: "Maa Sheetla",
    type: "suits",
    fabric: "Royal Silk Velvet",
    work: "Intricate Antique Gold Wire Cord Embroidery",
    moq: "4 Pcs / Set",
    description: "Luxury seasonal winter line tailored for premium North Indian wedding attendees.",
    image: "https://images.unsplash.com/photo-1596783049581-995155f9a65f?auto=format&fit=crop&w=1000&q=85",
  },

  // GARMENTS
  {
    id: "ms-grm-01",
    designCode: "MS-6601",
    title: "Cape Indo-Western Jacket & Sharara",
    firm: "Maa Sheetla",
    type: "garments",
    fabric: "Silk Crepe & Organza Cape",
    work: "Cutdana Beadwork with Scalloped Embroidery",
    moq: "4 Pcs / Assorted Sizes (M-XXL)",
    description: "Contemporary fusion outfit for high-ticket boutique racks and cocktail events.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85",
    featured: true,
  },
  {
    id: "st-grm-02",
    designCode: "ST-2208",
    title: "Flared Ready-to-Wear Co-ord Set",
    firm: "Sunrise Tex Fab",
    type: "garments",
    fabric: "Viscose Silk Blend",
    work: "Minimalist Button Detailing with Foil Accents",
    moq: "12 Pcs / Size Assortment",
    description: "Floor-tested fast fashion ready garment designed for direct boutique turnover.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
  }
];

export function getProductsByType(type: string): Product[] {
  return PRODUCTS.filter((p) => p.type === type.toLowerCase());
}

export function getProductsByFirm(firm: "Maa Sheetla" | "Sunrise Tex Fab"): Product[] {
  return PRODUCTS.filter((p) => p.firm === firm);
}
