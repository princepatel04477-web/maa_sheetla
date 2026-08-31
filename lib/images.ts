// lib/images.ts
// Static configuration and manifest metadata for zero-CLS image rendering

export interface ImageDefinition {
  group: 'catalogue' | 'hero' | 'firms' | 'categories' | 'qc' | 'offices' | 'social';
  file: string;
  alt: string;
  status?: 'representative' | 'verified';
  aspect?: string;
  widths?: number[];
}

export const IMAGES: Record<string, ImageDefinition> = {
  'MS-8801': {
    group: 'catalogue',
    file: 'ms-8801-kanjivaram-tissue-silk-saree',
    alt: 'Pure mulberry tissue silk Kanjivaram saree with antique zari jacquard border and meenakari pallu',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'MS-8815': {
    group: 'catalogue',
    file: 'ms-8815-organza-hand-embroidered-saree',
    alt: 'Sheer silk organza saree with scalloped cutdana and pearl border and sequin butis',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'MS-9904': {
    group: 'catalogue',
    file: 'ms-9904-crimson-bridal-velvet-lehenga',
    alt: 'Crimson micro 9000 silk velvet bridal lehenga with dabka, zardozi and moti hand embellishment',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'MS-9922': {
    group: 'catalogue',
    file: 'ms-9922-mirrorwork-georgette-lehenga',
    alt: 'Emerald blooming georgette lehenga with glass mirrorwork and resham threadwork',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'MS-7701': {
    group: 'catalogue',
    file: 'ms-7701-chanderi-silk-anarkali-suit',
    alt: 'Handwoven pista green Chanderi silk Anarkali with gota patti and Kashmiri tilla neckline',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'MS-7718': {
    group: 'catalogue',
    file: 'ms-7718-velvet-pakistani-cut-suit',
    alt: 'Bottle green silk velvet Pakistani cut suit with antique gold wire cord embroidery',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'MS-6601': {
    group: 'catalogue',
    file: 'ms-6601-cape-indo-western-sharara',
    alt: 'Champagne silk crepe sharara set with organza cape and cutdana beadwork',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },

  'ST-4420': {
    group: 'catalogue',
    file: 'st-4420-banarasi-khaddi-georgette-saree',
    alt: 'Stacked viscose khaddi georgette Banarasi sarees with kadwa cutwork floral jaal',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'ST-4455': {
    group: 'catalogue',
    file: 'st-4455-dola-silk-foil-print-saree',
    alt: 'Teal heavy dola silk saree with metallic foil discharge print and zari border',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'ST-5510': {
    group: 'catalogue',
    file: 'st-5510-organza-floral-sangeet-lehenga',
    alt: 'Digitally printed organza sangeet lehenga with sequin belt and cancan flare',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'ST-3305': {
    group: 'catalogue',
    file: 'st-3305-cambric-chikankari-kurta-set',
    alt: 'Wholesale bundle of 60/60 cambric cotton kurta sets with chikankari and malmal dupatta',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },
  'ST-2208': {
    group: 'catalogue',
    file: 'st-2208-viscose-coord-set',
    alt: 'Folded viscose silk blend co-ord sets in graded colourways with foil accent detailing',
    status: 'representative',
    aspect: '4 / 5',
    widths: [800, 1200, 1600],
  },

  'HERO-HOME': {
    group: 'hero',
    file: 'home-loom-hall',
    alt: 'Rows of jacquard powerlooms on a Surat weaving floor with warp threads running in parallel',
    aspect: '21 / 9',
    widths: [1280, 1920, 2560],
  },
  'HERO-CRAFT': {
    group: 'hero',
    file: 'craft-inspection-floor',
    alt: 'Backlit fabric inspection tables on a textile quality control floor',
    aspect: '21 / 9',
    widths: [1280, 1920, 2560],
  },
  'HERO-REACH': {
    group: 'hero',
    file: 'reach-freight-dock',
    alt: 'Strapped textile cartons and bales stacked on a freight dispatch dock',
    aspect: '21 / 9',
    widths: [1280, 1920, 2560],
  },

  'FIRM-MS': {
    group: 'firms',
    file: 'desk-maa-sheetla',
    alt: 'Single length of antique zari brocade silk draped on dark stone',
    aspect: '1 / 1',
    widths: [700, 1000, 1400],
  },
  'FIRM-ST': {
    group: 'firms',
    file: 'desk-sunrise-fab-tex',
    alt: 'Colour graded wall of folded saree bolts stacked for wholesale dispatch',
    aspect: '1 / 1',
    widths: [700, 1000, 1400],
  },

  'CAT-01': {
    group: 'categories',
    file: 'cat-01-bridal-heritage-silks',
    alt: 'Kanjivaram tissue and Banarasi khaddi brocade silks layered on dark stone',
    aspect: '3 / 4',
    widths: [600, 900, 1200],
  },
  'CAT-02': {
    group: 'categories',
    file: 'cat-02-festive-sarees',
    alt: 'Dola silk, blooming georgette and organza festive saree fabrics fanned in overlapping bands',
    aspect: '3 / 4',
    widths: [600, 900, 1200],
  },
  'CAT-03': {
    group: 'categories',
    file: 'cat-03-embroidered-suits-kurtis',
    alt: 'Folded Chanderi, cambric cotton and Kashmiri tilla embroidered suit fabrics',
    aspect: '3 / 4',
    widths: [600, 900, 1200],
  },
  'CAT-04': {
    group: 'categories',
    file: 'cat-04-indo-western-garments',
    alt: 'Silk crepe and organza folded into structured geometry with a cutdana edged cape panel',
    aspect: '3 / 4',
    widths: [600, 900, 1200],
  },

  'QC-01': {
    group: 'qc',
    file: 'qc-01-warp-weft-density',
    alt: 'Brass pick glass magnifying the warp and weft interlacing of stretched silk',
    aspect: '1 / 1',
    widths: [600, 900, 1200],
  },
  'QC-02': {
    group: 'qc',
    file: 'qc-02-dye-lot-colorfastness',
    alt: 'Graded dye lot swatch cards beside a crockmeter rub testing apparatus',
    aspect: '1 / 1',
    widths: [600, 900, 1200],
  },
  'QC-03': {
    group: 'qc',
    file: 'qc-03-backlit-flaw-screening',
    alt: 'Embroidered silk stretched across a backlit inspection table revealing stitch structure',
    aspect: '1 / 1',
    widths: [600, 900, 1200],
  },
  'QC-04': {
    group: 'qc',
    file: 'qc-04-moisture-shield-carton',
    alt: 'Export carton packed with folded sarees inside a moisture barrier liner with strapping',
    aspect: '1 / 1',
    widths: [600, 900, 1200],
  },

  'OFFICE-SURAT': {
    group: 'offices',
    file: 'office-surat-hq',
    alt: 'Textile trading floor counter with stacked fabric sample books and swatch bundles',
    status: 'representative',
    aspect: '16 / 10',
    widths: [800, 1200, 1600],
  },
  'OFFICE-KANPUR': {
    group: 'offices',
    file: 'office-kanpur',
    alt: 'Wholesale cloth market corridor with shopfront counters at dusk',
    status: 'representative',
    aspect: '16 / 10',
    widths: [800, 1200, 1600],
  },
  'OFFICE-AHMEDABAD': {
    group: 'offices',
    file: 'office-ahmedabad',
    alt: 'First floor wholesale showroom interior with fabric racks along one wall',
    status: 'representative',
    aspect: '16 / 10',
    widths: [800, 1200, 1600],
  },
};

export function getImageSrcSet(key: string, ext: 'avif' | 'webp' | 'jpg'): string {
  const item = IMAGES[key];
  if (!item) return '';
  const widths = item.widths || [800, 1200];
  const base = `/img/${item.group}/${item.file}`;
  return widths.map(w => `${base}-${w}.${ext} ${w}w`).join(', ');
}

export function getImageFallbackUrl(key: string): string {
  const item = IMAGES[key];
  if (!item) return '';
  const widths = item.widths || [800, 1200];
  const largest = widths[widths.length - 1];
  return `/img/${item.group}/${item.file}-${largest}.jpg`;
}
