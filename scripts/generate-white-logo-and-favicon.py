import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

REPO_ROOT = r'c:\Users\rebel\OneDrive\Documents\GitHub\maa_sheetla'
LOGOS_DIR = os.path.join(REPO_ROOT, 'public', 'logos')
PUBLIC_DIR = os.path.join(REPO_ROOT, 'public')
APP_DIR = os.path.join(REPO_ROOT, 'app')

def generate_white_logos():
    print('=== 1. Generating White Logo Variants for Maa Sheetla ===')
    src_transparent = os.path.join(LOGOS_DIR, 'maa_sheetla_transparent.png')
    if not os.path.exists(src_transparent):
        raise FileNotFoundError(f'Source file not found: {src_transparent}')
    
    img = Image.open(src_transparent)
    arr = np.array(img)
    alpha = arr[:, :, 3]
    
    # 1. Full White Logo (2560 x 1985)
    white_arr = np.zeros_like(arr)
    white_arr[:, :, :3] = 255  # Pure white #FFFFFF
    white_arr[:, :, 3] = alpha
    white_img = Image.fromarray(white_arr, 'RGBA')
    white_path = os.path.join(LOGOS_DIR, 'maa_sheetla_white.png')
    white_img.save(white_path, 'PNG')
    print(f'Saved full white logo: {white_path} ({white_img.size})')
    
    # 2. Trimmed White Logo (2520 x 1945)
    rows = np.where(np.any(alpha > 10, axis=1))[0]
    cols = np.where(np.any(alpha > 10, axis=0))[0]
    trimmed_img = white_img.crop((cols[0], rows[0], cols[-1] + 1, rows[-1] + 1))
    trimmed_path = os.path.join(LOGOS_DIR, 'maa_sheetla_white_trimmed.png')
    trimmed_img.save(trimmed_path, 'PNG')
    print(f'Saved trimmed white logo: {trimmed_path} ({trimmed_img.size})')
    
    # 3. White Emblem / Sacred Crest (1020 x 1000)
    emblem_alpha = alpha[20:1020, 770:1790]
    emblem_arr = np.zeros((emblem_alpha.shape[0], emblem_alpha.shape[1], 4), dtype=np.uint8)
    emblem_arr[:, :, :3] = 255
    emblem_arr[:, :, 3] = emblem_alpha
    emblem_img = Image.fromarray(emblem_arr, 'RGBA')
    emblem_path = os.path.join(LOGOS_DIR, 'maa_sheetla_emblem_white.png')
    emblem_img.save(emblem_path, 'PNG')
    print(f'Saved white emblem mark: {emblem_path} ({emblem_img.size})')

    # 4. Square Showcase (2560 x 2560)
    square_canvas = Image.new('RGBA', (2560, 2560), (0, 0, 0, 0))
    pos_y = (2560 - trimmed_img.size[1]) // 2
    pos_x = (2560 - trimmed_img.size[0]) // 2
    square_canvas.paste(trimmed_img, (pos_x, pos_y), trimmed_img)
    square_path = os.path.join(LOGOS_DIR, 'maa_sheetla_white_square.png')
    square_canvas.save(square_path, 'PNG')
    print(f'Saved square white logo: {square_path} ({square_canvas.size})')

    return emblem_img

def build_favicon_frame(emblem_img, size):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    radius = int(size * 0.22)
    # Brand obsidian dark background (#0C0A0E)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=(12, 10, 14, 255))
    
    # Subtle kumkum (#8B2628) rim
    border_width = max(1, int(size * 0.035))
    draw.rounded_rectangle(
        [0, 0, size - 1, size - 1],
        radius=radius,
        outline=(139, 38, 40, 220),
        width=border_width
    )
    
    # Scale emblem to fill ~72% of the canvas
    target_h = int(size * 0.72)
    target_w = int(emblem_img.size[0] * (target_h / emblem_img.size[1]))
    
    if size <= 24:
        alpha = emblem_img.split()[3]
        thick_alpha = alpha.filter(ImageFilter.MaxFilter(9))
        thick_emblem = Image.merge('RGBA', (emblem_img.split()[0], emblem_img.split()[1], emblem_img.split()[2], thick_alpha))
        resized = thick_emblem.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 36:
        alpha = emblem_img.split()[3]
        thick_alpha = alpha.filter(ImageFilter.MaxFilter(7))
        thick_emblem = Image.merge('RGBA', (emblem_img.split()[0], emblem_img.split()[1], emblem_img.split()[2], thick_alpha))
        resized = thick_emblem.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 64:
        alpha = emblem_img.split()[3]
        thick_alpha = alpha.filter(ImageFilter.MaxFilter(5))
        thick_emblem = Image.merge('RGBA', (emblem_img.split()[0], emblem_img.split()[1], emblem_img.split()[2], thick_alpha))
        resized = thick_emblem.resize((target_w, target_h), Image.Resampling.LANCZOS)
    else:
        resized = emblem_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    canvas.paste(resized, (pos_x, pos_y), resized)
    
    return canvas

def generate_favicons(emblem_img):
    print('\n=== 2. Generating Favicon and App Icon Suite ===')
    
    frame_16 = build_favicon_frame(emblem_img, 16)
    frame_32 = build_favicon_frame(emblem_img, 32)
    frame_48 = build_favicon_frame(emblem_img, 48)
    frame_180 = build_favicon_frame(emblem_img, 180)
    frame_512 = build_favicon_frame(emblem_img, 512)
    
    frame_16.save(os.path.join(PUBLIC_DIR, 'favicon-16x16.png'), 'PNG')
    frame_32.save(os.path.join(PUBLIC_DIR, 'favicon-32x32.png'), 'PNG')
    frame_48.save(os.path.join(PUBLIC_DIR, 'favicon-48x48.png'), 'PNG')
    frame_32.save(os.path.join(PUBLIC_DIR, 'favicon.png'), 'PNG')
    frame_180.save(os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 'PNG')
    frame_512.save(os.path.join(PUBLIC_DIR, 'icon.png'), 'PNG')
    print('Saved PNG icons to public/')
    
    ico_path = os.path.join(PUBLIC_DIR, 'favicon.ico')
    frame_48.save(
        ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[frame_32, frame_16]
    )
    print(f'Saved multi-resolution ICO: {ico_path}')
    
    app_ico_path = os.path.join(APP_DIR, 'favicon.ico')
    frame_48.save(
        app_ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[frame_32, frame_16]
    )
    frame_512.save(os.path.join(APP_DIR, 'icon.png'), 'PNG')
    frame_180.save(os.path.join(APP_DIR, 'apple-icon.png'), 'PNG')
    print('Saved Next.js App Router icons to app/')

if __name__ == '__main__':
    emblem = generate_white_logos()
    generate_favicons(emblem)
    print('\nAll white logo and favicon assets generated successfully!')
