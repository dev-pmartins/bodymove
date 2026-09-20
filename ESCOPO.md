# Escopo — Body Move (frontend only)

**Modelo aprovado:** landing institucional sem painel/admin (Opção A + conteúdos dinâmicos via planilha/API).  
**Stack:** React + TypeScript + Vite.

## Direção visual

- Estética **ativa e provocante**: fundo escuro, contraste alto, contornos em verde ácido `#8df148`.
- Botão **primário**: preenchimento verde ácido, texto preto.
- Botão **secundário**: fundo escuro, borda sutil; no hover, **neon verde** iluminando as bordas.
- Scroll com **parallax + crossfade** entre `BG1` e `BG2` (assets em `public/images/`).
- Tipografia expressiva (display condensada + body limpa) — sem Inter/Roboto/Arial.
- **Logo atual:** `public/brand/logo-lockup.png` — arte completa (ícone + “BODY MOVE” + “STUDIO FUNCIONAL”), PNG sem transparência (fundo preto). Usável no hero escuro; tratamento (alpha / SVG / favicon) fica como melhoria quando o cliente tiver arte final.

## Ordem sugerida da home

1. **Hero** — marca Body Move, slogan, CTA WhatsApp, parallax de fundo.
2. **Campanhas / novidades** — slider (dados via Google Sheets).
3. **Produtos** — Treinamento funcional · Musculação · Judô.
4. **Treino do dia** — grade do dia (dados via Google Sheets).
5. **Casos de mudança** — depoimentos + fotos before/after.
6. **Instagram** — últimas publicações.
7. **Unidade** — endereço, Maps, horários, redes, WhatsApp flutuante/footer.

> Motivo da ordem: primeiro converter (hero + campanhas), depois explicar oferta (produtos), reforçar rotina (treino), prova social (casos + IG) e fechar com visita física (unidade).

## Seções e fontes de dados

| Seção | Conteúdo | Fonte (fase 1) | Observação |
|-------|----------|----------------|------------|
| Hero | Marca, slogan, CTA | Estático no código | — |
| Slider campanhas | Título, imagem, texto, link WA | Google Sheets (CSV publicado) | Sem backend |
| Produtos | 3 modalidades | Estático | Pode virar planilha depois |
| Treino do dia | Exercícios / foco do dia | Google Sheets (CSV publicado) | Mesmo padrão do slider |
| Casos de mudança | Foto + depoimento | Estático ou Sheets | Cliente fornece mídia |
| Instagram | Grid de posts | API Instagram (ver riscos) | Pode precisar proxy serverless |
| Unidade | Endereço + Maps | Estático | [Maps](https://www.google.com/maps/search/?api=1&query=Av.+Tiradentes,+2150+-+Jardim+Santa+Edwirges,+Guarulhos+-+SP,+07113-001) |

### Endereço

Av. Tiradentes, 2150 — Jardim Santa Edwirges, Guarulhos — SP, 07113-001

### Contato

WhatsApp: `+55 11 98506-2758`

## Integrações sem “sistema”

### Google Forms → Sheet → site (contato + slides)

O front **não lê o Forms diretamente**. O fluxo é:

1. Google Form (ou edição manual) grava em uma **Google Sheet**.
2. Aba publicada como CSV (`Arquivo → Compartilhar → Publicar na web`).
3. URL em `VITE_GOOGLE_SHEET_CSV_URL` + `VITE_SITE_CONTENT_MODE=live`.

Campos suportados hoje:

- telefone, whatsapp, whatsapp_digits
- endereço (linha, bairro, cidade, UF, CEP)
- slides: título, subtítulo, `imagem_url`, `link_url`, CTA

Modelo CSV: `docs/google-sheet-modelo.csv`  
Parser: `src/integrations/googleSheet.ts`  
Mock ativo por padrão: `src/data/mock/siteContent.ts`

### Instagram

- Mock: `src/data/mock/instagram.ts`
- Live: `VITE_INSTAGRAM_MODE=live` + `VITE_INSTAGRAM_FEED_URL` (proxy JSON)
- Adapter: `src/integrations/instagram.ts`

## Fora deste modelo (sem sistema)

- Login / CMS / banco próprio
- Pagamento online
- Edição de conteúdo por painel
- App mobile, catraca, matrícula

## Entregáveis desta etapa

1. Style guide (`/style-guide`) — tokens, tipografia, botões, cards, neon, samples de seção.
2. Estrutura de pastas e tokens CSS prontos para a home.
3. Placeholders para `BG1` / `BG2` até as imagens finais entrarem em `public/images/`.

## Próximos passos (após style guide)

1. Implementar shell da home + parallax.
2. Montar seções estáticas.
3. Conectar Sheets (campanhas + treino).
4. Decisão final Instagram (mock vs Worker).
5. SEO básico + publish.
