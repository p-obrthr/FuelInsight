<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="app" class="container">
          <h3 class="d-flex justify-content-center">
              Fuel Insight
          </h3>
          <h5 class="d-flex justify-content-center">
              get latest fuel data
          </h5>
          <NavBar></NavBar>
          <RouterView />
  </div>
</template>

<style>
</style>
