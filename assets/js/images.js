// assets/js/images.js
export const IMAGES = {
  'MS-8801': {
    group: 'catalogue',
    file:  'ms-8801-kanjivaram-tissue-silk-saree',
    alt:   'Pure mulberry tissue silk Kanjivaram saree with antique zari jacquard border and meenakari pallu',
    status:'representative',
  },
  'MS-8815': { group:'catalogue', file:'ms-8815-organza-hand-embroidered-saree', alt:'Sheer silk organza saree with scalloped cutdana and pearl border and sequin butis', status:'representative' },
  'MS-9904': { group:'catalogue', file:'ms-9904-crimson-bridal-velvet-lehenga', alt:'Crimson micro 9000 silk velvet bridal lehenga with dabka, zardozi and moti hand embellishment', status:'representative' },
  'MS-9922': { group:'catalogue', file:'ms-9922-mirrorwork-georgette-lehenga', alt:'Emerald blooming georgette lehenga with glass mirrorwork and resham threadwork', status:'representative' },
  'MS-7701': { group:'catalogue', file:'ms-7701-chanderi-silk-anarkali-suit', alt:'Handwoven pista green Chanderi silk Anarkali with gota patti and Kashmiri tilla neckline', status:'representative' },
  'MS-7718': { group:'catalogue', file:'ms-7718-velvet-pakistani-cut-suit', alt:'Bottle green silk velvet Pakistani cut suit with antique gold wire cord embroidery', status:'representative' },
  'MS-6601': { group:'catalogue', file:'ms-6601-cape-indo-western-sharara', alt:'Champagne silk crepe sharara set with organza cape and cutdana beadwork', status:'representative' },

  'ST-4420': { group:'catalogue', file:'st-4420-banarasi-khaddi-georgette-saree', alt:'Stacked viscose khaddi georgette Banarasi sarees with kadwa cutwork floral jaal', status:'representative' },
  'ST-4455': { group:'catalogue', file:'st-4455-dola-silk-foil-print-saree', alt:'Teal heavy dola silk saree with metallic foil discharge print and zari border', status:'representative' },
  'ST-5510': { group:'catalogue', file:'st-5510-organza-floral-sangeet-lehenga', alt:'Digitally printed organza sangeet lehenga with sequin belt and cancan flare', status:'representative' },
  'ST-3305': { group:'catalogue', file:'st-3305-cambric-chikankari-kurta-set', alt:'Wholesale bundle of 60/60 cambric cotton kurta sets with chikankari and malmal dupatta', status:'representative' },
  'ST-2208': { group:'catalogue', file:'st-2208-viscose-coord-set', alt:'Folded viscose silk blend co-ord sets in graded colourways with foil accent detailing', status:'representative' },

  'HERO-HOME':  { group:'hero', file:'home-loom-hall',           alt:'Rows of jacquard powerlooms on a Surat weaving floor with warp threads running in parallel' },
  'HERO-CRAFT': { group:'hero', file:'craft-inspection-floor',   alt:'Backlit fabric inspection tables on a textile quality control floor' },
  'HERO-REACH': { group:'hero', file:'reach-freight-dock',       alt:'Strapped textile cartons and bales stacked on a dispatch dock' },

  'FIRM-MS': { group:'firms', file:'desk-maa-sheetla',     alt:'Single length of antique zari brocade silk draped on dark stone' },
  'FIRM-ST': { group:'firms', file:'desk-sunrise-fab-tex', alt:'Colour graded wall of folded saree bolts stacked for wholesale dispatch' },

  'CAT-01': { group:'categories', file:'cat-01-bridal-heritage-silks',    alt:'Kanjivaram tissue and Banarasi khaddi brocade silks layered on dark stone' },
  'CAT-02': { group:'categories', file:'cat-02-festive-sarees',           alt:'Dola silk, blooming georgette and organza festive saree fabrics fanned in overlapping bands' },
  'CAT-03': { group:'categories', file:'cat-03-embroidered-suits-kurtis', alt:'Folded Chanderi, cambric cotton and Kashmiri tilla embroidered suit fabrics' },
  'CAT-04': { group:'categories', file:'cat-04-indo-western-garments',    alt:'Silk crepe and organza folded into structured geometry with a cutdana edged cape panel' },

  'QC-01': { group:'qc', file:'qc-01-warp-weft-density',       alt:'Brass pick glass magnifying the warp and weft interlacing of stretched silk' },
  'QC-02': { group:'qc', file:'qc-02-dye-lot-colorfastness',   alt:'Graded dye lot swatch cards beside a crockmeter rub testing apparatus' },
  'QC-03': { group:'qc', file:'qc-03-backlit-flaw-screening',  alt:'Embroidered silk stretched across a backlit inspection table revealing stitch structure' },
  'QC-04': { group:'qc', file:'qc-04-moisture-shield-carton',  alt:'Export carton packed with folded sarees inside a moisture barrier liner with strapping' },

  'OFFICE-SURAT':     { group:'offices', file:'office-surat-hq',   alt:'Textile trading floor counter with stacked fabric sample books and swatch bundles', status:'representative' },
  'OFFICE-KANPUR':    { group:'offices', file:'office-kanpur',     alt:'Wholesale cloth market corridor with shopfront counters at dusk', status:'representative' },
  'OFFICE-AHMEDABAD': { group:'offices', file:'office-ahmedabad',  alt:'First floor wholesale showroom interior with fabric racks along one wall', status:'representative' },
};

const MANIFESTS = {};

export async function loadManifest(group) {
  if (!MANIFESTS[group]) {
    MANIFESTS[group] = await fetch(`/img/${group}/_manifest.json`).then(r => r.json());
  }
  return MANIFESTS[group];
}

/**
 * @param {string} key   key into IMAGES
 * @param {object} opts  { sizes, priority }
 */
export async function pictureHTML(key, { sizes = '100vw', priority = false } = {}) {
  const item = IMAGES[key];
  if (!item) throw new Error(`Unknown image key: ${key}`);

  const manifest = await loadManifest(item.group);
  const entry = manifest[item.file];
  const base = `/img/${item.group}/${item.file}`;

  const srcset = ext =>
    entry.widths.map(w => `${base}-${w}.${ext} ${w}w`).join(', ');

  const largest = entry.widths[entry.widths.length - 1];

  return `
<picture class="ms-pic">
  <source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}">
  <source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}">
  <img
    src="${base}-${largest}.jpg"
    srcset="${srcset('jpg')}"
    sizes="${sizes}"
    alt="${item.alt}"
    style="aspect-ratio:${entry.aspect};background-image:url('${entry.lqip}');"
    ${priority ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}
    decoding="async"
    onload="this.style.backgroundImage='none'"
    ${item.status ? `data-image-status="${item.status}"` : ''}>
</picture>`.trim();
}
