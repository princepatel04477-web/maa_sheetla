# ANTIGRAVITY BUILD ORDER
## Maa Sheetla Agency & Sunrise Fab Tex — Full Image System Rebuild

**Target repo:** the site currently deployed at `https://maa-sheetla.pages.dev/` (Cloudflare Pages, plain HTML/CSS/vanilla JS)
**Scope:** replace all third-party stock imagery, generate a proprietary image set, and install a production image pipeline (AVIF/WebP/JPEG + srcset + LQIP + CLS-safe layout).
**Mode:** execute end to end. Produce real files. No placeholders, no TODOs, no commented-out stubs.

---

# PART 0 — CURRENT STATE (verified by crawl, 2026-08-31)

## 0.1 What exists today

| Asset | Path | Status |
|---|---|---|
| Maa Sheetla logo | `/logos/maa_sheetla_gold.png` | Local, keep |
| Sunrise Fab Tex logo | `/logos/sunrise_fab_tex_colored.png` | Local, keep |
| 12 product photos | `images.unsplash.com/photo-*` | **Hotlinked third-party. Replace all.** |

## 0.2 Every image currently on the site

**`/firms/maa-sheetla` — 7 cards, all hotlinked:**

| Code | Caption | Current URL fragment |
|---|---|---|
| MS-8801 | Kanjivaram Tissue Silk Saree | `photo-1610030469983-98e550d6193c` |
| MS-8815 | Pure Organza Hand-Embroidered Saree | `photo-1609357605129-26f69add5d6e` |
| MS-9904 | Heritage Crimson Bridal Velvet Lehenga | `photo-1594633312681-425c7b97ccd1` |
| MS-9922 | Mirrorwork Georgette Festive Lehenga | `photo-1610030469854-c9c0f9ea0465` |
| MS-7701 | Pure Chanderi Silk Anarkali Suit | `photo-1551488831-00ddcb6c6bd3` |
| MS-7718 | Velvet Winter Pakistani Cut Suit | `photo-1596783049581-995155f9a65f` |
| MS-6601 | Cape Indo-Western Jacket & Sharara | `photo-1572804013309-59a88b7e92f1` |

**`/firms/sunrise-tex-fab` — 5 cards, all hotlinked:**

| Code | Caption | Current URL fragment |
|---|---|---|
| ST-4420 | Banarasi Georgette Khaddi Saree | `photo-1583391733956-6c78276477e2` |
| ST-4455 | Surat Dola Silk Foil Printed Saree | `photo-1617627143750-d86bc21e42bb` |
| ST-5510 | Floral Printed Organza Sangeet Lehenga | `photo-1585487000160-6ebcfceb0d03` |
| ST-3305 | Heavy Cambric Cotton Straight Kurta Set | `photo-1563178406-4cdc2923acbc` |
| ST-2208 | Flared Ready-to-Wear Co-ord Set | `photo-1515886657613-9f3515b0c78f` |

**Pages with no photography at all — image slots must be created:**
- `/` — hero, both firm cards, the four sourcing-discipline cards, the Ahmedabad expansion band
- `/craft` — hero and all four QC steps
- `/reach` — hero
- `/contact` — three office cards

## 0.3 The four defects to fix

1. **Caption/image mismatch.** MS-7701 and ST-2208 in particular show Western fashion stock under Indian textile captions. A boutique buyer reading "Pure Chanderi, gota patti neckline" and seeing a linen blazer stops trusting the rate card.
2. **No visual system.** Twelve photographers, twelve backgrounds, twelve white balances, twelve crops. The cards sit in a near-black UI (`#0C0A0E`) but half the photos have blown-out white backgrounds that punch holes in the layout.
3. **Third-party runtime dependency.** Every card is a blocking request to `images.unsplash.com`. No control over LCP, no cache headers, no fallback, and an outage takes the catalogue down.
4. **Empty pages.** The trust-building pages — QC floor, logistics, offices — carry the highest conversion weight for a B2B agency and have no imagery whatsoever.

---

# PART 1 — ART DIRECTION (binding rules — do not deviate)

## 1.1 The governing decision: fabric as object, not fashion editorial

**Do not generate model photography.** No faces, no hands, no full-body figures.

Two reasons, both hard:

