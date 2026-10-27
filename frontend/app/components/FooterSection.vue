<script setup lang="ts">
import { h } from 'vue'

const links = [
  { label: 'Telegram', href: 'https://t.me/mostafafazli', icon: 'telegram', external: true },
  { label: 'Instagram', href: 'https://instagram.com/mostafafazli', icon: 'instagram', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mostafafazli', icon: 'linkedin', external: true },
  { label: 'GitHub', href: 'https://github.com/mostafafazli', icon: 'github', external: true },
  { label: 'Email', href: 'mailto:hello@mostafafazli.dev', icon: 'mail', external: false },
] as const

const paths: Record<string, string[]> = {
  telegram: ['M21.5 3.5 3.8 10.3c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.2c.2.6.1.8.7.8l2.5-2.4 4.6 3.4c.8.4 1.4.2 1.6-.8l3-14.2c.3-1.2-.4-1.7-.7-1.7Z', 'm8.2 13 9.7-6.1-7.9 7.1-.3 3.2'],
  instagram: ['M7 2.8h10A4.2 4.2 0 0 1 21.2 7v10a4.2 4.2 0 0 1-4.2 4.2H7A4.2 4.2 0 0 1 2.8 17V7A4.2 4.2 0 0 1 7 2.8Z', 'M16.8 11.6a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0Z', 'M17.7 6.3h.1'],
  linkedin: ['M4 4.5h.1', 'M4.2 8.3v10.5', 'M9 18.8V8.3', 'M9 13.1a4.8 4.8 0 0 1 9.6 0v5.7'],
  github: ['M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z'],
  mail: ['M3 5.5h18v13H3z', 'm3.5 6 8.5 6.5L20.5 6'],
}

const SvgIcon = (props: { name: string }) => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' }, (paths[props.name] ?? []).map((d, index) => h('path', { d, key: index })))
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-meta">
        <a class="brand" href="#top" aria-label="Back to top">mf<span>.</span></a>
        <p>Built with Nuxt, Vue &amp; Tailwind CSS.</p>
      </div>

      <nav class="footer-socials" aria-label="Social links">
        <a
          v-for="link in links"
          :key="link.label"
          class="social-link"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :aria-label="link.label"
        >
          <svg-icon :name="link.icon" />
        </a>
      </nav>

      <p class="copyright">© {{ new Date().getFullYear() }} Mostafa Fazli · All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.footer-inner {
  display: flex;
  width: 100%;
  max-width: 1152px;
  min-height: 112px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-inline: auto;
  padding: 40px 32px;
}

.footer-meta { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
.brand { color: #fff; font: 700 1rem/1 'JetBrains Mono', 'Courier New', monospace; letter-spacing: -.04em; text-decoration: none; }
.brand span { color: #2681d0; }
.footer-meta p, .copyright { margin: 0; color: rgba(255, 255, 255, .45); font: 400 .78rem/1.5 'Inter', system-ui, sans-serif; }
.footer-socials { display: flex; align-items: center; gap: 12px; }
.social-link { display: inline-flex; width: 40px; height: 40px; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.1); border-radius: 8px; color: rgba(255,255,255,.48); transition: border-color .2s ease, color .2s ease, background .2s ease; }
.social-link:hover { border-color: rgba(38,129,208,.78); background: rgba(38,129,208,.08); color: #54a9f4; }
.social-link:focus-visible { outline: 2px solid #72baff; outline-offset: 3px; }
.social-link :deep(svg) { width: 20px; height: 20px; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }

@media (max-width: 767.98px) {
  .footer-inner { flex-direction: column; justify-content: center; padding: 40px 24px; text-align: center; }
  .footer-meta { align-items: center; }
  .copyright { order: 3; }
}

@media (prefers-reduced-motion: reduce) { .social-link { transition: none; } }
</style>
