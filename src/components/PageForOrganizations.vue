<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import CardOrganization from "./PageForOrganizations_Components/CardOrganization.vue";
import {onMounted, onUpdated, ref, watch} from "vue";
import {useCounterStore} from "../main.ts";
import {storeToRefs} from "pinia";
import FiltresOrganization from "./PageForOrganizations_Components/FiltresOrganization.vue";

const store = useCounterStore()
const {educationTabs} = storeToRefs(store);
const { updatedForHeaderInFooter } = storeToRefs(store);
updatedForHeaderInFooter.value = "upd_org"
const url = import.meta.env.VITE_API_URL;

const currList = ref([]);
let state = ref(true)
let filtres = ref({});

educationTabs.value = "государственные вузы";
watch(educationTabs, () => {
  state.value = true;
  educationTabs.value == "государственные вузы" ? getData("university") : getData("college");
})


async function getData(type) {
  await fetch(url +`api/organizations/?page=1&type=${type}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector(".page").innerHTML = 1;
        currList.value = data.filter(item => !Object.hasOwn(item, "count") && educationTabs.value.includes(item.type));
        data.forEach(counter => {
          Object.hasOwn(counter, 'count') ? document.querySelector('.countPage').innerHTML = Math.ceil(counter.count / 10) : false
        })
        setTimeout(() => {
          state.value = false;
        }, 1000)
      })
}

getData("university");

let mountDataFromInputs = async (filters) => {
  console.log(filters)
  educationTabs.value == "государственные вузы" ? filters.type = "university" : filters.type = "college";
  filters.page = 1;
  document.querySelector(".page").innerHTML = 1;
  filtres = filters
  await fetch(url + 'api/organizations', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(filters)
  }).then(res => res.json())
      .then(data => {
        currList.value = data.filter(item => !Object.hasOwn(item, "count"));
        console.log(data)
        setTimeout(() => {
          data.forEach(counter => {
            Object.hasOwn(counter, 'count') ? document.querySelector('.countPage').innerHTML = Math.ceil(counter.count / 10) : false
          })
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 100)
      })
}

function getNextPage() {
  let cur = parseInt(document.querySelector(".page").innerHTML);
  let type = educationTabs.value == "государственные вузы" ? "university" : "college";
  if (cur < document.querySelector('.countPage').innerHTML) {
  cur++
  document.querySelector(".page").innerHTML = cur
  fetch(url + 'api/organizations?page=' + cur + '&type=' + type)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
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

function getPrevPage() {
  let type = educationTabs.value == "государственные вузы" ? "university" : "college";
  let cur = parseInt(document.querySelector(".page").innerHTML);
  if (cur > 1) {
    cur--
    document.querySelector(".page").innerHTML = cur
    fetch(url + 'api/organizations?page=' + cur  + '&type=' + type)
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

function resetFromFilters() {
  state.value = true;
  educationTabs.value == "государственные вузы" ? getData("university") : getData("college");
}

setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}, 100)

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
  
 
  <CardOrganization v-else v-for="card in currList" :card="card" :key="card.id"></CardOrganization>

  <div v-if="Object.keys(filtres).length < 1" class="pagination">
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

  <div v-else class="pagination">
    <button @click="getPrevPageFilt" style="transform: rotateY(180deg);
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
    <button @click="getNextPageFilt" style="
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
