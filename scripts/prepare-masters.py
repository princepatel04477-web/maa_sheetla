import os
import shutil
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

SRC_DIR = r"C:\Users\rebel\.gemini\antigravity\brain\b8b1a4ab-9429-409a-9d18-8f0694bc1019"
MASTERS_DIR = r"c:\Users\rebel\OneDrive\Documents\GitHub\maa_sheetla\assets\masters"
PUBLIC_DIR = r"c:\Users\rebel\OneDrive\Documents\GitHub\maa_sheetla\public"

# Map generated filenames
CATALOGUE_MAP = {
    "ms-8801-kanjivaram-tissue-silk-saree": "ms8801_kanjivaram_1788158863275.jpg",
    "ms-8815-organza-hand-embroidered-saree": "ms8815_organza_1788158875043.jpg",
    "ms-9904-crimson-bridal-velvet-lehenga": "ms9904_velvet_1788158887766.jpg",
    "ms-9922-mirrorwork-georgette-lehenga": "ms9922_mirrorwork_1788158900216.jpg",
    "ms-7701-chanderi-silk-anarkali-suit": "ms7701_chanderi_1788158920297.jpg",
    "ms-7718-velvet-pakistani-cut-suit": "ms7718_pakistani_1788158935012.jpg",
    "ms-6601-cape-indo-western-sharara": "ms6601_sharara_1788158944868.jpg",
    "st-4420-banarasi-khaddi-georgette-saree": "st4420_banarasi_1788159062049.jpg",
    "st-4455-dola-silk-foil-print-saree": "st4455_dola_1788159083177.jpg",
    "st-5510-organza-floral-sangeet-lehenga": "st5510_organza_1788159094796.jpg",
    "st-3305-cambric-chikankari-kurta-set": "st3305_cambric_1788159108048.jpg",
    "st-2208-viscose-coord-set": "st2208_viscose_1788159117378.jpg",
}

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def crop_and_resize(img, target_w, target_h, anchor="center"):
    orig_w, orig_h = img.size
    target_ratio = target_w / target_h
    orig_ratio = orig_w / orig_h

    if orig_ratio > target_ratio:
        # Source is wider than target -> crop sides
        new_w = int(orig_h * target_ratio)
        if anchor == "left":
            left = 0
        elif anchor == "right":
            left = orig_w - new_w
        else:
            left = (orig_w - new_w) // 2
        box = (left, 0, left + new_w, orig_h)
    else:
        # Source is taller than target -> crop top/bottom
        new_h = int(orig_w / target_ratio)
        if anchor == "top":
            top = 0
        elif anchor == "bottom":
            top = orig_h - new_h
        else:
            top = (orig_h - new_h) // 2
        box = (0, top, orig_w, top + new_h)

    cropped = img.crop(box)
    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

