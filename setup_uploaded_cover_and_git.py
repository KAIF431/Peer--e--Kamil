import os
import shutil
import subprocess

uploaded_img = r"C:\Users\USER\.gemini\antigravity\brain\da45c035-87a0-42b5-a9e0-2a2d8f716932\.user_uploaded\media_1786953841041.jpg"
dest_dir = r"d:\peer_e_kaamil"

targets = ["peere_kamil.jpg", "cover.jpg", "official_cover.jpg"]

for t in targets:
    tpath = os.path.join(dest_dir, t)
    shutil.copyfile(uploaded_img, tpath)
    print(f"Copied user uploaded cover image to {t}!")

# Let's inspect git remote, branch, and status
res = subprocess.run("git remote -v", cwd=dest_dir, shell=True, capture_output=True, text=True)
print("GIT REMOTE:\n", res.stdout)

res2 = subprocess.run("git branch -a", cwd=dest_dir, shell=True, capture_output=True, text=True)
print("GIT BRANCHES:\n", res2.stdout)

res3 = subprocess.run("git status", cwd=dest_dir, shell=True, capture_output=True, text=True)
print("GIT STATUS:\n", res3.stdout)
