<template>
  <div class="cards-list-container">
    <div class="card" v-for="card in testCardsArr" :key="card.id">
      <div class="card-image">
        <img :src="card.images.small" :alt="card.name" />
      </div>
      <div class="card-details">
        <p>
          {{ card.name }} ({{ card.number }}/{{ card.setDetails.printedTotal }})
        </p>
      </div>
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
@import "../assets/variables.scss";

.cards-list-container {
  // width: 75vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  .card {
    background-color: $shade-light-grey;
    display: flex;
    gap: 1rem;
    height: 15rem;
    width: 40rem;
    padding: 1rem;
    border-radius: $radius-medium;
    box-shadow: 0 0 1rem $shadow-blue;

    .card-image {
      // display: inline-block;
      // height: 15rem;
      display: flex;
      overflow: hidden;
      border-radius: 0.375rem;
      box-shadow: 2px 2px 0.5rem $shadow-black;

      img {
        // height: 12rem;
        // min-width: 100%;
        // min-height: 100%;
      }
    }
  }
}
</style>
