<template>
  <div class="cards-list-container">
    <div class="card" v-for="card in testCardsArr" :key="card.id">
      <div class="card-image">
        <img :src="card.images.small" :alt="card.name" />
      </div>
      <div class="card-details">
        <div class="card-name">
          <p class="bold">{{ card.name }}</p>
          <p class="font-small">({{ card.number }}/{{ card.setDetails.printedTotal }})</p>
        </div>
        <div class="set-pricing">
          <p>
            <p><span class="bold">Set:</span> {{ card.setDetails.name }} <span class="font-small">({{ card.setDetails.releaseDate.substring(0, 4) }})</span></p>
          </p>
          <div class="pricing" v-if="card.pricing.firstEditionHolo | card.pricing.unlimitedHolo | card.pricing.nonHolo | card.pricing.reverseHolo | card.pricing.holo">
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
        <a :href="card.tcgplayer" class="store-link" target="_blank">View card on TCGPlayer</a>
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
  // width: 100%;
  margin: 0 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 2rem;
  // justify-content: center;
  // align-items: center;
  
  .card {
    background-color: $light-blue;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    max-height: 15rem;
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
      height: 210px;
      width: 150px;
      
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: .375rem;
      }
      
      .card-details {
        width: 67%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
        line-height: 1.7rem;
        
        .card-name {
          display: flex;
          justify-content: space-between;
          border-bottom: 3px solid $bg-primary;
          // line-height: 1.7rem;
          
        }
        
        // .set-pricing {
          // font-size: inherit;
        // }
        
        .store-link {
          // font-size: $font-small;
          margin-top: auto;
          margin-bottom: 12px;
          color: $bg-primary;
          font-weight: $font-medium;
        
          &:hover {
            color: $shade-grey;
          }
          
          // &:visited {
            //    color: $bg-primary;
            // }
          }
        }
      }
    }
    
    .bold {
      // font-size: 1.25rem;
      font-weight: $font-heavy;
    }
    
    .font-small {
      font-size: $font-small;
    }

    @media screen and (max-width: 1200px) {
      .cards-list-container { 
        grid-template-columns: 1fr;
      }
    }

    @media screen and (max-width: 720px) {
      .cards-list-container {
        margin: 0 1rem;
      }
    }

    @media screen and (max-width: 600px) {
      .cards-list-container {
        .card-details {
          font-size: $font-primary;
        }

        .card {

          .card-image {
            width: 120px;
            height: 164px;
          }

          .card-details {
            line-height: 1.3;
          }
        }
      }
    }

    @media screen and (max-width: 485px) {
      .cards-list-container {
        .card {
          gap: .875rem;
        }

        .card-details, .store-link {
          font-size: $font-mobile;
        }
      }
    }
  </style>
