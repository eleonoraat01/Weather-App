<script setup lang="ts">
import { InfoGroup } from '@components';
import { getWeatherIcon, getWeatherDescription } from '@helpers';
import type { CurrentWeatherData } from '@types';

defineProps<CurrentWeatherData>();
</script>

<template>
  <div class="top-side">
    <img class="weather-icon" :src="getWeatherIcon(iconCode, isDay)" :alt="getWeatherDescription(iconCode)" />
    <div class="temperature">
      <h2 class="current-temp">{{ currentTemp }}{{ units.currentTemp }}</h2>
      <h3 class="weather-description">{{ getWeatherDescription(iconCode) }}</h3>
    </div>
  </div>
  <div class="bottom-side">
    <InfoGroup label="Усеща се като:" :value="feelsLike" :unit="units.feelsLike" />
    <InfoGroup label="Вятър" :value="windSpeed" :unit="units.windSpeed" />
    <InfoGroup label="Видимост:" :value="visibility" :unit="units.visibility" />
    <InfoGroup label="Валежи:" :value="precipitation" :unit="units.precipitation" />
    <InfoGroup label="Влажност:" :value="humidity" :unit="units.humidity" />
    <InfoGroup label="UV индекс:" :value="uvIndex" :unit="units.uvIndex" />
  </div>
</template>

<style scoped>
.top-side {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: calc(var(--spacing) / 2);
}

.weather-icon {
  width: max(100px, 10vw);
}

.temperature {
  line-height: 0.9;
}

.weather-description {
  text-align: center;
  font-size: max(1rem, 2vw);
}

.current-temp {
  font-size: max(5rem, 7vw);
  margin-left: 2vw;
}

.bottom-side {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0 5vw;
}

.info-group {
  flex-direction: row;
  justify-content: center;
  max-width: fit-content;
  gap: max(0.5rem, 0.5vw);
  font-size: max(1rem, 1.1vw);
}

@media (max-width: 550px) {
  .bottom-side {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, auto);
  }
}

@media (max-width: 300px) {
  .info-group {
    max-width: 100%;
  }

  .bottom-side {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin-top: calc(var(--spacing) * 2);
  }
}
</style>
