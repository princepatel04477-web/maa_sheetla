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

# The emblem crop: y:20..1020, x:770..1790
emblem_alpha = alpha[20:1020, 770:1790]
ew, eh = emblem_alpha.shape[1], emblem_alpha.shape[0]

# Create pure maroon emblem on transparent background (NO black background)
# Color: (120, 24, 28) - matching user request and maa_sheetla_maroon
maroon_emblem = np.zeros((eh, ew, 4), dtype=np.uint8)
maroon_emblem[:, :, 0] = 120
maroon_emblem[:, :, 1] = 24
maroon_emblem[:, :, 2] = 28
maroon_emblem[:, :, 3] = emblem_alpha

emblem_img = Image.fromarray(maroon_emblem, 'RGBA')
emblem_path = os.path.join(LOGOS_DIR, 'maa_sheetla_emblem_maroon.png')
emblem_img.save(emblem_path, 'PNG')
print(f'Saved high-res transparent maroon emblem: {emblem_path} ({emblem_img.size})')

def make_frame(size):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0)) # 100% transparent background
    target_h = int(size * 0.94)
    target_w = int(ew * (target_h / eh))
    
    if size <= 20: # 16px
        a = emblem_img.split()[3]
        thick_a = a.filter(ImageFilter.MaxFilter(9))
        thick_img = Image.merge('RGBA', (emblem_img.split()[0], emblem_img.split()[1], emblem_img.split()[2], thick_a))
        resized = thick_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 36: # 32px
        a = emblem_img.split()[3]
        thick_a = a.filter(ImageFilter.MaxFilter(5))
        thick_img = Image.merge('RGBA', (emblem_img.split()[0], emblem_img.split()[1], emblem_img.split()[2], thick_a))
        resized = thick_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    elif size <= 54: # 48px
        a = emblem_img.split()[3]
        thick_a = a.filter(ImageFilter.MaxFilter(3))
        thick_img = Image.merge('RGBA', (emblem_img.split()[0], emblem_img.split()[1], emblem_img.split()[2], thick_a))
        resized = thick_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    else:
        resized = emblem_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    canvas.paste(resized, (pos_x, pos_y), resized)
    return canvas

# Generate frames
f16 = make_frame(16)
f32 = make_frame(32)
f48 = make_frame(48)
f180 = make_frame(180)
f512 = make_frame(512)

# Save to public/
f16.save(os.path.join(PUBLIC_DIR, 'favicon-16x16.png'), 'PNG')
f32.save(os.path.join(PUBLIC_DIR, 'favicon-32x32.png'), 'PNG')
f48.save(os.path.join(PUBLIC_DIR, 'favicon-48x48.png'), 'PNG')
f32.save(os.path.join(PUBLIC_DIR, 'favicon.png'), 'PNG')
f180.save(os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 'PNG')
f512.save(os.path.join(PUBLIC_DIR, 'icon.png'), 'PNG')

# Save multi-res favicon.ico
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

# Save also in public/logos/ for easy reference
f32.save(os.path.join(LOGOS_DIR, 'maa_sheetla_favicon_maroon.png'), 'PNG')
f48.save(
    os.path.join(LOGOS_DIR, 'maa_sheetla_favicon_maroon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[f32, f16]
)

# Remove test file if exists
test_file = os.path.join(LOGOS_DIR, 'test_f32_maroon.png')
if os.path.exists(test_file):
    os.remove(test_file)

print('All transparent maroon favicons generated successfully!')
