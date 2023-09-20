<template>
  <div class="container">
    <searchCards />
  </div>
</template>

<script lang="ts" setup>
import searchCards from "../components/searchCards.vue";
</script>

<style lang="scss">
.container {
  width: 100;
  margin: 9rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}
</style>
