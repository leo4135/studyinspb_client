<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import {useCounterStore} from '../main.ts'
import {storeToRefs} from "pinia";
import {ref} from "vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

const store = useCounterStore();
const {calculatorEGE} = storeToRefs(store);
const url = import.meta.env.VITE_API_URL;
let filtredOrNo = ref(false)
let state = ref(true);
let currList = ref([]);
let validatedPrograms = ref([]);
let filtres = ref({});


store.$subscribe(() => {
  console.log(store.calculatorEGE)
  getFiltred(store.calculatorEGE)
  // getPrograms(currentCard?.value)
})

async function getFiltred(ege) {
  filtredOrNo.value = true;
  const type = "main";
  // хранение ссылки вместо полного клонировая приведет к постоянной мутации исходного объекта, реакции наблюдателя и повторного вызова функции, что может привести к переполнению стека
  const req = {};
  req.ege = Object.assign({}, ege.value);
  req.type = type;
  let cur = parseInt(document.querySelector(".page").innerHTML);
  req.page = cur;

  console.log(JSON.stringify(req))
  await fetch(url + 'api/education_programs/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(req)
  }).then(res => res.json())
      .then(data => {
        console.log(data)
        currList.value = data.filter(item => !Object.hasOwn(item, "count") && "Основное".includes(item.type));
        validatedPrograms.value = currList.value;
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

async function getPrevPageFilt(ege) {
  const type = "main";
  // хранение ссылки вместо полного клонировая приведет к постоянной мутации исходного объекта, реакции наблюдателя и повторного вызова функции, что может привести к переполнению стека
  const req = {};
  req.ege = Object.assign({}, ege.value);
  req.type = type;
  let cur = parseInt(document.querySelector(".page").innerHTML);
  cur--
  document.querySelector(".page").innerHTML = cur;
  req.page = cur;

  console.log(JSON.stringify(req))
  await fetch(url + 'api/education_programs/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(req)
  }).then(res => res.json())
      .then(data => {
        console.log(data)
        currList.value = data.filter(item => !Object.hasOwn(item, "count") && "Основное".includes(item.type));
        validatedPrograms.value = currList.value;
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

async function getNextPageFilt(ege) {
  const type = "main";
  // хранение ссылки вместо полного клонировая приведет к постоянной мутации исходного объекта, реакции наблюдателя и повторного вызова функции, что может привести к переполнению стека
  const req = {};
  req.ege = Object.assign({}, ege.value);
  req.type = type;
  let cur = parseInt(document.querySelector(".page").innerHTML);
  cur++
  document.querySelector(".page").innerHTML = cur;
  req.page = cur;

  console.log(JSON.stringify(req))
  await fetch(url + 'api/education_programs/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(req)
  }).then(res => res.json())
      .then(data => {
        console.log(data)
        currList.value = data.filter(item => !Object.hasOwn(item, "count") && "Основное".includes(item.type));
        validatedPrograms.value = currList.value;
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


async function getData(type) {
  await fetch(url + `api/education_programs/?page=1&type=${type}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector(".page").innerHTML = 1;
        console.log(data);
        currList.value = data.filter(item => !Object.hasOwn(item, "count") && "Основное".includes(item.type));
        validatedPrograms.value = currList.value;
        data.forEach(counter => {
          Object.hasOwn(counter, 'count') ? document.querySelector('.countPage').innerHTML = Math.ceil(counter.count / 10) : false
        })
        setTimeout(() => {
          state.value = false;
        }, 1000)
      })
}

getData("main");

function getNextPage(ege) {
  console.log(ege)
  if (ege) {
    getNextPageFilt(calculatorEGE.value)
  } else {
    let cur = parseInt(document.querySelector(".page").innerHTML)
    const type = "main";
    cur++
    document.querySelector(".page").innerHTML = cur;
    fetch(url + 'api/education_programs?page=' + cur + '&type=' + type)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          currList.value = data.filter(item => !Object.hasOwn(item, "count"));
          validatedPrograms.value = currList.value;
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

function getPrevPage(ege) {
  if (ege) {
    getPrevPageFilt(calculatorEGE.value)
  } else {
    const type = "main";
    let cur = parseInt(document.querySelector(".page").innerHTML);
    if (cur > 1) {
      cur--
      document.querySelector(".page").innerHTML = cur;
      fetch(url + 'api/education_programs?page=' + cur + '&type=' + type)
          .then(res => res.json())
          .then(data => {
            currList.value = data.filter(item => !Object.hasOwn(item, "count"));
            validatedPrograms.value = currList.value;
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
}


setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}, 100)
</script>

<template>
  <Banner h1="КАЛЬКУЛЯТОР ЕГЭ" p="Выберите предметы ЕГЭ, которые вы сдали или собираетесь сдавать. Укажите свои баллы по предметам.  Мы автоматически подберем
для вас подходящие вузы и специальности." typePage="calculator"/>
  <div class="preloader" v-if="state">
    <v-progress-circular
        color="primary"
        indeterminate
    ></v-progress-circular>
  </div>
  <card-education v-else v-for="item in validatedPrograms" :card="item"/>

  <div class="pagination">
    <button @click="getPrevPage(filtredOrNo)" style="transform: rotateY(180deg);
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
    <button @click="getNextPage(filtredOrNo)" style="
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