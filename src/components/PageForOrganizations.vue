<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import Filters from "./PageForProgramms_Components/Filters.vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

import { useCounterStore } from '../main.ts'
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";
import CardOrganization from "./PageForOrganizations_Components/CardOrganization.vue";

const store = useCounterStore()
const { educationTabs, filtres } = storeToRefs(store)
let currentPage = ref(1);

// обновленеи списка программ при клике на новую кнопку пагинации
const currList = ref([...store.dataEducationPrograms.arr].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.educationLevel.title.includes(educationTabs.value)))
console.log(currList)
const countPages = ref(Math.ceil(store.dataEducationPrograms.arr.length / 10 ))
watch([currentPage, educationTabs, filtres], (prev, next) => {
  prev[1] == next[1] ? false : currentPage.value = 1;

  if (filtres.value.length > 0) {

    currList.value = [...store.dataEducationPrograms.arr].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.educationLevel.title.includes(educationTabs.value) && filtres.value.filter((cur) => cur == item.title).length > 0 )


  } else {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    console.log(educationTabs)
    currList.value = [...store.dataEducationPrograms.arr].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.educationLevel.title.includes(educationTabs.value))
    console.log(currList)
  }
}, { deep: true })



</script>


<template>

  <Banner h1="ПОИСК ПРОГРАММ" p="высшего, среднего профессионального
и дополнительного образования" typePage="organization"/>
  <Filters/>
  <CardOrganization v-for="card in currList" :card="card"></CardOrganization>
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
