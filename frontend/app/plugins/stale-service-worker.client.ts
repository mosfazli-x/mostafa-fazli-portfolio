// Dev-only safeguard.
// A previous app (e.g. a PWA) that once ran on this same origin can leave a
// service worker and Cache Storage behind. Those keep serving stale module
// URLs to the dev server (ENOENT / "outside of Vite serving allow list").
// While developing, detect and clear them so the dev origin is always ours.
export default defineNuxtPlugin(() => {
  if (!import.meta.dev) return
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return

  const FLAG = 'nuxt:stale-sw-cleared'

  navigator.serviceWorker
    .getRegistrations()
    .then(async (registrations) => {
      if (registrations.length === 0) {
        sessionStorage.removeItem(FLAG)
        return
      }

      const wasControlled = Boolean(navigator.serviceWorker.controller)

      await Promise.all(registrations.map((registration) => registration.unregister()))

      if ('caches' in window) {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      }

      if (wasControlled && sessionStorage.getItem(FLAG) !== '1') {
        sessionStorage.setItem(FLAG, '1')
        location.reload()
      }
    })
    .catch(() => {
      // Never let cleanup errors break the app.
    })
})
