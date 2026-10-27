<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

type ContactItem = {
  label: string
  description: string
  href?: string
  value?: string
  icon: 'telegram' | 'instagram' | 'linkedin' | 'github' | 'mail' | 'phone' | 'location'
}

const socials: ContactItem[] = [
  { label: 'Telegram', description: 'Fastest way to reach me — instant chat.', href: 'https://t.me/mostafafazli', icon: 'telegram' },
  { label: 'Instagram', description: 'Behind the scenes, design & more.', href: 'https://instagram.com/mostafafazli', icon: 'instagram' },
  { label: 'LinkedIn', description: 'Professional experience & network.', href: 'https://linkedin.com/in/mostafafazli', icon: 'linkedin' },
  { label: 'GitHub', description: 'Code, open source & experiments.', href: 'https://github.com/mostafafazli', icon: 'github' },
]

const direct: ContactItem[] = [
  { label: 'Email', value: 'hello@mostafafazli.dev', description: 'For projects, partnerships, and thoughtful hellos.', href: 'mailto:hello@mostafafazli.dev', icon: 'mail' },
  { label: 'Phone', value: 'Available by request', description: 'Prefer a quick call? Send an email first.', href: 'mailto:hello@mostafafazli.dev?subject=Call%20request', icon: 'phone' },
  { label: 'Location', value: 'Remote / Worldwide', description: 'Working across time zones with curious teams.', icon: 'location' },
]

const root = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHidden = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }

  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    isVisible.value = true
    return
  }

  isHidden.value = true
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      isHidden.value = false
      isVisible.value = true
      observer?.disconnect()
    }
  }, { rootMargin: '0px 0px -80px 0px' })
  observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="contact"
    ref="root"
    class="contact"
    :class="{ 'pre-reveal': isHidden, 'is-visible': isVisible }"
    aria-labelledby="contact-title"
  >
    <div class="contact-grid" aria-hidden="true" />
    <div class="contact-glow" aria-hidden="true" />

    <div class="container">
      <header class="intro head reveal" style="--delay: 0ms">
        <span class="badge">Contact</span>
        <h2 id="contact-title">Let’s build something together</h2>
        <p class="lead">
          Have a role, a project, or a collaboration in mind? Reach out on any platform below —
          I reply to every message within 48 hours.
        </p>
      </header>

      <div class="contact-body">
        <p class="direct-note reveal" style="--delay: 90ms">
          No forms, no friction — reach me directly on whichever platform you prefer.
        </p>

        <div class="cards social-cards">
          <a
            v-for="(item, index) in socials"
            :key="item.label"
            class="card card-link reveal"
            :href="item.href"
            target="_blank"
            rel="noreferrer noopener"
            :style="{ '--delay': `${140 + index * 70}ms` }"
          >
            <span class="icon-box"><svg-icon :name="item.icon" /></span>
            <span class="arrow" aria-hidden="true">↗</span>
            <span class="card-label">{{ item.label }}</span>
            <span class="card-copy">{{ item.description }}</span>
          </a>
        </div>

        <div class="cards direct-cards">
          <component
            :is="item.href ? 'a' : 'div'"
            v-for="(item, index) in direct"
            :key="item.label"
            class="card direct-card reveal"
            :class="{ 'card-link': item.href }"
            :href="item.href"
            :style="{ '--delay': `${430 + index * 70}ms` }"
          >
            <span class="icon-box"><svg-icon :name="item.icon" /></span>
            <span v-if="item.href" class="arrow" aria-hidden="true">↗</span>
            <span class="card-label">{{ item.label }}</span>
            <span class="card-value">{{ item.value }}</span>
            <span class="card-copy">{{ item.description }}</span>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- Kept local so the section has no dependency on an icon package or remote assets. -->
<script lang="ts">
import { h } from 'vue'

