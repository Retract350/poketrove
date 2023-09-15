<template>
  <div class="cards-list-container">
    <div class="card" v-for="card in testCardsArr" :key="card.id">
      <div class="card-image">
        <img :src="card.images.small" :alt="card.name" />
      </div>
      <div class="card-details">
        <div class="card-name">
          <p class="bold">{{ card.name }}</p>
          <p>({{ card.number }}/{{ card.setDetails.printedTotal }})</p>
        </div>
        <div class="set-pricing">
          <p>
            <p><span class="bold">Set:</span> {{ card.setDetails.name }} ({{ card.setDetails.releaseDate.substring(0, 4) }})</p>
          </p>
          <div class="pricing" v-if="card.pricing">
            <p v-if="card.pricing.nonHolo">
              <span class="bold">Non-holo:</span> ${{ card.pricing.nonHolo }}
            </p>
            <p v-if="card.pricing.reverseHolo">
              <span class="bold">Reverse Holo:</span> ${{ card.pricing.reverseHolo }}
            </p>
            <p v-if="card.pricing.holo">
              <span class="bold">Holo:</span> ${{ card.pricing.holo }}
            </p>
            <p v-if="card.pricing.unlimitedHolo">
              <span class="bold">Unlimited Holo:</span> ${{ card.pricing.unlimitedHolo }}
            </p>
            <p v-if="card.pricing.firstEditionHolo">
              <span class="bold">1st Edition Holo:</span> ${{ card.pricing.firstEditionHolo }}
            </p>
          </div>
          <div class="no-pricing" v-else>
            <p ><span>No price data available</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <button @click="testShowCards = !testShowCards">toggle card render</button> -->
</template>

<script lang="ts" setup>
import { PropType, computed, ref } from "vue";
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
  width: 75%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 2rem;
  // justify-content: center;
  // align-items: center;

  .card {
    background-color: $light-blue;
    display: flex;
    gap: 1.5rem;
    height: 15rem;
    width: 95%;
    padding: 1rem;
    border-radius: $radius-medium;
    box-shadow: 0 0 1rem $shadow-blue;
    margin: 0 auto;
    font-size: 1.125rem;

    .card-image {
      // display: inline-block;
      // height: 15rem;
      display: flex;
      // overflow: hidden;
      border-radius: 0.375rem;
      box-shadow: 2px 2px 0.5rem $shadow-black;

      // img {
      // height: 12rem;
      // min-width: 100%;
      // min-height: 100%;
      // }
    }

    .card-details {
      width: 60%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .card-name {
        display: flex;
        justify-content: space-between;
        border-bottom: 3px solid $bg-primary;
      }
    }
  }
}

.bold {
  font-size: 1.25rem;
  font-weight: $font-heavy;
}
</style>
