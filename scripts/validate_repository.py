"""Validate UTF-8 docs, local Markdown links, outlined SVGs and secret exclusions."""
from pathlib import Path
import re
import json
import xml.etree.ElementTree as ET
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {".git", "node_modules", "tmp", "__pycache__", ".venv"}


def main():
    errors = []
    paths = [p for p in ROOT.rglob("*") if p.is_file() and not EXCLUDED.intersection(p.relative_to(ROOT).parts)]
    markdown = [p for p in paths if p.suffix == ".md"]
    for path in paths:
        if path.suffix.lower() in {".key", ".pem", ".p12", ".pfx", ".tfstate", ".tfvars"} or path.name.startswith(".env"):
            errors.append(f"Secret/local file should not be published: {path.relative_to(ROOT)}")
        if path.suffix.lower() not in {".md", ".py", ".svg", ".json", ".txt", ".eps"}:
            continue
        data = path.read_text(encoding="utf-8", errors="strict")
        if path.suffix == ".md":
            for target in re.findall(r"!?\[[^\]]*\]\(([^)]+)\)",data):
                target = target.strip("<>").split("#",1)[0]
                if not target or "://" in target or target.startswith(("mailto:", "#")):
                    continue
                # Local machine paths have no portable meaning in public wiki.
                if re.match(r"^[A-Za-z]:[\\/]", target):
                    errors.append(f"Machine-specific link: {path.relative_to(ROOT)}")
                elif not (path.parent / unquote(target)).exists():
                    errors.append(f"Broken link: {path.relative_to(ROOT)} -> {target}")
            for pattern in (r"-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----",r"\bgithub_pat_[A-Za-z0-9_]{20,}",r"\bgh[pousr]_[A-Za-z0-9]{20,}",r"\bsk-[A-Za-z0-9]{30,}"):
                if re.search(pattern,data): errors.append(f"Possible credential: {path.relative_to(ROOT)}")
    ns = {"s":"http://www.w3.org/2000/svg"}
    for name in ("navy","white"):
        path = ROOT/f"assets/branding/studio-kwonyc-{name}.svg"
        tree = ET.parse(path)
        assert tree.findall("s:path",ns), "Logo needs vector paths"
        assert not tree.findall(".//s:image",ns), "Logo must not embed raster"
        assert not tree.findall(".//s:text",ns), "Logo must not require fonts"
    result = {"utf8_text_and_markdown":"passed" if not errors else "failed", "markdown_files":len(markdown),"files":len(paths),"errors":errors}
    print(json.dumps(result,ensure_ascii=False,indent=2))
    if errors: raise SystemExit(1)


if __name__ == "__main__": main()
