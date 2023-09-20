<template>
  <div class="loading-overlay">
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="loading">Loading...</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/variables.scss";

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-overlay {
  height: 100vh;
  width: 100vw;
  background-color: $loading-grey;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner-container {
    height: 10rem;
    width: 10rem;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .spinner {
      height: 6rem;
      width: 6rem;
      border-radius: 50%;
      border: 4px solid $loading-grey;
      border-top: 4px solid $light-blue;
      animation: spinner 1s ease-in-out infinite;
    }

    .loading {
      color: $shade-white;
      font-size: $font-primary;
    }
  }
}
</style>
