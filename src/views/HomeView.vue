<template>
  <form @submit.prevent="getCards(isActive, searchTerm)">
    <div @click="toggleSearchBy('card')" :class="{ active: isActive === 1 }">
      Cards
    </div>
    <div @click="toggleSearchBy('set')" :class="{ active: isActive === 2 }">
      Set
    </div>
    <input type="text" v-model="searchTerm" />
    <button>submit</button>
  </form>
  <div class="divider"></div>
  <setsDropdown :setArray="setArray" />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import getCards from "../composables/getCards";
import { getSetsOnLoad, setArray } from "../composables/getSetsOnLoad";
import setsDropdown from "../components/setsDropdown.vue";

const searchTerm = "";

let isActive = ref(1);

const toggleSearchBy = (param: string) => {
  param === "card" ? (isActive.value = 1) : (isActive.value = 2);
};

// Test beforeMount trigger function
onBeforeMount(getSetsOnLoad);
</script>

<style lang="scss">
body {
  height: 110vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;

  div {
    width: 10rem;
    height: 1rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    &.active {
      background-color: pink;
    }
  }

  label {
    color: white;
  }

  input,
  button {
    width: 10rem;
  }
}

.divider {
  width: 100%;
  height: 1rem;
  background-color: white;
  margin: 2rem 0;
}
</style>
