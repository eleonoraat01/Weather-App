<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DashBoard } from '@views';
import { WeatherService } from '@services';
import mockup from '@mock';
import type { WeatherData } from '@types';

const data = ref<WeatherData>(mockup);

onMounted(async () => {
  const weatherData = await WeatherService();
  if (weatherData) data.value = weatherData;

  document.body.classList.remove('loading');
});
</script>

<template>
  <DashBoard v-bind="data" />
</template>
