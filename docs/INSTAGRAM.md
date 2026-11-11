# Instagram feed (proxy)

O site **nunca** chama a Graph API direto: o token ficaria no bundle do Vite.

## Conta Body Move

- Perfil: [@bodymove.funcional](https://www.instagram.com/bodymove.funcional/)
- IG User ID: `17841458992095230`
- Token atual: **Facebook System User** (`EAA...`) → host `graph.facebook.com`

## Dev (já configurado)

1. Segredos no `.env.local` (gitignored):
   - `INSTAGRAM_USER_ID`
   - `INSTAGRAM_ACCESS_TOKEN` ← **sem** `VITE_`
2. `VITE_INSTAGRAM_MODE=live`
3. `VITE_INSTAGRAM_FEED_URL=/api/instagram`
4. O Vite sobe um middleware em `vite.instagram-proxy.ts` que busca a Graph e devolve JSON limpo.

```bash
npm run dev
# abra /api/instagram no browser para testar o JSON
```

## Produção (Apps Script)

1. Cole `docs/instagram-proxy-apps-script.gs` num Apps Script.
2. Script Properties: `IG_USER_ID`, `IG_ACCESS_TOKEN`, `IG_LIMIT=6`.
3. Deploy → Web app → Anyone.
4. No host de produção:

```bash
VITE_INSTAGRAM_MODE=live
VITE_INSTAGRAM_FEED_URL=https://script.google.com/macros/s/XXXX/exec
VITE_INSTAGRAM_PROFILE_URL=https://www.instagram.com/bodymove.funcional/
```

## Segurança

- Se o token vazou (chat, print, commit), **regenere** no Meta Developers.
- Nunca use prefixo `VITE_` em tokens.
- Não commite `.env.local`.
