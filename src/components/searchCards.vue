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

  <!-- TEST BUTTON FOR SET DROPDOWN -->
  <button @click="toggleSetsDropdown">view sets</button>

  <div class="search-container">
    <form @submit.prevent="submitSearch">
      <div class="search-inputs" :class="{ cornerLeft: viewSearchByDropdown }">
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

        <div class="column-border"></div>

        <!-- Search by cards text area -->
        <input
          type="text"
          class="search-input"
          placeholder="Search..."
          :class="{ cornerRight: viewSetsDropdown }"
          v-model="searchTerm"
          @click="toggleSetsDropdown"
        />

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
            <li v-for="set in setArray" :key="set.id">
              {{ set.name }} ({{ set.releaseDate.substring(0, 4) }})
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
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

const searchTerm = ref("");

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

    // Close sets dropdown if it is open
    viewSetsDropdown.value = false;

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
  console.log(searchTerm.value);
}

const viewSetsDropdown = ref(false);

function toggleSetsDropdown(): void {
  if (searchByCard.value === false) {
    viewSetsDropdown.value = !viewSetsDropdown.value;
  } else {
    return;
  }
}

onBeforeMount(getSetsOnLoad);
</script>

<style lang="scss">
@import "../assets/mixins.scss";
@import "../assets/variables.scss";

.search-container {
  width: 33rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
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

    svg {
      padding-left: 0.25rem;
    }
  }

  .search-input {
    height: 2rem;
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
  overflow-x: hidden;
  overflow-y: scroll;
  height: 13rem;
  border-bottom-left-radius: $radius-medium;
  border-bottom-right-radius: $radius-medium;
  border-top: 1px solid $shade-grey;

  ul {
    // padding: 0.25rem 0 0.25rem 0.5rem;
  }

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
</style>
