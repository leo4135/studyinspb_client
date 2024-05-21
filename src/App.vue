<script setup lang="ts">


import Header from "./components/MainPage_Components/Header.vue";
import Footer from "./components/MainPage_Components/Footer.vue";

</script>

<template>
  <Header/>
  <main>
    <RouterView />
  </main>
  <Footer/>
</template>

<style scoped>

</style>