- **Generation quality.** AI models reliably fail on Indian ethnic wear — warped zari repeats, moiré in jaal patterns, melted mirror-work, wrong dupatta drape physics, uncanny hands near embroidery. A single bad hand kills the premium read instantly.
- **Buyer intent.** This is a B2B commission agency. The buyer is a boutique owner deciding whether to book a rate card. They want to see **weave, zari density, drape weight, and finish** — not styling. Fabric-forward photography is both easier to generate flawlessly and more commercially persuasive.

Permitted subjects: draped fabric, pooled fabric, folded bolts, fabric on a matte black tailoring form cropped below the neckline, macro weave detail, loom hardware, swatch cards, packed cartons.

## 1.2 STYLE_BLOCK — append to every single generation call

```
Shot on a full-frame camera, 85mm lens at f/5.6, tripod, studio setting.
Single large softbox positioned 45 degrees camera-left, silver bounce card
camera-right, deep controlled falloff into a seamless matte charcoal
backdrop (#0C0A0E to #1A1619 gradient). Specular highlights are warm
champagne-gold (#C9A961 family) catching metallic thread without clipping.
Neutral warm-neutral white balance, no magenta or cyan cast. Colours are
rich but restrained, never oversaturated. Fine natural film grain, no HDR,
no digital sharpening halos, no plastic sheen. Fabric texture is the
subject: individual threads, weave grain, and the nap of the pile are
resolvable. Subject occupies the central 70 percent of the frame with
clean negative space at the top for a text overlay. Editorial trade
catalogue photography, quiet and expensive.
```

## 1.3 NEGATIVE_BLOCK — append to every single generation call

```
human face, human hands, eyes, person, model, mannequin head, skin,
text, lettering, typography, watermark, logo, signature, brand mark,
white background, seamless white studio, harsh on-camera flash,
oversaturated, HDR, neon colours, plastic sheen, CGI render, 3D render,
illustration, painting, cartoon, blurry, out of focus, low resolution,
jpeg artifacts, moiré, warped pattern, duplicated motif, melted
embroidery, extra limbs, western business attire, blazer, denim,
tilted horizon, heavy vignette, lens flare, bokeh balls, cluttered
background, props, flowers, fairy lights
```

## 1.4 Desk differentiation — the system-level rule

The two firms must be visually distinguishable at a glance in the card grid:

- **Maa Sheetla (label desk):** a *single* piece, isolated, deep shadow, generous negative space. Slow and precious. Signals exclusivity and territorial protection.
- **Sunrise Fab Tex (volume desk):** the *same* fabric shown as a stack, a fanned set of colourways, or a carton-ready bundle. Slightly brighter key, tighter framing. Signals dependable weekly supply and margin.

This single rule does more for the brand than any individual photo.

## 1.5 Aspect ratios and output sizes

| Slot | Ratio | Master render | Delivered widths |
|---|---|---|---|
| Catalogue cards | 4:5 | 1600 × 2000 | 800 / 1200 / 1600 |
| Category cards | 3:4 | 1200 × 1600 | 600 / 900 / 1200 |
| Firm cards | 1:1 | 1400 × 1400 | 700 / 1000 / 1400 |
| Page heroes | 21:9 | 2560 × 1100 | 1280 / 1920 / 2560 |
| QC step tiles | 1:1 | 1200 × 1200 | 600 / 900 / 1200 |
| Office cards | 16:10 | 1600 × 1000 | 800 / 1200 / 1600 |
| OG / social | 1.91:1 | 1200 × 630 | 1200 |

---

# PART 2 — ASSET MANIFEST

Create this tree under `/public/img/`. Every entry ships in `.avif`, `.webp`, and `.jpg`, at each width in the table above, plus a `-lqip.txt` file holding a base64 data URI.

