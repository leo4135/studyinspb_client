<script setup lang="ts">

import { ref } from "vue";

// в качестве пропса принимаем id из урла, помогает роутер
const props = defineProps<{
  id: String
}>()


let currentOrganization = ref([]);
let imageUrl = ref('');
let currentCard = ref("");

async function getDataOrganization() {
  await fetch('http://studyinspb.ru/api/organizations/')
      .then(res => res.json())
      .then(data => {
        console.log(props.id);
        currentOrganization.value = data.find(item => item.id == props.id);
        imageUrl.value = new URL(`/public/${currentOrganization.value.logo}`, import.meta.url)
      })
}

getDataOrganization();


async function getData() {
  await fetch('http://studyinspb.ru/api/education_programs/')
      .then(res => res.json())
      .then(data => {
        console.log(props.id)
        currentCard.value = data.filter(item => item.id_organization == props.id);
      })
}
getData();

setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}, 100)


</script>

<template>
  <div class="container_for_custom_color">
    <div class="wrapper">
      <div class="container_for_logo_and_main_info">
        <div class="logo_img" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
        <div class="container_for_info">
          <h1> {{ currentOrganization.shortTitle }}</h1>
          <div v-if="false" class="actual">актуальная информация об образовательной<br/> программе приведена на
            сайте организации
          </div>

          <div class="container_for_attr_cards">
            <div class="container_for_text_and_logo">
              <div class="group_for_svg_and_count">
                <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.7574 22.9503L34.5605 20.7903V14.3102L37.7574 12.1934C37.9302 12.0638 38.0598 11.891 38.0598 11.675C38.0598 11.459 37.9302 11.243 37.7574 11.1566L21.2979 0.0972015C21.0819 -0.0324005 20.7795 -0.0324005 20.5635 0.0972015L0.259204 13.6622C0.172803 13.7054 0.129602 13.7486 0.0864012 13.835C0.0864012 13.835 0.0864012 13.835 0.0864012 13.8782C-8.36862e-08 14.0078 0 14.0942 0 14.2238V26.104C0 26.32 0.129602 26.536 0.302405 26.6224L16.7619 37.5954C16.8915 37.6818 16.9779 37.725 17.1075 37.725C17.2371 37.725 17.3667 37.6818 17.4531 37.5954L37.8006 24.0304C37.9734 23.9008 38.103 23.728 38.103 23.512C38.0598 23.2528 37.9302 23.0368 37.7574 22.9503ZM20.9523 1.43642L36.2454 11.6318L33.7397 13.2734C33.6101 13.3166 33.4805 13.403 33.3941 13.4894L17.0643 24.376L4.79527 16.211C4.75207 16.1678 4.70887 16.1678 4.70887 16.1246L1.77123 14.1806L20.9523 1.43642ZM5.01128 17.9391L16.6755 25.7152C16.8915 25.8448 17.1939 25.8448 17.4099 25.7152L33.2645 15.131V20.4447L17.1507 31.0721L5.01128 23.296V17.9391ZM17.0643 36.2562L1.25282 25.7152V15.4334L3.75846 17.0751V23.6416C3.75846 23.8576 3.88806 24.0736 4.06086 24.2032L16.8483 32.4113C16.9347 32.4977 17.0643 32.4977 17.1939 32.4977C17.3235 32.4977 17.4531 32.4545 17.5395 32.4113L33.6965 21.7839L36.2454 23.512L17.0643 36.2562Z" fill="#071937"/>
                  <path d="M18.1442 7.35491L25.834 12.6254C25.9636 12.7118 26.0932 12.755 26.1796 12.755C26.3956 12.755 26.5684 12.6686 26.698 12.4526C26.914 12.1502 26.8276 11.7614 26.5252 11.5454L18.8786 6.2749C18.5762 6.05889 18.1874 6.14529 17.9714 6.4477C17.7554 6.7501 17.8418 7.13891 18.1442 7.35491Z" fill="#071937"/>
                </svg>
                <span> {{ currentCard.length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs"> образовательных <br> программ</span>
            </div>

            <div class="container_for_text_and_logo">
              <div class="group_for_svg_and_count_other">
                <div class="fake_svg"></div>
                <span> {{ currentCard.filter(item => item.qualification == "Магистр").length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs"> программ <br> магистратуры</span>
            </div>

            <div class="container_for_text_and_logo">
              <div class="group_for_svg_and_count_other">
                <div class="fake_svg"></div>
                <span> {{ currentCard.filter(item => item.qualification == "Бакалавр").length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs"> программ <br> бакалавриата</span>
            </div>

            <div class="container_for_text_and_logo">
              <div class="group_for_svg_and_count_other">
                <div class="fake_svg"></div>
                <span> {{ currentCard.filter(item => item.qualification == 'Аспирант').length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs">программ <br> аспирантуры</span>
            </div>
          </div>

          <div >
          </div>

          <div class="container_for_buttons">
            <a>программы вуза</a>
            <a>новости вуза</a>
          </div>
        </div>
      </div>

      <div class="container_for_media_and_map">
        <div class="container_for_media">
          <h3>КОНТАКТЫ</h3>
          <p>Полное наименование: <span> {{ currentOrganization.fullTitle }} </span></p>
          <p>Ректор: <span> {{ currentOrganization.supervisorFio }} </span></p>
          <p>Сайт: <span> {{ currentOrganization.site }} </span></p>
          <p>Электронная почта: <span> {{ currentOrganization.email }} </span></p>
          <p>Телефон: <span> {{ currentOrganization.phone }} </span></p>
          <p>Адрес: <span> {{ currentOrganization.address }} </span></p>
          <p>Общежитие: <span> Есть </span></p>
          <a>подробнее о вузе</a>
        </div>
        <div class="container_for_map">
          <iframe :src="'https://yandex.ru/map-widget/v1/?mode=search&text=' + currentOrganization.address" width="100%"
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

.actual {
  padding: 15px;
  background-color: #FD7436;
  max-width: max-content;
  color: #FFFFFF;
  font-size: 12px;
}

.container_for_custom_color {
  background-color: #F4F6F6;
}

.container_for_logo_and_main_info {
  display: flex;
  align-items: flex-start;
  gap: 50px;
  padding-top: 50px;

}

.logo_img {
  width: 300px;
  height: 345px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


p {
  font-weight: 700;
}

span {
  font-weight: normal;
  line-height: 36px;
}

.container_for_info {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.container_for_buttons {
  display: flex;
  gap: 25px;
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
  align-items: center;
  margin-top: 50px;
}

.container_for_map {
  width: 50%;
}

.container_for_media {
  max-width: 50%;
}

.container_for_text_and_logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.container_for_text_and_logo span {
  text-align: center;
  line-height: 20px;
}

.container_for_attr_cards {
  display: flex;
  gap: 30px;
  align-items: end;
}

.group_for_svg_and_count {
  display: flex;
  gap: 5px;
  align-items: center;
}

.group_for_svg_and_count_other {
  display: flex;
  align-items: center;
}

.fake_svg {
  width: 0;
  height: 38px;
}
</style>