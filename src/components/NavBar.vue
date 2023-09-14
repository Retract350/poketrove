<template>
  <nav class="nav">
    <div class="site-name">PokéTrove</div>
    <div class="buttons">
      <p class="button">More</p>
    </div>
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

  height: 5rem;
  background-color: $bg-primary;
  padding: 0 3rem;

  .site-name {
    font-size: $font-large;
    font-weight: $font-heavy;
    color: $color-red;
    text-shadow: 0 0 0.25rem $color-red;
  }

  .buttons {
    @include flex(row);

    color: $light-blue;
    font-size: 1rem;

    .button {
      background-color: $color-purple;
      font-size: 1rem;
      padding: 0.625rem 1.5rem;
      border-radius: $radius-medium;
      margin: 0 1.25rem;
    }
  }
}
</style>
