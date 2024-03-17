<script setup lang="ts">
import { InfoGroup } from '@components';
import { getWeatherIcon, getWeatherDescription, formatDay, formatHour } from '@helpers';
import type { HourlyWeatherData } from '@types';

defineProps<HourlyWeatherData>();
</script>

<template>
  <tr class="hour-row">
    <td><InfoGroup :label="formatDay(timestamp)" :value="formatHour(timestamp)" /></td>
    <td><img class="weather-icon" :src="getWeatherIcon(iconCode, isDay)" :alt="getWeatherDescription(iconCode)" /></td>
    <td><InfoGroup label="Температура" :value="currentTemp" :unit="units.currentTemp" /></td>
    <td><InfoGroup label="Усеща се като" :value="feelsLike" :unit="units.feelsLike" /></td>
    <td><InfoGroup label="Вятър" :value="windSpeed" :unit="units.windSpeed" /></td>
    <td><InfoGroup label="Валежи" :value="precipitation" :unit="units.precipitation" /></td>
  </tr>
</template>

<style scoped>
.info-group {
  font-size: max(0.8rem, 1.3vw);
}

.hour-row {
  background-color: var(--color-hour-section-odd-background);
}

.hour-row:nth-child(2n) {
  background-color: var(--color-hour-section-even-background);
}

.hour-row > td {
  padding: 0.5vh 1vw;
}

.weather-icon {
  width: max(30px, 4vw);
}
</style>
