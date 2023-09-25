<template>
  <loadingSpinner v-if="isPending" />
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
    <p class="error" v-if="searchError && activeSearchBy === 'Cards'">
      Searches may not contain special characters or spaces
    </p>
  </div>
  <cardsList :cards-arr="cardsArr" v-if="cardsArr.length" />
  <div class="no-results-container" v-if="searchSubmitted && !cardsArr.length">
    <p class="no-results">
      0 results found...<br />
      Please check spelling and try again
    </p>
  </div>
</template>

<script lang="ts" setup>
import { getCards } from "../composables/getCards";
import { Ref, computed, onBeforeMount, ref } from "vue";
import { getSetsOnLoad, setArray } from "@/composables/getSetsOnLoad";
import cardsList from "./cardsList.vue";
import loadingSpinner from "./loadingSpinner.vue";

const searchByCard = ref(true);

const viewSearchByDropdown = ref(false);

const searchTerm = ref("");

const activeSearchBy = ref("Cards");

const altSearchBy = ref("Sets");

const selectedSet = ref("");

const cardsArr: Ref<Array<any>> = ref([]);

const viewSetsDropdown = ref(false);

const isPending = ref(false);

const searchSubmitted = ref(false);

// Check if user search input contains special characters or spaces
const regex = /\W|\d|\_/;
const searchError = computed((): Boolean => {
  if (regex.test(searchTerm.value)) return true;
  return false;
});

// Toggle "Search By" dropdown
function toggleSearchByDropdown(): void {
  viewSearchByDropdown.value = !viewSearchByDropdown.value;
}

// Toggle search parameter between "Cards" and "Sets"
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

  // Close dropdown when an option is selected
  viewSearchByDropdown.value = false;
}

// Submit search function
async function submitSearch() {
  if (searchError.value && activeSearchBy.value === "Cards") return;

  isPending.value = !isPending.value;
  if (activeSearchBy.value === "Cards") {
    cardsArr.value = await getCards(searchByCard.value, searchTerm.value);
  } else {
    cardsArr.value = await getCards(searchByCard.value, selectedSet.value);
  }

  // Reset search input on submission
  searchTerm.value = "";
  isPending.value = !isPending.value;
  searchSubmitted.value = true;
}

// Toggle searchable Sets dropdown
function toggleSetsDropdown(): void {
  // Check if user is searching by set name
  if (searchByCard.value === false) {
    viewSetsDropdown.value = true;
  } else {
    viewSetsDropdown.value = false;
  }
  // Close "Search by" dropdown if it was open
  viewSearchByDropdown.value = false;
}

// Update search input when a set object is selected from the dropdown
function selectSet(set: any): void {
  selectedSet.value = set.id;
  searchTerm.value = set.name;

  // Close dropdown after selecting a set
  viewSetsDropdown.value = false;
}

// Logic for searchable Sets dropdown
function searchDropdown(set: any): Boolean {
  // Format set names in dropdown for searchability
  let setString = (
    set.name +
    "(" +
    set.releaseDate.substring(0, 4) +
    ")"
  ).toLowerCase();

  // Check if user input matches any substring in a set name
  if (setString.includes(searchTerm.value.toLowerCase())) {
    return true;
  }

  return false;
}

// Start fetch request to get array of all set objects before page mounts
onBeforeMount(getSetsOnLoad);
</script>

<style lang="scss">
@import "../assets/mixins.scss";
@import "../assets/variables.scss";

.search-container {
  width: 33rem;
  border-radius: $radius-medium;
  display: flex;
  flex-direction: column;
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

.error {
  font-size: $font-primary;
  color: $color-red;
  display: inline-block;
  margin: 1.5rem 0.5rem 0 0;
  align-self: flex-end;
}

.no-results-container {
  width: 33rem;
  text-align: center;

  .no-results {
    color: $shade-light-grey;
    font-weight: $font-medium;
    font-size: $font-primary;
    line-height: 1.7;
  }
}

@media screen and (max-width: 600px) {
  .search-container {
    width: 26rem;
  }

  .search-inputs {
    grid-template-columns: 25% 2px 75%;
  }

  .no-results-container {
    width: 26rem;
  }
}

@media screen and (max-width: 485px) {
  .search-container {
    width: 20rem;
  }

  .search-inputs {
    grid-template-columns: 30% 2px 70%;
  }

  .error {
    font-size: $font-small;
    font-weight: $font-medium;
    line-height: 1.4;
  }

  .no-results-container {
    width: 20rem;
  }
}
</style>
