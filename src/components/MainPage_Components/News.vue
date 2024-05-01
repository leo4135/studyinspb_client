<script setup lang="ts">
import Card from "../UI_Components/Card.vue";
import {ref} from "vue";

const news = ref([
  {
    h1: "Что будет со сферой образования в 2024 ?",
    p: "Россия войдет в ТОП-10 стран по уровню образования и привлечет зарубежных студентов в свои вузы",
    tags: "#образование",
    picture: "../../../public/News_Photo.png"
  },
  {
    h1: "Что будет со сферой образования в 2024 ?",
    p: "Россия войдет в ТОП-10 стран по уровню образования и привлечет зарубежных студентов в свои вузы",
    tags: "#образование",
    picture: "../../../public/News_Photo_2.png"
  },
  {
    h1: "Что будет со сферой образования в 2024 ?",
    p: "Россия войдет в ТОП-10 стран по уровню образования и привлечет зарубежных студентов в свои вузы",
    tags: "#образование",
    picture: "../../../public/News_Photo_3.png"
  },
  {
    h1: "Что будет со сферой образования в 2024 ?",
    p: "Россия войдет в ТОП-10 стран по уровню образования и привлечет зарубежных студентов в свои вузы",
    tags: "#образование",
    picture: "../../../public/News_Photo_2.png"
  },
  {
    h1: "Что будет со сферой образования в 2024 ?",
    p: "Россия войдет в ТОП-10 стран по уровню образования и привлечет зарубежных студентов в свои вузы",
    tags: "#образование",
    picture: "../../../public/News_Photo.png"
  },
  {
    h1: "Что будет со сферой образования в 2024 ?",
    p: "Россия войдет в ТОП-10 стран по уровню образования и привлечет зарубежных студентов в свои вузы",
    tags: "#образование",
    picture: "../../../public/News_Photo_3.png"
  },
]);

</script>

<template>

  <section class="news">
    <div class="wrapper">
      <h1>Актуальные новости и события</h1>
      <div class="container_for_news">
        <card v-for="item in news" :item="item"/>
      </div>
    </div>
  </section>

</template>

<style scoped>

section {
  margin: 50px 0;
}

.container_for_news {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

h1 {
  font-size: 40px;

}
</style>