```
public/img/
├── catalogue/
│   ├── ms-8801-kanjivaram-tissue-silk-saree.*
│   ├── ms-8815-organza-hand-embroidered-saree.*
│   ├── ms-9904-crimson-bridal-velvet-lehenga.*
│   ├── ms-9922-mirrorwork-georgette-lehenga.*
│   ├── ms-7701-chanderi-silk-anarkali-suit.*
│   ├── ms-7718-velvet-pakistani-cut-suit.*
│   ├── ms-6601-cape-indo-western-sharara.*
│   ├── st-4420-banarasi-khaddi-georgette-saree.*
│   ├── st-4455-dola-silk-foil-print-saree.*
│   ├── st-5510-organza-floral-sangeet-lehenga.*
│   ├── st-3305-cambric-chikankari-kurta-set.*
│   └── st-2208-viscose-coord-set.*
├── hero/
│   ├── home-loom-hall.*
│   ├── craft-inspection-floor.*
│   └── reach-freight-dock.*
├── firms/
│   ├── desk-maa-sheetla.*
│   └── desk-sunrise-fab-tex.*
├── categories/
│   ├── cat-01-bridal-heritage-silks.*
│   ├── cat-02-festive-sarees.*
│   ├── cat-03-embroidered-suits-kurtis.*
│   └── cat-04-indo-western-garments.*
├── qc/
│   ├── qc-01-warp-weft-density.*
│   ├── qc-02-dye-lot-colorfastness.*
│   ├── qc-03-backlit-flaw-screening.*
│   └── qc-04-moisture-shield-carton.*
├── offices/
│   ├── office-surat-hq.*
│   ├── office-kanpur.*
│   └── office-ahmedabad.*
└── social/
    └── og-default.jpg
```

---

# PART 3 — IMAGE GENERATION PROMPTS

**How to run each one:**
`final_prompt = SUBJECT + " " + STYLE_BLOCK`
`negative_prompt = NEGATIVE_BLOCK`

Generate at the master render size from §1.5. If the generator returns a soft or malformed result, regenerate rather than upscaling — reject anything with warped repeats in a jaal or jacquard pattern, since those are the first thing a textile buyer's eye lands on.

---

## 3.1 CATALOGUE — Maa Sheetla desk (single-piece treatment, 4:5)

**MS-8801 · Kanjivaram Tissue Silk Saree**
> SUBJECT: A pure mulberry tissue silk Kanjivaram saree in deep ochre-gold, draped over a matte black tailoring form and pooling onto a slab of grey kota stone. The heavy antique zari jacquard border runs diagonally through the frame; the meenakari pallu is folded forward so the contrast maroon and peacock-blue weft figuring reads clearly. The tissue ground has a faint metallic shimmer where the light rakes across it.

**MS-8815 · Pure Organza Hand-Embroidered Saree**
> SUBJECT: A sheer ivory silk organza saree suspended in a soft fall, lit from behind and slightly to the side so the translucency of the ground fabric glows and the layers behind read as ghosted shadow. A scalloped cutdana and seed-pearl border traces the lower edge; scattered sequin butis catch pinpoint highlights across the body. Blush and pale champagne tones only.

**MS-9904 · Heritage Crimson Bridal Velvet Lehenga**
> SUBJECT: A deep crimson micro-9000 silk velvet bridal lehenga skirt arranged in a wide sixteen-panel flare on dark stone, photographed slightly from above. The nap of the velvet is clearly visible, shifting from dark to bright where the pile direction changes. Dense hand dabka, zardozi and moti embellishment in antique gold covers the hem border, catching hard specular glints.

**MS-9922 · Mirrorwork Georgette Festive Lehenga**
> SUBJECT: An emerald-green sixty-gram blooming georgette lehenga in soft gathered folds, shot at a low three-quarter angle. Real round glass mirrors set in rani-pink resham threadwork are scattered across the panels, each mirror throwing a small hard reflection. The georgette falls in fluid vertical columns showing the fabric's light weight.

**MS-7701 · Pure Chanderi Silk Anarkali Suit**
> SUBJECT: A handwoven pista-green Chanderi silk Anarkali kurta on a matte black tailoring form, cropped at the shoulder line, with a matching sheer organza dupatta draped across the frame. The Chanderi's characteristic fine ribbed ground and small woven butis are resolvable. Gota patti and Kashmiri tilla embroidery in muted gold outlines the neckline placket.

**MS-7718 · Velvet Winter Pakistani Cut Suit**
> SUBJECT: A bottle-green royal silk velvet suit in Pakistani cut, laid flat and slightly folded on dark stone. Intricate antique gold wire cord embroidery runs across the yoke and down the front panel in a dense scrolling pattern. The velvet reads deep and light-absorbing, with the cord work standing proud of the surface in raised relief.

