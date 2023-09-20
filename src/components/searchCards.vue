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

        <!-- Search term input/icon -->
        <div class="input-flex">
          <input
            type="text"
            class="search-input"
            :placeholder="activeSearchBy.slice(0, -1) + ' Name'"
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

        <!-- "Search By" dropdown -->
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
  <cardsList :cards-arr="cardsArr" />
</template>

<script lang="ts" setup>
import setObject from "../types/setObject";
import { getCards } from "../composables/getCards";
import { PropType, Ref, computed, onBeforeMount, ref, watch } from "vue";
import { getSetsOnLoad, setArray } from "@/composables/getSetsOnLoad";
import cardsList from "./cardsList.vue";

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

  searchTerm.value = "";
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
  border-radius: $radius-medium;
}

.search-inputs {
  display: grid;
  grid-template-columns: 20% 2px 80%;
  width: 100%;
  height: 2rem;
  background-color: $shade-light-grey;
  border-radius: $radius-medium;

  &.cornerLeft {
    border-bottom-left-radius: 0;
  }

  .search-by {
    display: flex;
    align-items: center;
    height: 100%;
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
  height: 2rem;
  background-color: $shade-light-grey;
  font-size: $font-small;
  border-radius: 0 0 $radius-medium $radius-medium;
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
  background-color: $shade-light-grey;
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

@media screen and (max-width: 600px) {
  .search-container {
    width: 26rem;
  }

  .search-inputs {
    grid-template-columns: 25% 2px 75%;
  }
}

@media screen and (max-width: 485px) {
  .search-container {
    width: 20rem;
  }

  .search-inputs {
    grid-template-columns: 30% 2px 70%;
  }
}
</style>
