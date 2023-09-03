<template>
  <ul>
    <li v-for="set in props.setArray">{{ set.name }}</li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps(["setArray"]);

console.log(props.setArray);
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
