<script setup lang="ts">
import Banner from "./MainPage_Components/Banner.vue";
import Filters from "./PageForProgramms_Components/Filters.vue";
import CardEducation from "./PageForProgramms_Components/CardEducation.vue";

const programms = [
  {
    name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
    name_org: 'Санкт-Петербургский государственный университет ',
    level_education: 'Магистратура',
    form_education: 'Очное',
    range_edu: "2",
    lang_edu: 'английский',
    free_mest: '1',
    notFree_mest: '20',
    cost_rus: '300000',
    cost_all: '608700',
    ball_ege: '198'
  },
  {
    name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
    name_org: 'Санкт-Петербургский государственный университет ',
    level_education: 'Магистратура',
    form_education: 'Очное',
    range_edu: "2",
    lang_edu: 'английский',
    free_mest: '1',
    notFree_mest: '20',
    cost_rus: '300000',
    cost_all: '608700',
    ball_ege: '198'
  },
  {
    name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
    name_org: 'Санкт-Петербургский государственный университет ',
    level_education: 'Магистратура',
    form_education: 'Очное',
    range_edu: "2",
    lang_edu: 'английский',
    free_mest: '1',
    notFree_mest: '20',
    cost_rus: '300000',
    cost_all: '608700',
    ball_ege: '198'
  },
  {
    name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
    name_org: 'Санкт-Петербургский государственный университет ',
    level_education: 'Магистратура',
    form_education: 'Очное',
    range_edu: "2",
    lang_edu: 'английский',
    free_mest: '1',
    notFree_mest: '20',
    cost_rus: '300000',
    cost_all: '608700',
    ball_ege: '198'
  }
]

</script>

<template>
  <Banner h1="Поиск программ"/>
  <Filters/>
 <cardEducation v-for="card in programms" :card="card"></cardEducation>
</template>

<style scoped>


</style>
