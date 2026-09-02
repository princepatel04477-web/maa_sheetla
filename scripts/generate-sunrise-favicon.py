import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

REPO_ROOT = r'c:\Users\rebel\OneDrive\Documents\GitHub\maa_sheetla'
LOGOS_DIR = os.path.join(REPO_ROOT, 'public', 'logos')
PUBLIC_DIR = os.path.join(REPO_ROOT, 'public')

src_path = os.path.join(LOGOS_DIR, 'sunrise_fab_tex_cropped.png')
src = Image.open(src_path)
sw, sh = src.size

def build_sunrise_icon(size=512, dark_mode=False):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    radius = int(size * 0.22)
    
    if dark_mode:
        bg_fill = (12, 10, 14, 255) # obsidian
        border_col = (245, 157, 51, 230) # sunrise amber
    else:
        bg_fill = (255, 255, 255, 255) # pure white
        border_col = (245, 157, 51, 200) # sunrise amber
        
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=bg_fill)
    border_w = max(1, int(size * 0.032))
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, outline=border_col, width=border_w)
    
    # Scale logo
    target_w = int(size * 0.86)
    target_h = int(sh * (target_w / sw))
    
    if size <= 24:
        # 16px
        alpha = src.split()[3]
        thick_alpha = alpha.filter(ImageFilter.MaxFilter(5))
        thick_logo = Image.merge('RGBA', (src.split()[0], src.split()[1], src.split()[2], thick_alpha))
        resized = thick_logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 36:
        # 32px
        alpha = src.split()[3]
        thick_alpha = alpha.filter(ImageFilter.MaxFilter(3))
        thick_logo = Image.merge('RGBA', (src.split()[0], src.split()[1], src.split()[2], thick_alpha))
        resized = thick_logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    else:
        resized = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    canvas.paste(resized, (pos_x, pos_y), resized)
    return canvas

def main():
    print('=== Generating Sunrise Fab Tex Favicon Suite ===')
    
    # Light Theme / Standard Brand Suite (Recommended for all browsers)
    f16 = build_sunrise_icon(16, dark_mode=False)
    f32 = build_sunrise_icon(32, dark_mode=False)
    f48 = build_sunrise_icon(48, dark_mode=False)
    f180 = build_sunrise_icon(180, dark_mode=False)
    f512 = build_sunrise_icon(512, dark_mode=False)
    
    # Save to public/logos/
    f16.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon_16.png'), 'PNG')
    f32.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon_32.png'), 'PNG')
    f48.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon_48.png'), 'PNG')
    f32.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon.png'), 'PNG')
    f180.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_apple_touch_icon.png'), 'PNG')
    f512.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_icon_512.png'), 'PNG')
    
    ico_path_logos = os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon.ico')
    f48.save(
        ico_path_logos,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[f32, f16]
    )
    print(f'Saved: {ico_path_logos}')
    
    # Also save with clean public names
    f16.save(os.path.join(PUBLIC_DIR, 'sunrise-favicon-16x16.png'), 'PNG')
    f32.save(os.path.join(PUBLIC_DIR, 'sunrise-favicon-32x32.png'), 'PNG')
    f48.save(os.path.join(PUBLIC_DIR, 'sunrise-favicon-48x48.png'), 'PNG')
    f32.save(os.path.join(PUBLIC_DIR, 'sunrise-favicon.png'), 'PNG')
    f180.save(os.path.join(PUBLIC_DIR, 'sunrise-apple-touch-icon.png'), 'PNG')
    f512.save(os.path.join(PUBLIC_DIR, 'sunrise-icon.png'), 'PNG')
    
    public_ico = os.path.join(PUBLIC_DIR, 'sunrise-favicon.ico')
    f48.save(
        public_ico,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[f32, f16]
    )
    print(f'Saved: {public_ico}')
    
    # Dark Mode Variant Suite
    d16 = build_sunrise_icon(16, dark_mode=True)
    d32 = build_sunrise_icon(32, dark_mode=True)
    d48 = build_sunrise_icon(48, dark_mode=True)
    d180 = build_sunrise_icon(180, dark_mode=True)
    d512 = build_sunrise_icon(512, dark_mode=True)
    
    d512.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon_dark_512.png'), 'PNG')
    d180.save(os.path.join(LOGOS_DIR, 'sunrise_fab_tex_apple_touch_icon_dark.png'), 'PNG')
    dark_ico = os.path.join(LOGOS_DIR, 'sunrise_fab_tex_favicon_dark.ico')
    d48.save(
        dark_ico,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[d32, d16]
    )
    print(f'Saved dark variant: {dark_ico}')
    
    # Clean up any leftover test files
    for t in ['test_sun_var1.png', 'test_sun_var2.png']:
        tp = os.path.join(LOGOS_DIR, t)
        if os.path.exists(tp):
            os.remove(tp)

if __name__ == '__main__':
    main()
