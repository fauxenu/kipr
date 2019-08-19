<template>
  <div id="landing-page">
    <div class="jumbotron text-white">
      <h1 class="text-uppercase">{{ 'brand.name' | dictionary }}</h1>
      <p>{{ 'brand.motto' | dictionary }}</p>
      <router-link class="btn btn-block btn-light" :to="{ name: 'signup' }">
        Sign Up
      </router-link>
      <router-link class="btn btn-block btn-outline-light" :to="{ name: 'login' }">
        Login
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/variables';

#landing-page {
  background-color: $purple;
  padding-top: 20vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.jumbotron {
  background-color: transparent;
  text-align: center;

  h1 {
    text-transform: uppercase;
  }
}
</style>
