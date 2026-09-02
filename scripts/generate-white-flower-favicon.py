import os
import numpy as np
from PIL import Image, ImageFilter

REPO_ROOT = r'c:\Users\rebel\OneDrive\Documents\GitHub\maa_sheetla'
LOGOS_DIR = os.path.join(REPO_ROOT, 'public', 'logos')
PUBLIC_DIR = os.path.join(REPO_ROOT, 'public')
APP_DIR = os.path.join(REPO_ROOT, 'app')

# Load transparent master
master = Image.open(os.path.join(LOGOS_DIR, 'maa_sheetla_transparent.png'))
arr = np.array(master)
alpha = arr[:, :, 3]

# The flower emblem crop: y:20..1020, x:770..1790
flower_alpha = alpha[20:1020, 770:1790]
ew, eh = flower_alpha.shape[1], flower_alpha.shape[0]

# Pure WHITE color (255, 255, 255) with 100% transparent background (NO black box)
flower_white = np.zeros((eh, ew, 4), dtype=np.uint8)
flower_white[:, :, 0] = 255
flower_white[:, :, 1] = 255
flower_white[:, :, 2] = 255
flower_white[:, :, 3] = flower_alpha

flower_img = Image.fromarray(flower_white, 'RGBA')
flower_path = os.path.join(LOGOS_DIR, 'maa_sheetla_flower_white.png')
flower_img.save(flower_path, 'PNG')
print(f'Saved high-res pure white flower: {flower_path} ({flower_img.size})')

def make_flower_frame(size):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0)) # 100% transparent background - NO black box
    target_h = int(size * 0.94)
    target_w = int(ew * (target_h / eh))
    
    if size <= 20: # 16px
        a = flower_img.split()[3]
        thick_a = a.filter(ImageFilter.MaxFilter(9))
        thick_img = Image.merge('RGBA', (flower_img.split()[0], flower_img.split()[1], flower_img.split()[2], thick_a))
        resized = thick_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 36: # 32px
        a = flower_img.split()[3]
        thick_a = a.filter(ImageFilter.MaxFilter(5))
        thick_img = Image.merge('RGBA', (flower_img.split()[0], flower_img.split()[1], flower_img.split()[2], thick_a))
        resized = thick_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 54: # 48px
        a = flower_img.split()[3]
        thick_a = a.filter(ImageFilter.MaxFilter(3))
        thick_img = Image.merge('RGBA', (flower_img.split()[0], flower_img.split()[1], flower_img.split()[2], thick_a))
        resized = thick_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    else:
        resized = flower_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    canvas.paste(resized, (pos_x, pos_y), resized)
    return canvas

# Generate frames
f16 = make_flower_frame(16)
f32 = make_flower_frame(32)
f48 = make_flower_frame(48)
f180 = make_flower_frame(180)
f512 = make_flower_frame(512)

# Save to public/
f16.save(os.path.join(PUBLIC_DIR, 'favicon-16x16.png'), 'PNG')
f32.save(os.path.join(PUBLIC_DIR, 'favicon-32x32.png'), 'PNG')
f48.save(os.path.join(PUBLIC_DIR, 'favicon-48x48.png'), 'PNG')
f32.save(os.path.join(PUBLIC_DIR, 'favicon.png'), 'PNG')
f180.save(os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 'PNG')
f512.save(os.path.join(PUBLIC_DIR, 'icon.png'), 'PNG')

# Save multi-res favicon.ico in public/
ico_public = os.path.join(PUBLIC_DIR, 'favicon.ico')
f48.save(
    ico_public,
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[f32, f16]
)

# Save to app/
f48.save(
    os.path.join(APP_DIR, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[f32, f16]
)
f512.save(os.path.join(APP_DIR, 'icon.png'), 'PNG')
f180.save(os.path.join(APP_DIR, 'apple-icon.png'), 'PNG')

# Save also in public/logos/
f32.save(os.path.join(LOGOS_DIR, 'maa_sheetla_favicon_white_flower.png'), 'PNG')
f48.save(
    os.path.join(LOGOS_DIR, 'maa_sheetla_favicon_white_flower.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[f32, f16]
)

print('Pure white flower favicons generated successfully without background!')