const paths: Record<string, string[]> = {
  telegram: ['M21.5 3.5 3.8 10.3c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.2c.2.6.1.8.7.8l2.5-2.4 4.6 3.4c.8.4 1.4.2 1.6-.8l3-14.2c.3-1.2-.4-1.7-.7-1.7Z', 'm8.2 13 9.7-6.1-7.9 7.1-.3 3.2'],
  instagram: ['M7 2.8h10A4.2 4.2 0 0 1 21.2 7v10a4.2 4.2 0 0 1-4.2 4.2H7A4.2 4.2 0 0 1 2.8 17V7A4.2 4.2 0 0 1 7 2.8Z', 'M16.8 11.6a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0Z', 'M17.7 6.3h.1'],
  linkedin: ['M4 4.5h.1', 'M4.2 8.3v10.5', 'M9 18.8V8.3', 'M9 13.1a4.8 4.8 0 0 1 9.6 0v5.7'],
  github: ['M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z'],
  mail: ['M3 5.5h18v13H3z', 'm3.5 6 8.5 6.5L20.5 6'],
  phone: ['M6.5 3.5 9 3l1.5 4-2 1.4a15.8 15.8 0 0 0 5.6 5.6l1.4-2 4 1.5-.5 2.5a2.2 2.2 0 0 1-2.4 1.7C10 17 7 14 5.3 7.4a2.2 2.2 0 0 1 1.2-3.9Z'],
  location: ['M19 10.5c0 4.6-7 9-7 9s-7-4.4-7-9a7 7 0 1 1 14 0Z', 'M12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
}

const SvgIcon = (props: { name: string }) => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' }, (paths[props.name] ?? []).map((d, index) => h('path', { d, key: index })))

export default { components: { SvgIcon } }
</script>

<style scoped>
.contact {
  --accent: #2681d0;
  position: relative;
  overflow: hidden;
  padding: 96px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  scroll-margin-top: 90px;
  background: #03070a;
}

.container { position: relative; z-index: 1; width: 100%; max-width: 1140px; margin: 0 auto; }
.contact-grid { position: absolute; inset: 0; opacity: .32; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 72px 72px; mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent); }
.contact-glow { position: absolute; width: 680px; height: 500px; top: 40px; right: -240px; border-radius: 50%; background: rgba(0, 110, 206, .14); filter: blur(120px); pointer-events: none; }
.intro { max-width: 720px; }
.head { display: flex; flex-direction: column; align-items: center; gap: 14px; margin-inline: auto; text-align: center; }
.badge { display: inline-flex; align-items: center; color: var(--accent); font: 600 20px/1.2 'Inter', system-ui, sans-serif; }
h2 { max-width: 680px; margin: 0; color: #fff; font: 400 clamp(2rem, 4.2vw, 3rem)/1.12 'Boldonse', system-ui, sans-serif; letter-spacing: -.01em; text-wrap: balance; }
.lead { max-width: 600px; margin: 14px 0 0; color: rgba(255,255,255,.58); font: 400 1rem/1.7 'Inter', system-ui, sans-serif; }
.contact-body { margin-top: 56px; }
.direct-note { margin: 0 0 20px; color: rgba(255,255,255,.72); font: 500 .9rem/1.5 'Inter', system-ui, sans-serif; }
.cards { display: grid; gap: 16px; }
.social-cards { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.direct-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 16px; }
.card { position: relative; display: flex; min-height: 202px; flex-direction: column; align-items: flex-start; padding: 24px; border: 1px solid rgba(255,255,255,.075); border-radius: 20px; background: radial-gradient(circle at 100% 0%, rgba(38,129,208,.08), transparent 42%), linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.025)); box-shadow: inset 0 1px rgba(255,255,255,.04), 0 12px 35px rgba(0,0,0,.14); color: inherit; text-decoration: none; transition: border-color .25s ease, background .25s ease, transform .25s ease; }
.card-link:hover { border-color: rgba(38,129,208,.72); background: rgba(38,129,208,.09); transform: translateY(-4px); }
.card-link:focus-visible { outline: 2px solid #72baff; outline-offset: 4px; }
.icon-box { display: grid; width: 44px; height: 44px; place-items: center; margin-bottom: 28px; border: 1px solid rgba(38,129,208,.38); border-radius: 12px; background: rgba(38,129,208,.08); color: #54a9f4; transition: border-color .25s ease, background .25s ease; }
.card-link:hover .icon-box { border-color: rgba(38,129,208,.82); background: rgba(38,129,208,.16); }
.icon-box :deep(svg) { width: 21px; height: 21px; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.arrow { position: absolute; top: 22px; right: 24px; color: rgba(255,255,255,.36); font-size: 1.25rem; transition: color .25s ease, transform .25s ease; }
.card-link:hover .arrow { color: #54a9f4; transform: translate(3px, -3px); }
.card-label { color: #fff; font: 600 1.03rem/1.3 'Inter', system-ui, sans-serif; }
.card-value { margin-top: 5px; color: #fff; font: 500 .9rem/1.4 'Inter', system-ui, sans-serif; overflow-wrap: anywhere; }
.card-copy { margin-top: auto; padding-top: 12px; color: rgba(255,255,255,.48); font: 400 .78rem/1.6 'Inter', system-ui, sans-serif; }
.direct-card { min-height: 170px; }
.direct-card .icon-box { margin-bottom: 22px; }
.pre-reveal .reveal { opacity: 0; transform: translateY(28px); }
.reveal { opacity: 1; transform: translateY(0); transition: opacity .7s ease var(--delay), transform .7s cubic-bezier(.22,1,.36,1) var(--delay); }
.is-visible .reveal { opacity: 1; transform: translateY(0); }

@media (max-width: 1023.98px) {
  .contact { padding: 80px 24px; }
  .social-cards, .direct-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 639.98px) {
  .contact { padding: 64px 16px; }
  .contact-body { margin-top: 48px; }
  .social-cards, .direct-cards { grid-template-columns: 1fr; }
  .card { min-height: 182px; }
}
@media (prefers-reduced-motion: reduce) { .reveal, .pre-reveal .reveal, .card, .arrow { transition: none; transform: none; } }
</style>
