<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import TextComponentAfterBanner from "./MainPage_Components/TextComponentAfterBanner.vue";
import Slider from "./MainPage_Components/Slider.vue";
import News from "./MainPage_Components/News.vue";
import Blogs from "./MainPage_Components/Blogs.vue";



</script>

<template>
  <Banner h1="ПРИВЕТ!" p="ЗДЕСЬ МОЖНО НАЙТИ ЛУЧШИЕ
            ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ В ВУЗАХ
            И КОЛЛЕДЖАХ В САНКТ-ПЕТЕРБУРГЕ" typePage="main" />
  <TextComponentAfterBanner/>
  <Slider/>
  <Blogs/>
</template>

<style scoped>

</style>
