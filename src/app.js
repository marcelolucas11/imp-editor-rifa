'use strict';
    // =========================================================================
    // 1. CATÁLOGO DE 20 FONTES 2D + 20 FONTES 3D DE ALTA EDIÇÃO AUTOMOTIVA
    // =========================================================================
    const FONT_MODELS_2D = [
      { id: '2d_1',  name: '01. Jetta Impact (Anton Italic)',     family: 'Anton',             weight: '400', italic: true,  skew: -0.14, scaleX: 0.96, type: '2D' },
      { id: '2d_2',  name: '02. Adesivo Racing (Kanit Black)',    family: 'Kanit',             weight: '900', italic: true,  skew: -0.06, scaleX: 1.04, type: '2D' },
      { id: '2d_3',  name: '03. Velocidade Pura (Exo 2 Black)',   family: 'Exo 2',             weight: '900', italic: true,  skew: -0.08, scaleX: 1.00, type: '2D' },
      { id: '2d_4',  name: '04. Arrancada (Fugaz One)',           family: 'Fugaz One',         weight: '400', italic: false, skew: -0.05, scaleX: 1.02, type: '2D' },
      { id: '2d_5',  name: '05. Pista Pro (Racing Sans One)',     family: 'Racing Sans One',   weight: '400', italic: false, skew: -0.08, scaleX: 1.05, type: '2D' },
      { id: '2d_6',  name: '06. Torque Brutal (Russo One)',       family: 'Russo One',         weight: '400', italic: false, skew: -0.12, scaleX: 1.02, type: '2D' },
      { id: '2d_7',  name: '07. Tall Condensed (Bebas Neue)',     family: 'Bebas Neue',        weight: '400', italic: false, skew: -0.14, scaleX: 1.00, type: '2D' },
      { id: '2d_8',  name: '08. Super Headline (Teko Bold)',      family: 'Teko',              weight: '700', italic: false, skew: -0.12, scaleX: 1.06, type: '2D' },
      { id: '2d_9',  name: '09. Cyber Drift (Chakra Petch)',      family: 'Chakra Petch',      weight: '700', italic: true,  skew: -0.06, scaleX: 1.02, type: '2D' },
      { id: '2d_10', name: '10. Hypercar (Orbitron Black)',       family: 'Orbitron',          weight: '900', italic: false, skew: -0.10, scaleX: 0.95, type: '2D' },
      { id: '2d_11', name: '11. Blindado (Black Ops One)',        family: 'Black Ops One',     weight: '400', italic: false, skew: -0.10, scaleX: 0.98, type: '2D' },
      { id: '2d_12', name: '12. Stencil Garage (Saira Stencil)',  family: 'Saira Stencil One', weight: '400', italic: false, skew: -0.10, scaleX: 1.00, type: '2D' },
      { id: '2d_13', name: '13. Nitro Boost (Faster One)',        family: 'Faster One',        weight: '400', italic: false, skew: -0.04, scaleX: 1.00, type: '2D' },
      { id: '2d_14', name: '14. Bloco Urbano (Bungee)',           family: 'Bungee',            weight: '400', italic: false, skew: -0.10, scaleX: 0.96, type: '2D' },
      { id: '2d_15', name: '15. Euro Sport (Montserrat Black)',   family: 'Montserrat',        weight: '900', italic: true,  skew: -0.06, scaleX: 1.02, type: '2D' },
      { id: '2d_16', name: '16. German Style (Oswald Bold)',      family: 'Oswald',            weight: '700', italic: false, skew: -0.14, scaleX: 1.00, type: '2D' },
      { id: '2d_17', name: '17. Street Custom (Righteous)',       family: 'Righteous',         weight: '400', italic: false, skew: -0.10, scaleX: 1.00, type: '2D' },
      { id: '2d_18', name: '18. Wide Body (Michroma)',            family: 'Michroma',          weight: '400', italic: false, skew: -0.12, scaleX: 0.85, type: '2D' },
      { id: '2d_19', name: '19. Drift Graffiti (Marker)',         family: 'Permanent Marker',  weight: '400', italic: false, skew: -0.08, scaleX: 1.02, type: '2D' },
      { id: '2d_20', name: '20. Luxury Edition (Cinzel Black)',   family: 'Cinzel',            weight: '800', italic: false, skew: -0.06, scaleX: 1.00, type: '2D' }
    ];

    const FONT_MODELS_3D = [
      { id: '3d_1',  name: '3D 01. Bloco Jetta Pro (Anton)',      family: 'Anton',             weight: '400', italic: true,  skew: -0.14, scaleX: 0.96, type: '3D', depth: 12, angleX: 0.7,  angleY: 1.0,  extrudeColor: '#111827', highlight: '#ffffff' },
      { id: '3d_2',  name: '3D 02. Adesivo Alto Relevo (Kanit)',  family: 'Kanit',             weight: '900', italic: true,  skew: -0.06, scaleX: 1.04, type: '3D', depth: 11, angleX: 0.8,  angleY: 0.9,  extrudeColor: '#09090b', highlight: '#fde047' },
      { id: '3d_3',  name: '3D 03. Cromo Esportivo (Exo 2)',      family: 'Exo 2',             weight: '900', italic: true,  skew: -0.08, scaleX: 1.00, type: '3D', depth: 13, angleX: 0.6,  angleY: 1.1,  extrudeColor: '#1e293b', highlight: '#38bdf8' },
      { id: '3d_4',  name: '3D 04. Ouro Imperial (Fugaz One)',    family: 'Fugaz One',         weight: '400', italic: false, skew: -0.05, scaleX: 1.02, type: '3D', depth: 12, angleX: 0.8,  angleY: 0.8,  extrudeColor: '#422006', highlight: '#fef08a' },
      { id: '3d_5',  name: '3D 05. Pista Extrudada (Racing)',     family: 'Racing Sans One',   weight: '400', italic: false, skew: -0.08, scaleX: 1.05, type: '3D', depth: 14, angleX: 0.9,  angleY: 0.9,  extrudeColor: '#18181b', highlight: '#f87171' },
      { id: '3d_6',  name: '3D 06. Titânio Pesado (Russo One)',   family: 'Russo One',         weight: '400', italic: false, skew: -0.12, scaleX: 1.02, type: '3D', depth: 15, angleX: 0.7,  angleY: 1.0,  extrudeColor: '#0f172a', highlight: '#94a3b8' },
      { id: '3d_7',  name: '3D 07. Torre Metálica (Bebas Neue)',  family: 'Bebas Neue',        weight: '400', italic: false, skew: -0.14, scaleX: 1.00, type: '3D', depth: 14, angleX: 0.8,  angleY: 1.0,  extrudeColor: '#171717', highlight: '#e4e4e7' },
      { id: '3d_8',  name: '3D 08. Super Relevo (Teko Bold)',     family: 'Teko',              weight: '700', italic: false, skew: -0.12, scaleX: 1.06, type: '3D', depth: 13, angleX: 0.7,  angleY: 1.1,  extrudeColor: '#1f2937', highlight: '#fca5a5' },
      { id: '3d_9',  name: '3D 09. Cyber Neon 3D (Chakra)',       family: 'Chakra Petch',      weight: '700', italic: true,  skew: -0.06, scaleX: 1.02, type: '3D', depth: 12, angleX: 0.9,  angleY: 0.8,  extrudeColor: '#31102f', highlight: '#f472b6' },
      { id: '3d_10', name: '3D 10. Nave Futurista (Orbitron)',    family: 'Orbitron',          weight: '900', italic: false, skew: -0.10, scaleX: 0.95, type: '3D', depth: 14, angleX: 0.6,  angleY: 1.0,  extrudeColor: '#0c4a6e', highlight: '#7dd3fc' },
      { id: '3d_11', name: '3D 11. Aço Militar (Black Ops)',      family: 'Black Ops One',     weight: '400', italic: false, skew: -0.10, scaleX: 0.98, type: '3D', depth: 15, angleX: 0.8,  angleY: 1.0,  extrudeColor: '#14261c', highlight: '#86efac' },
      { id: '3d_12', name: '3D 12. Oficina Stencil (Saira)',      family: 'Saira Stencil One', weight: '400', italic: false, skew: -0.10, scaleX: 1.00, type: '3D', depth: 12, angleX: 0.7,  angleY: 0.9,  extrudeColor: '#27272a', highlight: '#fdba74' },
      { id: '3d_13', name: '3D 13. Arrancada Turbo (Faster)',     family: 'Faster One',        weight: '400', italic: false, skew: -0.04, scaleX: 1.00, type: '3D', depth: 11, angleX: 1.0,  angleY: 0.7,  extrudeColor: '#3b0764', highlight: '#d8b4fe' },
      { id: '3d_14', name: '3D 14. Extrusão Máxima (Bungee)',     family: 'Bungee',            weight: '400', italic: false, skew: -0.10, scaleX: 0.96, type: '3D', depth: 16, angleX: 0.8,  angleY: 1.1,  extrudeColor: '#450a0a', highlight: '#fca5a5' },
      { id: '3d_15', name: '3D 15. Euro Tuning 3D (Montserrat)', family: 'Montserrat',        weight: '900', italic: true,  skew: -0.06, scaleX: 1.02, type: '3D', depth: 12, angleX: 0.7,  angleY: 0.9,  extrudeColor: '#111827', highlight: '#e5e7eb' },
      { id: '3d_16', name: '3D 16. Autobahnen (Oswald 3D)',       family: 'Oswald',            weight: '700', italic: false, skew: -0.14, scaleX: 1.00, type: '3D', depth: 13, angleX: 0.7,  angleY: 1.0,  extrudeColor: '#1c1917', highlight: '#fde047' },
      { id: '3d_17', name: '3D 17. Custom Show (Righteous)',      family: 'Righteous',         weight: '400', italic: false, skew: -0.10, scaleX: 1.00, type: '3D', depth: 12, angleX: 0.8,  angleY: 0.9,  extrudeColor: '#1e1b4b', highlight: '#a5b4fc' },
      { id: '3d_18', name: '3D 18. Wide Stance 3D (Michroma)',    family: 'Michroma',          weight: '400', italic: false, skew: -0.12, scaleX: 0.85, type: '3D', depth: 11, angleX: 0.6,  angleY: 1.0,  extrudeColor: '#09090b', highlight: '#f4f4f5' },
      { id: '3d_19', name: '3D 19. Street King (Marker 3D)',      family: 'Permanent Marker',  weight: '400', italic: false, skew: -0.08, scaleX: 1.02, type: '3D', depth: 12, angleX: 0.8,  angleY: 0.9,  extrudeColor: '#000000', highlight: '#fbbf24' },
      { id: '3d_20', name: '3D 20. Troféu VIP (Cinzel 3D)',       family: 'Cinzel',            weight: '800', italic: false, skew: -0.06, scaleX: 1.00, type: '3D', depth: 13, angleX: 0.7,  angleY: 1.0,  extrudeColor: '#292524', highlight: '#fef3c7' }
    ];

    const ALL_FONT_MODELS = [...FONT_MODELS_2D, ...FONT_MODELS_3D];

    function getFontModelById(id) {
      return ALL_FONT_MODELS.find(f => f.id === id) || FONT_MODELS_2D[0];
    }

    // =========================================================================
    // 2. ESTRUTURA PADRÃO DO SETUP (FIEL À FOTO DO JETTA TSI COM CARRO EXEMPLO E 0,25)
    // =========================================================================
    function createDefaultSetup() {
      return {
        skyDarkness: 88,
        vignette: 75,
        layers: [
          {
            id: 'title',
            label: '1. Título Principal (Ex: CARRO EXEMPLO)',
            text: 'CARRO EXEMPLO',
            fontModelId: '2d_1',
            fontSize: 132,
            x: 50.0,
            y: 35.8,
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 0,
            shadowColor: '#000000',
            shadowBlur: 24,
            shadowOffsetY: 10,
            align: 'center',
            autoFitWidth: true
          },
          {
            id: 'subtitle',
            label: '2. Subtítulo em Dinheiro (Ex: OU R$50.000,00)',
            text: 'OU R$50.000,00',
            fontModelId: '2d_1',
            fontSize: 52,
            x: 86.5,
            y: 40.2,
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 0,
            shadowColor: '#000000',
            shadowBlur: 16,
            shadowOffsetY: 6,
            align: 'right'
          },
          {
            id: 'badgeTop',
            label: '3. Selo Esquerdo • Frase de Cima (Ex: RETA FINAL / MEIO DA AÇÃO)',
            text: 'RETA FINAL',
            fontModelId: '2d_2',
            fontSize: 27,
            x: 18.2,
            y: 66.2,
            fillColor: '#FFEE00',
            strokeColor: '#000000',
            strokeWidth: 11,
            shadowColor: '#000000',
            shadowBlur: 10,
            shadowOffsetY: 3,
            align: 'center'
          },
          {
            id: 'badgeBottom',
            label: '4. Selo Esquerdo • Frase de Baixo (Ex: ÚLTIMOS %!!! / PASSAMOS DE 50%)',
            text: 'ÚLTIMOS %!!!',
            fontModelId: '2d_2',
            fontSize: 27,
            x: 18.2,
            y: 67.9,
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 11,
            shadowColor: '#000000',
            shadowBlur: 10,
            shadowOffsetY: 3,
            align: 'center'
          },
          {
            id: 'ctaTop',
            label: '5. Chamada Preço • Linha 1 (Ex: CONCORRA)',
            text: 'CONCORRA',
            fontModelId: '2d_2',
            fontSize: 31,
            x: 38.2,
            y: 72.5,
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 13,
            shadowColor: '#000000',
            shadowBlur: 12,
            shadowOffsetY: 3,
            align: 'center'
          },
          {
            id: 'ctaBottom',
            label: '6. Chamada Preço • Linha 2 (Ex: POR APENAS)',
            text: 'POR APENAS',
            fontModelId: '2d_2',
            fontSize: 28,
            x: 38.0,
            y: 74.3,
            fillColor: '#FF1E1E',
            strokeColor: '#000000',
            strokeWidth: 13,
            shadowColor: '#000000',
            shadowBlur: 12,
            shadowOffsetY: 3,
            align: 'center'
          },
          {
            id: 'priceValue',
            label: '7. Valor da Cota em Destaque (Ex: 0,25)',
            text: '0,25',
            fontModelId: '2d_2',
            fontSize: 68,
            x: 64.5,
            y: 74.0,
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 17,
            shadowColor: '#000000',
            shadowBlur: 14,
            shadowOffsetY: 4,
            align: 'center'
          },
          {
            id: 'footerCta',
            label: '8. Rodapé (Clique em saiba mais) + Seta',
            text: 'Clique em  saiba mais',
            fontModelId: '2d_15',
            fontSize: 21,
            x: 50.0,
            y: 78.2,
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 0,
            shadowColor: '#000000',
            shadowBlur: 8,
            shadowOffsetY: 2,
            align: 'center',
            arrowStyle: 'double_chevron',
            arrowColor: '#FFFFFF'
          }
        ]
      };
    }

    function cloneSetup(setup) {
      return JSON.parse(JSON.stringify(setup));
    }

    function flushDOMInputsToCurrentSetup() {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem || !currentItem.setup) return;

      const container = document.getElementById('layersContainer');
      if (!container) return;

      container.querySelectorAll('input[data-layer-idx], select[data-layer-idx]').forEach(el => {
        const lIdx = Number(el.dataset.layerIdx);
        const prop = el.dataset.prop;
        if (!currentItem.setup.layers[lIdx] || !prop) return;

        let val = el.value;
        if (['strokeWidth', 'shadowBlur', 'fontSize', 'x', 'y'].includes(prop)) {
          val = Number(val);
        }
        currentItem.setup.layers[lIdx][prop] = val;
        if (prop === 'fillColor' && currentItem.setup.layers[lIdx].id === 'footerCta') {
          currentItem.setup.layers[lIdx].arrowColor = val;
        }
      });

      const skySlider = document.getElementById('sliderSkyDark');
      const vigSlider = document.getElementById('sliderVignette');
      if (skySlider) currentItem.setup.skyDarkness = Number(skySlider.value);
      if (vigSlider) currentItem.setup.vignette = Number(vigSlider.value);
    }

    function getSetupShortSummary(setupData) {
      if (!setupData || !Array.isArray(setupData.layers)) return '';
      const carName = setupData.layers.find(l => l.id === 'title')?.text || '';
      const priceVal = setupData.layers.find(l => l.id === 'priceValue')?.text || '';
      return `${carName} • ${priceVal}`;
    }

    // =========================================================================
    // 3. ESTADO DA GALERIA (ATÉ 100 IMAGENS) E SETUPS SALVOS
    // =========================================================================
    const MAX_IMAGES = 100;
    let galleryItems = [];
    let currentIndex = 0;
    let activeLayerIndexForModal = 0;
    let activeModalTab = '2D';

    let savedSetups = {
      default_jetta: {
        name: '★ Padrão Inicial',
        data: createDefaultSetup()
      }
    };

    try {
      const stored = localStorage.getItem('sorteio_pro_setups_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        savedSetups = { ...savedSetups, ...parsed };
      }
    } catch (e) {
      console.warn('Acesso ao localStorage indisponível:', e);
    }

    const mainCanvas = document.getElementById('mainCanvas');

    // =========================================================================
    // 4. MOTOR DE RENDERIZAÇÃO (CANVAS PRINCIPAL E MINIATURAS EM TEMPO REAL)
    // =========================================================================
    function drawImageCover(ctx, img, w, h) {
      const iw = img.naturalWidth || img.width || 900;
      const ih = img.naturalHeight || img.height || 1600;
      const r = Math.max(w / iw, h / ih);
      const nw = iw * r;
      const nh = ih * r;
      const cx = (w - nw) * 0.5;
      const cy = (h - nh) * 0.5;
      ctx.drawImage(img, cx, cy, nw, nh);
    }

    function drawFallbackPorscheCar(ctx, w, h) {
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.56);
      sky.addColorStop(0, '#44586c');
      sky.addColorStop(0.65, '#8fa6bc');
      sky.addColorStop(1, '#d3dde6');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h * 0.56);

      const road = ctx.createLinearGradient(0, h * 0.53, 0, h);
      road.addColorStop(0, '#727377');
      road.addColorStop(0.5, '#545559');
      road.addColorStop(1, '#2b2c30');
      ctx.fillStyle = road;
      ctx.fillRect(0, h * 0.53, w, h * 0.47);

      ctx.save();
      ctx.translate(w * 0.5, h * 0.555);
      const scale = w / 900;
      ctx.scale(scale, scale);

      ctx.fillStyle = 'rgba(0,0,0,0.68)';
      ctx.beginPath();
      ctx.ellipse(0, 88, 390, 38, 0, 0, Math.PI * 2);
      ctx.fill();

      const bodyGrad = ctx.createLinearGradient(-350, -120, 350, 90);
      bodyGrad.addColorStop(0, '#850610');
      bodyGrad.addColorStop(0.45, '#dc1625');
      bodyGrad.addColorStop(0.8, '#ff2d3d');
      bodyGrad.addColorStop(1, '#75040d');
      ctx.fillStyle = bodyGrad;

      ctx.beginPath();
      ctx.moveTo(-365, 25);
      ctx.bezierCurveTo(-360, -35, -310, -55, -240, -68);
      ctx.bezierCurveTo(-175, -135, -30, -148, 85, -125);
      ctx.bezierCurveTo(155, -95, 200, -58, 295, -42);
      ctx.bezierCurveTo(360, -28, 395, 10, 382, 58);
      ctx.lineTo(-350, 62);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#18212b';
      ctx.beginPath();
      ctx.moveTo(-210, -64);
      ctx.bezierCurveTo(-155, -122, -25, -132, 70, -112);
      ctx.lineTo(155, -55);
      ctx.lineTo(-195, -52);
      ctx.closePath();
      ctx.fill();

      [-265, 20].forEach((wx) => {
        ctx.fillStyle = '#101216';
        ctx.beginPath();
        ctx.ellipse(wx, 45, 58, 66, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d4d8e0';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(wx, 45, 42, 50, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }

    function drawArrowElement(ctx, style, x, y, scale, color) {
      if (!style || style === 'none') return;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.strokeStyle = color || '#FFFFFF';
      ctx.fillStyle = color || '#FFFFFF';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;

      if (style === 'double_chevron') {
        ctx.lineWidth = 5.5;
        ctx.beginPath();
        ctx.moveTo(-13, 0);
        ctx.lineTo(0, 12);
        ctx.lineTo(13, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-13, 12);
        ctx.lineTo(0, 24);
        ctx.lineTo(13, 12);
        ctx.stroke();
      } else if (style === 'triple_chevron') {
        ctx.lineWidth = 5;
        [0, 10, 20].forEach(offsetY => {
          ctx.beginPath();
          ctx.moveTo(-13, offsetY);
          ctx.lineTo(0, offsetY + 11);
          ctx.lineTo(13, offsetY);
          ctx.stroke();
        });
      } else if (style === 'filled_triangle') {
        ctx.beginPath();
        ctx.moveTo(-15, 2);
        ctx.lineTo(15, 2);
        ctx.lineTo(0, 22);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    function drawStyledTextLayer(ctx, layer, canvasW, canvasH) {
      if (!layer.text || !layer.text.trim()) return;

      const scaleFactor = canvasW / 900;
      const model = getFontModelById(layer.fontModelId);

      ctx.save();
      const posX = (layer.x / 100) * canvasW;
      const posY = (layer.y / 100) * canvasH;
      ctx.translate(posX, posY);

      let fontSizePx = layer.fontSize * scaleFactor;
      const italicStr = model.italic ? 'italic ' : '';
      ctx.font = `${italicStr}${model.weight} ${fontSizePx}px "${model.family}", sans-serif`;

      if (layer.autoFitWidth) {
        const maxAllowedW = canvasW * 0.88;
        let measured = ctx.measureText(layer.text).width * (model.scaleX || 1);
        while (measured > maxAllowedW && fontSizePx > 20 * scaleFactor) {
          fontSizePx -= 2 * scaleFactor;
          ctx.font = `${italicStr}${model.weight} ${fontSizePx}px "${model.family}", sans-serif`;
          measured = ctx.measureText(layer.text).width * (model.scaleX || 1);
        }
      }

      ctx.transform(model.scaleX || 1, 0, model.skew || 0, 1, 0, 0);
      ctx.textAlign = layer.align || 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;

      const strokeW = (layer.strokeWidth || 0) * scaleFactor;

      if (model.type === '3D') {
        const depthSteps = Math.max(3, Math.round((model.depth || 12) * scaleFactor));
        const stepX = (model.angleX || 0.7) * scaleFactor;
        const stepY = (model.angleY || 1.0) * scaleFactor;

        ctx.save();
        ctx.shadowColor = layer.shadowColor || '#000000';
        ctx.shadowBlur = (layer.shadowBlur || 16) * scaleFactor;
        ctx.shadowOffsetY = (layer.shadowOffsetY || 6) * scaleFactor;
        for (let d = depthSteps; d >= 1; d--) {
          ctx.fillStyle = model.extrudeColor || '#111827';
          if (strokeW > 0) {
            ctx.strokeStyle = layer.strokeColor || '#000000';
            ctx.lineWidth = strokeW;
            ctx.strokeText(layer.text, d * stepX, d * stepY);
          }
          ctx.fillText(layer.text, d * stepX, d * stepY);
          ctx.shadowColor = 'transparent';
        }
        ctx.restore();

        if (strokeW > 0) {
          ctx.strokeStyle = layer.strokeColor || '#000000';
          ctx.lineWidth = strokeW;
          ctx.strokeText(layer.text, 0, 0);
        }

        ctx.fillStyle = layer.fillColor || '#FFFFFF';
        ctx.fillText(layer.text, 0, 0);

        ctx.fillStyle = model.highlight || '#FFFFFF';
        ctx.globalAlpha = 0.35;
        ctx.fillText(layer.text, -0.8 * scaleFactor, -0.8 * scaleFactor);
        ctx.globalAlpha = 1.0;
      } else {
        if (strokeW > 0) {
          ctx.save();
          ctx.shadowColor = layer.shadowColor || '#000000';
          ctx.shadowBlur = (layer.shadowBlur || 12) * scaleFactor;
          ctx.shadowOffsetY = (layer.shadowOffsetY || 4) * scaleFactor;
          ctx.strokeStyle = layer.strokeColor || '#000000';
          ctx.lineWidth = strokeW;
          ctx.strokeText(layer.text, 0, 0);
          ctx.restore();

          ctx.fillStyle = layer.fillColor || '#FFFFFF';
          ctx.fillText(layer.text, 0, 0);
        } else {
          ctx.shadowColor = layer.shadowColor || '#000000';
          ctx.shadowBlur = (layer.shadowBlur || 18) * scaleFactor;
          ctx.shadowOffsetY = (layer.shadowOffsetY || 6) * scaleFactor;
          ctx.fillStyle = layer.fillColor || '#FFFFFF';
          ctx.fillText(layer.text, 0, 0);
        }
      }

      ctx.restore();

      if (layer.id === 'footerCta') {
        const scaleFactorArrow = canvasW / 900;
        const arrowX = (layer.x / 100) * canvasW;
        const arrowY = ((layer.y + 1.4) / 100) * canvasH;
        drawArrowElement(ctx, layer.arrowStyle, arrowX, arrowY, scaleFactorArrow, layer.arrowColor || layer.fillColor);
      }
    }

    function renderArtToCanvas(targetCanvas, photoItem) {
      const ctx = targetCanvas.getContext('2d');
      const W = targetCanvas.width;
      const H = targetCanvas.height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      if (photoItem && photoItem.imgElement) {
        // miniaturas usam uma cópia reduzida (rápido com 100 fotos); preview/exportação usam o original
        const source = (W <= 400 && photoItem.thumbSource) ? photoItem.thumbSource : photoItem.imgElement;
        drawImageCover(ctx, source, W, H);
      } else {
        drawFallbackPorscheCar(ctx, W, H);
      }

      if (!photoItem || !photoItem.isEdited) {
        return;
      }

      const setup = photoItem.setup;
      const skyAlpha = (setup.skyDarkness ?? 88) / 100;
      const vigAlpha = (setup.vignette ?? 75) / 100;

      const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.56);
      topGrad.addColorStop(0.0, `rgba(0, 0, 0, ${Math.min(0.98, skyAlpha * 1.06)})`);
      topGrad.addColorStop(0.38, `rgba(0, 0, 0, ${skyAlpha * 0.85})`);
      topGrad.addColorStop(0.75, `rgba(0, 0, 0, ${skyAlpha * 0.28})`);
      topGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, W, H * 0.58);

      const botGrad = ctx.createLinearGradient(0, H * 0.58, 0, H);
      botGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
      botGrad.addColorStop(0.45, `rgba(0, 0, 0, ${vigAlpha * 0.48})`);
      botGrad.addColorStop(1.0, `rgba(0, 0, 0, ${Math.min(0.96, vigAlpha * 0.98)})`);
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, H * 0.58, W, H * 0.42);

      const radGrad = ctx.createRadialGradient(W * 0.5, H * 0.54, W * 0.22, W * 0.5, H * 0.54, W * 0.95);
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      radGrad.addColorStop(1, `rgba(0, 0, 0, ${vigAlpha * 0.72})`);
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, W, H);

      setup.layers.forEach(layer => {
        drawStyledTextLayer(ctx, layer, W, H);
      });
    }

    // =========================================================================
    // 5. GERENCIAMENTO DA GALERIA DE ATÉ 100 FOTOS E MINIATURAS AO VIVO
    // =========================================================================
    function refreshMainAndThumb(index = currentIndex) {
      const item = galleryItems[index];
      if (!item) return;

      if (index === currentIndex) {
        renderArtToCanvas(mainCanvas, item);
        document.getElementById('currentPhotoName').textContent = `Foto #${index + 1} • ${item.name}`;
        updateToggleEditedButton(item.isEdited);
      }

      const thumbCanvas = document.getElementById(`thumb_canvas_${item.id}`);
      if (thumbCanvas) {
        renderArtToCanvas(thumbCanvas, item);
      }
      const badge = document.getElementById(`thumb_badge_${item.id}`);
      if (badge) {
        if (item.isEdited) {
          badge.textContent = 'EDITADA';
          badge.className = 'px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-emerald-500 text-black shadow';
        } else {
          badge.textContent = 'SEM EDIÇÃO';
          badge.className = 'px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-zinc-700 text-zinc-200 shadow';
        }
      }
    }

    function rebuildGalleryGrid() {
      const grid = document.getElementById('galleryGrid');
      grid.innerHTML = '';

      document.getElementById('galleryCountBadge').textContent = `${galleryItems.length} / ${MAX_IMAGES}`;
      document.getElementById('exportAllText').textContent = `EXPORTAR TUDO PRONTO (${galleryItems.length})`;

      if (window.__reportWork) window.__reportWork();

      galleryItems.forEach((item, idx) => {
        const isCurrent = idx === currentIndex;
        const card = document.createElement('div');
        card.className = `group relative rounded-xl overflow-hidden border-2 transition cursor-pointer flex flex-col bg-zinc-950 ${
          isCurrent ? 'border-red-500 ring-2 ring-red-500/30' : 'border-zinc-800 hover:border-zinc-600'
        }`;

        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.id = `thumb_canvas_${item.id}`;
        thumbCanvas.width = 180;
        thumbCanvas.height = 320;
        thumbCanvas.className = 'w-full h-auto block';

        const topOverlay = document.createElement('div');
        topOverlay.className = 'absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none';

        const numTag = document.createElement('span');
        numTag.className = 'px-1.5 py-0.5 text-[9px] font-extrabold bg-black/80 text-white rounded';
        numTag.textContent = `#${idx + 1}`;

        const statusBadge = document.createElement('span');
        statusBadge.id = `thumb_badge_${item.id}`;
        if (item.isEdited) {
          statusBadge.textContent = 'EDITADA';
          statusBadge.className = 'px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-emerald-500 text-black shadow';
        } else {
          statusBadge.textContent = 'SEM EDIÇÃO';
          statusBadge.className = 'px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-zinc-700 text-zinc-200 shadow';
        }

        topOverlay.appendChild(numTag);
        topOverlay.appendChild(statusBadge);

        const bottomBar = document.createElement('div');
        bottomBar.className = 'p-1.5 bg-zinc-950/95 border-t border-zinc-800/80 flex flex-col gap-1';

        const topActionRow = document.createElement('div');
        topActionRow.className = 'flex items-center justify-between gap-1';

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'text-[10px] font-bold text-zinc-300 hover:text-white truncate';
        toggleBtn.textContent = item.isEdited ? 'Ocultar Edição' : 'Ativar Edição';
        toggleBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          item.isEdited = !item.isEdited;
          toggleBtn.textContent = item.isEdited ? 'Ocultar Edição' : 'Ativar Edição';
          refreshMainAndThumb(idx);
        });

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'text-[10px] font-bold text-zinc-500 hover:text-red-400 px-1';
        delBtn.textContent = '✕';
        delBtn.title = 'Remover foto';
        delBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (galleryItems.length <= 1) {
            showToast('A galeria precisa ter pelo menos 1 imagem.');
            return;
          }
          galleryItems.splice(idx, 1);
          if (currentIndex >= galleryItems.length) currentIndex = galleryItems.length - 1;
          rebuildGalleryGrid();
          syncControlsFromCurrentPhoto();
          refreshMainAndThumb(currentIndex);
        });

        topActionRow.appendChild(toggleBtn);
        topActionRow.appendChild(delBtn);
        bottomBar.appendChild(topActionRow);

        if (idx !== currentIndex) {
          const pasteSetupBtn = document.createElement('button');
          pasteSetupBtn.type = 'button';
          pasteSetupBtn.className = 'w-full py-1 px-1.5 rounded bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[9px] font-extrabold uppercase transition truncate';
          pasteSetupBtn.textContent = `Colar Padrão da #${currentIndex + 1} Aqui`;
          pasteSetupBtn.title = 'Copia todos os textos (nome do carro, valor, frases) e edição da foto atual para esta foto';
          pasteSetupBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            flushDOMInputsToCurrentSetup();
            const sourceItem = galleryItems[currentIndex];
            if (!sourceItem) return;
            item.setup = cloneSetup(sourceItem.setup);
            item.isEdited = true;
            refreshMainAndThumb(idx);
            showToast(`Padrão (textos + edição) da Foto #${currentIndex + 1} aplicado na Foto #${idx + 1}!`);
          });
          bottomBar.appendChild(pasteSetupBtn);
        }

        card.appendChild(thumbCanvas);
        card.appendChild(topOverlay);
        card.appendChild(bottomBar);

        card.addEventListener('click', () => {
          flushDOMInputsToCurrentSetup();
          currentIndex = idx;
          rebuildGalleryGrid();
          syncControlsFromCurrentPhoto();
          refreshMainAndThumb(currentIndex);
        });

        grid.appendChild(card);
        renderArtToCanvas(thumbCanvas, item);
      });
    }

    function updateToggleEditedButton(isEdited) {
      const btn = document.getElementById('btnToggleCurrentEdited');
      if (isEdited) {
        btn.textContent = '✓ COM EDIÇÃO ATIVA';
        btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 transition';
      } else {
        btn.textContent = '○ SEM EDIÇÃO (ORIGINAL)';
        btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-zinc-800 text-zinc-400 border border-zinc-700 transition';
      }
    }

    // =========================================================================
    // 6. CONSTRUÇÃO DINÂMICA DAS 8 CAIXINHAS DE EDIÇÃO INDIVIDUAL
    // =========================================================================
    function buildLayerControlsUI() {
      const container = document.getElementById('layersContainer');
      container.innerHTML = '';

      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;

      currentItem.setup.layers.forEach((layer, lIdx) => {
        const fontModel = getFontModelById(layer.fontModelId);

        const box = document.createElement('div');
        box.className = 'bg-zinc-950/90 border border-zinc-800/90 rounded-xl p-3.5 flex flex-col gap-2.5';

        const header = document.createElement('div');
        header.className = 'flex flex-wrap items-center justify-between gap-2';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'text-xs font-extrabold uppercase text-zinc-200 tracking-wide';
        titleSpan.textContent = layer.label;

        const fontBtn = document.createElement('button');
        fontBtn.type = 'button';
        fontBtn.dataset.openFont = lIdx;
        fontBtn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 transition flex items-center gap-1.5';
        fontBtn.innerHTML = `<span>Fonte: ${fontModel.name}</span> <span class="underline">Trocar (40 opções)</span>`;

        header.appendChild(titleSpan);
        header.appendChild(fontBtn);
        box.appendChild(header);

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = layer.text;
        textInput.dataset.layerIdx = lIdx;
        textInput.dataset.prop = 'text';
        textInput.className = 'w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-bold text-white focus:outline-none focus:border-red-500 select-text';
        box.appendChild(textInput);

        if (layer.id === 'footerCta') {
          const arrowRow = document.createElement('div');
          arrowRow.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1';
          arrowRow.innerHTML = `
            <div>
              <label class="block text-[10px] text-zinc-400 font-bold mb-1 uppercase">Modelo da Seta Abaixo</label>
              <select data-layer-idx="${lIdx}" data-prop="arrowStyle" class="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-bold text-white">
                <option value="double_chevron" ${layer.arrowStyle === 'double_chevron' ? 'selected' : ''}>Seta Dupla Original (︾)</option>
                <option value="triple_chevron" ${layer.arrowStyle === 'triple_chevron' ? 'selected' : ''}>Seta Tripla Racing</option>
                <option value="filled_triangle" ${layer.arrowStyle === 'filled_triangle' ? 'selected' : ''}>Triângulo Sólido (▼)</option>
                <option value="none" ${layer.arrowStyle === 'none' ? 'selected' : ''}>Sem Seta</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] text-zinc-400 font-bold mb-1 uppercase">Cor da Seta</label>
              <input type="color" value="${layer.arrowColor || '#FFFFFF'}" data-layer-idx="${lIdx}" data-prop="arrowColor" class="w-full h-8 rounded cursor-pointer bg-zinc-900 border border-zinc-700" />
            </div>
          `;
          box.appendChild(arrowRow);
        }

        const styleGrid = document.createElement('div');
        styleGrid.className = 'grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1';
        styleGrid.innerHTML = `
          <div class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
            <label class="block text-[10px] text-zinc-400 font-bold mb-1">Cor da Letra</label>
            <div class="flex items-center gap-1.5">
              <input type="color" value="${layer.fillColor}" data-layer-idx="${lIdx}" data-prop="fillColor" class="w-7 h-6 rounded cursor-pointer bg-transparent border-0" />
              <span class="text-[10px] font-mono text-zinc-300">${layer.fillColor}</span>
            </div>
          </div>

          <div class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
            <label class="block text-[10px] text-zinc-400 font-bold mb-1">Cor da Borda</label>
            <div class="flex items-center gap-1.5">
              <input type="color" value="${layer.strokeColor}" data-layer-idx="${lIdx}" data-prop="strokeColor" class="w-7 h-6 rounded cursor-pointer bg-transparent border-0" />
              <span class="text-[10px] font-mono text-zinc-300">${layer.strokeColor}</span>
            </div>
          </div>

          <div class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
            <label class="block text-[10px] text-zinc-400 font-bold mb-1">Grossura Borda</label>
            <input type="range" min="0" max="26" step="1" value="${layer.strokeWidth}" data-layer-idx="${lIdx}" data-prop="strokeWidth" class="w-full" />
          </div>

          <div class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
            <label class="block text-[10px] text-zinc-400 font-bold mb-1">Cor da Sombra</label>
            <div class="flex items-center gap-1.5">
              <input type="color" value="${layer.shadowColor}" data-layer-idx="${lIdx}" data-prop="shadowColor" class="w-7 h-6 rounded cursor-pointer bg-transparent border-0" />
              <span class="text-[10px] font-mono text-zinc-300">${layer.shadowColor}</span>
            </div>
          </div>

          <div class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
            <label class="block text-[10px] text-zinc-400 font-bold mb-1">Força Sombra</label>
            <input type="range" min="0" max="40" step="1" value="${layer.shadowBlur}" data-layer-idx="${lIdx}" data-prop="shadowBlur" class="w-full" />
          </div>
        `;
        box.appendChild(styleGrid);

        const posGrid = document.createElement('div');
        posGrid.className = 'grid grid-cols-3 gap-2 pt-1';
        posGrid.innerHTML = `
          <div>
            <div class="flex justify-between text-[10px] text-zinc-400">
              <span>Tamanho</span>
              <span class="font-mono">${layer.fontSize}px</span>
            </div>
            <input type="range" min="14" max="170" step="1" value="${layer.fontSize}" data-layer-idx="${lIdx}" data-prop="fontSize" class="w-full" />
          </div>
          <div>
            <div class="flex justify-between text-[10px] text-zinc-400">
              <span>Posição X</span>
              <span class="font-mono">${layer.x}%</span>
            </div>
            <input type="range" min="5" max="95" step="0.5" value="${layer.x}" data-layer-idx="${lIdx}" data-prop="x" class="w-full" />
          </div>
          <div>
            <div class="flex justify-between text-[10px] text-zinc-400">
              <span>Posição Y</span>
              <span class="font-mono">${layer.y}%</span>
            </div>
            <input type="range" min="8" max="95" step="0.2" value="${layer.y}" data-layer-idx="${lIdx}" data-prop="y" class="w-full" />
          </div>
        `;
        box.appendChild(posGrid);

        container.appendChild(box);
      });

      container.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', (e) => {
          const lIdx = Number(e.target.dataset.layerIdx);
          const prop = e.target.dataset.prop;
          const currentItem = galleryItems[currentIndex];
          if (!currentItem) return;

          let val = e.target.value;
          if (['strokeWidth', 'shadowBlur', 'fontSize', 'x', 'y'].includes(prop)) {
            val = Number(val);
          }
          currentItem.setup.layers[lIdx][prop] = val;
          if (prop === 'fillColor' && currentItem.setup.layers[lIdx].id === 'footerCta') {
            currentItem.setup.layers[lIdx].arrowColor = val;
          }

          const parentDiv = e.target.parentElement;
          if (parentDiv) {
            const monoSpan = parentDiv.querySelector('.font-mono');
            if (monoSpan) {
              if (prop === 'fontSize') monoSpan.textContent = `${val}px`;
              if (prop === 'x' || prop === 'y') monoSpan.textContent = `${val}%`;
              if (['fillColor', 'strokeColor', 'shadowColor'].includes(prop)) monoSpan.textContent = val;
            }
          }

          const syncAll = document.getElementById('chkSyncAllLive')?.checked;
          if (syncAll) {
            const masterClone = cloneSetup(currentItem.setup);
            galleryItems.forEach((it, i) => {
              if (i !== currentIndex) {
                it.setup = cloneSetup(masterClone);
                refreshMainAndThumb(i);
              }
            });
          }

          refreshMainAndThumb(currentIndex);
        });
      });

      container.querySelectorAll('button[data-open-font]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          activeLayerIndexForModal = Number(e.currentTarget.dataset.openFont);
          openFontModalForLayer(activeLayerIndexForModal);
        });
      });
    }

    function syncControlsFromCurrentPhoto() {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;

      document.getElementById('sliderSkyDark').value = currentItem.setup.skyDarkness ?? 88;
      document.getElementById('valSkyDark').textContent = `${currentItem.setup.skyDarkness ?? 88}%`;

      document.getElementById('sliderVignette').value = currentItem.setup.vignette ?? 75;
      document.getElementById('valVignette').textContent = `${currentItem.setup.vignette ?? 75}%`;

      buildLayerControlsUI();
    }

    // =========================================================================
    // 7. MODAL DE SELEÇÃO VISUAL DE FONTES (20 2D + 20 3D COM PREVIEW DO TEXTO)
    // =========================================================================
    function openFontModalForLayer(layerIdx) {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      const layer = currentItem.setup.layers[layerIdx];
      const currentModel = getFontModelById(layer.fontModelId);

      activeModalTab = currentModel.type || '2D';
      document.getElementById('modalLayerSubtitle').textContent = `Escolhendo fonte para: ${layer.label}`;
      document.getElementById('fontModal').classList.remove('hidden');
      renderFontModalCards();
    }

    function renderFontModalCards() {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      const layer = currentItem.setup.layers[activeLayerIndexForModal];

      const tab2D = document.getElementById('tab2DBtn');
      const tab3D = document.getElementById('tab3DBtn');
      if (activeModalTab === '2D') {
        tab2D.className = 'px-4 py-2.5 text-xs font-extrabold uppercase rounded-t-xl border-b-2 border-red-500 text-white bg-zinc-900';
        tab3D.className = 'px-4 py-2.5 text-xs font-extrabold uppercase rounded-t-xl border-b-2 border-transparent text-zinc-400 hover:text-white';
      } else {
        tab3D.className = 'px-4 py-2.5 text-xs font-extrabold uppercase rounded-t-xl border-b-2 border-red-500 text-white bg-zinc-900';
        tab2D.className = 'px-4 py-2.5 text-xs font-extrabold uppercase rounded-t-xl border-b-2 border-transparent text-zinc-400 hover:text-white';
      }

      const modelsToShow = activeModalTab === '2D' ? FONT_MODELS_2D : FONT_MODELS_3D;
      const grid = document.getElementById('fontPreviewGrid');
      grid.innerHTML = '';

      const sampleText = (layer.text || 'EXEMPLO').slice(0, 18);

      modelsToShow.forEach(model => {
        const isSelected = layer.fontModelId === model.id;
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `flex flex-col items-start p-3 rounded-xl border text-left transition ${
          isSelected
            ? 'bg-red-950/30 border-red-500 ring-2 ring-red-500/30'
            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
        }`;

        const titleRow = document.createElement('div');
        titleRow.className = 'w-full flex items-center justify-between mb-2';
        titleRow.innerHTML = `
          <span class="text-[11px] font-extrabold text-zinc-300">${model.name}</span>
          ${isSelected ? '<span class="px-1.5 py-0.5 text-[9px] font-black bg-red-500 text-white rounded">ATIVA</span>' : ''}
        `;

        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 320;
        previewCanvas.height = 90;
        previewCanvas.className = 'w-full h-auto rounded-lg bg-zinc-900/90 border border-zinc-800/80';

        card.appendChild(titleRow);
        card.appendChild(previewCanvas);

        const pCtx = previewCanvas.getContext('2d');
        const tempLayer = {
          ...layer,
          text: sampleText,
          fontModelId: model.id,
          fontSize: 38,
          x: 50,
          y: 64,
          align: 'center',
          autoFitWidth: true,
          strokeWidth: layer.strokeWidth > 0 ? Math.min(10, layer.strokeWidth) : 6
        };
        drawStyledTextLayer(pCtx, tempLayer, 320, 90);

        card.addEventListener('click', () => {
          layer.fontModelId = model.id;
          if (document.getElementById('chkSyncAllLive')?.checked) {
            const masterClone = cloneSetup(currentItem.setup);
            galleryItems.forEach((it, i) => {
              if (i !== currentIndex) {
                it.setup = cloneSetup(masterClone);
                refreshMainAndThumb(i);
              }
            });
          }
          document.getElementById('fontModal').classList.add('hidden');
          buildLayerControlsUI();
          refreshMainAndThumb(currentIndex);
        });

        grid.appendChild(card);
      });
    }

    document.getElementById('tab2DBtn').addEventListener('click', () => {
      activeModalTab = '2D';
      renderFontModalCards();
    });
    document.getElementById('tab3DBtn').addEventListener('click', () => {
      activeModalTab = '3D';
      renderFontModalCards();
    });
    document.getElementById('btnCloseFontModal').addEventListener('click', () => {
      document.getElementById('fontModal').classList.add('hidden');
    });

    // =========================================================================
    // 8. MÉTODO BLINDADO DE UPLOAD E DRAG-AND-DROP PARA SAFARI / CHROME
    // =========================================================================
    function isSupportedImageFile(file) {
      if (!file) return false;
      if (file.type && file.type.startsWith('image/')) return true;
      return /\.(jpe?g|png|webp|gif|bmp|svg|avif|heic|heif|tiff?)$/i.test(file.name || '');
    }

    function loadSingleFileAsImage(file) {
      return new Promise((resolve, reject) => {
        // Método 1: ObjectURL (instantâneo no Safari/Chrome e leve para até 100 fotos)
        if (window.URL && URL.createObjectURL) {
          const blobUrl = URL.createObjectURL(file);
          const img = new Image();
          img.onload = () => { URL.revokeObjectURL(blobUrl); resolve(img); };
          img.onerror = () => {
            URL.revokeObjectURL(blobUrl);
            // Fallback Método 2: FileReader
            const reader = new FileReader();
            reader.onload = (ev) => {
              const fallbackImg = new Image();
              fallbackImg.onload = () => resolve(fallbackImg);
              fallbackImg.onerror = (err) => reject(err);
              fallbackImg.src = ev.target.result;
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
          };
          img.src = blobUrl;
        } else {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = ev.target.result;
          };
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        }
      });
    }

    function makeThumbSource(img) {
      const c = document.createElement('canvas');
      c.width = 360;
      c.height = 640;
      drawImageCover(c.getContext('2d'), img, 360, 640);
      return c;
    }

    // HEIC/HEIF/TIFF: o Chromium não decodifica; o macOS converte com o 'sips' (via processo principal)
    async function loadImageWithFallback(file) {
      try {
        return await loadSingleFileAsImage(file);
      } catch (err) {
        if (window.studio && /\.(heic|heif|tiff?)$/i.test(file.name || '')) {
          const jpegBytes = await window.studio.convertToJpeg(file.name, new Uint8Array(await file.arrayBuffer()));
          return loadSingleFileAsImage(new File([jpegBytes], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }));
        }
        throw err;
      }
    }

    async function addFilesToGallery(fileList, inputToReset = null) {
      flushDOMInputsToCurrentSetup();

      const rawFiles = Array.from(fileList || []);
      const files = rawFiles.filter(isSupportedImageFile);

      if (!files.length) {
        if (inputToReset) inputToReset.value = '';
        showToast('Selecione arquivos de imagem válidos (JPG, PNG, WEBP, HEIC).');
        return;
      }

      const hadOnlyDemo = galleryItems.length === 1 && galleryItems[0].isDemo;
      const currentRealCount = hadOnlyDemo ? 0 : galleryItems.length;
      const remainingSlots = MAX_IMAGES - currentRealCount;

      if (remainingSlots <= 0) {
        if (inputToReset) inputToReset.value = '';
        showToast(`Limite máximo de ${MAX_IMAGES} imagens atingido!`);
        return;
      }

      const filesToLoad = files.slice(0, remainingSlots);
      const referenceSetup = galleryItems[currentIndex]
        ? cloneSetup(galleryItems[currentIndex].setup)
        : createDefaultSetup();

      let successCount = 0;

      for (const file of filesToLoad) {
        try {
          const img = await loadImageWithFallback(file);

          if (hadOnlyDemo && successCount === 0) {
            galleryItems = [];
          }

          galleryItems.push({
            id: 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            name: file.name || `Foto_${galleryItems.length + 1}.jpg`,
            imgElement: img,
            thumbSource: makeThumbSource(img),
            isEdited: true,
            setup: cloneSetup(referenceSetup)
          });

          if (successCount === 0) {
            currentIndex = galleryItems.length - 1;
          }
          successCount++;
        } catch (err) {
          console.warn('Falha ao abrir imagem:', file.name, err);
        }
      }

      if (inputToReset) {
        inputToReset.value = '';
      }

      if (successCount > 0) {
        rebuildGalleryGrid();
        syncControlsFromCurrentPhoto();
        refreshMainAndThumb(currentIndex);
        showToast(`${successCount} foto(s) carregada(s) com o padrão atual!`);
      } else {
        showToast('Não foi possível decodificar a imagem selecionada.');
      }
    }

    const multiImageInputEl = document.getElementById('multiImageInput');
    const dropzoneBtn = document.getElementById('multiDropzone');
    const globalDropOverlay = document.getElementById('globalDropOverlay');

    multiImageInputEl.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        addFilesToGallery(e.target.files, e.target);
      }
    });

    // Suporte direto a arrastar e soltar no botão da galeria e no canvas
    [dropzoneBtn, mainCanvas].forEach(zone => {
      if (!zone) return;
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        globalDropOverlay.classList.add('hidden');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          addFilesToGallery(e.dataTransfer.files);
        }
      });
    });

    // Interceptador Global de Drag-and-Drop (Impede o Safari de abrir a foto em tela cheia)
    let dragDepth = 0;

    function blockSafariNavigation(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    window.addEventListener('dragenter', (e) => {
      blockSafariNavigation(e);
      dragDepth++;
      if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
        globalDropOverlay.classList.remove('hidden');
      }
    }, true);

    window.addEventListener('dragover', (e) => {
      blockSafariNavigation(e);
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    }, true);

    window.addEventListener('dragleave', (e) => {
      blockSafariNavigation(e);
      dragDepth = Math.max(0, dragDepth - 1);
      if (dragDepth === 0) {
        globalDropOverlay.classList.add('hidden');
      }
    }, true);

    window.addEventListener('drop', (e) => {
      blockSafariNavigation(e);
      dragDepth = 0;
      globalDropOverlay.classList.add('hidden');

      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length > 0) {
        addFilesToGallery(dt.files);
      }
    }, true);

    document.getElementById('btnClearGallery').addEventListener('click', () => {
      const currentSetupClone = galleryItems[currentIndex]
        ? cloneSetup(galleryItems[currentIndex].setup)
        : createDefaultSetup();

      galleryItems = [{
        id: 'demo_porsche',
        name: 'Porsche Exemplo (Arraste suas fotos)',
        imgElement: null,
        isDemo: true,
        isEdited: true,
        setup: currentSetupClone
      }];
      currentIndex = 0;
      rebuildGalleryGrid();
      syncControlsFromCurrentPhoto();
      refreshMainAndThumb(0);
      showToast('Galeria limpa!');
    });

    document.getElementById('btnToggleCurrentEdited').addEventListener('click', () => {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      currentItem.isEdited = !currentItem.isEdited;
      refreshMainAndThumb(currentIndex);
    });

    document.getElementById('sliderSkyDark').addEventListener('input', (e) => {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      const val = Number(e.target.value);
      currentItem.setup.skyDarkness = val;
      document.getElementById('valSkyDark').textContent = `${val}%`;

      if (document.getElementById('chkSyncAllLive')?.checked) {
        galleryItems.forEach((it, i) => {
          it.setup.skyDarkness = val;
          if (i !== currentIndex) refreshMainAndThumb(i);
        });
      }
      refreshMainAndThumb(currentIndex);
    });

    document.getElementById('sliderVignette').addEventListener('input', (e) => {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      const val = Number(e.target.value);
      currentItem.setup.vignette = val;
      document.getElementById('valVignette').textContent = `${val}%`;

      if (document.getElementById('chkSyncAllLive')?.checked) {
        galleryItems.forEach((it, i) => {
          it.setup.vignette = val;
          if (i !== currentIndex) refreshMainAndThumb(i);
        });
      }
      refreshMainAndThumb(currentIndex);
    });

    document.getElementById('btnPresetPos1').addEventListener('click', () => {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      const def = createDefaultSetup();
      currentItem.setup.layers.forEach((l, i) => {
        l.x = def.layers[i].x;
        l.y = def.layers[i].y;
      });
      syncControlsFromCurrentPhoto();
      refreshMainAndThumb(currentIndex);
    });

    document.getElementById('btnPresetPos2').addEventListener('click', () => {
      const currentItem = galleryItems[currentIndex];
      if (!currentItem) return;
      const def = createDefaultSetup();
      currentItem.setup.layers.forEach((l, i) => {
        l.x = def.layers[i].x;
        l.y = Number((def.layers[i].y - 1.5).toFixed(1));
      });
      syncControlsFromCurrentPhoto();
      refreshMainAndThumb(currentIndex);
    });

    // =========================================================================
    // 9. PADRÕES (SETUPS) DE CLIENTES — salvar, carregar, atualizar, excluir
    // =========================================================================
    const SETUPS_KEY = 'sorteio_pro_setups_v3';
    const DEFAULT_SETUP_KEY = 'default_jetta';
    const HEX_RE = /^#[0-9a-fA-F]{6}$/;
    const ARROW_STYLES = ['double_chevron', 'triple_chevron', 'filled_triangle', 'none'];

    function clampNum(v, min, max, fallback) {
      const n = Number(v);
      return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
    }

    // Valida/normaliza um padrão vindo de fora (JSON importado ou storage).
    // Só aceita campos conhecidos, cores #RRGGBB e números dentro de faixas seguras.
    function sanitizeSetup(raw) {
      if (!raw || typeof raw !== 'object' || !Array.isArray(raw.layers)) return null;
      if (raw.layers.length === 0 || raw.layers.length > 24) return null;
      const defaults = createDefaultSetup();
      const out = {
        skyDarkness: clampNum(raw.skyDarkness, 0, 100, 88),
        vignette: clampNum(raw.vignette, 0, 100, 75),
        layers: []
      };
      for (const l of raw.layers) {
        if (!l || typeof l !== 'object' || !/^[A-Za-z0-9_]{1,40}$/.test(String(l.id || ''))) return null;
        const base = defaults.layers.find(d => d.id === l.id) || defaults.layers[0];
        const layer = {
          id: l.id,
          label: String(l.label ?? base.label).slice(0, 120),
          text: String(l.text ?? '').slice(0, 200),
          fontModelId: ALL_FONT_MODELS.some(f => f.id === l.fontModelId) ? l.fontModelId : base.fontModelId,
          fontSize: clampNum(l.fontSize, 10, 400, base.fontSize),
          x: clampNum(l.x, 0, 100, base.x),
          y: clampNum(l.y, 0, 100, base.y),
          fillColor: HEX_RE.test(l.fillColor) ? l.fillColor : base.fillColor,
          strokeColor: HEX_RE.test(l.strokeColor) ? l.strokeColor : base.strokeColor,
          strokeWidth: clampNum(l.strokeWidth, 0, 60, base.strokeWidth),
          shadowColor: HEX_RE.test(l.shadowColor) ? l.shadowColor : base.shadowColor,
          shadowBlur: clampNum(l.shadowBlur, 0, 80, base.shadowBlur),
          shadowOffsetY: clampNum(l.shadowOffsetY, -60, 60, base.shadowOffsetY ?? 4),
          align: ['left', 'center', 'right'].includes(l.align) ? l.align : 'center'
        };
        if (l.autoFitWidth) layer.autoFitWidth = true;
        if (l.id === 'footerCta') {
          layer.arrowStyle = ARROW_STYLES.includes(l.arrowStyle) ? l.arrowStyle : 'double_chevron';
          layer.arrowColor = HEX_RE.test(l.arrowColor) ? l.arrowColor : layer.fillColor;
        }
        out.layers.push(layer);
      }
      return out;
    }

    function normalizeSavedSetups() {
      const clean = {};
      for (const [key, entry] of Object.entries(savedSetups)) {
        const data = sanitizeSetup(entry && entry.data);
        if (data) clean[key] = { name: String(entry.name || key).slice(0, 80), data };
      }
      if (!clean[DEFAULT_SETUP_KEY]) {
        clean[DEFAULT_SETUP_KEY] = { name: '★ Padrão Inicial', data: createDefaultSetup() };
      }
      savedSetups = clean;
    }

    function saveSetupsToStorage() {
      try {
        localStorage.setItem(SETUPS_KEY, JSON.stringify(savedSetups));
        return true;
      } catch (e) {
        showToast('Não foi possível gravar os padrões neste Mac.');
        return false;
      }
    }

    function refreshSetupDropdown(selectedKey) {
      const sel = document.getElementById('setupSelect');
      const keep = selectedKey ?? sel.value;
      sel.innerHTML = '';
      Object.entries(savedSetups).forEach(([key, entry]) => {
        const opt = document.createElement('option');
        opt.value = key;
        const summary = getSetupShortSummary(entry.data);
        opt.textContent = summary ? `${entry.name} (${summary})` : entry.name;
        sel.appendChild(opt);
      });
      sel.value = savedSetups[keep] ? keep : DEFAULT_SETUP_KEY;
    }

    const selectedSetupKey = () => document.getElementById('setupSelect').value;

    function refreshAllItems() {
      galleryItems.forEach((_, i) => refreshMainAndThumb(i));
    }

    document.getElementById('btnLoadSetupCurrent').addEventListener('click', () => {
      const entry = savedSetups[selectedSetupKey()];
      const item = galleryItems[currentIndex];
      if (!entry || !item) return;
      item.setup = cloneSetup(entry.data);
      item.isEdited = true;
      syncControlsFromCurrentPhoto();
      refreshMainAndThumb(currentIndex);
      showToast(`Padrão "${entry.name}" carregado na Foto #${currentIndex + 1}.`);
    });

    document.getElementById('btnApplySelectedSetupAll').addEventListener('click', () => {
      const entry = savedSetups[selectedSetupKey()];
      if (!entry) return;
      if (!confirm(`Aplicar o padrão "${entry.name}" em todas as ${galleryItems.length} foto(s)?\n\nIsso substitui os textos e a edição atuais de cada foto.`)) return;
      galleryItems.forEach(it => { it.setup = cloneSetup(entry.data); it.isEdited = true; });
      syncControlsFromCurrentPhoto();
      refreshAllItems();
      showToast(`Padrão "${entry.name}" aplicado em ${galleryItems.length} foto(s).`);
    });

    document.getElementById('btnApplyAllGallery').addEventListener('click', () => {
      flushDOMInputsToCurrentSetup();
      const source = galleryItems[currentIndex];
      if (!source || galleryItems.length < 2) {
        showToast('Adicione mais fotos para replicar a edição.');
        return;
      }
      if (!confirm(`Replicar a edição da Foto #${currentIndex + 1} (textos, cores, fontes e posições) para as outras ${galleryItems.length - 1} foto(s)?`)) return;
      galleryItems.forEach((it, i) => {
        if (i === currentIndex) return;
        it.setup = cloneSetup(source.setup);
        it.isEdited = true;
      });
      refreshAllItems();
      showToast(`Edição da Foto #${currentIndex + 1} replicada para todas.`);
    });

    // --- salvar novo padrão
    const setupModal = document.getElementById('setupModal');
    const inputSetupName = document.getElementById('inputSetupName');

    function openSetupModal() {
      flushDOMInputsToCurrentSetup();
      const item = galleryItems[currentIndex];
      if (!item) return;
      const box = document.getElementById('setupSummaryPreview');
      box.innerHTML = '';
      item.setup.layers.forEach(l => {
        const row = document.createElement('div');
        row.textContent = `• ${l.text || '(vazio)'}  —  ${getFontModelById(l.fontModelId).name}`;
        box.appendChild(row);
      });
      inputSetupName.value = '';
      setupModal.classList.remove('hidden');
      inputSetupName.focus();
    }

    function confirmSaveSetup() {
      const name = inputSetupName.value.trim();
      if (!name) { showToast('Dê um nome ao padrão (ex.: Cliente João • Porsche 0,25).'); return; }
      const key = 'setup_' + Date.now().toString(36);
      savedSetups[key] = { name: name.slice(0, 80), data: cloneSetup(galleryItems[currentIndex].setup) };
      if (saveSetupsToStorage()) showToast(`Padrão "${name}" salvo!`);
      refreshSetupDropdown(key);
      setupModal.classList.add('hidden');
    }

    document.getElementById('btnSaveSetup').addEventListener('click', openSetupModal);
    document.getElementById('btnConfirmSaveSetup').addEventListener('click', confirmSaveSetup);
    document.getElementById('btnCancelSetupModal').addEventListener('click', () => setupModal.classList.add('hidden'));
    inputSetupName.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmSaveSetup(); });

    document.getElementById('btnUpdateCurrentSetup').addEventListener('click', () => {
      flushDOMInputsToCurrentSetup();
      const key = selectedSetupKey();
      const entry = savedSetups[key];
      const item = galleryItems[currentIndex];
      if (!entry || !item) return;
      if (!confirm(`Atualizar o padrão "${entry.name}" com a edição da Foto #${currentIndex + 1}?`)) return;
      entry.data = cloneSetup(item.setup);
      if (saveSetupsToStorage()) showToast(`Padrão "${entry.name}" atualizado.`);
      refreshSetupDropdown(key);
    });

    document.getElementById('btnDeleteSetup').addEventListener('click', () => {
      const key = selectedSetupKey();
      const entry = savedSetups[key];
      if (!entry) return;
      if (key === DEFAULT_SETUP_KEY) { showToast('O padrão inicial não pode ser excluído.'); return; }
      if (!confirm(`Excluir o padrão "${entry.name}"? Essa ação não pode ser desfeita.`)) return;
      delete savedSetups[key];
      saveSetupsToStorage();
      refreshSetupDropdown(DEFAULT_SETUP_KEY);
      showToast('Padrão excluído.');
    });

    // =========================================================================
    // 10. EXPORTAÇÃO — foto atual (PNG/JPG) e lote em ZIP
    // =========================================================================
    const EXPORT_KEY = 'sorteio_pro_export_v1';
    const selExport = document.getElementById('selExport');
    try {
      const saved = localStorage.getItem(EXPORT_KEY);
      if (saved && [...selExport.options].some(o => o.value === saved)) selExport.value = saved;
    } catch (e) { /* sem storage: segue com o padrão */ }
    selExport.addEventListener('change', () => {
      try { localStorage.setItem(EXPORT_KEY, selExport.value); } catch (e) { /* ignora */ }
    });

    function getExportConfig() {
      const [size, fmt] = selExport.value.split(':');
      const [w, h] = size.split('x').map(Number);
      return { w, h, fmt, ext: fmt === 'jpg' ? 'jpg' : 'png', mime: fmt === 'jpg' ? 'image/jpeg' : 'image/png' };
    }

    function renderItemToBlob(item, cfg) {
      const c = document.createElement('canvas');
      c.width = cfg.w;
      c.height = cfg.h;
      renderArtToCanvas(c, item);
      return new Promise((resolve, reject) => {
        c.toBlob(b => (b ? resolve(b) : reject(new Error('Falha ao gerar a imagem.'))), cfg.mime, 0.95);
      });
    }

    function safeBaseName(name, fallback) {
      const base = String(name || fallback).replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}_\- ]+/gu, '_').trim();
      return base.slice(0, 80) || fallback;
    }

    async function saveBytes(defaultName, bytes, filters) {
      if (!window.studio) { // fallback fora do Electron (ex.: abrir o HTML no navegador)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([bytes]));
        link.download = defaultName;
        link.click();
        return { saved: true };
      }
      return window.studio.saveFile({ defaultName, data: bytes, filters });
    }

    let exportBusy = false;
    const nextFrame = () => new Promise(r => setTimeout(r, 0));

    document.getElementById('btnDownloadCurrent').addEventListener('click', async () => {
      if (exportBusy) return;
      flushDOMInputsToCurrentSetup();
      const item = galleryItems[currentIndex];
      if (!item) return;
      exportBusy = true;
      try {
        const cfg = getExportConfig();
        const blob = await renderItemToBlob(item, cfg);
        const bytes = new Uint8Array(await blob.arrayBuffer());
        const name = `${safeBaseName(item.name, 'arte')}_arte.${cfg.ext}`;
        const res = await saveBytes(name, bytes, [{ name: cfg.ext.toUpperCase(), extensions: [cfg.ext] }]);
        if (res && res.saved) showToast(`Foto #${currentIndex + 1} salva (${cfg.w}×${cfg.h}).`);
      } catch (err) {
        console.error(err);
        showToast('Não foi possível exportar a foto.');
      } finally {
        exportBusy = false;
      }
    });

    document.getElementById('btnExportAllZip').addEventListener('click', async () => {
      if (exportBusy) return;
      flushDOMInputsToCurrentSetup();
      if (galleryItems.length === 1 && galleryItems[0].isDemo) {
        showToast('Adicione suas fotos antes de exportar o lote.');
        return;
      }
      exportBusy = true;
      const label = document.getElementById('exportAllText');
      const original = label.textContent;
      try {
        const cfg = getExportConfig();
        const zip = new JSZip();
        const used = new Set();
        for (let i = 0; i < galleryItems.length; i++) {
          label.textContent = `GERANDO ${i + 1}/${galleryItems.length}…`;
          await nextFrame();
          const item = galleryItems[i];
          const blob = await renderItemToBlob(item, cfg);
          let name = `${String(i + 1).padStart(3, '0')}_${safeBaseName(item.name, 'foto')}.${cfg.ext}`;
          while (used.has(name)) name = name.replace(/(\.\w+)$/, '_2$1');
          used.add(name);
          zip.file(name, blob);
        }
        label.textContent = 'COMPACTANDO…';
        await nextFrame();
        const bytes = await zip.generateAsync({ type: 'uint8array', compression: 'STORE' });
        const stamp = new Date().toISOString().slice(0, 10);
        const res = await saveBytes(`artes-prontas_${stamp}.zip`, bytes, [{ name: 'ZIP', extensions: ['zip'] }]);
        if (res && res.saved) showToast(`${galleryItems.length} arte(s) exportada(s) em ZIP!`);
      } catch (err) {
        console.error(err);
        showToast('Não foi possível exportar o lote.');
      } finally {
        label.textContent = original;
        exportBusy = false;
      }
    });

    // =========================================================================
    // 11. BACKUP DE PADRÕES (.JSON) E UTILITÁRIOS
    // =========================================================================
    const shareModal = document.getElementById('shareAppModal');
    document.getElementById('btnOpenShareModal').addEventListener('click', () => {
      flushDOMInputsToCurrentSetup();
      shareModal.classList.remove('hidden');
    });
    document.getElementById('btnCloseShareModal').addEventListener('click', () => shareModal.classList.add('hidden'));

    document.getElementById('btnExportSetupsJson').addEventListener('click', async () => {
      flushDOMInputsToCurrentSetup();
      const bytes = new TextEncoder().encode(JSON.stringify(savedSetups, null, 2));
      const res = await saveBytes('padroes-clientes-sorteio.json', bytes, [{ name: 'JSON', extensions: ['json'] }]);
      if (res && res.saved) showToast('Arquivo de Padrões (.JSON) exportado!');
    });

    document.getElementById('importSetupsJsonInput').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          if (!imported || typeof imported !== 'object' || Array.isArray(imported)) throw new Error('formato');
          let count = 0;
          let firstKey = null;
          for (const [key, entry] of Object.entries(imported)) {
            if (!/^[A-Za-z0-9_\-]{1,60}$/.test(key) || key === '__proto__') continue;
            const data = sanitizeSetup(entry && entry.data);
            if (!data) continue;
            // não sobrescreve o padrão inicial: importa com chave própria
            const targetKey = key === DEFAULT_SETUP_KEY ? 'import_' + Date.now().toString(36) : key;
            savedSetups[targetKey] = { name: String(entry.name || key).slice(0, 80), data };
            firstKey = firstKey || targetKey;
            count++;
          }
          if (!count) throw new Error('vazio');
          saveSetupsToStorage();
          refreshSetupDropdown(firstKey);
          showToast(`${count} padrão(ões) importado(s) com sucesso!`);
          shareModal.classList.add('hidden');
        } catch (err) {
          showToast('Arquivo JSON inválido ou sem padrões.');
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });

    let toastTimer = null;
    function showToast(msg) {
      const t = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = msg;
      t.classList.remove('hidden');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.add('hidden'), 3400);
    }

    // Esc fecha qualquer modal aberto
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      ['fontModal', 'setupModal', 'shareAppModal'].forEach(id => document.getElementById(id).classList.add('hidden'));
    });

    // =========================================================================
    // 12. INTEGRAÇÃO COM O macOS (menus, arquivos, atualização)
    // =========================================================================
    async function preloadFonts() {
      if (!document.fonts || !document.fonts.load) return;
      // O canvas NÃO dispara o carregamento de @font-face sozinho: força todas as 40 variações.
      const jobs = ALL_FONT_MODELS.map(m =>
        document.fonts.load(`${m.italic ? 'italic ' : ''}${m.weight} 40px "${m.family}"`, 'AÇÃO 0123456789 R$,%!')
      );
      await Promise.allSettled(jobs);
    }

    async function addNativeFiles(entries) {
      const files = [];
      for (const { path, name } of entries) {
        try {
          const bytes = await window.studio.readFile(path);
          const ext = (name.split('.').pop() || '').toLowerCase();
          const type = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', avif: 'image/avif' }[ext] || '';
          files.push(new File([bytes], name, { type }));
        } catch (err) {
          console.warn('Não consegui ler', name, err);
        }
      }
      if (files.length) addFilesToGallery(files);
    }

    function initNativeBridge() {
      const studio = window.studio;
      if (!studio) return;
      document.body.classList.toggle('is-mac', studio.platform === 'darwin');

      studio.onFullscreen(v => document.body.classList.toggle('is-fullscreen', !!v));
      studio.onOpenFiles(entries => addNativeFiles(entries));
      studio.onMenu(action => {
        const map = { 'download-current': 'btnDownloadCurrent', 'export-all': 'btnExportAllZip', 'backup': 'btnOpenShareModal', 'save-setup': 'btnSaveSetup' };
        if (map[action]) document.getElementById(map[action]).click();
      });

      // avisa o app quando há fotos carregadas (para confirmar antes de fechar)
      window.__reportWork = () => studio.setWorkState(galleryItems.filter(i => !i.isDemo).length);

      // --- atualização via GitHub
      const btn = document.getElementById('btnCheckUpdate');
      const btnText = document.getElementById('updateBtnText');
      const dot = document.getElementById('updateDot');
      const overlay = document.getElementById('updateOverlay');
      const bar = document.getElementById('updateBar');
      const msg = document.getElementById('updateOverlayMsg');

      studio.getVersion().then(v => { document.getElementById('appVersionTag').textContent = 'v' + v; });
      studio.onUpdateAvailable(info => {
        dot.classList.remove('hidden');
        btnText.textContent = `Atualizar para v${info.version}`;
        btn.classList.add('border-amber-400/60');
      });
      studio.onUpdateProgress(p => {
        if (p.phase === 'download' || p.phase === 'install') {
          overlay.classList.remove('hidden');
          msg.textContent = p.phase === 'download' ? `Baixando nova versão… ${Math.round(p.percent * 100)}%` : 'Instalando…';
          bar.style.width = `${Math.round((p.phase === 'install' ? 1 : p.percent) * 100)}%`;
        } else {
          overlay.classList.add('hidden');
        }
      });
      btn.addEventListener('click', async () => {
        const prev = btnText.textContent;
        btn.disabled = true;
        btnText.textContent = 'Verificando…';
        try { await studio.updateNow(); } finally {
          btn.disabled = false;
          btnText.textContent = prev;
        }
      });
    }

    function initStudio() {
      normalizeSavedSetups();
      galleryItems = [{
        id: 'demo_porsche',
        name: 'Porsche Exemplo (Adicione suas fotos)',
        imgElement: null,
        isDemo: true,
        isEdited: true,
        setup: createDefaultSetup()
      }];
      currentIndex = 0;

      refreshSetupDropdown(DEFAULT_SETUP_KEY);
      rebuildGalleryGrid();
      syncControlsFromCurrentPhoto();
      refreshMainAndThumb(0);
      initNativeBridge();

      preloadFonts().then(() => {
        rebuildGalleryGrid();
        refreshMainAndThumb(currentIndex);
        window.__fontsReady = true;
      });
    }

    initStudio();
