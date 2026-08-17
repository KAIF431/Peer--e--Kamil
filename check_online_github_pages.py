import urllib.request
import re

urls = [
    "https://raw.githubusercontent.com/KAIF431/Peer--e--Kamil/main/peer_e_kaamil.html",
    "https://kaif431.github.io/Peer--e--Kamil/peer_e_kaamil.html"
]

patterns = ["Written by Mohammad", "Written by Umera Ahmed", "parda-aur-mijaaz", "peere_kamil.jpg", "Parda Aur Mijaz is not simply", "12 Chapters", "93 Chapters"]

for url in urls:
    print(f"\n=== FETCHING: {url} ===")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        for p in patterns:
            if p.lower() in html.lower():
                print(f"  FOUND: '{p}'")
    except Exception as e:
        print(f"  ERROR: {e}")
