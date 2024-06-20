<script setup lang="ts">

import {computed, ref} from "vue";

const prop = defineProps<{ card: Object }>();

let currentCard = ref("")

// считаем количество разных образовательных программ для одной орги и вставляем в представление

async function getData() {
  await fetch('http://studyinspb.ru/api/education_programs/')
      .then(res => res.json())
      .then(data => {
          currentCard.value = data.filter(item => item.id_organization == prop.card.id);
      })
}
getData();
let imageUrl = ref('')
imageUrl.value = new URL(`/public/${prop.card.logo}`, import.meta.url)

// Почему при добавлении toUpperCase к prop.card.shortTitle переход перестает работать
// Почему здесь в отличии от PageForOrganizationCard нужен рест оператор
</script>

<template>
  <div class="wrapper">
    <div class="container_for_cards" style="margin-top: 50px">
      <div class="card">
        <div class="image_block" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
        <div class="text_block">
          <h1>{{ prop.card.shortTitle }}</h1>

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
                <span> {{ [...currentCard].filter(item => item.qualification == 'Магистр').length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs"> программ <br> магистратуры</span>
            </div>

            <div  class="container_for_text_and_logo">
              <div class="group_for_svg_and_count_other">
                <div class="fake_svg"></div>
                <span> {{ [...currentCard].filter(item => item.qualification == 'Бакалавр').length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs"> программ <br> бакалавриата</span>
            </div>

            <div  class="container_for_text_and_logo">
              <div class="group_for_svg_and_count_other">
                <div class="fake_svg"></div>
                <span> {{ [...currentCard].filter(item => item.qualification == 'Аспирант').length }} </span>
              </div>
              <span class="container_for_text_and_logo_education_programs">программ <br> аспирантуры</span>
            </div>
          </div>
          <RouterLink class="style_card" :to="{ name: 'organization', params: { id: prop.card.id } }"><span>Подробнее</span></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

h1 {
  font-size: 20px;
  font-weight: 500;
}
.fake_svg {
  width: 0;
  height: 38px;
}

.image_block {
  width: 20%;
  height: 230px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.card {
  background: #F4F6F6;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 0 auto;
  max-width: 75%;
}

.container_for_attr_cards {
  display: flex;
  gap: 30px;
  align-items: end;
}

p {
  font-size: 14px;
  font-weight: bold;
}

span {
  font-weight: normal;
}

.text_block {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 70%;
}

.container_for_text_and_logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.container_for_text_and_logo span {
  font-weight: bold;
}

.style_card {
  color: #4CC6C6;
  text-decoration: underline #4CC6C6;
}

.style_card:hover {
  cursor: pointer;
  opacity: 0.6;
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

.container_for_text_and_logo_education_programs {
  text-align: center;
  font-size: 12px;
}

@media screen and (max-width: 1000px) {
  .card {
    flex-direction: column;
  }
  .image_block {
    width: 100%;
  }
  .container_for_attr_cards {
    flex-wrap: wrap;
    justify-content: center;
  }
   h1 {
     text-align: center;
   }
   .style_card {
     display: flex;
     justify-content: center;
   }
}

@media screen and (max-width: 575px) {

  .container_for_attr_cards {
   flex-direction: column;
    align-items: center;
    gap: 10px;
  }

}

</style>