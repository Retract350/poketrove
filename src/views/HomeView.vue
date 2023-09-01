<template>
  <button @click="getCards('cards', 'piplup')">Click me</button>
</template>

<script lang="ts" setup>
import getCards from "../composables/getCards";
</script>

<style lang="scss">
body {
  height: 110vh;
}
</style>
