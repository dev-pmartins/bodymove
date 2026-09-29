/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_CONTENT_MODE?: 'mock' | 'live'
  readonly VITE_INSTAGRAM_MODE?: 'mock' | 'live'
  readonly VITE_GOOGLE_SCRIPT_URL?: string
  readonly VITE_CMS_CACHE_TTL_MS?: string
  readonly VITE_GOOGLE_SHEET_CSV_URL?: string
  readonly VITE_INSTAGRAM_FEED_URL?: string
  readonly VITE_INSTAGRAM_PROFILE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
