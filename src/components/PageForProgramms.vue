<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import Filters from "./PageForProgramms_Components/Filters.vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

import { useCounterStore } from '../main.ts'
import {ref, watch} from "vue";

const store = useCounterStore()

const countPages = Math.ceil(store.dataEducationPrograms.arr.length / 10 )
let currentPage = ref(1);

// обновленеи списка программ при клике на новую кнопку пагинации
const currList = ref([...store.dataEducationPrograms.arr].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10)))
console.log(currList)
watch(currentPage, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  currList.value = [...store.dataEducationPrograms.arr].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10))
})


</script>

<template>
  <Banner h1="Поиск программ"/>
  <Filters/>
 <CardEducation v-for="card in currList" :card="card"></CardEducation>
  <v-pagination
      v-model="currentPage"
      :length="countPages"
      rounded="circle"
      :total-visible="5"
      @click="currentPage.value++"
  ></v-pagination>
</template>

<style scoped>


</style>
