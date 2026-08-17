import os

portal_path = r"d:\peer_e_kaamil\peer_e_kaamil.html"
with open(portal_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("=== AUDIT OF d:\\peer_e_kaamil\\peer_e_kaamil.html ===")
print("1. 'Written by Mohammad':", "Written by Mohammad" in content)
print("   'Written by Umera Ahmed':", "Written by Umera Ahmed" in content)

print("2. 'parda-aur-mijaaz.netlify.app/cover.jpg':", "parda-aur-mijaaz.netlify.app/cover.jpg" in content)
print("   'peere_kamil.jpg':", "peere_kamil.jpg" in content)

print("3. 'Parda Aur Mijaz is not simply':", "Parda Aur Mijaz is not simply" in content)

print("4. 'All 12 Chapters Available':", "All 12 Chapters Available" in content)
print("   'All 93 Chapters Available':", "All 93 Chapters Available" in content)

print("5. 'lock-icon-span':", "lock-icon-span" in content)
print("   'Chapter 02 <span':", "Chapter 02 <span" in content)
print("   Drawer occurrence count:", content.count('id="chapterDrawer"'))
print("   Chapter 93 occurrence count:", content.count('chapter93.html'))
