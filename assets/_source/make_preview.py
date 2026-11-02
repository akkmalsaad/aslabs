"""Builds ../preview.html from preview.template.html with every image embedded,
so the page works when opened on its own (no folder access needed)."""
import base64, os, re, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
PACK = os.path.dirname(HERE)
MIME = {".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon"}


def data_uri(rel):
    path = os.path.join(PACK, rel)
    ext = os.path.splitext(rel)[1]
    if ext == ".svg":
        return f"data:{MIME[ext]};utf8," + urllib.parse.quote(open(path).read())
    return f"data:{MIME[ext]};base64," + base64.b64encode(open(path, "rb").read()).decode()


html = open(os.path.join(HERE, "preview.template.html")).read()
html = re.sub(r'(src|href)="((?:logo|favicon|social|png)/[^"]+)"',
              lambda m: f'{m.group(1)}="{data_uri(m.group(2))}"', html)
open(os.path.join(PACK, "preview.html"), "w").write(html)
left = re.findall(r'(?:src|href)="(?!data:)[^"]+"', html)
print(f"preview.html: {len(html) // 1024} KB, external references left: {left}")
