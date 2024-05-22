<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import Filters from "./PageForProgramms_Components/Filters.vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

import { useCounterStore } from '../main.ts'

const store = useCounterStore()

</script>

<template>
  <Banner h1="Поиск программ"/>
  <Filters/>
 <CardEducation v-for="card in store.count.arr" :card="card"></CardEducation>
</template>

<style scoped>


</style>
