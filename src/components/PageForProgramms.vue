<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import Filters from "./PageForProgramms_Components/Filters.vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

import {useCounterStore} from '../main.ts'
import {computed, ref, watch} from "vue";
import {storeToRefs} from "pinia";


const store = useCounterStore()
const { educationTabs } = storeToRefs(store);

const currList = ref([]);

let state = ref(true)

watch(educationTabs, (val) => {
  state.value = true;
  val == "Основное" ? getData("main") : getData("dpo")
})

async function getData(type) {
  await fetch(`http://studyinspb.ru/api/education_programs/?page=1&type=${type}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector(".page").innerHTML = 1;
        currList.value = data.filter(item => !Object.hasOwn(item, "count") && educationTabs.value.includes(item.type));
        console.log(currList.value);
        data.forEach(counter => {
          Object.hasOwn(counter, 'count') ? document.querySelector('.countPage').innerHTML = Math.ceil(counter.count / 10) : false
        })
        setTimeout(() => {
          state.value = false;
        }, 1000)
      })
}

getData("main");


function getNextPage() {
  let cur = parseInt(document.querySelector(".page").innerHTML)
  const type = educationTabs.value == "Основное" ? "main" : "dpo"
  cur++
  document.querySelector(".page").innerHTML = cur
  fetch('http://studyinspb.ru/api/education_programs?page=' + cur + '&type=' + type)
      .then(res => res.json())
      .then(data => {
        currList.value = data.filter(item => !Object.hasOwn(item, "count"));
        document.querySelector('.countPage').innerHTML = data.length;
        data.forEach(counter => {
          Object.hasOwn(counter, 'count') ? document.querySelector('.countPage').innerHTML = Math.ceil(counter.count / 10) : false
        })
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

        }, 100)
      })
}

function getPrevPage() {
  const type = educationTabs.value == "Основное" ? "main" : "dpo"
  let cur = parseInt(document.querySelector(".page").innerHTML);
  if (cur > 1) {
    cur--
    document.querySelector(".page").innerHTML = cur
    fetch('http://studyinspb.ru/api/education_programs?page=' + cur  + '&type=' + type)
        .then(res => res.json())
        .then(data => {
          currList.value = data.filter(item => !Object.hasOwn(item, "count"));
          document.querySelector('.countPage').innerHTML = data.length;
          data.forEach(counter => {
            Object.hasOwn(counter, 'count') ? document.querySelector('.countPage').innerHTML = Math.ceil(counter.count / 10) : false
          })
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });

          }, 100)
        })
  }
}

let mountDataFromInputs = (some) => {
  console.log(some)
}

</script>


<template>

  <Banner h1="ПОИСК ПРОГРАММ" p="высшего, среднего профессионального
и дополнительного образования" typePage="education"/>
  <Filters @sendDataFromInputs="mountDataFromInputs"/>
  <div class="preloader" v-if="state">
    <v-progress-circular
        color="primary"
        indeterminate
    ></v-progress-circular>

  </div>
  <CardEducation v-else v-for="(card, index) in currList" :card="card" :key="index"></CardEducation>

  <div class="pagination">
    <button @click="getPrevPage" style="transform: rotateY(180deg);
  display: flex;
  align-items: center;
">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.4372 9.43258C14.1396 9.73026 14.1396 10.214 14.4372 10.5117L23.9442 20L14.4372 29.507C14.1396 29.8047 14.1396 30.2884 14.4372 30.5861C14.7349 30.8837 15.2186 30.8837 15.5163 30.5861L25.5442 20.5582C25.6931 20.4093 25.7675 20.2233 25.7675 20.0186C25.7675 19.8326 25.6931 19.6279 25.5442 19.4791L15.5163 9.45119C15.2186 9.13491 14.7349 9.1349 14.4372 9.43258Z"
            fill="#071937"/>
      </svg>
    </button>
    <div class="page">1</div>
    <div>/</div>
    <div class="countPage"></div>
    <button @click="getNextPage" style="
  display: flex;
  align-items: center;
">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.4372 9.43258C14.1396 9.73026 14.1396 10.214 14.4372 10.5117L23.9442 20L14.4372 29.507C14.1396 29.8047 14.1396 30.2884 14.4372 30.5861C14.7349 30.8837 15.2186 30.8837 15.5163 30.5861L25.5442 20.5582C25.6931 20.4093 25.7675 20.2233 25.7675 20.0186C25.7675 19.8326 25.6931 19.6279 25.5442 19.4791L15.5163 9.45119C15.2186 9.13491 14.7349 9.1349 14.4372 9.43258Z"
            fill="#071937"/>
      </svg>

    </button>
  </div>


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