**MS-6601 · Cape Indo-Western Jacket & Sharara**
> SUBJECT: A champagne silk-crepe sharara set with a sheer organza cape, arranged as a flat-lay composition on dark stone — the cape layered over the sharara so both fabrics are legible. Cutdana beadwork and scalloped embroidery edge the cape hem. Ivory and warm champagne palette, structured and architectural rather than soft.

---

## 3.2 CATALOGUE — Sunrise Fab Tex desk (volume treatment, 4:5)

**ST-4420 · Banarasi Georgette Khaddi Saree**
> SUBJECT: Five viscose khaddi georgette Banarasi sarees folded into neat stacked bolts and fanned so each colourway edge is visible — rani pink, bottle green, mustard, wine, and teal. The top saree is partly unfolded to reveal a kadwa cutwork floral jaal with a contrast woven border. Slightly brighter key light than isolated single-piece work, shot straight on.

**ST-4455 · Surat Dola Silk Foil Printed Saree**
> SUBJECT: A heavy teal dola silk saree with metallic foil discharge print, shown as a folded carton-ready bundle with two additional colourways stacked beneath. The foil print catches the light in broken metallic flashes across the surface; a mustard zari border edges the top fold. Commercial and abundant rather than precious.

**ST-5510 · Floral Printed Organza Sangeet Lehenga**
> SUBJECT: A lilac and peach digitally printed organza lehenga skirt in full circular flare, supported by cancan underlayers so the four-and-a-half metre sweep holds its volume. A sequinned belt sits at the waist catching sharp highlights. The digital floral print is crisp and continuous with no pattern break. Two folded colourways stacked at the edge of frame.

**ST-3305 · Heavy Cambric Cotton Straight Kurta Set**
> SUBJECT: A stack of eight folded sixty-by-sixty cambric cotton kurta sets in ivory, indigo, sage and dusty rose, bundled as a wholesale lot with a fine malmal dupatta draped loosely over the top of the pile. The top piece shows machine chikankari embroidery across the yoke. Matte cotton texture, no sheen, warm even light.

**ST-2208 · Flared Ready-to-Wear Co-ord Set**
> SUBJECT: A slate-grey viscose silk blend co-ord set folded on a flat surface with three additional colourways — rust, olive, and charcoal — stacked in a graduated pile beside it. Minimal button detailing and subtle foil accent panels are visible on the top garment. The viscose has a soft fluid drape and low satin sheen.

---

## 3.3 PAGE HEROES (21:9, 2560 × 1100)

**HERO-HOME · `home-loom-hall`**
> SUBJECT: A wide interior of a Surat powerloom hall, photographed on a long lens so the rows of jacquard looms compress into deep repeating perspective. Thousands of warp threads run in taut parallel lines through the frame, lit from the side so they read as fine luminous gold filaments against the dark machinery. Industrial, vast, and quiet. Absolutely no people. Deep shadow occupies the left third for headline text.

**HERO-CRAFT · `craft-inspection-floor`**
> SUBJECT: A wide view of a fabric inspection floor at night — long backlit inspection tables running into the distance, each glowing softly from beneath, with lengths of silk fed across them. Rolled fabric bolts stand racked along the far wall in shadow. The light sources are the tables themselves. No people.

**HERO-REACH · `reach-freight-dock`**
> SUBJECT: A wide view of a textile freight dispatch dock at night. Heavy corrugated cartons and strapped fabric bales are stacked in disciplined rows on a loading platform, wrapped in moisture-barrier film that catches a cold sheen. Warm sodium dock lighting rakes in from camera-right against deep blue-black darkness. No people, no visible signage.

---

## 3.4 FIRM CARDS (1:1, 1400 × 1400)

**FIRM-01 · `desk-maa-sheetla`**
> SUBJECT: A single length of heavy antique-zari brocade silk in deep maroon and gold, draped in one elegant fold across dark stone, isolated in a pool of light with the surrounding frame falling to near black. Extreme restraint, one object, deep negative space.

**FIRM-02 · `desk-sunrise-fab-tex`**
> SUBJECT: A dense wall of folded saree bolts stacked in colour-graded rows filling the entire frame — pinks through ochres through greens — shot straight on so the stack reads as commercial abundance and reliable supply. Even light across the whole plane.

---

## 3.5 SOURCING CATEGORY CARDS (3:4, 1200 × 1600)

