<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  id: String
}>()

const getDataNews = ref();


async function getData() {
  await fetch('http://studyinspb.ru/api/news')
      .then(res => res.json())
      .then(data => {
        getDataNews.value = data.filter(item => item.id == props.id);
      })
}

getData()



</script>

<template>
  <section>
    <div class="wrapper">
      <div class="container">
        <img :src="'/public/' + getDataNews[0].path"/>

        <h2>{{ getDataNews[0].heading }}</h2>
        <p v-html="getDataNews[0].body"></p>
      </div>

    </div>
  </section>
</template>

<style scoped>
section {
}

h2 {
  font-size: 24px;
}

.container {
  width: 50%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
align-items: center;
  gap: 1rem;
}

@media screen and (max-width: 1200px) {
  .container {
    width: 80%;
  }
}
</style>