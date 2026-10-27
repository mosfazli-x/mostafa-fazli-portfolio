<script setup lang="ts">
import { onMounted, ref } from 'vue'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const isLight = ref(false)
const locale = ref<'EN' | 'FA'>('EN')
const isMenuOpen = ref(false)

const applyPreferences = () => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = isLight.value ? 'light' : 'dark'
  document.documentElement.lang = locale.value === 'FA' ? 'fa' : 'en'
  document.documentElement.dir = locale.value === 'FA' ? 'rtl' : 'ltr'
}

const toggleTheme = () => {
  isLight.value = !isLight.value
  localStorage.setItem('theme', isLight.value ? 'light' : 'dark')
  applyPreferences()
}

const toggleLocale = () => {
  locale.value = locale.value === 'EN' ? 'FA' : 'EN'
  localStorage.setItem('locale', locale.value === 'FA' ? 'fa' : 'en')
  applyPreferences()
}

const closeMenu = () => { isMenuOpen.value = false }

onMounted(() => {
  isLight.value = localStorage.getItem('theme') === 'light'
  locale.value = localStorage.getItem('locale') === 'fa' ? 'FA' : 'EN'
  applyPreferences()
})
</script>

<template>
  <header class="site-header">
    <div class="header-shell">
      <a class="brand" href="#top" aria-label="Mostafa Fazli, back to top">
        <span>MF</span><b>.</b>
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>

      <div class="header-actions">
        <button class="control-button theme-button" type="button" :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'" @click="toggleTheme">
          <svg v-if="isLight" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
        </button>
        <button class="language-button" type="button" aria-label="Switch language" @click="toggleLocale">
          <span :class="{ active: locale === 'EN' }">EN</span><i>/</i><span :class="{ active: locale === 'FA' }">FA</span>
        </button>
        <a class="hire-button" href="#contact">Hire Me <span aria-hidden="true">↗</span></a>
        <button class="menu-button" type="button" :aria-expanded="isMenuOpen" aria-controls="mobile-navigation" aria-label="Toggle navigation" @click="isMenuOpen = !isMenuOpen">
          <span /><span />
        </button>
      </div>
    </div>

    <nav id="mobile-navigation" class="mobile-nav" :class="{ open: isMenuOpen }" aria-label="Mobile navigation">
      <a v-for="link in links" :key="`mobile-${link.href}`" :href="link.href" @click="closeMenu">{{ link.label }}</a>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  padding: 16px 20px;
  pointer-events: none;
}

.header-shell {
  display: flex;
  width: min(100%, 1200px);
  height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 0 auto;
  padding: 0 10px 0 18px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 18px;
  background: rgba(3, 12, 18, .72);
  box-shadow: 0 12px 40px rgba(0,0,0,.2), inset 0 1px rgba(255,255,255,.06);
  backdrop-filter: blur(18px) saturate(130%);
  pointer-events: auto;
}

.brand { color: #fff; font: 700 1.2rem/1 'JetBrains Mono', monospace; letter-spacing: -.08em; text-decoration: none; }
.brand b { color: #54a9f4; font-weight: 700; }
.desktop-nav { display: flex; align-items: center; gap: 26px; margin-left: auto; }
.desktop-nav a { position: relative; color: rgba(255,255,255,.62); font: 500 .75rem/1.2 'Inter', sans-serif; text-decoration: none; transition: color .2s ease; }
.desktop-nav a::after { position: absolute; right: 0; bottom: -8px; left: 0; height: 1px; background: #54a9f4; content: ''; opacity: 0; transform: scaleX(.4); transition: opacity .2s ease, transform .2s ease; }
.desktop-nav a:hover { color: #fff; }
.desktop-nav a:hover::after { opacity: 1; transform: scaleX(1); }
.header-actions { display: flex; align-items: center; gap: 8px; }
.control-button, .language-button, .menu-button { border: 0; color: rgba(255,255,255,.66); background: transparent; cursor: pointer; }
.control-button { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid transparent; border-radius: 10px; transition: color .2s ease, background .2s ease, border-color .2s ease; }
.control-button:hover, .language-button:hover { border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.06); color: #fff; }
.control-button svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.6; }
.language-button { display: inline-flex; align-items: center; gap: 4px; padding: 8px 7px; border-radius: 9px; font: 600 .62rem/1 'JetBrains Mono', monospace; letter-spacing: .04em; transition: color .2s ease, background .2s ease, border-color .2s ease; }
.language-button i { color: rgba(255,255,255,.24); font-style: normal; }
.language-button .active { color: #fff; }
.hire-button { display: inline-flex; height: 36px; align-items: center; gap: 9px; margin-left: 5px; padding: 0 14px; border-radius: 10px; background: #2681d0; color: #fff; font: 600 .72rem/1 'Inter', sans-serif; text-decoration: none; transition: background .2s ease, transform .2s ease; }
.hire-button:hover { background: #54a9f4; transform: translateY(-1px); }
.hire-button span { font-size: 1rem; }
.menu-button { display: none; width: 36px; height: 36px; padding: 9px; border-radius: 9px; }
.menu-button span { display: block; height: 1px; margin: 5px 0; background: currentColor; }
.mobile-nav { display: none; }

.control-button:focus-visible, .language-button:focus-visible, .hire-button:focus-visible, .menu-button:focus-visible, .desktop-nav a:focus-visible, .mobile-nav a:focus-visible, .brand:focus-visible { outline: 2px solid #72baff; outline-offset: 3px; }

:global(html[data-theme='light']) .header-shell { border-color: rgba(15, 31, 45, .12); background: rgba(248, 251, 253, .78); box-shadow: 0 12px 40px rgba(15, 31, 45, .1), inset 0 1px rgba(255,255,255,.85); }
:global(html[data-theme='light']) .brand, :global(html[data-theme='light']) .desktop-nav a:hover, :global(html[data-theme='light']) .language-button .active { color: #12202c; }
:global(html[data-theme='light']) .desktop-nav a, :global(html[data-theme='light']) .control-button, :global(html[data-theme='light']) .language-button { color: rgba(18, 32, 44, .62); }
:global(html[data-theme='light']) .mobile-nav { border-color: rgba(15,31,45,.12); background: rgba(248,251,253,.94); }
:global(html[data-theme='light']) .mobile-nav a { border-color: rgba(15,31,45,.08); color: rgba(18,32,44,.78); }

@media (max-width: 900px) {
  .desktop-nav { display: none; }
  .menu-button { display: block; }
  .mobile-nav { display: flex; max-height: 0; width: min(100%, 1200px); flex-direction: column; gap: 4px; overflow: hidden; margin: 8px auto 0; padding: 0 16px; border: 1px solid transparent; border-radius: 16px; background: rgba(3,12,18,.92); backdrop-filter: blur(18px); pointer-events: auto; transition: max-height .25s ease, padding .25s ease, border-color .25s ease; }
  .mobile-nav.open { max-height: 320px; padding: 12px 16px; border-color: rgba(255,255,255,.1); }
  .mobile-nav a { padding: 11px 4px; border-bottom: 1px solid rgba(255,255,255,.06); color: rgba(255,255,255,.76); font: 500 .8rem/1.2 'Inter', sans-serif; text-decoration: none; }
  .mobile-nav a:last-child { border-bottom: 0; }
}

@media (max-width: 480px) {
  .site-header { padding: 12px; }
  .header-shell { height: 54px; padding-left: 14px; }
  .hire-button { height: 34px; padding: 0 10px; }
  .language-button { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .desktop-nav a, .desktop-nav a::after, .hire-button, .mobile-nav, .control-button, .language-button { transition: none; }
}
</style>
