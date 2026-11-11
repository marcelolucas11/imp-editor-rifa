#!/usr/bin/env python3
"""
Gera o ícone do app (build/icon.png, build/icon.icns e src/assets/icon.png).

Padrão macOS: tela de 1024x1024 com "squircle" de ~824px e margem transparente
(o macOS NÃO aplica máscara sozinho, então o formato é desenhado aqui).

Uso:
    python3 scripts/make_icon.py                       # monograma "I" dourado (padrão)
    python3 scripts/make_icon.py caminho/logo.png      # usa a logo da empresa

A logo pode ser PNG com fundo transparente ou preto; ela é centralizada e
reduzida para caber na área segura do ícone, sobre fundo preto.
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
GOLD = (215, 184, 112)          # #d7b870 — dourado da marca Impera
CANVAS = 1024
BODY = 824                      # tamanho do ícone dentro da tela (template Apple)
RADIUS = int(BODY * 0.2237)     # raio de canto do template Apple


def squircle_mask(size: int, body: int, radius: int, scale: int = 4) -> Image.Image:
    """Máscara com antialias (desenhada em 4x e reduzida)."""
    big = Image.new("L", (size * scale, size * scale), 0)
    off = (size - body) // 2 * scale
    ImageDraw.Draw(big).rounded_rectangle(
        (off, off, off + body * scale, off + body * scale), radius * scale, fill=255
    )
    return big.resize((size, size), Image.LANCZOS)


def load_font(px: int) -> ImageFont.FreeTypeFont:
    """Montserrat Black (marca) se possível; senão uma fonte bold do sistema."""
    woff2 = ROOT / "node_modules/@fontsource/montserrat/files/montserrat-latin-900-normal.woff2"
    if woff2.exists():
        try:
            from fontTools.ttLib import TTFont

            ttf = Path("/tmp/montserrat-900.ttf")
            f = TTFont(str(woff2))
            f.flavor = None
            f.save(str(ttf))
            return ImageFont.truetype(str(ttf), px)
        except Exception as exc:  # fonttools/brotli ausentes
            print("aviso: não consegui converter Montserrat:", exc)
    for cand in (
        "/System/Library/Fonts/Supplemental/Arial Black.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/opentype/inter/Inter-Black.otf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        if Path(cand).exists():
            return ImageFont.truetype(cand, px)
    return ImageFont.load_default()


def draw_default_mark(layer: Image.Image) -> None:
    """Monograma 'I' dourado com detalhe de coroa/diamante — sóbrio, legível em 16px."""
    d = ImageDraw.Draw(layer)
    font = load_font(560)
    bbox = d.textbbox((0, 0), "I", font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (CANVAS - w) / 2 - bbox[0]
    y = (CANVAS - h) / 2 - bbox[1] + 36
    d.text((x, y), "I", font=font, fill=GOLD)
    # diamante acima do "I"
    cx, cy, r = CANVAS // 2, int(y + bbox[1] - 70), 34
    d.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=GOLD)


def place_logo(layer: Image.Image, logo_path: str) -> None:
    logo = Image.open(logo_path).convert("RGBA")
    # se a logo não tem transparência, trata preto como transparente
    if logo.getchannel("A").getextrema() == (255, 255):
        lum = logo.convert("L")
        logo.putalpha(lum)
    box = int(BODY * 0.62)
    logo.thumbnail((box, box), Image.LANCZOS)
    layer.alpha_composite(logo, ((CANVAS - logo.width) // 2, (CANVAS - logo.height) // 2))


def main() -> None:
    mask = squircle_mask(CANVAS, BODY, RADIUS)

    # corpo preto com leve gradiente vertical (profundidade sem perder o preto)
    body = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 255))
    grad = Image.linear_gradient("L").resize((CANVAS, CANVAS))
    sheen = Image.new("RGBA", (CANVAS, CANVAS), (255, 255, 255, 0))
    sheen.putalpha(grad.point(lambda v: int((255 - v) * 0.07)))
    body.alpha_composite(sheen)

    mark = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    if len(sys.argv) > 1:
        place_logo(mark, sys.argv[1])
    else:
        draw_default_mark(mark)
    body.alpha_composite(mark)

    # filete dourado interno discreto
    ring = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    inner = squircle_mask(CANVAS, BODY - 36, RADIUS - 18)
    edge = ImageChops.subtract(inner, squircle_mask(CANVAS, BODY - 44, RADIUS - 22))
    ring_col = Image.new("RGBA", (CANVAS, CANVAS), GOLD + (0,))
    ring_col.putalpha(edge.point(lambda v: int(v * 0.28)))
    ring.alpha_composite(ring_col)
    body.alpha_composite(ring)

    icon = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    icon.paste(body, (0, 0), mask)

    # sombra suave (padrão macOS)
    shadow = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    shadow.putalpha(mask.point(lambda v: int(v * 0.45)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    shadow = ImageChops.offset(shadow, 0, 12)
    final = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    final.alpha_composite(shadow)
    final.alpha_composite(icon)

    build = ROOT / "build"
    assets = ROOT / "src" / "assets"
    build.mkdir(exist_ok=True)
    assets.mkdir(parents=True, exist_ok=True)
    final.save(build / "icon.png")
    final.save(
        build / "icon.icns",
        sizes=[(16, 16), (32, 32), (64, 64), (128, 128), (256, 256), (512, 512), (1024, 1024)],
    )
    final.resize((256, 256), Image.LANCZOS).save(assets / "icon.png")
    print("ícone gerado em build/icon.png, build/icon.icns, src/assets/icon.png")


if __name__ == "__main__":
    main()
