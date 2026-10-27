<script setup lang="ts">
const skills = [
  { name: 'HTML5', category: 'Front-end' },
  { name: 'CSS3', category: 'Front-end' },
  { name: 'Sass / SCSS', category: 'Front-end' },
  { name: 'Tailwind CSS', category: 'Front-end' },
  { name: 'JavaScript', category: 'Front-end' },
  { name: 'TypeScript', category: 'Front-end' },
  { name: 'Vue.js', category: 'Front-end' },
  { name: 'React', category: 'Front-end' },
  { name: 'Nuxt', category: 'Front-end' },
  { name: 'Next.js', category: 'Front-end' },
  { name: 'Vite', category: 'Front-end' },
  { name: 'Node.js', category: 'Back-end' },
  { name: 'Express', category: 'Back-end' },
  { name: 'NestJS', category: 'Back-end' },
  { name: 'Django', category: 'Back-end' },
  { name: 'FastAPI', category: 'Back-end' },
  { name: 'REST APIs', category: 'Back-end' },
  { name: 'GraphQL', category: 'Back-end' },
  { name: 'WebSockets', category: 'Back-end' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },
  { name: 'Redis', category: 'Databases' },
  { name: 'Firebase', category: 'Databases' },
  { name: 'Supabase', category: 'Databases' },
  { name: 'OpenAI API', category: 'AI' },
  { name: 'LLM Integration', category: 'AI' },
  { name: 'RAG Systems', category: 'AI' },
  { name: 'Prompt Engineering', category: 'AI' },
  { name: 'OCR Pipelines', category: 'AI' },
  { name: 'AI Automation', category: 'AI' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },
  { name: 'Git / GitHub', category: 'DevOps' },
  { name: 'CI / CD', category: 'DevOps' },
  { name: 'Cloudflare', category: 'DevOps' },
  { name: 'Vercel', category: 'DevOps' },
] as const

const marqueeSkills = [...skills, ...skills]

const skillIconMap: Record<string, string> = {
  'HTML5': 'html5',
  'CSS3': 'css',
  'Sass / SCSS': 'sass',
  'Tailwind CSS': 'tailwindcss',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Vue.js': 'vuedotjs',
  'React': 'react',
  'Nuxt': 'nuxt',
  'Next.js': 'nextdotjs',
  'Node.js': 'nodedotjs',
  'Express': 'express',
  'NestJS': 'nestjs',
  'Django': 'django',
  'FastAPI': 'fastapi',
  'GraphQL': 'graphql',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Firebase': 'firebase',
  'Docker': 'docker',
  'Linux': 'linux',
  'Git / GitHub': 'github',
  'Cloudflare': 'cloudflare',
  'Vercel': 'vercel',
}

const skillUrlMap: Record<string, string> = {
  HTML5: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  CSS3: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'Sass / SCSS': 'https://sass-lang.com/',
  'Tailwind CSS': 'https://tailwindcss.com/',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  TypeScript: 'https://www.typescriptlang.org/',
  'Vue.js': 'https://vuejs.org/',
  React: 'https://react.dev/',
  Nuxt: 'https://nuxt.com/',
  'Next.js': 'https://nextjs.org/',
  Vite: 'https://vite.dev/',
  'Node.js': 'https://nodejs.org/',
  Express: 'https://expressjs.com/',
  NestJS: 'https://nestjs.com/',
  Django: 'https://www.djangoproject.com/',
  FastAPI: 'https://fastapi.tiangolo.com/',
  'REST APIs': 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
  GraphQL: 'https://graphql.org/',
  WebSockets: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
  PostgreSQL: 'https://www.postgresql.org/',
  MySQL: 'https://www.mysql.com/',
  MongoDB: 'https://www.mongodb.com/',
  Redis: 'https://redis.io/',
  Firebase: 'https://firebase.google.com/',
  Supabase: 'https://supabase.com/',
  'OpenAI API': 'https://platform.openai.com/docs/overview',
  'LLM Integration': 'https://huggingface.co/docs',
  'RAG Systems': 'https://python.langchain.com/docs/concepts/rag/',
  'Prompt Engineering': 'https://platform.openai.com/docs/guides/prompt-engineering',
  'OCR Pipelines': 'https://github.com/tesseract-ocr/tesseract',
  'AI Automation': 'https://n8n.io/',
  Docker: 'https://www.docker.com/',
  Linux: 'https://www.kernel.org/',
  'Git / GitHub': 'https://github.com/',
  'CI / CD': 'https://docs.github.com/en/actions',
  Cloudflare: 'https://www.cloudflare.com/',
  Vercel: 'https://vercel.com/',
}

