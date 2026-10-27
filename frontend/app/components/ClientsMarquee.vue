<script setup lang="ts">
const logos = [
  { name: 'Relume', src: '/clients/relume.png', height: 51 },
  { name: 'Google', src: '/clients/google.png', height: 45 },
  { name: 'Airbnb', src: '/clients/airbnb.png', height: 45 },
  { name: '3M', src: '/clients/3m.png', height: 45 },
]

const track = [...logos, ...logos, ...logos, ...logos]
</script>

<template>
  <section class="bg-black pb-16 pt-[10px] mt-10 ">
    <div class="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-[10px] px-5">
      <p class="hidden w-[210px] shrink-0 font-body text-[18px] leading-[1.6] tracking-[-0.02em] text-white md:block">
        Largest clients all over the globe
      </p>
      <div class="marquee relative w-full max-w-[852px] overflow-hidden">
        <ul class="marquee-track flex items-center">
          <li v-for="(logo, i) in track" :key="i" class="shrink-0 pr-20">
            <img :src="logo.src" :alt="logo.name" :style="{ height: `${logo.height}px` }" class="w-auto">
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-track {
  width: max-content;
  animation: marquee 40s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
