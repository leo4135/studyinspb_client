<script setup lang="ts">
import Card from "../ComponentsForNews/Card.vue";
import {onBeforeMount, ref} from "vue";





  const getDataNews = ref([]);


  async function getData() {
    await fetch('http://studyinspb.ru/api/news')
        .then(res => res.json())
        .then(data => {
          getDataNews.value = data;
        })
  }
  getData()
  console.log(getDataNews.value);


</script>

<template>

  <section class="news">
    <div class="wrapper width">
      <h1>Актуальные новости и события</h1>
      <div class="container_for_news">
        <Card v-for="item in getDataNews" :item="item" />
      </div>
    </div>
  </section>

</template>

<style scoped>

section {
  margin: 30px 0;
}

.container_for_news {
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
}

h1 {
  font-size: 32px;
margin-bottom: 10px;
}

.width {
  width: 85%;
}
</style>
