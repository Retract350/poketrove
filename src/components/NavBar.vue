<template>
  <nav class="nav">
    <a class="site-name" href="#">PokéTrove</a>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
@import "../assets/mixins.scss";

.nav {
  @include flex(row);
  @include flex-align(center, space-between);
  @include shadow(1rem, $color-blue);

  background-color: $bg-primary;
  padding: 1rem 1rem;
  width: 100vw;
  z-index: 15;
  position: fixed;
  top: 0;

  .site-name {
    font-size: $font-large;
    font-weight: $font-heavy;
    color: $color-red;
    text-shadow: 0 0 0.25rem $color-red;
    text-decoration: none;
  }
}
</style>
