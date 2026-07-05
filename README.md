# Vida Bela Lofts Cumbuco — Site institucional

Site estático (HTML + CSS + JS puro, sem build) pronto para publicar no HostGator.
Todo o conteúdo entregável está em **`site/`**.

## Como publicar no HostGator

1. Acesse o **cPanel** da sua conta HostGator e abra o **Gerenciador de Arquivos**
   (ou conecte-se por **FTP** com FileZilla usando as credenciais da hospedagem).
2. Entre na pasta **`public_html`** do domínio.
3. Envie **todo o conteúdo da pasta `site/`** (os arquivos e a pasta `assets/`)
   direto para dentro de `public_html` — ou seja, o `index.html` deve ficar em
   `public_html/index.html`, não em `public_html/site/index.html`.
   - Pelo Gerenciador de Arquivos: compacte `site/` em um .zip, faça upload,
     extraia dentro de `public_html` e mova o conteúdo para a raiz.
4. Acesse o domínio no navegador e confira as 4 páginas:
   `/`, `/experiencias.html`, `/sabores.html` e `/guia.html`.

### Como testar localmente
Basta abrir `site/index.html` com um duplo clique — o site funciona direto do
disco (todos os caminhos são relativos). Para um teste mais fiel:
`python -m http.server 8000 -d site` e abra `http://localhost:8000`.

## Estrutura

```
site/
├── index.html          # Home: hero, sobre, lofts, comodidades, galeria, como chegar
├── experiencias.html   # Passeios/atrações + 7 barracas de praia (com mapa)
├── sabores.html        # 25 bares e restaurantes (com filtros e mapa) + 3 cafés
├── guia.html           # Guia do hóspede: check-in, Wi-Fi, condomínio, cozinha, regras
├── favicon.svg / apple-touch-icon.png
├── robots.txt / sitemap.xml
└── assets/
    ├── css/styles.css  # design tokens + estilos (único arquivo)
    ├── js/main.js      # menu, animações, lightbox, filtros (vanilla JS)
    ├── fonts/          # Fraunces + Outfit (woff2, self-hosted)
    └── img/            # imagens otimizadas extraídas do PDF (~2,7 MB no total)
```

## Decisões tomadas

- **Sem preços e sem notas ★/$** nos cards, e **senhas de Wi-Fi publicadas** no
  guia — conforme alinhado na aprovação do plano.
- **Conteúdo**: textos do PDF revisados/polidos mantendo fatos (horários, regras,
  endereços, telefones). Descritivos dos restaurantes ajustados; o do Armadillo
  (que veio duplicado no PDF) foi reescrito de forma neutra como hamburgueria/grill.
- **Dados complementares do site atual** (aprovado): tipos de loft (Completo até 4,
  Casal até 2), 4 min a pé da praia, 40 min de Fortaleza, ~35 km do aeroporto,
  pet friendly, TV, estacionamento, notas 10/10 Booking e 4,9/5.
- **Mapas**: recortados das páginas do PDF em alta resolução para preservar os
  pontos numerados (barracas e restaurantes); os números dos cards correspondem
  aos mapas.
- **Fonts self-hosted** (Fraunces + Outfit em woff2) para o site ser 100%
  autocontido — nenhum CDN externo; ícones são SVG inline.
- **Fotos**: hero usa a foto da piscina com recorte diferente para desktop
  (paisagem) e mobile (retrato). Fotos de baixa qualidade/stock do PDF (malas,
  relógio, controle do portão) foram descartadas.
- **SEO**: title/description/Open Graph por página, JSON-LD (LodgingBusiness),
  sitemap.xml e robots.txt.
- **Formato guia do hóspede** (jul/2026): o site é entregue ao hóspede na
  chegada. CTAs de reserva, cards de venda dos lofts e selos de avaliação foram
  removidos; todos os botões de WhatsApp usam a mensagem "Sou hóspede do Vida
  Bela" e o hero aponta para o Guia da Casa.
- **Instagram dos estabelecimentos**: 40 links no total — 30 extraídos das
  anotações do PDF + 10 confirmados por pesquisa na web (Angus @anguscumbuco,
  Madame Tequila @madametequilabar, Sal Cumbuco Steak House @salcumbuco e as
  7 barracas de praia). No PDF, os links de **Angus** e **Rosa de Saron**
  apontavam para perfis de outros estabelecimentos (erro de edição) — o do
  Angus foi corrigido via pesquisa; o do Rosa de Saron não foi localizado e
  ficou sem link, assim como a Padaria Davila e o quadriciclo.

## Pontos em aberto para você revisar

1. **Domínio**: os links absolutos de SEO (Open Graph, sitemap, JSON-LD) apontam
   para `https://www.vidabelabr.com.br/`. Se o site for publicado em outro
   domínio, troque essas URLs (aparecem no `<head>` das 4 páginas, no
   `sitemap.xml` e no `robots.txt`).
2. **Link do Google Maps**: usa busca por "Vida Bela Lofts Cumbuco Rua F 90".
   Se vocês tiverem o link oficial do perfil no Google Maps, vale substituir
   (em `index.html`, seção Como Chegar).
3. **Fazendinha Adventure Park**: o PDF não traz endereço — deixei "Região do
   Cumbuco". Se tiverem o endereço exato, é só me passar.
5. **E-mail de contato**: não consta no PDF nem no site atual; o site usa apenas
   WhatsApp e Instagram.
6. **Senhas de Wi-Fi**: publicadas conforme solicitado — lembrando que a página
   `guia.html` é pública (qualquer pessoa pode acessá-la).

## Fonte dos dados

- `info-loft.pdf` (guia do hóspede, 16 páginas) — textos, imagens, mapas.
- `https://www.vidabelabr.com.br/` — dados complementares da marca.
- Artefatos intermediários da extração ficam em `extracted/` (não publicar).
