<script setup lang="ts">
import { getWeatherIcon, getWeatherDescription, formatDay } from '@helpers';
import type { DailyWeatherData } from '@types';

defineProps<DailyWeatherData>();
</script>

<template>
  <div class="day-card" :key="iconCode">
    <img class="weather-icon" :src="getWeatherIcon(iconCode)" :alt="getWeatherDescription(iconCode)" />
    <h3 class="day-of-week">{{ $attrs.index ? formatDay(timestamp) : 'Днес' }}</h3>
    <div class="temperatures">
      <span class="high-temp">{{ highTemp }}{{ units.highTemp }}</span>
      <span class="low-temp">{{ lowTemp }}{{ units.lowTemp }}</span>
    </div>
  </div>
</template>

<style scoped>
.day-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(100px, 10vw);
  padding: 1vh 1vw;

  font-size: max(0.7rem, 1vw);
  background-color: var(--color-day-card-background);
  border-radius: 0.25rem;
}

.weather-icon {
  width: max(40px, 5vw);
}

.day-of-week {
  color: var(--color-text-secondary);
}

.temperatures {
  display: flex;
  gap: max(0.3rem, 0.5vw);
  font-size: 110%;
}

.high-temp {
  font-weight: bolder;
}

.low-temp {
  margin-top: auto;
  font-size: 90%;
  font-weight: lighter;
  -webkit-filter: brightness(0.7);
          filter: brightness(0.7);
}
</style>
