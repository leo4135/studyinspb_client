<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import CardOrganization from "./PageForOrganizations_Components/CardOrganization.vue";
import {ref, watch} from "vue";
import {useCounterStore} from "../main.ts";
import {storeToRefs} from "pinia";
import FiltresOrganization from "./PageForOrganizations_Components/FiltresOrganization.vue";

const store = useCounterStore()
const { educationTabs, dataOrganizations } = storeToRefs(store);



let getAllOrganizations = ref<any>([]);
let currentPage = ref(1);
const currList = ref([]);
let countPages = ref(1);
let preloaderState = ref(false);


async function getData() {
  await fetch('http://89.23.116.186/api/organizations')
      .then(res => res.json())
      .then(data => {
        getAllOrganizations.value = data;
        dataOrganizations.value = data;
            currList.value = [...getAllOrganizations.value].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10));
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
    console.log(educationTabs);
    currList.value = [...store.dataOrganizations].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.type.includes(educationTabs.value));
    console.log(store.dataOrganizations);

}, { deep: true })


// получаем пропс из эмита дочернего класса, проверяем свойства переданного объекта и заново получаем массив с данными с учетом фильтров
const mountDataFromInputs = (val) => {
  currList.value = [...store.dataOrganizations].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && (Object.hasOwn(val, 'type') ? item.type.includes(val?.type) : true) && (Object.hasOwn(val, 'title') ? item.fullTitle.includes(val?.title) : true));
}

const resetFromFilters = () => currList.value = [...store.dataOrganizations].filter((item, index) => (index >= (currentPage.value - 1) * 10) && index < (currentPage.value * 10) && item.type.includes(educationTabs.value));


</script>


<template>

  <Banner h1="Организации" p="В Санкт-Петербурге находятся 44 государственные организации высшего образования, а также  профессиональные образовательные организации
и научные организации, реализующие
образовательные программы" typePage="organization"/>
  <FiltresOrganization @sendDataFromInputs="mountDataFromInputs" @resetAllFilters="resetFromFilters" />
  <div v-if="!preloaderState" class="preloader">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
  <CardOrganization v-else v-for="card in currList" :card="card"></CardOrganization>
  <v-pagination
      v-model="currentPage"
      :length="countPages"
      rounded="circle"
      :total-visible="5"
      @click="currentPage.value++"
  ></v-pagination>


</template>


<style scoped>

.preloader {
  display: flex;
  justify-content: center;
  margin: 20px;
}

</style>
