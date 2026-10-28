"""Trace the approved concept into font-independent vector assets.

The original textured PNG stays unchanged. Exports retain the silhouette and
remove tiny print-grain holes for small-size readability. No raster is embedded
in SVG/PDF/EPS; the PNGs are renders of the same path geometry.
"""
from collections import defaultdict, deque
from pathlib import Path
import json

import numpy as np
from PIL import Image, ImageDraw
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "branding"
SOURCE = OUT / "studio-kwonyc-logo-concept-01.png"


def simplify(points, epsilon=0.65):
    if len(points) < 3:
        return points
    start, end = np.array(points[0], float), np.array(points[-1], float)
    data = np.array(points, float)
    delta = end - start
    if np.dot(delta, delta) == 0:
        distance = np.linalg.norm(data - start, axis=1)
    else:
        t = np.clip((data - start) @ delta / np.dot(delta, delta), 0, 1)
        distance = np.linalg.norm(data - (start + t[:, None] * delta), axis=1)
    index = int(distance.argmax())
    if distance[index] <= epsilon:
        return [points[0], points[-1]]
    return simplify(points[:index + 1], epsilon)[:-1] + simplify(points[index:], epsilon)


def trace():
    image = np.asarray(Image.open(SOURCE).convert("RGB"))
    mask = image.max(axis=2) < 160
    # Fill small enclosed grain holes, preserving the counter of the O.
    h, w = mask.shape
    seen = np.zeros_like(mask)
    for y, x in zip(*np.where(~mask)):
        if seen[y, x]:
            continue
        queue, pixels, border = deque([(int(x), int(y))]), [], False
        seen[y, x] = True
        while queue:
            xx, yy = queue.popleft()
            pixels.append((xx, yy))
            border |= xx == 0 or yy == 0 or xx == w - 1 or yy == h - 1
            for nx, ny in ((xx-1, yy), (xx+1, yy), (xx, yy-1), (xx, yy+1)):
                if 0 <= nx < w and 0 <= ny < h and not seen[ny, nx] and not mask[ny, nx]:
                    seen[ny, nx] = True
                    queue.append((nx, ny))
        if not border and len(pixels) < 150:
            for xx, yy in pixels:
                mask[yy, xx] = True
    edges = defaultdict(list)
    for y, x in zip(*np.where(mask)):
        x, y = int(x), int(y)
        if y == 0 or not mask[y-1, x]: edges[(x, y)].append((x+1, y))
        if x == w-1 or not mask[y, x+1]: edges[(x+1, y)].append((x+1, y+1))
        if y == h-1 or not mask[y+1, x]: edges[(x+1, y+1)].append((x, y+1))
        if x == 0 or not mask[y, x-1]: edges[(x, y+1)].append((x, y))
    loops = []
    while edges:
        start = next(iter(edges))
        p, points = start, [start]
        while True:
            nxt = edges[p].pop()
            if not edges[p]: del edges[p]
            points.append(nxt)
            p = nxt
            if p == start: break
        area = sum(a[0]*b[1]-b[0]*a[1] for a, b in zip(points, points[1:])) / 2
        if abs(area) > 20:
            loops.append((area, simplify(points)))
    loops.sort(key=lambda p: abs(p[0]), reverse=True)
    ys, xs = np.where(mask)
    left, top = int(xs.min()) - 40, int(ys.min()) - 40
    width, height = int(xs.max()) - left + 41, int(ys.max()) - top + 41
    paths = [(area, [(x-left, y-top) for x, y in points]) for area, points in loops]
    # Raster mask produced only from the exported vector geometry.
    coverage = Image.new("L", (width*3, height*3), 0)
    draw = ImageDraw.Draw(coverage)
    for area, points in paths:
        draw.polygon([(x*3, y*3) for x, y in points], fill=255 if area > 0 else 0)
    coverage = coverage.resize((width, height), Image.Resampling.LANCZOS)
    original = Image.fromarray((mask[top:top+height, left:left+width] * 255).astype("uint8"))
    rendered = np.asarray(coverage) > 127
    target = np.asarray(original) > 127
    iou = float((rendered & target).sum() / (rendered | target).sum())
    assert iou > .985, f"Vector silhouette changed too far: {iou}"
    return width, height, paths, coverage, iou


def main():
    width, height, paths, coverage, iou = trace()
    d = " ".join("M " + " L ".join(f"{x},{y}" for x,y in points) + " Z" for _,points in paths)
    for name, color in (("navy", "#25205B"), ("white", "#FFFFFF")):
        stem = OUT / f"studio-kwonyc-{name}"
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">Studio KWONYC</title>
  <desc id="desc">STUDIO above KWONYC. Outlined vector version of the approved logo.</desc>
  <path fill="{color}" fill-rule="evenodd" d="{d}"/>
</svg>
'''
        stem.with_suffix(".svg").write_text(svg, encoding="utf-8")
        rgb = tuple(int(color[i:i+2], 16) for i in (1,3,5))
        png = Image.new("RGBA", (width,height), rgb+(255,))
        png.putalpha(coverage)
        png.save(stem.with_suffix(".png"))
        pdf = canvas.Canvas(str(stem.with_suffix(".pdf")), pagesize=(width,height), pageCompression=1)
        pdf.setTitle(f"Studio KWONYC - {name} outlined logo")
        pdf.setFillColorRGB(*(v/255 for v in rgb))
        path = pdf.beginPath()
        for _, points in paths:
            path.moveTo(points[0][0],height-points[0][1])
            for x,y in points[1:]: path.lineTo(x,height-y)
            path.close()
        pdf.drawPath(path,stroke=0,fill=1,fillMode=0)
        pdf.showPage()
        pdf.save()
        ps = ["%!PS-Adobe-3.0 EPSF-3.0", f"%%BoundingBox: 0 0 {width} {height}",
              "%%Title: Studio KWONYC outlined vector logo", "%%LanguageLevel: 2", "%%EndComments",
              "gsave", " ".join(f"{v/255:.6f}" for v in rgb)+" setrgbcolor", "newpath"]
        for _, points in paths:
            ps.append(f"{points[0][0]} {height-points[0][1]} moveto")
            ps.extend(f"{x} {height-y} lineto" for x,y in points[1:])
            ps.append("closepath")
        ps.extend(["eofill", "grestore", "showpage", "%%EOF"])
        stem.with_suffix(".eps").write_text("\n".join(ps)+"\n",encoding="utf-8")
    sheet = Image.new("RGB", (1600,780), "#F7F6F2")
    draw = ImageDraw.Draw(sheet)
    draw.rectangle((0,390,1600,780),fill="#25205B")
    for name, y in (("navy",50),("white",440)):
        logo = Image.open(OUT/f"studio-kwonyc-{name}.png")
        logo.thumbnail((1360,285),Image.Resampling.LANCZOS)
        sheet.paste(logo,((1600-logo.width)//2,y),logo)
    sheet.save(OUT/"studio-kwonyc-variants-preview.png")
    report = {"source": SOURCE.name,"source_size": list(Image.open(SOURCE).size),
              "vector_size":[width,height],"path_loops":len(paths),
              "silhouette_iou":round(iou,6),"embedded_rasters":False,
              "native_ai_created":False,"illustrator_open_test":"not run: Illustrator unavailable",
              "notes":"Original texture retained in concept PNG; tiny grain holes removed in vector exports."}
    (OUT/"export-validation.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps(report))


if __name__ == "__main__": main()