**CAT-01 · `cat-01-bridal-heritage-silks`**
> SUBJECT: A macro-scale detail of pure Kanjivaram tissue silk and Banarasi khaddi brocade layered over each other on dark stone, the heavy antique zari border of one running across the shimmering ground of the other. Deep maroon, ochre and gold. Weave structure fully resolvable.

**CAT-02 · `cat-02-festive-sarees`**
> SUBJECT: Three festive saree fabrics fanned in overlapping diagonal bands — dola silk with metallic foil print, blooming georgette, and sheer organza with sequin butis. Teal, rani pink and champagne. Each fabric's distinct surface behaviour is visible where the light rakes across.

**CAT-03 · `cat-03-embroidered-suits-kurtis`**
> SUBJECT: A flat-lay of folded unstitched suit fabric — pure Chanderi, sixty-by-sixty cambric cotton, and a Kashmiri tilla embroidered panel — arranged in overlapping rectangles on dark stone. Pastel pista, ivory and powder blue against the dark ground. Matte cotton and fine silk textures contrasted.

**CAT-04 · `cat-04-indo-western-garments`**
> SUBJECT: A structured flat-lay of silk crepe and organza in champagne and ivory, folded into sharp architectural geometry with a scalloped cutdana-edged cape panel laid across the composition. Modern, clean, minimal.

---

## 3.6 QC STEP TILES (1:1, 1200 × 1200)

**QC-01 · `qc-01-warp-weft-density`**
> SUBJECT: An extreme macro of a brass pick-glass magnifier resting on stretched silk fabric, the weave grid magnified sharply within the lens showing individual warp and weft interlacings. A steel loom reed with taut parallel threads sits just behind, out of focus. Cool metal against warm silk.

**QC-02 · `qc-02-dye-lot-colorfastness`**
> SUBJECT: A fanned deck of dyed fabric swatch cards in graded tonal steps of a single crimson, laid beside a laboratory crockmeter rub-testing apparatus with a small white test cloth mounted in its arm. Clinical and precise, lit clean and even.

**QC-03 · `qc-03-backlit-flaw-screening`**
> SUBJECT: A length of embroidered silk stretched over a glowing backlit inspection table, photographed from directly above. The transmitted light reveals the embroidery's stitch structure as dark silhouette and makes any needle skip or slub visible as a bright point. Strong luminous white table against surrounding darkness.

**QC-04 · `qc-04-moisture-shield-carton`**
> SUBJECT: A heavy-duty corrugated export carton, open at the top, packed with folded sarees sealed inside a clear moisture-barrier polythene liner. Plastic strapping bands cross the exterior. Two sealed cartons are stacked behind in shadow. Plain unmarked kraft cardboard, no printing or labels.

---

## 3.7 OFFICE CARDS (16:10, 1600 × 1000)

> **Read this before generating.** These three slots represent real, physically addressed premises — H-32 India Market Salabatpura, Shiv Market Kanpur, and New Cloth Market Ahmedabad. Generated images of buildings the company does not occupy are a misrepresentation a visiting buyer will catch. **Ask the client for real photographs of all three floors first.**
>
> If the client cannot supply them before launch, generate the images below — which depict *trade-district context*, not the specific premises — and render them with the caption "Trade district" rather than an office name. Swap in real photography as soon as it exists; the manifest in Part 4 makes this a one-line change per office.

**OFFICE-01 · `office-surat-hq`**
> SUBJECT: Interior of a textile trading floor office at dusk — a long wooden counter with stacked fabric sample books and rolled swatch bundles, filing ledgers on shelving behind, warm tungsten desk lighting. Working and unglamorous but orderly. No people, no signage, no text.

**OFFICE-02 · `office-kanpur`**
> SUBJECT: A narrow wholesale cloth market corridor at dusk, shopfront shutters lining both sides, bolts of fabric visible stacked inside one open counter. Warm ambient street light, deep perspective down the lane. No people, no readable signage.

**OFFICE-03 · `office-ahmedabad`**
> SUBJECT: A first-floor wholesale showroom interior with a polished floor, a long low display bench, and racks of folded fabric receding along one wall. Cool daylight from a window at frame-left, warm interior light at frame-right. Empty, calm, no people, no text.

---

## 3.8 SOCIAL (1.91:1, 1200 × 630)