const skillUrl = (name: string) => skillUrlMap[name] ?? 'https://developer.mozilla.org/'

const categoryIconPaths: Record<string, string> = {
  'Front-end': 'M4 5.5h16v13H4zM8 9h2m-2 3h4m2-3h4m-4 3h4',
  'Back-end': 'M5 7h14v10H5zM8 4v3m8-3v3M8 12h.01M12 12h.01M16 12h.01M8 15h8',
  'Databases': 'M5 6c0-1.1 3.1-2 7-2s7 .9 7 2-3.1 2-7 2-7-.9-7-2Zm0 0v6c0 1.1 3.1 2 7 2s7-.9 7-2V6m-14 6v6c0 1.1 3.1 2 7 2s7-.9 7-2v-6',
  AI: 'M12 4a5 5 0 0 1 5 5v1h1.5a1.5 1.5 0 0 1 0 3H17v2a5 5 0 0 1-10 0v-2H5.5a1.5 1.5 0 0 1 0-3H7V9a5 5 0 0 1 5-5Zm-2 7h.01m4.99 0H15m-5 3h4',
  DevOps: 'M6 7h12M6 12h12M6 17h7M4 4h16v16H4z',
}

const localIcon = (name: string) => skillIconMap[name] ? `/skills/${skillIconMap[name]}.svg` : undefined
const fallbackPath = (category: string) => categoryIconPaths[category] ?? categoryIconPaths['Front-end']
</script>

<template>
  <section class="skills-strip" aria-labelledby="skills-strip-title">
    <div class="skills-container">
      <p id="skills-strip-title" class="skills-label">Technologies I work with</p>
    </div>

    <div class="marquee" aria-label="Technical skills and technologies">
      <div class="marquee-track">
        <a
          v-for="(skill, index) in marqueeSkills"
          :key="`${skill.name}-${index}`"
          class="skill-chip"
          :href="skillUrl(skill.name)"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${skill.name} official website`"
        >
          <span class="skill-icon" aria-hidden="true">
            <img v-if="localIcon(skill.name)" :src="localIcon(skill.name)" alt="" loading="lazy" decoding="async">
            <svg v-else viewBox="0 0 24 24"><path :d="fallbackPath(skill.category)" /></svg>
          </span>
          <span>{{ skill.name }}</span>
          <span class="skill-category">{{ skill.category }}</span>
        </a>
      </div>

      <span class="fade fade-left" aria-hidden="true" />
      <span class="fade fade-right" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
.skills-strip {
  position: relative;
  overflow: hidden;
  padding: 64px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: #000;
}

.skills-container {
  width: 100%;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 32px;
}

.skills-label {
  margin: 0 0 40px;
  color: rgba(255, 255, 255, 0.46);
  font: 500 .75rem/1.2 'Inter', system-ui, sans-serif;
  letter-spacing: .2em;
  text-align: center;
  text-transform: uppercase;
}

.marquee {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  animation: skills-marquee 44s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 6px;
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.76);
  font: 500 .78rem/1 'JetBrains Mono', 'Courier New', monospace;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, color .2s ease, background .2s ease;
}

.skill-chip:hover {
  border-color: rgba(84, 169, 244, .62);
  background: rgba(38, 129, 208, .08);
  color: #fff;
}

.skill-icon {
  display: inline-grid;
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  place-items: center;
  color: #65b5f7;
}

.skill-icon img,
.skill-icon svg {
  display: block;
  width: 17px;
  height: 17px;
  object-fit: contain;
}

.skill-icon svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.skill-chip:hover .skill-icon {
  color: #a8d8ff;
}

.skill-category {
  color: rgba(255, 255, 255, .3);
  font-size: .62rem;
  letter-spacing: .03em;
}

.fade {
  position: absolute;
  inset-block: 0;
  z-index: 1;
  width: 96px;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(90deg, #000 8%, transparent 100%);
}

.fade-right {
  right: 0;
  background: linear-gradient(270deg, #000 8%, transparent 100%);
}

@keyframes skills-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (max-width: 639.98px) {
  .skills-strip { padding: 56px 0; }
  .skills-container { padding: 0 16px; }
  .skills-label { margin-bottom: 32px; font-size: .68rem; }
  .skill-chip { padding: 8px 12px; }
  .fade { width: 52px; }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .skill-chip { transition: none; }
}
</style>
