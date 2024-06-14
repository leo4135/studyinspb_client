<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import Filters from "./PageForProgramms_Components/Filters.vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

import {useCounterStore} from '../main.ts'
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";

const store = useCounterStore()
const {educationTabs, dataEducationPrograms} = storeToRefs(store);

let getAllPrograms = ref<any>([]);
let currentPage = ref(1);
const currList = ref([]);
let countPages = ref(1);
let preloaderState = ref(false);


async function getData() {
  await fetch('http://89.23.116.186/api/education_programs')
      .then(res => res.json())
      .then(data => {
        getAllPrograms.value = data;
        dataEducationPrograms.value = data;
        currList.value = [...getAllPrograms.value].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10));
        countPages.value = Math.ceil(data.length / 10);
        setTimeout(() => {
          preloaderState.value = true;
        }, 1500)
      })
}

getData();


watch([currentPage, educationTabs], (prev, next) => {
  prev[1] == next[1] ? false : currentPage.value = 1;

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  currList.value = [...dataEducationPrograms.value].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.type.includes(educationTabs.value));
  currList.value.length == 0 ? countPages.value = 1 : countPages.value = Math.ceil(dataEducationPrograms.value.length / 10) || 1;



}, {deep: true})


// получаем пропс из эмита дочернего класса, проверяем свойства переданного объекта и заново получаем массив с данными с учетом фильтров
const mountDataFromInputs = (val) => {
  console.log(val)
  if (val === undefined || val === null || val === '' || val.title.length < 1 || val.title.length < 1 || val.title.length < 1) {
    currList.value = [...dataEducationPrograms.value].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.type.includes(educationTabs.value));
    currList.value.length == 0 ? countPages.value = 1 : countPages.value = Math.ceil(dataEducationPrograms.value.length / 10) || 1;
  } else {
    currList.value = [...store.dataEducationPrograms].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && (Object.hasOwn(val, 'type') ? item.type.includes(val?.type) : true) && (Object.hasOwn(val, 'title') ? val?.title.find(oneTitle => item.title.includes(oneTitle)) : true));
    // хардкод - переписать количество страниц по результату поиска
    countPages.value = 1
  }
}

const resetFromFilters = () => currList.value = [...store.dataEducationPrograms].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.type.includes(educationTabs.value));


</script>


<template>

  <Banner h1="ПОИСК ПРОГРАММ" p="высшего, среднего профессионального
и дополнительного образования" typePage="education"/>
  <Filters @sendDataFromInputs="mountDataFromInputs" />
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
