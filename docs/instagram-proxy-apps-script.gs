/**
 * Proxy Instagram → JSON público (Google Apps Script)
 * ------------------------------------------------------------
 * Token NÃO vai no front. Use Script Properties.
 *
 * Este token de System User / Facebook Login usa:
 *   https://graph.facebook.com/v21.0/{IG_USER_ID}/media
 *
 * SETUP
 * 1. script.google.com → Novo projeto → cole este código
 * 2. Script properties:
 *      IG_USER_ID       = 17841458992095230
 *      IG_ACCESS_TOKEN  = (token EAA...)
 *      IG_LIMIT         = 6
 * 3. Deploy → Web app → Execute as Me → Anyone
 * 4. VITE_INSTAGRAM_FEED_URL=<URL /exec>
 *    VITE_INSTAGRAM_MODE=live
 */

function doGet() {
  try {
    const props = PropertiesService.getScriptProperties()
    const userId = props.getProperty('IG_USER_ID')
    const token = props.getProperty('IG_ACCESS_TOKEN')
    const limit = props.getProperty('IG_LIMIT') || '6'

    if (!userId || !token) {
      return json_({
        error: 'Configure IG_USER_ID e IG_ACCESS_TOKEN nas Script Properties.',
      })
    }

    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'thumbnail_url',
      'permalink',
      'timestamp',
    ].join(',')

    // Facebook Graph (System User / Page token) — NÃO graph.instagram.com
    const url =
      'https://graph.facebook.com/v21.0/' +
      encodeURIComponent(userId) +
      '/media?fields=' +
      encodeURIComponent(fields) +
      '&limit=' +
      encodeURIComponent(limit) +
      '&access_token=' +
      encodeURIComponent(token)

    const res = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      method: 'get',
    })
    const code = res.getResponseCode()
    const body = JSON.parse(res.getContentText())

    if (code < 200 || code >= 300) {
      return json_({
        error: 'Falha na Graph API',
        status: code,
        details: body,
      })
    }

    const posts = (body.data || [])
      .map(function (item) {
        var type = String(item.media_type || 'IMAGE').toUpperCase()
        var thumb = item.thumbnail_url || ''
        var media = item.media_url || ''
        var mediaUrl =
          (type === 'VIDEO' || type === 'REELS') && thumb ? thumb : media || thumb
        return {
          id: String(item.id),
          permalink: item.permalink || '',
          media_url: mediaUrl,
          caption: item.caption || '',
          timestamp: item.timestamp || '',
          media_type: type,
        }
      })
      .filter(function (p) {
        return !!p.media_url
      })

    return json_(posts)
  } catch (err) {
    return json_({ error: String(err) })
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
