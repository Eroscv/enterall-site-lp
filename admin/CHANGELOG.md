# Changelog — Site Enterall

Resumo de todas as alterações realizadas no site (`enterall-lp.html` / `index.html`, `bluebox-max.html` e demais páginas de produto) durante esta rodada de ajustes.

---

## 🎬 Vídeos (Hero e Rodapé)

- Vídeo de fundo do rodapé (desktop) substituído por versão ajustada (2560×960).
- Adicionados vídeos **mobile dedicados** (retrato) para a home:
  - Hero: `assets/video/hero-mobile.mp4`
  - Rodapé: `assets/video/cta-bg-mobile.mp4`
- Corrigido o **corte no topo do vídeo do rodapé no mobile** — ajustado `object-position` para não cortar o rosto/cabeça da pessoa, mantendo o desktop intacto.
- Corrigido enquadramento do vídeo de fundo do rodapé para não cortar conteúdo importante.

## 🎨 Cores e Identidade Visual

- Trocado o tom de verde lima `#C7E639` por `#9FE870` em **todo o site**.
- Cards da seção **"Mais que uma nutrição enteral..."**: cor unificada para verde pastel (mesma da Bluebox Soy 1.2), incluindo ícones, badges, números e pills internos (antes roxo).
- Card "Fórmula pseudoplástica": imagem e cor trocadas para combinar com Bluebox Soy 1.2.
- Cursor customizado do site corrigido — estava aparecendo roxo/dourado por causa do `mix-blend-mode:difference`; agora é azul sólido de verdade.
- Removido gradiente/névoa branca que sobrepunha o card de produto na seção **"Para todo caso, Sempre a Melhor Solução"** (era um elemento decorativo de fade mal posicionado, cobrindo o canto do card).
- Seção **"Uma fórmula, muitos motivos para confiar"**: removida a onda decorativa de fundo; fundo unificado em cinza flat (`#EDEFEB`), sem divisão de cor.
- Círculos de ícone da seção **"O que sustenta cada dose"** agora usam a mesma cor de fundo do card.

## 📱 Responsividade Mobile

- Corrigido overflow do carrossel de cards mobile na seção "Mais que uma nutrição enteral...".
- Tabela "Compare as fórmulas" (bluebox-max.html): redesenhada, corrigido bug de colunas desalinhadas, e adaptada para formato compacto estilo AG1 no mobile (sem scroll horizontal).
- Cards de família ("Para todo caso...") corrigidos para serem totalmente responsivos no mobile.
- Título "Três linhas de produtos para cada necessidade dietética" forçado a quebrar em 2 linhas no mobile.
- Título "Max, Soy ou Intake: veja as diferenças..." quebrado em 2 linhas no mobile.
- Reduzido o espaçamento entre seções no mobile (home) e também entre seções em todas as outras páginas (desktop e mobile).

## 🖼️ Produtos e Cards

- Imagem do produto no card "Fórmula pseudoplástica" aumentada (em etapas).
- Ícones removidos dos 3 cards de linha ("Três linhas, fórmulas para todo tratamento").
- Cards de produto em `bluebox-max.html` ("Produtos da linha" / "Outras linhas Enterall") receberam cores pastel iguais às usadas no restante do site.
- Card de produto em "Para todo caso..." ajustado para exibir corretamente sua cor pastel (era mascarada por uma borda grossa).

## 🧭 Navegação e Navbar

- Efeito de contraste da navbar sobre o vídeo do hero (gradiente escuro + sombra no texto dos links) — testado em ambas as configurações (só home / todas as páginas) e **restaurado para todas as páginas**.
- Melhorada a legibilidade dos links da navbar sobre o vídeo do hero.
- Botão "Conhecer a fórmula" no hero agora leva para `bluebox-max.html`.
- Navbar e rodapé confirmados/adicionados em **todas as 12 páginas** do site.

## 🦶 Rodapé

- Ícones de redes sociais (Instagram, LinkedIn) adicionados ao rodapé de todas as 12 páginas.
- Rodapé em vídeo (CTA final + footer) replicado da home para todas as páginas de produto e `bluebox-max.html`.

## ✅ Verificação e QA

- Auditoria completa de funcionamento de todos os botões e links do site (menu mobile, carrosséis, seletor de família, thumbnails de galeria, seletor de tamanho) nas 12 páginas — sem erros de console e sem links quebrados.
- Itens ainda pendentes de definição (não corrigidos, aguardando decisão):
  - Botão "Assistir histórias reais" (sem destino definido)
  - Botão de play do depoimento (sem vídeo/handler)
  - Ícones de redes sociais do rodapé (sem perfis reais ainda)
  - Link "Contato" do rodapé nas páginas internas (aponta para `#` em vez de `#contato`)

---

*Todas as alterações foram publicadas em [https://eroscv.github.io/enterall-site-lp/](https://eroscv.github.io/enterall-site-lp/)*
