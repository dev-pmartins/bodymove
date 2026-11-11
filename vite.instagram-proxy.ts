import https from 'node:https'
import type { Plugin } from 'vite'

type IgEnv = {
  userId?: string
  token?: string
  limit?: string
}

function readIgEnv(): IgEnv {
  return {
    userId: process.env.INSTAGRAM_USER_ID,
    token: process.env.INSTAGRAM_ACCESS_TOKEN,
    limit: process.env.INSTAGRAM_LIMIT || '6',
  }
}

function httpsGetJson(url: string): Promise<{ status: number; body: unknown }> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks: Buffer[] = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8')
          try {
            resolve({
              status: res.statusCode || 500,
              body: JSON.parse(text),
            })
          } catch (err) {
            reject(err)
          }
        })
      })
      .on('error', reject)
  })
}

/**
 * Dev-only: GET /api/instagram
 * Token fica em INSTAGRAM_ACCESS_TOKEN (sem prefixo VITE_).
 * Host: graph.facebook.com (Facebook Login / System User).
 */
export function instagramDevProxy(): Plugin {
  return {
    name: 'bodymove-instagram-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/instagram', async (_req, res) => {
        const { userId, token, limit } = readIgEnv()

        if (!userId || !token) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error:
                'Defina INSTAGRAM_USER_ID e INSTAGRAM_ACCESS_TOKEN no .env.local (sem VITE_).',
            }),
          )
          return
        }

        const safeLimit = limit || '6'
        const fields = [
          'id',
          'caption',
          'media_type',
          'media_url',
          'thumbnail_url',
          'permalink',
          'timestamp',
        ].join(',')

        const url =
          `https://graph.facebook.com/v21.0/${encodeURIComponent(userId)}/media` +
          `?fields=${encodeURIComponent(fields)}` +
          `&limit=${encodeURIComponent(safeLimit)}` +
          `&access_token=${encodeURIComponent(token)}`

        try {
          const apiRes = await httpsGetJson(url)
          const payload = apiRes.body as {
            data?: Array<Record<string, unknown>>
            error?: unknown
          }

          if (apiRes.status < 200 || apiRes.status >= 300 || payload.error) {
            res.statusCode = apiRes.status || 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Falha na Graph API', details: payload }))
            return
          }

          const posts = (payload.data || [])
            .map((item) => {
              const type = String(item.media_type || 'IMAGE').toUpperCase()
              const thumb = String(item.thumbnail_url || '')
              const media = String(item.media_url || '')
              const mediaUrl =
                (type === 'VIDEO' || type === 'REELS') && thumb ? thumb : media || thumb
              return {
                id: String(item.id || ''),
                permalink: String(item.permalink || ''),
                media_url: mediaUrl,
                caption: item.caption ? String(item.caption) : '',
                timestamp: item.timestamp ? String(item.timestamp) : '',
                media_type: type,
              }
            })
            .filter((p) => p.media_url)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(posts))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: String(err) }))
        }
      })
    },
  }
}
