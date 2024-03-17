<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  unit?: string;
}>();
</script>

<template>
  <div class="info-group">
    <p class="label">{{ label }}</p>
    <div>
      <span class="value">{{ value }}</span>
      <span v-if="unit" class="value sub">{{ unit }}</span>
    </div>
  </div>
</template>

<style scope>
.info-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  color: var(--color-text-secondary);
  text-transform: uppercase;
  font-weight: lighter;
}

.value {
  font-size: 90%;
  font-weight: bold;
}

.sub {
  font-size: 80%;
}
</style>
