<script setup lang="ts">


</script>

<template>
  <section class="text_after_banner">
    <div class="wrapper width">
      <div class="container">
        <h1>Образование в Санкт‑Петербурге</h1>
        <p>Санкт-Петербург – центр притяжения для студентов из всех субъектов Российской Федерации и более чем 150
          зарубежных государств.
          Российские и иностранные студенты выбирают культурную столицу
          России для получения профессионального образования.
          Здесь сосредоточен уникальный научно-педагогический потенциал.</p>
        <RouterLink to="/programs" class="btn_more_info">узнать больше</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 50px 0;
  color: #071937;
}


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

p {
  max-width: 710px;
}

h1 {
  font-weight: 500;
  font-size: 32px;
  line-height: 62px;
}
p {
  line-height: 36px;
  text-align: center;
}

.btn_more_info {
  border: 1px solid #071937;
  border-radius: 25px;
  padding: 15px 45px;
}

.btn_more_info:hover {
  background: #071937;
  color: #FFFFFF;
}

@media screen and (max-width: 800px) {
  h1 {
    text-align: center;
    line-height: 42px;
  }
  p {
    text-align: center;
    line-height: 26px;
  }
  .width {
    width: 95%;
  }
}
</style>
