<script setup lang="ts">

import Banner from "./MainPage_Components/Banner.vue";
import { useCounterStore } from '../main.ts'
import {ref} from "vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";
const store = useCounterStore();

let currentCard = ref([]);
let validatedPrograms = ref([])
store.$subscribe(() => {
    currentCard.value = store.calculatorEGE;
    console.log(store.calculatorEGE)

    getPrograms(currentCard?.value)


})

async function getPrograms(valuesEGE) {
  validatedPrograms.value = [];
  await fetch('http://studyinspb.ru/api/education_programs').then(res => res.json()).then(dataEducationPrograms => {
    dataEducationPrograms.forEach(educationProgram => {
      let arrayFromRequestWithBudget = [];
      let arrayFromRequestWithContract = [];

      Object.keys(educationProgram).forEach(key => {

        if (key.includes('ege')) {
          if (educationProgram[key] !== "-" && educationProgram[key].includes('/бюджет') && educationProgram[key].includes('/контракт')) {
            let values = educationProgram[key].split('/бюджет', '/контракт');
          } else if (educationProgram[key] !== "-" && educationProgram[key].includes('/бюджет')) {
            let values = educationProgram[key].split('/бюджет');
            arrayFromRequestWithBudget.push(values[0]);
          } else {
            let values = educationProgram[key].split('/контракт');
            arrayFromRequestWithContract.push(values[0]);
          }
        }
      })



    })
  })
}

</script>

<template>
  <Banner h1="КАЛЬКУЛЯТОР ЕГЭ" p="Выберите предметы ЕГЭ, которые вы сдали или собираетесь сдавать. Укажите свои баллы по предметам.  Мы автоматически подберем
для вас подходящие вузы и специальности." typePage="calculator"/>
  <card-education v-for="item in validatedPrograms" :card="item" />
</template>

<style scoped>

</style>