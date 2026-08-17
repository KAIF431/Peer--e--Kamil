import urllib.request
import json

url = "https://api.github.com/repos/KAIF431/Peer--e--Kamil/pages/builds"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Builds count:", len(data))
        for b in data[:3]:
            print(f"Status: {b.get('status')}, Commit: {b.get('commit')}, Created: {b.get('created_at')}")
except Exception as e:
    print("Error fetching GitHub Pages builds API:", e)
