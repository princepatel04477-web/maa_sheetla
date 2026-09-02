export interface Product {
  id: string;
  designCode: string;
  title: string;
  firm: "Maa Sheetla" | "Sunrise Fab Tex";
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
    description: "Architectural temple border weave designed for high-end bridal showroom counters.",
    image: "/img/catalogue/ms-8801-kanjivaram-tissue-silk-saree-1200.jpg",
    featured: true,
  },
  {
    id: "st-sar-02",
    designCode: "ST-4420",
    title: "Banarasi Georgette Khaddi Saree",
    firm: "Sunrise Fab Tex",
    type: "sarees",
    fabric: "Viscose Khaddi Georgette",
    work: "Kadwa Cutwork Floral Jaal with Contrast Border",
    moq: "10 Pcs / Assorted",
    description: "Floor-ready weight and drape, packaged for swift volume turn on retail counters.",
    image: "/img/catalogue/st-4420-banarasi-khaddi-georgette-saree-1200.jpg",
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
    image: "/img/catalogue/ms-8815-organza-hand-embroidered-saree-1200.jpg",
  },
  {
    id: "st-sar-04",
    designCode: "ST-4455",
    title: "Surat Dola Silk Foil Printed Saree",
    firm: "Sunrise Fab Tex",
    type: "sarees",
    fabric: "Heavy Dola Silk",
    work: "Metallic Foil Discharge Print with Zari Border",
    moq: "12 Pcs / Box",
    description: "High-margin festive volume seller featuring wrinkle-resistant mill finish.",
    image: "/img/catalogue/st-4455-dola-silk-foil-print-saree-1200.jpg",
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
    image: "/img/catalogue/ms-9904-crimson-bridal-velvet-lehenga-1200.jpg",
    featured: true,
  },
  {
    id: "st-leh-02",
    designCode: "ST-5510",
    title: "Floral Printed Organza Sangeet Lehenga",
    firm: "Sunrise Fab Tex",
    type: "lehengas",
    fabric: "Digital Print Organza Silk",
    work: "Sequins Belt with Cancan-Infused 4.5m Flare",
    moq: "6 Pcs / Set",
    description: "Lightweight, bridesmaid-ready sangeet lehenga in seasonal summer pastels.",
    image: "/img/catalogue/st-5510-organza-floral-sangeet-lehenga-1200.jpg",
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
    image: "/img/catalogue/ms-9922-mirrorwork-georgette-lehenga-1200.jpg",
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
    description: "Graceful festive ensemble with block-printed dupatta and matching silk churidar.",
    image: "/img/catalogue/ms-7701-chanderi-silk-anarkali-suit-1200.jpg",
    featured: true,
  },
  {
    id: "st-sut-02",
    designCode: "ST-3305",
    title: "Heavy Cambric Cotton Straight Kurta Set",
    firm: "Sunrise Fab Tex",
    type: "suits",
    fabric: "60/60 Pure Cambric Cotton",
    work: "Machine Chikankari Embroidery with Malmal Dupatta",
    moq: "8 Pcs / Bundle",
    description: "High-frequency daily wear catalog with breathable summer-tested cotton yarns.",
    image: "/img/catalogue/st-3305-cambric-chikankari-kurta-set-1200.jpg",
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
    image: "/img/catalogue/ms-7718-velvet-pakistani-cut-suit-1200.jpg",
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
    description: "Contemporary fusion outfit for high-ticket showroom racks and cocktail events.",
    image: "/img/catalogue/ms-6601-cape-indo-western-sharara-1200.jpg",
    featured: true,
  },
  {
    id: "st-grm-02",
    designCode: "ST-2208",
    title: "Flared Ready-to-Wear Co-ord Set",
    firm: "Sunrise Fab Tex",
    type: "garments",
    fabric: "Viscose Silk Blend",
    work: "Minimalist Button Detailing with Foil Accents",
    moq: "12 Pcs / Size Assortment",
    description: "Floor-tested fast fashion ready garment designed for direct retail turnover.",
    image: "/img/catalogue/st-2208-viscose-coord-set-1200.jpg",
  }
];

export function getProductsByType(type: string): Product[] {
  return PRODUCTS.filter((p) => p.type === type.toLowerCase());
}

export function getProductsByFirm(firm: "Maa Sheetla" | "Sunrise Fab Tex"): Product[] {
  return PRODUCTS.filter((p) => p.firm === firm);
}
