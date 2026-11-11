<div align="center">

<img src="src/assets/icon.png" width="128" alt="Editor Rifa" />

# Editor Rifa

**Editor de artes para rifas e sorteios automotivos — Impera Services**

[![Baixar para macOS](https://img.shields.io/badge/Baixar_para_macOS-d7b870?style=for-the-badge&logo=apple&logoColor=black&labelColor=000000)](https://github.com/marcelolucas11/imp-editor-rifa/releases/latest/download/Editor-Rifa-mac.dmg)

[Todas as versões](https://github.com/marcelolucas11/imp-editor-rifa/releases) · macOS 11+ · Apple Silicon e Intel

</div>

---

## O que faz

- Edição individual ou **em lote de até 100 fotos**, com miniaturas ao vivo.
- 8 caixinhas de texto independentes (título, valor, selos, chamada da cota, rodapé + seta), cada uma com **40 fontes** (20 em 2D, 20 em 3D extrudado), cor, borda e sombra.
- **Padrões de clientes**: salve, carregue, atualize e exclua; aplique em todas as fotos de uma vez ou replique a edição da foto atual.
- Exportação da foto atual ou **tudo em ZIP**, em 1080×1920 (JPG/PNG, formato Stories), 900×1600 ou 1800×3200.
- Backup dos padrões em `.json` para enviar ao sócio.
- Funciona **100% offline** (fontes e bibliotecas vão dentro do app).
- Fotos HEIC do iPhone são convertidas automaticamente.

## Instalação

1. Clique em **Baixar para macOS** (acima), abra o `.dmg` e arraste **Editor Rifa** para a pasta **Aplicativos** (ou para qualquer pasta, como um SSD externo).
2. Na primeira abertura o macOS avisa que o app é de um desenvolvedor não identificado, porque o app ainda não é notarizado pela Apple:
   - **Ajustes do Sistema → Privacidade e Segurança → Abrir Mesmo Assim**, ou
   - no Terminal: `xattr -cr "/Applications/Editor Rifa.app"` (ajuste o caminho se instalou em outra pasta).

## Atualizações

Clique em **Atualizar** no topo do app (ou em *Editor Rifa → Verificar Atualizações…*). O app consulta a última versão publicada neste repositório, baixa, confere o SHA-256, troca o app e reabre sozinho. Quando há versão nova, o botão ganha um ponto amarelo (a checagem automática roda ao abrir o app).

> A atualização grava na pasta onde o app está instalado. Se essa pasta não permitir escrita, o app abre a página de download para você instalar manualmente.

## Atalhos

| Atalho | Ação |
| --- | --- |
| ⌘O | Adicionar fotos |
| ⌘S | Salvar padrão do cliente |
| ⌘E | Baixar foto atual |
| ⇧⌘E | Exportar tudo (ZIP) |

## Para desenvolver

```bash
npm install
npm start          # roda o app em modo desenvolvimento
npm test           # testes do atualizador
```

### Trocar o ícone pela logo oficial

```bash
python3 scripts/make_icon.py caminho/da/logo.png   # gera build/icon.icns, build/icon.png e src/assets/icon.png
```

(PNG com fundo transparente ou preto; a logo é centralizada sobre fundo preto no formato de ícone do macOS.)

### Publicar uma nova versão

1. Altere `version` em `package.json` (ex.: `1.1.0`) e faça commit.
2. Crie e envie a tag:
   ```bash
   git tag v1.1.0 && git push origin main v1.1.0
   ```
3. O GitHub Actions compila o app universal, gera `Editor-Rifa-mac.dmg`, `Editor-Rifa-mac.zip` e `SHA256SUMS.txt` e publica o release. Quem usa o app recebe o aviso de atualização.

### Sobre a assinatura

O app é assinado **ad-hoc** (sem conta Apple Developer). Isso basta para rodar, mas o macOS pede a liberação manual na primeira instalação. Para eliminar o aviso é preciso um Apple Developer ID (US$ 99/ano) e notarização.
