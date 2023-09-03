<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import NavBar from "./components/NavBar.vue";
</script>

<style lang="scss"></style>
