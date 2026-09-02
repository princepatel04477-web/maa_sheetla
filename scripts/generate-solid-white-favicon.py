import os
import numpy as np
from PIL import Image, ImageFilter

REPO_ROOT = r'c:\Users\rebel\OneDrive\Documents\GitHub\maa_sheetla'
LOGOS_DIR = os.path.join(REPO_ROOT, 'public', 'logos')
PUBLIC_DIR = os.path.join(REPO_ROOT, 'public')
APP_DIR = os.path.join(REPO_ROOT, 'app')

# Load transparent master
master = Image.open(os.path.join(LOGOS_DIR, 'maa_sheetla_transparent.png'))
alpha = np.array(master)[:, :, 3]

# The flower emblem crop: y:20..1020, x:770..1790
flower_alpha = alpha[20:1020, 770:1790]
ew, eh = flower_alpha.shape[1], flower_alpha.shape[0]
f_img = Image.fromarray(flower_alpha, mode='L')

# Save full-res solid pure white flower
solid_alpha_master = np.where(flower_alpha > 20, 255, 0).astype(np.uint8)
solid_white_master = np.zeros((eh, ew, 4), dtype=np.uint8)
solid_white_master[:, :, :3] = 255
solid_white_master[:, :, 3] = solid_alpha_master
Image.fromarray(solid_white_master, mode='RGBA').save(os.path.join(LOGOS_DIR, 'maa_sheetla_flower_white_solid.png'))

def make_solid_frame(size):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0)) # 100% transparent background
    target_dim = int(size * 0.94)
    
    if size <= 20: # 16px
        dil = f_img.filter(ImageFilter.MaxFilter(7))
        arr_d = np.where(np.array(dil) > 20, 255, 0).astype(np.uint8)
        down = Image.fromarray(arr_d, mode='L').resize((target_dim, target_dim), Image.Resampling.LANCZOS)
        down_arr = np.array(down).astype(float)
        boosted = np.clip(down_arr * 2.3, 0, 255).astype(np.uint8)
    elif size <= 36: # 32px
        dil = f_img.filter(ImageFilter.MaxFilter(5))
        arr_d = np.where(np.array(dil) > 20, 255, 0).astype(np.uint8)
        down = Image.fromarray(arr_d, mode='L').resize((target_dim, target_dim), Image.Resampling.LANCZOS)
        down = down.filter(ImageFilter.UnsharpMask(radius=1, percent=150, threshold=3))
        down_arr = np.array(down).astype(float)
        boosted = np.clip(down_arr * 2.1, 0, 255).astype(np.uint8)
    elif size <= 54: # 48px
        dil = f_img.filter(ImageFilter.MaxFilter(3))
        arr_d = np.where(np.array(dil) > 25, 255, 0).astype(np.uint8)
        down = Image.fromarray(arr_d, mode='L').resize((target_dim, target_dim), Image.Resampling.LANCZOS)
        down = down.filter(ImageFilter.UnsharpMask(radius=1, percent=130, threshold=3))
        down_arr = np.array(down).astype(float)
        boosted = np.clip(down_arr * 1.8, 0, 255).astype(np.uint8)
    else: # 180, 512
        arr_d = np.where(flower_alpha > 30, 255, 0).astype(np.uint8)
        down = Image.fromarray(arr_d, mode='L').resize((target_dim, target_dim), Image.Resampling.LANCZOS)
        down_arr = np.array(down).astype(float)
        boosted = np.clip(down_arr * 1.4, 0, 255).astype(np.uint8)
        
    rgba = np.zeros((target_dim, target_dim, 4), dtype=np.uint8)
    rgba[:, :, :3] = 255 # Pure white
    rgba[:, :, 3] = boosted # Solid alpha
    
    res_img = Image.fromarray(rgba, mode='RGBA')
    pos = (size - target_dim) // 2
    canvas.paste(res_img, (pos, pos), res_img)
    return canvas

# Generate frames
f16 = make_solid_frame(16)
f32 = make_solid_frame(32)
f48 = make_solid_frame(48)
f180 = make_solid_frame(180)
f512 = make_solid_frame(512)

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

# Save to public/logos/
f32.save(os.path.join(LOGOS_DIR, 'maa_sheetla_favicon_white_solid.png'), 'PNG')
f48.save(
    os.path.join(LOGOS_DIR, 'maa_sheetla_favicon_white_solid.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[f32, f16]
)

# Cleanup test files
for t in ['test_tab_d3.png', 'test_tab_d5.png', 'test_tab_d7.png', 'test_tab_perfect.png', 'test_solid_32.png', 'test_tab_preview_32.png']:
    tp = os.path.join(LOGOS_DIR, t)
    if os.path.exists(tp):
        os.remove(tp)

print('Solid white flower favicons generated successfully without background!')
