<template>
  <button @click="toggleSetList">click to open dropdown</button>
  <ul v-if="setListShow">
    <li v-for="set in setArray" :key="set.id">
      {{ set.id }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import setObject from "../types/setObject";
import { PropType, computed, ref, watch } from "vue";

const props = defineProps({
  setArray: {
    type: Array as PropType<setObject[]>,
    required: true,
  },
});

const setListShow = ref(false);

function toggleSetList(): void {
  setListShow.value = !setListShow.value;
}
</script>

<style lang="scss">
ul {
  list-style: none;
}

li {
  width: 10rem;
  border: 2px solid white;
  color: white;
  margin: 0 0 1rem 2rem;
  text-align: center;
  padding: 0.25rem;
}
</style>
