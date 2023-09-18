<template>
  <div class="container">
    <searchCards />
  </div>
</template>

<script lang="ts" setup>
import searchCards from "../components/searchCards.vue";
import cardsList from "../components/cardsList.vue";
</script>

<style lang="scss">
.container {
  width: 100vw;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}
</style>