**OG-DEFAULT · `og-default`**
> SUBJECT: A close diagonal composition of heavy gold antique-zari brocade silk against deep charcoal, occupying the right two-thirds of the frame, with the left third falling to near-black flat shadow. Composed specifically to leave the left third clear for a logo lockup to be composited on afterwards.

*After generating, composite `/logos/maa_sheetla_gold.png` into the cleared left third at 30 percent frame width, vertically centred. Do not ask the image model to render the logo or any text.*

---

# PART 4 — CODE IMPLEMENTATION

## 4.1 Read the existing tokens first

Open the site's main stylesheet and read the `:root` block. Use the project's real custom properties throughout. Observed values, to be used only as fallbacks if a token is genuinely absent:

```css
--bg:        #0C0A0E;   /* confirmed from meta[name="theme-color"] */
--gold:      #C9A961;
--bone:      #EDE9E0;
--hairline:  #1F1F22;
```

Do not introduce new colour values.

## 4.2 Derivative build script

Create `scripts/build-images.mjs`. Place master renders in `assets/masters/<group>/<name>.png`.

```js
// scripts/build-images.mjs
// Usage: node scripts/build-images.mjs
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC  = 'assets/masters';
const OUT  = 'public/img';

const WIDTHS = {
  catalogue:  [800, 1200, 1600],
  categories: [600, 900, 1200],
  firms:      [700, 1000, 1400],
  hero:       [1280, 1920, 2560],
  qc:         [600, 900, 1200],
  offices:    [800, 1200, 1600],
  social:     [1200],
};

const FORMATS = [
  ['avif', { quality: 55, effort: 6 }],
  ['webp', { quality: 78 }],
  ['jpg',  { quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' }],
];

for (const group of await readdir(SRC)) {
  const widths = WIDTHS[group];
  if (!widths) { console.warn(`skip unknown group: ${group}`); continue; }

  await mkdir(join(OUT, group), { recursive: true });
  const manifest = {};

  for (const file of await readdir(join(SRC, group))) {
    const { name } = parse(file);
    const input = join(SRC, group, file);
    const meta = await sharp(input).metadata();

    for (const w of widths) {
      for (const [fmt, opts] of FORMATS) {
        const ext = fmt === 'jpg' ? 'jpeg' : fmt;
        await sharp(input)
          .resize({ width: w, withoutEnlargement: true })
          .toFormat(ext, opts)
          .toFile(join(OUT, group, `${name}-${w}.${fmt}`));
      }
    }

    // LQIP: 20px wide blurred WebP as a data URI
    const lqip = await sharp(input)
      .resize({ width: 20 })
      .blur(1.2)
      .webp({ quality: 20 })
      .toBuffer();

    manifest[name] = {
      widths,
      aspect: `${meta.width} / ${meta.height}`,
      lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
    };
    console.log(`built ${group}/${name}`);
  }

  await writeFile(
    join(OUT, group, '_manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}
```

Add to `package.json`:
```json
{ "scripts": { "images": "node scripts/build-images.mjs" },
  "devDependencies": { "sharp": "^0.33.0" } }
```

## 4.3 Central image manifest

Create `assets/js/images.js`. This is the single source of truth — every image reference in the site resolves through it, so swapping a generated image for a real photograph later is a one-line change.

```js
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
  'HERO-REACH': { group:'hero', file:'reach-freight-dock',       alt:'Strapped textile cartons and bales stacked on a freight dispatch dock' },

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
```

## 4.4 Picture element renderer

Add to `assets/js/images.js`:

```js
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
```

## 4.5 CSS

```css
.ms-pic { display: block; position: relative; overflow: hidden; }

.ms-pic img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  transition: opacity .4s ease;
}

/* Seat images into the dark UI: gold hairline + inner falloff so no
   photo edge cuts a hard rectangle out of the page background. */
.card-media {
  position: relative;
  border: 1px solid var(--hairline, #1F1F22);
  border-radius: 2px;
  overflow: hidden;
}
.card-media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 -80px 90px -40px var(--bg, #0C0A0E);
  border-top: 1px solid rgb(201 169 97 / .14);
}

/* Ratio locks — prevent CLS before the manifest resolves. */
.card-media--catalogue { aspect-ratio: 4 / 5; }
.card-media--category  { aspect-ratio: 3 / 4; }
.card-media--firm      { aspect-ratio: 1 / 1; }
.card-media--qc        { aspect-ratio: 1 / 1; }
.card-media--office    { aspect-ratio: 16 / 10; }
.hero-media            { aspect-ratio: 21 / 9; }

@media (prefers-reduced-motion: reduce) {
  .ms-pic img { transition: none; }
}
```

