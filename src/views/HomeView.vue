<template>
  <searchCards :setArray="setArray" />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import getCards from "../composables/getCards";
import { getSetsOnLoad, setArray } from "../composables/getSetsOnLoad";
import searchCards from "../components/searchCards.vue";

const searchTerm = "";

let isActive = ref(1);

// const toggleSearchBy = (param: string) => {
//   param === "card" ? (isActive.value = 1) : (isActive.value = 2);
// };

// Test beforeMount trigger function
onBeforeMount(getSetsOnLoad);
</script>

<style lang="scss">
body {
  height: 110vh;
}
</style>
