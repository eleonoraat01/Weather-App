<script setup lang="ts">
import { CurrentCard, DayCard, HourCard } from '@components';
import type { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from '@types';

defineProps<{
  location?: string;
  current: CurrentWeatherData;
  daily: DailyWeatherData[];
  hourly: HourlyWeatherData[];
}>();
</script>

<template>
  <header class="header">
    <h1 v-if="location" class="location">{{ location }}</h1>
    <CurrentCard v-bind="current" />
  </header>
  <section class="day-section">
    <DayCard v-for="(day, index) in daily" v-bind="day" :key="index" :index="index" />
  </section>
  <table class="hour-section">
    <tbody>
      <HourCard v-for="(hour, index) in hourly" v-bind="hour" :key="index" />
    </tbody>
  </table>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: var(--spacing);
}

.location {
  margin-bottom: 3vh;
  font-size: max(1.5rem, 3vw);
}

.day-section {
  --min: 15ch;

  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  grid-gap: 2vh 1vw;

  max-width: 80%;
  margin-inline: auto;
  padding-block: var(--spacing);
}

.hour-section {
  width: 100%;
  margin-block-start: calc(var(--spacing) * 2);

  border-collapse: collapse;
  table-layout: fixed;
  word-break: break-all;
  text-wrap: balance;
  text-align: center;
}
</style>
