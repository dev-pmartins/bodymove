export function whatsappUrl(digits: string, message?: string): string {
  const base = `https://wa.me/${digits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}
