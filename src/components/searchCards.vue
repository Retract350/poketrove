<template>
  <!-- <button @click="toggleSetList">click to open dropdown</button>
  <ul v-if="setListShow">
    <li v-for="set in setArray" :key="set.id">
      {{ set.name }}
    </li>
  </ul> -->
  <!-- <form @submit.prevent="getCards(searchByCard, searchTerm)">
    <div
      @click="toggleSearchBy('card')"
      :class="{ active: searchByCard === 1 }"
    >
      Cards
    </div>
    <div @click="toggleSearchBy('set')" :class="{ active: searchByCard === 2 }">
      Set
    </div>
    <input type="text" v-model="searchTerm" />
    <button>submit</button>
  </form>
  <div class="divider"></div> -->

  <div class="search-container">
    <form @submit.prevent="submitSearch">
      <div class="search-inputs" :class="{ corner: viewSearchByDropdown }">
        <!-- "Search By" element, default to Cards on load -->
        <a class="search-by" @click="toggleSearchByDropdown">
          {{ activeSearchBy }}
          <svg
            :class="{ flip: viewSearchByDropdown }"
            width="24px"
            height="24px"
            stroke-width="1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="#000000"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </a>

        <!-- Search by cards text area -->
        <input type="text" class="search-input" placeholder="Search..." />
      </div>

      <!-- Change "Search By" dropdown -->
      <div
        class="search-by-dropdown"
        v-if="viewSearchByDropdown"
        @click="toggleSearchBy(searchByCard === true ? 'set' : 'card')"
      >
        <a class="search-by">{{ altSearchBy }} </a>
      </div>

      <!-- Searchable Sets dropdown -->
      <div v-if="viewSetsDropdown">
        <ul>
          <li v-for="set in setArray" style="color: white">{{ set.name }}</li>
        </ul>
      </div>
    </form>
  </div>

  <button @click="toggleSetsDropdown" v-if="true">view sets</button>
</template>

<script lang="ts" setup>
import setObject from "../types/setObject";
import getCards from "../composables/getCards";
import { PropType, computed, onBeforeMount, ref, watch } from "vue";
import { getSetsOnLoad } from "@/composables/getSetsOnLoad";

const props = defineProps({
  setArray: {
    type: Array as PropType<setObject[]>,
    required: true,
  },
});

const searchByCard = ref(true);

const viewSearchByDropdown = ref(false);

const searchTerm = "";

const activeSearchBy = ref("Cards");

const altSearchBy = ref("Sets");

function toggleSearchByDropdown(): void {
  viewSearchByDropdown.value = !viewSearchByDropdown.value;
}

function toggleSearchBy(param: string): void {
  if (param === "card") {
    searchByCard.value = true;
    activeSearchBy.value = "Cards";
    altSearchBy.value = "Sets";

    console.log("searching by " + activeSearchBy.value);
  } else {
    searchByCard.value = false;
    activeSearchBy.value = "Sets";
    altSearchBy.value = "Cards";

    console.log("searching by " + activeSearchBy.value);
  }

  viewSearchByDropdown.value = false;
}

function submitSearch() {
  console.log("searching");
}

const viewSetsDropdown = ref(false);

function toggleSetsDropdown(): void {
  viewSetsDropdown.value = !viewSetsDropdown.value;
}

onBeforeMount(getSetsOnLoad);
</script>

<style lang="scss">
@import "../assets/mixins.scss";
@import "../assets/variables.scss";

.search-container {
  width: 30rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
}

.search-inputs {
  display: flex;
  height: 2rem;
  background-color: $shade-white;
  padding: 0 1rem;
  border-radius: $radius-medium;

  &.corner {
    border-bottom-left-radius: 0;
  }

  .search-by {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 20%;
    border-right: 2px solid $bg-primary;
    font-size: $font-small;
    padding-right: 0.75rem;

    svg {
      padding-left: 0.25rem;
    }
  }

  .search-input {
    height: 2rem;
    width: 65%;
    background-color: inherit;
    border: none;
    font-size: $font-primary;
    font-family: "Martian Mono";
    padding-left: 1rem;

    &:focus-visible {
      outline: none;
    }
  }
}

.search-by-dropdown {
  width: 22%;
  height: 2rem;
  background-color: $shade-white;
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: $font-small;
  border-radius: 0 0 $radius-medium $radius-medium;
  border-right: 2px solid $bg-primary;
  border-top: 1px solid $shade-grey;
}

.flip {
  transform: rotateX(180deg);
}
</style>
