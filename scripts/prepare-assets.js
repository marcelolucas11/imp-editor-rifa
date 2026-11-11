#!/usr/bin/env node
/**
 * Prepara os ativos offline do app:
 *  - copia as fontes (woff2, subset latin) dos pacotes @fontsource para src/fonts
 *  - gera src/styles/fonts.css com os @font-face
 *  - copia o JSZip para src/vendor
 *
 * O app não depende de CDN: funciona 100% offline.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const nm = path.join(root, 'node_modules');
const fontsOut = path.join(root, 'src', 'fonts');
const cssOut = path.join(root, 'src', 'styles', 'fonts.css');
const vendorOut = path.join(root, 'src', 'vendor');

// família -> { pkg, variants: [[peso, estilo], ...] }
const FONTS = {
  'Anton':             { pkg: 'anton',             variants: [[400, 'normal']] },
  'Bebas Neue':        { pkg: 'bebas-neue',        variants: [[400, 'normal']] },
  'Black Ops One':     { pkg: 'black-ops-one',     variants: [[400, 'normal']] },
  'Bungee':            { pkg: 'bungee',            variants: [[400, 'normal']] },
  'Chakra Petch':      { pkg: 'chakra-petch',      variants: [[700, 'normal'], [700, 'italic']] },
  'Cinzel':            { pkg: 'cinzel',            variants: [[800, 'normal']] },
  'Exo 2':             { pkg: 'exo-2',             variants: [[900, 'normal'], [900, 'italic']] },
  'Faster One':        { pkg: 'faster-one',        variants: [[400, 'normal']] },
  'Fugaz One':         { pkg: 'fugaz-one',         variants: [[400, 'normal']] },
  'Kanit':             { pkg: 'kanit',             variants: [[800, 'normal'], [800, 'italic'], [900, 'normal'], [900, 'italic']] },
  'Michroma':          { pkg: 'michroma',          variants: [[400, 'normal']] },
  'Montserrat':        { pkg: 'montserrat',        variants: [[500, 'normal'], [700, 'normal'], [900, 'normal'], [500, 'italic'], [700, 'italic'], [900, 'italic']] },
  'Orbitron':          { pkg: 'orbitron',          variants: [[800, 'normal'], [900, 'normal']] },
  'Oswald':            { pkg: 'oswald',            variants: [[700, 'normal']] },
  'Permanent Marker':  { pkg: 'permanent-marker',  variants: [[400, 'normal']] },
  'Racing Sans One':   { pkg: 'racing-sans-one',   variants: [[400, 'normal']] },
  'Righteous':         { pkg: 'righteous',         variants: [[400, 'normal']] },
  'Russo One':         { pkg: 'russo-one',         variants: [[400, 'normal']] },
  'Saira Stencil One': { pkg: 'saira-stencil-one', variants: [[400, 'normal']] },
  'Teko':              { pkg: 'teko',              variants: [[700, 'normal']] }
};

fs.mkdirSync(fontsOut, { recursive: true });
fs.mkdirSync(path.dirname(cssOut), { recursive: true });
fs.mkdirSync(vendorOut, { recursive: true });

let css = '/* Gerado por scripts/prepare-assets.js — não editar à mão */\n';
let copied = 0;
const missing = [];

for (const [family, { pkg, variants }] of Object.entries(FONTS)) {
  for (const [weight, style] of variants) {
    const file = `${pkg}-latin-${weight}-${style}.woff2`;
    const src = path.join(nm, '@fontsource', pkg, 'files', file);
    if (!fs.existsSync(src)) {
      missing.push(`${family} ${weight} ${style}`);
      continue;
    }
    fs.copyFileSync(src, path.join(fontsOut, file));
    copied++;
    css += `@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:block;src:url("../fonts/${file}") format("woff2");}\n`;
  }
}

fs.writeFileSync(cssOut, css);
fs.copyFileSync(path.join(nm, 'jszip', 'dist', 'jszip.min.js'), path.join(vendorOut, 'jszip.min.js'));

console.log(`[assets] ${copied} arquivos de fonte copiados, JSZip pronto.`);
if (missing.length) {
  console.error('[assets] Variantes de fonte NÃO encontradas:', missing.join(', '));
  process.exit(1);
}
