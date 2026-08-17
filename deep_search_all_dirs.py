import os
import glob
import re

print("=== SEARCHING D: DRIVE FOR PEER_E_KAAMIL FILES ===")

dirs_to_check = [
    r"d:\peer_e_kaamil",
    r"d:\mynovels",
    r"D:\dastaan-library-main"
]

patterns = ["Written by Mohammad", "parda-aur-mijaaz", "Parda Aur Mijaz is not simply", "All 12 Chapters"]

for d in dirs_to_check:
    if os.path.exists(d):
        print(f"\n--- Checking Directory: {d} ---")
        hfiles = glob.glob(os.path.join(d, "*.html")) + glob.glob(os.path.join(d, "**", "*.html"), recursive=True)
        for h in hfiles:
            try:
                with open(h, 'r', encoding='utf-8') as f:
                    content = f.read()
                for p in patterns:
                    if p.lower() in content.lower():
                        print(f" MATCH in {h}: '{p}'")
            except Exception as e:
                pass