## 4.6 Page-by-page changes

**All pages** — delete every `images.unsplash.com` reference. Grep to confirm zero remain.

**`/firms/maa-sheetla` and `/firms/sunrise-tex-fab`**
Replace each card's `<img>` with the rendered picture. Sizes attribute:
`sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"`
Wrap in `<div class="card-media card-media--catalogue">`. First two cards in the grid get `priority: true`; the rest lazy-load.

**`/` (homepage)**
- Insert `HERO-HOME` behind the hero block, `priority: true`, `sizes="100vw"`, with a `linear-gradient` scrim overlay so the existing headline keeps contrast. Add to `<head>`:
  `<link rel="preload" as="image" href="/img/hero/home-loom-hall-1920.avif" type="image/avif" imagesrcset="..." imagesizes="100vw">`
- Add `FIRM-MS` and `FIRM-ST` to the two firm cards, `card-media--firm`.
- Add `CAT-01`…`CAT-04` to the four sourcing-discipline cards, `card-media--category`.

**`/craft`**
- `HERO-CRAFT` behind the hero, `priority: true`.
- `QC-01`…`QC-04` on the four inspection steps, `card-media--qc`, lazy.

**`/reach`**
- `HERO-REACH` behind the hero, `priority: true`. Keep the interactive map above it in z-order; the hero sits behind at reduced opacity so map labels stay legible.

**`/contact`**
- `OFFICE-SURAT`, `OFFICE-KANPUR`, `OFFICE-AHMEDABAD` on the three office cards, `card-media--office`.

**`<head>` on every page**
```html
<meta property="og:image" content="https://maasheetla.com/img/social/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="https://maasheetla.com/img/social/og-default.jpg">
```
(`twitter:card` is already `summary_large_image` — no image was ever set, so the card currently renders blank.)

## 4.7 Cloudflare Pages caching

Add to `public/_headers`:

```
/img/*
  Cache-Control: public, max-age=31536000, immutable

/logos/*
  Cache-Control: public, max-age=31536000, immutable
```

---

# PART 5 — ACCEPTANCE CHECKLIST

Do not report complete until every line passes.

- [ ] `grep -r "images.unsplash.com" .` returns nothing.
- [ ] All 30 assets exist in all three formats at all specified widths.
- [ ] `_manifest.json` present in each group directory with a valid LQIP data URI per entry.
- [ ] Every `<img>` has a non-empty, descriptive `alt` — no filenames, no "image of".
- [ ] Every image slot has a locked `aspect-ratio`. Cumulative Layout Shift is 0 on throttled 3G.
- [ ] Exactly one image per page carries `fetchpriority="high"`; every other image is `loading="lazy"`.
- [ ] Largest Contentful Paint under 2.0s on a simulated Moto G Power / Slow 4G run.
- [ ] Total transferred image weight on the homepage is under 400 KB at 1440px viewport.
- [ ] No image contains rendered text, a watermark, or a human face.
- [ ] Catalogue images match their captions — verify each Chanderi reads as Chanderi and each velvet reads as velvet before shipping.
- [ ] Maa Sheetla cards are visibly single-piece; Sunrise cards are visibly multi-piece.
- [ ] Screenshot every page at 390px, 768px, and 1440px and review for dark-UI seating: no photo should cut a hard bright rectangle out of the page background.

---

# PART 6 — NOTE FOR THE CLIENT

Two things to raise with Maa Sheetla before this goes live on `maasheetla.com`:

**Design codes imply real stock.** A buyer who sees "MS-8801 · Agency MOQ 6 pcs/set" and clicks through to WhatsApp expects that exact piece. Generated imagery is fine as a category and quality signal, and every asset here carries `data-image-status="representative"` so it's honest in the markup — but the moment the agency has real floor photography of actual lots, it should replace these. The manifest in §4.3 makes that a one-line change per SKU with no template edits.

**Office photos should be real.** Three physical addresses are published on `/contact`. Ask for phone photographs of each floor; even an unstyled phone photo of a real trading counter outperforms a polished generated interior for B2B trust, and it can be colour-graded to match the system in minutes.
