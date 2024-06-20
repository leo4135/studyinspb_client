<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import CardOrganization from "./PageForOrganizations_Components/CardOrganization.vue";
import {ref, watch} from "vue";
import {useCounterStore} from "../main.ts";
import {storeToRefs} from "pinia";
import FiltresOrganization from "./PageForOrganizations_Components/FiltresOrganization.vue";

const store = useCounterStore()
const {educationTabs, dataOrganizations} = storeToRefs(store);


const currList = ref([]);
let state = ref(true)

async function getData() {
  await fetch('http://studyinspb.ru/api/organizations/?page=1')
      .then(res => res.json())
      .then(data => {
        currList.value = data.filter(item => !Object.hasOwn(item , "count") )
        setTimeout(() => {
          state.value = false;
        }, 1000)
      })
}

getData();


</script>


<template>

  <Banner h1="Организации" p="В Санкт-Петербурге находятся 44 государственные организации высшего образования, а также  профессиональные образовательные организации
и научные организации, реализующие
образовательные программы" typePage="organization"/>

  <FiltresOrganization @sendDataFromInputs="mountDataFromInputs" @resetAllFilters="resetFromFilters"/>
  <div class="preloader" v-if="state">
    <v-progress-circular
        color="primary"
        indeterminate
    ></v-progress-circular>

  </div>
  <CardOrganization v-else v-for="card in currList" :card="card"></CardOrganization>

</template>


<style scoped>

.preloader {
  display: flex;
  justify-content: center;
  margin: 20px;
}


.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}

</style>
