# Enterall — Landing Page

Landing page institucional da **Enterall**, marca de nutrição enteral ("For People, For Patients"). O site apresenta a proposta de valor da marca, a fórmula do produto, a linha completa de produtos e depoimentos, com foco em quem cuida e em quem é cuidado (uso domiciliar e hospitalar).

🔗 **Site publicado (GitHub Pages):** https://eroscv.github.io/enterall-site-lp/

## Sobre o projeto

O site é composto por:

- **Hero** com vídeo de fundo em autoplay e chamada principal
- **Seção "Uma fórmula, muitos motivos para confiar"** — cards de benefícios do produto (fórmula pseudoplástica, alta densidade energética, sem lactose, sabor, uso hospitalar/home care) ao redor da imagem do produto
- **Seção "Uma gota de cuidado"** — composição visual com fotos e frases de efeito
- **Catálogo de produtos** ("Nossa linha completa") em carrossel
- **"O que sustenta cada dose"** — tira de valores/diferenciais da marca
- **Depoimentos** ("Histórias que a fórmula não conta sozinha") em carrossel com mídia
- **CTA final** e rodapé

### Responsividade

O layout é adaptado tanto para desktop quanto para mobile:
- No desktop, os cards de benefícios e as fotos da seção "gota" usam posicionamento calculado dinamicamente (JS) para nunca serem cortados pela borda da viewport, inclusive ao dar zoom no navegador.
- No mobile, seções que no desktop são compostas lado a lado (cards de benefícios, produtos, fotos da seção "gota") viram carrosséis horizontais com setas de navegação e autoplay, mantendo a mesma identidade visual do desktop.

## Stack técnica

HTML + CSS + JavaScript puro (vanilla), sem build step nem dependências externas — CSS e JS ficam em arquivos próprios, e fontes/imagens/vídeo são arquivos estáticos servidos diretamente (sem base64), o que permite cache do navegador e mantém o HTML enxuto.

## Estrutura do repositório

```
enterall-lp.html   # arquivo principal do site
index.html         # cópia idêntica, usada pelo GitHub Pages
css/
  styles.css       # todo o CSS do site
js/
  script.js        # toda a lógica (carrosséis, animações, posicionamento dinâmico etc.)
assets/
  fonts/           # fontes customizadas (woff2/ttf)
  images/          # logo, produto, fotos da seção "gota", catálogo
  video/           # vídeo de fundo do hero
```

## Deploy

O site é publicado via **GitHub Pages**, a partir da branch `main`. Qualquer alteração enviada a este repositório (ou ao repositório espelho `enterall-landing`) é refletida automaticamente no endereço público acima.

## Como rodar localmente

Por ser um HTML único sem dependências, basta abrir `index.html` diretamente no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8811
```

E acessar `http://localhost:8811`.
