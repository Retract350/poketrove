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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import getCards from "../composables/getCards";

const searchTerm = "";

let isActive = ref(1);

const toggleSearchBy = (param: string) => {
  param === "card" ? (isActive.value = 1) : (isActive.value = 2);
};
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
</style>
