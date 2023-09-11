<template>
  <div class="search-container">
    <form @submit.prevent="submitSearch">
      <div class="search-inputs" :class="{ cornerLeft: viewSearchByDropdown }">
        <!-- "Search By" element, default to Cards on load -->
        <a class="search-by" @click="toggleSearchByDropdown">
          {{ activeSearchBy }}
          <img
            src="../assets/chevron-down-outline.svg"
            alt="Toggle dropdown menu"
            :class="{ flip: viewSearchByDropdown }"
            class="svg"
          />
        </a>

        <div class="column-border"></div>

        <!-- Search by cards text area -->
        <div class="input-flex">
          <input
            type="text"
            class="search-input"
            placeholder="Search..."
            :class="{ cornerRight: viewSetsDropdown }"
            v-model="searchTerm"
            @focus="toggleSetsDropdown"
            @blur="viewSetsDropdown = false"
          />
          <img
            src="../assets/search-outline.svg"
            alt="Search icon"
            class="search-icon"
            @click="submitSearch"
          />
        </div>

        <!-- Add both "Search By" and "Search Sets" dropdowns -->
        <!-- Change "Search By" dropdown -->
        <div
          class="search-by-dropdown"
          :class="{ hidden: !viewSearchByDropdown }"
          @click="toggleSearchBy(searchByCard === true ? 'set' : 'card')"
        >
          <a class="search-by">{{ altSearchBy }} </a>
        </div>
        <div class="column-border"></div>

        <!-- Searchable Sets dropdown -->
        <div v-if="viewSetsDropdown" class="sets-dropdown">
          <ul>
            <li
              v-for="set in setArray"
              :key="set.id"
              @mousedown="selectSet(set)"
              v-show="searchDropdown(set)"
            >
              {{ set.name }} ({{ set.releaseDate.substring(0, 4) }})
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
  <cardsList :test-cards-arr="cardsArr" />
</template>

<script lang="ts" setup>
import setObject from "../types/setObject";
import { getCards } from "../composables/getCards";
import { PropType, Ref, computed, onBeforeMount, ref, watch } from "vue";
import { getSetsOnLoad, setArray } from "@/composables/getSetsOnLoad";
import cardsList from "./cardsList.vue";

// const props = defineProps({
//   setArray: {
//     type: Array as PropType<setObject[]>,
//     required: true,
//   },
// });

const searchByCard = ref(true);

const viewSearchByDropdown = ref(false);

const searchTerm = ref("");

const activeSearchBy = ref("Cards");

const altSearchBy = ref("Sets");

const selectedSet = ref("");

const cardsArr: Ref<Array<any>> = ref([]);

function toggleSearchByDropdown(): void {
  viewSearchByDropdown.value = !viewSearchByDropdown.value;
}

function toggleSearchBy(param: string): void {
  if (param === "card") {
    searchByCard.value = true;
    activeSearchBy.value = "Cards";
    altSearchBy.value = "Sets";

    // Close sets dropdown if it is open
    viewSetsDropdown.value = false;
  } else {
    searchByCard.value = false;
    activeSearchBy.value = "Sets";
    altSearchBy.value = "Cards";
  }

  viewSearchByDropdown.value = false;
}

async function submitSearch() {
  console.log(searchTerm.value);

  if (activeSearchBy.value === "Cards") {
    cardsArr.value = await getCards(searchByCard.value, searchTerm.value);
  } else {
    cardsArr.value = await getCards(searchByCard.value, selectedSet.value);
  }
}

const viewSetsDropdown = ref(false);

function toggleSetsDropdown(): void {
  if (searchByCard.value === false) {
    viewSetsDropdown.value = true;
  } else {
    viewSetsDropdown.value = false;
  }
  viewSearchByDropdown.value = false;
}

function selectSet(set: any): void {
  selectedSet.value = set.id;
  searchTerm.value = set.name;

  viewSetsDropdown.value = false;
}

function searchDropdown(set: any): Boolean {
  let setString = (
    set.name +
    "(" +
    set.releaseDate.substring(0, 4) +
    ")"
  ).toLowerCase();

  if (setString.includes(searchTerm.value.toLowerCase())) {
    return true;
  }

  return false;
}

onBeforeMount(getSetsOnLoad);
</script>

<style lang="scss">
@import "../assets/mixins.scss";
@import "../assets/variables.scss";

.search-container {
  width: 33rem;
  // display: flex;
  // flex-direction: column;
}

.search-inputs {
  display: grid;
  grid-template-columns: 20% 0.125rem 80%;
  width: 100%;
  height: 2rem;
  background-color: $shade-white;
  // padding: 0 1rem;
  border-radius: $radius-medium;

  &.cornerLeft {
    border-bottom-left-radius: 0;
  }

  .search-by {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    height: 100%;
    // border-right: 2px solid $bg-primary;
    font-size: $font-small;
    padding-left: 1rem;

    img {
      height: 1rem;
      padding-left: 0.25rem;
    }
  }

  .search-input {
    height: 2rem;
    width: 85%;
    background-color: inherit;
    border: none;
    font-size: $font-primary;
    font-family: "Martian Mono";
    padding-left: 1rem;
    border-radius: $radius-medium;

    &.cornerRight {
      border-bottom-right-radius: 0;
    }

    &:focus-visible {
      outline: none;
    }
  }
}

.search-by-dropdown {
  // width: 22%;
  height: 2rem;
  background-color: $shade-white;
  // display: flex;
  // align-items: center;
  // padding: 1rem;
  font-size: $font-small;
  border-radius: 0 0 $radius-medium $radius-medium;
  // border-right: 2px solid $bg-primary;
  border-top: 1px solid $shade-grey;
}

.flip {
  transform: rotateX(180deg);
}

.column-border {
  background-color: $bg-primary;
}

.hidden {
  visibility: hidden;
}

.sets-dropdown {
  background-color: $shade-white;
  height: 13rem;
  width: 97%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom-left-radius: $radius-medium;
  border-bottom-right-radius: $radius-medium;
  border-top: 1px solid $shade-grey;
  z-index: 5;

  li {
    list-style: none;
    min-height: 2rem;
    padding: 0.5rem 0 0.5rem 0.5rem;
    border-bottom: 1px solid $shade-grey;

    &:hover {
      background-color: $shade-light-grey;
      cursor: pointer;
    }
  }
}

.search-icon {
  height: 1.25rem;
  padding: 0 0.75rem 0 0.5rem;
  border-left: 1px solid $shade-grey;

  &:hover {
    cursor: pointer;
  }
}

.input-flex {
  @include flex(row);

  align-items: center;
  justify-content: space-between;
}
</style>
