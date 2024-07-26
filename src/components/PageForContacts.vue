<script setup lang="ts">
setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}, 100)
</script>

<template>
  <div class="container_for_custom_color">
    <div class="wrapper">
      <div class="container_for_media_and_map">
        <div class="container_for_media">
          <h3>КОНТАКТЫ</h3>
          <p>Полное наименование: <span> Санкт‑Петербургское государственное автономное учреждение «Фонд поддержки научной, научно-технической, инновационной деятельности»
(Санкт‑Петербургский научный фонд) </span></p>
          <p>Сайт: <span> http://spbsf.ru </span></p>
          <p>Электронная почта: <span> info@studyinspb.ru </span></p>
          <p>Телефон: <span> +7 (812) 710-40-60 </span></p>
          <p>Адрес: <span> Санкт-Петербург, наб. реки Фонтанки, д. 50, лит. Ц </span></p>
          <p>Время работы: <span> Пн-Пт с 9:00 до 18:00 </span></p>
        </div>
        <div class="container_for_map">
          <iframe :src="'https://yandex.ru/map-widget/v1/?mode=search&text=' + 'Санкт-Петербург, наб. реки Фонтанки, д. 50, лит. Ц'" width="100%"
                  height="600" frameborder="1" style="position:relative;"></iframe>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

h1 {
  font-size: 24px;
  font-weight: normal;
}

h2 {
  font-weight: normal;
  font-size: 16px;
}

h3 {
  font-weight: 700;
  font-size: 16px;
}
a {
  color: #4CC6C6;
  text-decoration: underline #4CC6C6;
}

a:hover {
  cursor: pointer;
  opacity: 0.6;
}

.container_for_custom_color {
  background-color: #F4F6F6;
  padding: 50px 0;
}


p {
  font-weight: 700;
}

span {
  font-weight: normal;
  line-height: 36px;
}


.container_for_buttons a:nth-child(1) {
  border-radius: 50px;
  background: #071937;
  border: 1px solid #071937;
  color: #FFFFFF;
  padding: 15px 20px;
  text-decoration: none;
}

.container_for_buttons a:nth-child(1):hover {
  background: none;
  border: 1px solid #4CC6C6;
  background-color: #4CC6C6;
  color: #FFFFFF;
}

.container_for_buttons a:nth-child(2) {
  border-radius: 50px;
  border: 1px solid #4CC6C6;
  color: #FFFFFF;
  background-color: #4CC6C6;
  padding: 15px 20px;
  text-decoration: none;
}

.container_for_buttons a:nth-child(2):hover {
  background: #071937;
  border: 1px solid #071937;
}

.container_for_media_and_map {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.container_for_map {
  width: 50%;
}

.container_for_media {
  max-width: 50%;
}

.container_for_text_and_logo span {
  text-align: center;
  line-height: 20px;
}

@media screen  and (max-width: 1250px) {
  .wrapper {
    max-width: 96%;
  }
}


@media screen  and (max-width: 1070px) {
  .container_for_map {
width: 45%;
}
}

@media screen  and (max-width: 800px) {
  h1 {
  font-size: 20px;
  font-weight: normal;
}

h2 {
  font-weight: normal;
  font-size: 14px;
}

h3 {
  font-weight: 700;
  font-size: 14px;
}

p {
  font-size: 14px;
}
span {
  font-size: 14px;
}
.container_for_logo_and_main_info {
  flex-direction: column;
  align-items: center;
}
.container_for_logo_and_main_info h1 {
  text-align: center;
}
.container_for_attr_cards {
  justify-content: center;
}
}

@media screen  and (max-width: 700px) {
  .container_for_media_and_map {
  flex-direction: column;
  gap: 20px;
  }
  .container_for_media {
    max-width: 100%;
  }
  .container_for_map {
    width: 100%;
  }
  .container_for_attr_cards {
  flex-wrap: wrap;
}
.container_for_custom_color {
  padding: 1px 0;
}
}
</style>