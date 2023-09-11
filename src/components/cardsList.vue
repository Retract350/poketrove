<template>
  <div class="cards-list-container">
    <div class="card" v-for="card in testCardsArr" :key="card.id">
      <h2 style="color: white">{{ card.name }}</h2>
    </div>
  </div>

  <!-- <button @click="testShowCards = !testShowCards">toggle card render</button> -->
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
// import { cardsArr } from "../composables/getCards";

const props = defineProps({
  testCardsArr: {
    type: Array as PropType<any>,
    required: true,
  },
});

// const testShowCards = ref(false);
</script>

<style lang="scss">
.cards-list-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