def main():
    print("=== 1. Processing Catalogue Masters (1600x2000, 4:5) ===")
    cat_dir = os.path.join(MASTERS_DIR, "catalogue")
    ensure_dir(cat_dir)

    for name, gen_file in CATALOGUE_MAP.items():
        src_path = os.path.join(SRC_DIR, gen_file)
        if os.path.exists(src_path):
            img = Image.open(src_path).convert("RGB")
            processed = crop_and_resize(img, 1600, 2000, anchor="center")
            out_path = os.path.join(cat_dir, f"{name}.png")
            processed.save(out_path, "PNG")
            print(f"Saved: catalogue/{name}.png ({processed.size})")

    print("\n=== 2. Processing Hero Masters (2560x1100, 21:9) ===")
    hero_dir = os.path.join(MASTERS_DIR, "hero")
    ensure_dir(hero_dir)

    loom_src = os.path.join(SRC_DIR, "home_loom_hall_1788159146713.jpg")
    loom_img = Image.open(loom_src).convert("RGB")
    home_hero = crop_and_resize(loom_img, 2560, 1100, anchor="center")
    home_hero.save(os.path.join(hero_dir, "home-loom-hall.png"), "PNG")
    print("Saved: hero/home-loom-hall.png")

    craft_base = loom_img.copy().filter(ImageFilter.GaussianBlur(1))
    enhancer = ImageEnhance.Brightness(craft_base)
    craft_base = enhancer.enhance(0.4)
    glow = Image.new("RGBA", (2560, 1100), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for i in range(5):
        cx = 400 + i * 450
        cy = 650
        gdraw.ellipse((cx - 300, cy - 100, cx + 300, cy + 100), fill=(220, 200, 160, 70))
        gdraw.rectangle((cx - 180, cy - 40, cx + 180, cy + 40), fill=(255, 235, 190, 140))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    craft_hero = crop_and_resize(craft_base, 2560, 1100)
    craft_hero.paste(Image.blend(craft_hero.convert("RGBA"), glow, 0.6).convert("RGB"), (0,0))
    craft_hero.save(os.path.join(hero_dir, "craft-inspection-floor.png"), "PNG")
    print("Saved: hero/craft-inspection-floor.png")

    reach_base = Image.open(os.path.join(SRC_DIR, "st3305_cambric_1788159108048.jpg")).convert("RGB")
    reach_hero = crop_and_resize(reach_base, 2560, 1100, anchor="bottom")
    reach_hero = ImageEnhance.Brightness(reach_hero).enhance(0.5)
    reach_hero = ImageEnhance.Color(reach_hero).enhance(0.7)
    reach_hero.save(os.path.join(hero_dir, "reach-freight-dock.png"), "PNG")
    print("Saved: hero/reach-freight-dock.png")

    print("\n=== 3. Processing Firm Cards Masters (1400x1400, 1:1) ===")
    firms_dir = os.path.join(MASTERS_DIR, "firms")
    ensure_dir(firms_dir)

    ms_img = Image.open(os.path.join(SRC_DIR, "ms8801_kanjivaram_1788158863275.jpg")).convert("RGB")
    desk_ms = crop_and_resize(ms_img, 1400, 1400, anchor="center")
    desk_ms.save(os.path.join(firms_dir, "desk-maa-sheetla.png"), "PNG")
    print("Saved: firms/desk-maa-sheetla.png")

    st_img = Image.open(os.path.join(SRC_DIR, "st4420_banarasi_1788159062049.jpg")).convert("RGB")
    desk_st = crop_and_resize(st_img, 1400, 1400, anchor="center")
    desk_st.save(os.path.join(firms_dir, "desk-sunrise-fab-tex.png"), "PNG")
    print("Saved: firms/desk-sunrise-fab-tex.png")

    print("\n=== 4. Processing Category Cards Masters (1200x1600, 3:4) ===")
    cat_cards_dir = os.path.join(MASTERS_DIR, "categories")
    ensure_dir(cat_cards_dir)

    c1 = Image.open(os.path.join(SRC_DIR, "ms9904_velvet_1788158887766.jpg")).convert("RGB")
    crop_and_resize(c1, 1200, 1600, anchor="center").save(os.path.join(cat_cards_dir, "cat-01-bridal-heritage-silks.png"), "PNG")
    print("Saved: categories/cat-01-bridal-heritage-silks.png")

    c2 = Image.open(os.path.join(SRC_DIR, "st4455_dola_1788159083177.jpg")).convert("RGB")
    crop_and_resize(c2, 1200, 1600, anchor="center").save(os.path.join(cat_cards_dir, "cat-02-festive-sarees.png"), "PNG")
    print("Saved: categories/cat-02-festive-sarees.png")

    c3 = Image.open(os.path.join(SRC_DIR, "ms7701_chanderi_1788158920297.jpg")).convert("RGB")
    crop_and_resize(c3, 1200, 1600, anchor="center").save(os.path.join(cat_cards_dir, "cat-03-embroidered-suits-kurtis.png"), "PNG")
    print("Saved: categories/cat-03-embroidered-suits-kurtis.png")

    c4 = Image.open(os.path.join(SRC_DIR, "ms6601_sharara_1788158944868.jpg")).convert("RGB")
    crop_and_resize(c4, 1200, 1600, anchor="center").save(os.path.join(cat_cards_dir, "cat-04-indo-western-garments.png"), "PNG")
    print("Saved: categories/cat-04-indo-western-garments.png")

    print("\n=== 5. Processing QC Step Tiles Masters (1200x1200, 1:1) ===")
    qc_dir = os.path.join(MASTERS_DIR, "qc")
    ensure_dir(qc_dir)

    q1 = Image.open(os.path.join(SRC_DIR, "ms8801_kanjivaram_1788158863275.jpg")).convert("RGB")
    q1_crop = q1.crop((200, 600, 1200, 1600))
    crop_and_resize(q1_crop, 1200, 1200).save(os.path.join(qc_dir, "qc-01-warp-weft-density.png"), "PNG")
    print("Saved: qc/qc-01-warp-weft-density.png")

    q2 = Image.open(os.path.join(SRC_DIR, "st4420_banarasi_1788159062049.jpg")).convert("RGB")
    q2_crop = q2.crop((100, 300, 1100, 1300))
    crop_and_resize(q2_crop, 1200, 1200).save(os.path.join(qc_dir, "qc-02-dye-lot-colorfastness.png"), "PNG")
    print("Saved: qc/qc-02-dye-lot-colorfastness.png")

    q3 = Image.open(os.path.join(SRC_DIR, "ms8815_organza_1788158875043.jpg")).convert("RGB")
    crop_and_resize(q3, 1200, 1200).save(os.path.join(qc_dir, "qc-03-backlit-flaw-screening.png"), "PNG")
    print("Saved: qc/qc-03-backlit-flaw-screening.png")

    q4 = Image.open(os.path.join(SRC_DIR, "st3305_cambric_1788159108048.jpg")).convert("RGB")
    crop_and_resize(q4, 1200, 1200).save(os.path.join(qc_dir, "qc-04-moisture-shield-carton.png"), "PNG")
    print("Saved: qc/qc-04-moisture-shield-carton.png")

    print("\n=== 6. Processing Office Cards Masters (1600x1000, 16:10) ===")
    office_dir = os.path.join(MASTERS_DIR, "offices")
    ensure_dir(office_dir)

    o1 = Image.open(os.path.join(SRC_DIR, "home_loom_hall_1788159146713.jpg")).convert("RGB")
    crop_and_resize(o1, 1600, 1000, anchor="right").save(os.path.join(office_dir, "office-surat-hq.png"), "PNG")
    print("Saved: offices/office-surat-hq.png")

    o2 = Image.open(os.path.join(SRC_DIR, "st4420_banarasi_1788159062049.jpg")).convert("RGB")
    crop_and_resize(o2, 1600, 1000, anchor="center").save(os.path.join(office_dir, "office-kanpur.png"), "PNG")
    print("Saved: offices/office-kanpur.png")

    o3 = Image.open(os.path.join(SRC_DIR, "st2208_viscose_1788159117378.jpg")).convert("RGB")
    crop_and_resize(o3, 1600, 1000, anchor="center").save(os.path.join(office_dir, "office-ahmedabad.png"), "PNG")
    print("Saved: offices/office-ahmedabad.png")

    print("\n=== 7. Processing Social OG Image Master (1200x630, 1.91:1) ===")
    social_dir = os.path.join(MASTERS_DIR, "social")
    ensure_dir(social_dir)

    og_base = Image.open(os.path.join(SRC_DIR, "ms8801_kanjivaram_1788158863275.jpg")).convert("RGB")
    og_cropped = crop_and_resize(og_base, 1200, 630, anchor="right")
    
    grad = Image.new("RGBA", (1200, 630), (12, 10, 14, 255))
    mask = Image.new("L", (1200, 630), 0)
    mdraw = ImageDraw.Draw(mask)
    for x in range(1200):
        if x < 450:
            alpha = 255
        elif x < 800:
            alpha = int(255 * (1 - (x - 450) / 350))
        else:
            alpha = 0
        mdraw.line([(x, 0), (x, 630)], fill=alpha)
    
    og_composed = og_cropped.convert("RGBA")
    og_composed.paste(grad, (0, 0), mask)

    logo_path = os.path.join(PUBLIC_DIR, "logos", "maa_sheetla_gold.png")
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        lw, lh = logo.size
        target_lw = 280
        target_lh = int(lh * (target_lw / lw))
        logo_resized = logo.resize((target_lw, target_lh), Image.Resampling.LANCZOS)
        pos_y = (630 - target_lh) // 2
        og_composed.paste(logo_resized, (80, pos_y), logo_resized)
        print("Composited logo on OG image")

    og_final = og_composed.convert("RGB")
    og_final.save(os.path.join(social_dir, "og-default.png"), "PNG")
    print("Saved: social/og-default.png")

    print("\nAll master renders created successfully!")

if __name__ == "__main__":
    main()
