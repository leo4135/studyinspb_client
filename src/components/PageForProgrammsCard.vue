<script setup lang="ts">

import { ref } from "vue";


// в качестве пропса принимаем id из урла, помогает роутер
const props = defineProps<{
  id: string
}>()

const currentCard = ref("");
const currentOrganization = ref([]);
let imageUrl = ref('');



async function getData() {
  await fetch('http://studyinspb.ru/api/education_programs/')
      .then(res => res.json())
      .then(data => {
        currentCard.value = data.find(item => item.id == props.id);
        getDataOrganization();
      })
}
getData();

async function getDataOrganization() {
  await fetch('http://studyinspb.ru/api/organizations/')
      .then(res => res.json())
      .then(data => {
        currentOrganization.value = data.find(item => item.id == currentCard.value.id_organization);
        imageUrl.value = new URL(`/public/${currentOrganization.value.logo}`, import.meta.url)
      })
}


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
          <h1>{{ currentCard.title }}</h1>
          <h2>{{ currentOrganization.fullTitle }}</h2>
          <div class="actual" v-if="currentCard.updatedAt">актуальная информация об образовательной<br/> программе
            приведена на
            сайте организации
          </div>

          <div class="container_for_attr_cards">
            <div class="container_for_text_and_logo">
              <svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M32.2526 3.6697C32.1303 3.54738 31.9672 3.46583 31.8041 3.46583H25.6064V0.611617C25.6064 0.285421 25.321 0 24.9948 0H7.58405C7.25786 0 6.97244 0.285421 6.97244 0.611617V3.46583H0.611617C0.448519 3.46583 0.285422 3.54738 0.163098 3.6697C0.0407747 3.79203 0 3.95512 0 4.11822C0 4.24055 0.122324 6.85011 1.06014 9.86743C2.36492 13.9041 4.56674 16.7583 7.50251 18.0631C8.48109 21.3251 10.7237 23.8939 13.5371 24.9132V25.0355C13.5371 28.4198 10.9683 31.1109 7.6656 31.1109C7.33941 31.1109 7.05399 31.3964 7.05399 31.7225V35.1884C7.05399 35.5146 7.33941 35.8 7.6656 35.8H24.9948C25.321 35.8 25.6064 35.5146 25.6064 35.1884V31.7225C25.6064 31.3964 25.321 31.1109 24.9948 31.1109C21.6513 31.1109 18.9194 28.379 18.9194 25.0355V24.954C21.8551 23.9346 24.1385 21.3251 25.1171 17.9815C27.9305 16.636 30.0916 13.8226 31.3556 9.86743C32.3342 6.85011 32.4157 4.19977 32.4157 4.11822C32.4565 3.95512 32.3749 3.79203 32.2526 3.6697ZM1.26401 4.68907H6.97244V14.4749C6.97244 15.1681 7.01321 15.8205 7.13553 16.4729C2.48724 13.7002 1.46788 6.80934 1.26401 4.68907ZM24.3831 32.2934V34.536H8.27722V32.2934C11.8654 32.008 14.638 29.0314 14.7196 25.2394C15.2089 25.321 15.739 25.4025 16.269 25.4025C16.7583 25.4025 17.2476 25.3617 17.6961 25.2802C17.8592 28.9907 20.7542 32.008 24.3831 32.2934ZM17.9 24.0162C17.3699 24.1385 16.8399 24.22 16.3098 24.22C15.6982 24.22 15.0866 24.1385 14.5157 23.9754C14.3934 23.9346 14.1895 23.8531 14.108 23.8531C10.7237 22.7114 8.19567 18.9601 8.19567 14.5157V1.26401H24.3831V3.71048V4.48519V14.5157C24.3831 18.9601 21.8551 22.7114 18.4301 23.8531M25.4841 16.3913C25.5656 15.7797 25.6472 15.1273 25.6472 14.4749V4.68907H31.1925C30.9886 6.80934 30.01 13.4964 25.4841 16.3913Z"
                    fill="#071937"/>
                <path
                    d="M22.1813 8.56268L18.8378 8.07339L17.3292 5.0153C17.1661 4.6891 16.7991 4.44446 16.4321 4.44446C16.0651 4.44446 15.6982 4.64833 15.5351 5.0153L14.0264 8.07339L10.6829 8.56268C10.3159 8.60346 9.98975 8.88888 9.86742 9.25585C9.7451 9.62282 9.82665 10.0306 10.1121 10.2752L12.5585 12.6401L11.9877 15.9836C11.9061 16.3506 12.0692 16.7176 12.3954 16.9622C12.5585 17.0845 12.7624 17.1661 13.0071 17.1661C13.1702 17.1661 13.3333 17.1253 13.4556 17.0438L16.5544 15.4943L19.4902 17.0438C19.8164 17.2069 20.2241 17.2069 20.5503 16.9622C20.8765 16.7176 20.9989 16.3506 20.9581 15.9836L20.3872 12.6401L22.8337 10.2752C23.1191 9.98979 23.2007 9.62282 23.0784 9.25585C22.8745 8.88888 22.5891 8.60346 22.1813 8.56268ZM19.2456 11.9877C19.0825 12.1101 19.0417 12.3139 19.0825 12.5178L19.6533 15.739L16.8399 14.2711C16.6768 14.1896 16.4729 14.1896 16.269 14.2711L13.2517 15.7798L13.8225 12.5178C13.8633 12.3139 13.7818 12.1101 13.6595 11.9877L11.3353 9.70437L14.5565 9.21507C14.7604 9.1743 14.9235 9.05197 15.005 8.88888L16.4321 5.95311L17.8592 8.88888C17.9408 9.05197 18.1039 9.21507 18.3077 9.21507L21.5289 9.70437L19.2456 11.9877Z"
                    fill="#071937"/>
              </svg>
              <span class="lvl_edu"> {{ currentCard.qualification }}</span>
            </div>
            <div class="container_for_text_and_logo">
              <svg width="28" height="37" viewBox="0 0 28 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.5311 6.07062L7.11867 8.08757C6.20907 9.4322 5.73449 10.9746 5.73449 12.596C5.73449 17.0254 9.33336 20.6638 13.8023 20.6638C18.2712 20.6638 21.8701 17.065 21.8701 12.596C21.8701 11.0141 21.3955 9.4322 20.5255 8.12712L24.5594 6.22881V13.9011L23.3334 16.5113C23.2543 16.709 23.2543 16.9068 23.3729 17.065C23.4916 17.2232 23.6893 17.3418 23.887 17.3418H26.2204C26.4181 17.3418 26.6158 17.2627 26.6949 17.065C26.8136 16.9068 26.8136 16.709 26.7345 16.5113L25.6667 13.9011V5.71469C25.6667 5.3983 25.6271 5.16102 25.0735 4.92373C24.9548 4.88418 14.0791 0.059322 14.0791 0.059322C13.9209 -0.019774 13.7627 -0.019774 13.6045 0.059322L2.5311 4.96328C2.33336 5.04237 2.17517 5.27966 2.17517 5.51695C2.17517 5.75424 2.29381 5.95198 2.5311 6.07062ZM20.6441 12.596C20.6441 16.3927 17.5594 19.4774 13.7627 19.4774C9.96613 19.4774 6.88139 16.3927 6.88139 12.596C6.88139 11.1328 7.35596 9.74859 8.18647 8.56215L13.565 10.9746C13.6441 11.0141 13.7232 11.0141 13.8023 11.0141C13.8814 11.0141 13.9605 11.0141 14.0396 10.9746L19.339 8.6017C20.2091 9.78814 20.6441 11.1723 20.6441 12.596ZM24.7966 16.1554L25.0735 15.5621L25.3108 16.1554H24.7966ZM13.8418 1.24576L23.452 5.51695L13.8418 9.78814L4.23167 5.51695L13.8418 1.24576Z"
                    fill="#071937"/>
                <path
                    d="M14 22.0875C6.28814 22.0875 0 28.3757 0 36.0875C0 36.4039 0.276836 36.6807 0.59322 36.6807H27.4068C27.7232 36.6807 28 36.4039 28 36.0875C28 28.3757 21.7119 22.0875 14 22.0875ZM1.22599 35.4943C1.54237 28.692 7.15819 23.274 14.0395 23.274C20.9209 23.274 26.4972 28.7316 26.8136 35.4943H1.22599Z"
                    fill="#071937"/>
              </svg>
              <span class="form_edu"> {{ currentCard.form_education }}</span>
            </div>

            <div class="container_for_text_and_logo">
              <svg width="34" height="37" viewBox="0 0 34 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.2791 15.1467H5.27943C4.91309 15.1467 4.61658 15.4432 4.61658 15.8096V19.8066C4.61658 20.1729 4.91309 20.4695 5.27943 20.4695H9.2791C9.64544 20.4695 9.94195 20.1729 9.94195 19.8066V15.8096C9.94195 15.4437 9.64499 15.1467 9.2791 15.1467ZM8.61624 19.1442H5.94229V16.4729H8.61624V19.1442Z"
                    fill="#071937"/>
                <path
                    d="M18.6081 15.1467H14.6071C14.2407 15.1467 13.9442 15.4432 13.9442 15.8096V19.8066C13.9442 20.1729 14.2407 20.4695 14.6071 20.4695H18.6081C18.9744 20.4695 19.2709 20.1729 19.2709 19.8066V15.8096C19.2709 15.4437 18.9744 15.1467 18.6081 15.1467ZM17.9452 19.1442H15.2699V16.4729H17.9452V19.1442Z"
                    fill="#071937"/>
                <path
                    d="M9.2791 24.2552H5.27943C4.91309 24.2552 4.61658 24.5522 4.61658 24.9181V28.9178C4.61658 29.2841 4.91309 29.5806 5.27943 29.5806H9.2791C9.64544 29.5806 9.94195 29.2841 9.94195 28.9178V24.9181C9.94195 24.5522 9.64499 24.2552 9.2791 24.2552ZM8.61624 28.2549H5.94229V25.581H8.61624V28.2549Z"
                    fill="#071937"/>
                <path
                    d="M18.6081 24.2552H14.6071C14.2407 24.2552 13.9442 24.5522 13.9442 24.9181V28.9178C13.9442 29.2841 14.2407 29.5806 14.6071 29.5806H18.6081C18.9744 29.5806 19.2709 29.2841 19.2709 28.9178V24.9181C19.2709 24.5522 18.9744 24.2552 18.6081 24.2552ZM17.9452 28.2549H15.2699V25.581H17.9452V28.2549Z"
                    fill="#071937"/>
                <path
                    d="M27.6464 24.2552H23.6485C23.2821 24.2552 22.9856 24.5522 22.9856 24.9181V28.9178C22.9856 29.2841 23.2821 29.5806 23.6485 29.5806H27.6464C28.0127 29.5806 28.3092 29.2841 28.3092 28.9178V24.9181C28.3092 24.5522 28.0122 24.2552 27.6464 24.2552ZM26.9835 28.2549H24.3113V25.581H26.9835V28.2549Z"
                    fill="#071937"/>
                <path
                    d="M32.5144 3.2449H28.4882V2.47643C28.4882 1.11094 27.3777 0 26.0131 0C24.6476 0 23.5367 1.11094 23.5367 2.47643V3.2449H19.0593V2.47643C19.0593 1.11094 17.9488 0 16.5842 0C15.2178 0 14.1064 1.11094 14.1064 2.47643V3.2449H9.6304V2.47643C9.6304 1.11094 8.52034 0 7.1553 0C5.78893 0 4.67755 1.11094 4.67755 2.47643V3.2449H0.662855C0.296517 3.2449 0 3.54141 0 3.90775V35.7601C0 36.126 0.296517 36.423 0.662855 36.423H32.5153C32.8816 36.423 33.1781 36.126 33.1781 35.7601V3.90775C33.1772 3.54141 32.8807 3.2449 32.5144 3.2449ZM24.8619 2.47643C24.8619 1.84141 25.3781 1.32571 26.0126 1.32571C26.6463 1.32571 27.162 1.84185 27.162 2.47643V5.86848C27.162 6.50305 26.6463 7.01919 26.0126 7.01919C25.3781 7.01919 24.8619 6.50305 24.8619 5.86848V2.47643ZM16.5837 1.32527C17.2174 1.32527 17.7331 1.84141 17.7331 2.47598V5.86803C17.7331 6.50261 17.2174 7.01875 16.5837 7.01875C15.9483 7.01875 15.4317 6.50261 15.4317 5.86803V3.98022C15.4344 3.95592 15.4392 3.9325 15.4392 3.90731C15.4392 3.88212 15.4344 3.8587 15.4317 3.8344V2.47598C15.4317 1.84141 15.9487 1.32527 16.5837 1.32527ZM6.00281 2.47643C6.00281 1.84141 6.51984 1.32571 7.15486 1.32571C7.78855 1.32571 8.30425 1.84185 8.30425 2.47643V5.86848C8.30425 6.50305 7.78855 7.01919 7.15486 7.01919C6.5194 7.01919 6.00281 6.50305 6.00281 5.86848V2.47643ZM31.8515 35.0968H1.32483V4.57016H4.67666V5.86803C4.67666 7.23352 5.78849 8.34446 7.15442 8.34446C8.51901 8.34446 9.62952 7.23352 9.62952 5.86803V4.57016H14.1056V5.86803C14.1056 7.23352 15.2174 8.34446 16.5833 8.34446C17.9479 8.34446 19.0584 7.23352 19.0584 5.86803V4.57016H23.5358V5.86803C23.5358 7.23352 24.6467 8.34446 26.0122 8.34446C27.3768 8.34446 28.4873 7.23352 28.4873 5.86803V4.57016H31.8506V35.0968H31.8515Z"
                    fill="#071937"/>
                <path
                    d="M28.3795 13.2307L24.9971 17.3996L23.5861 16.0527C23.3214 15.7999 22.9021 15.8096 22.6489 16.0743C22.3961 16.3395 22.4058 16.7588 22.6705 17.0116L24.6012 18.8548C24.7249 18.9728 24.8889 19.0382 25.059 19.0382C25.0731 19.0382 25.0868 19.0377 25.101 19.0368C25.2857 19.0253 25.4572 18.9365 25.5738 18.7929L29.4091 14.0663C29.6398 13.7822 29.596 13.3646 29.3119 13.1339C29.0277 12.9028 28.6101 12.9465 28.3795 13.2307Z"
                    fill="#071937"/>
              </svg>
              <span
                  class="range_edu"> {{ currentCard.range_years + 'года' }}</span>
            </div>

            <div class="container_for_text_and_logo">
              <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                   v-if="currentCard.language">
                <path
                    d="M37.7574 22.9503L34.5605 20.7903V14.3102L37.7574 12.1934C37.9302 12.0638 38.0598 11.891 38.0598 11.675C38.0598 11.459 37.9302 11.243 37.7574 11.1566L21.2979 0.0972015C21.0819 -0.0324005 20.7795 -0.0324005 20.5635 0.0972015L0.259204 13.6622C0.172803 13.7054 0.129602 13.7486 0.0864012 13.835C0.0864012 13.835 0.0864012 13.835 0.0864012 13.8782C-8.36862e-08 14.0078 0 14.0942 0 14.2238V26.104C0 26.32 0.129602 26.536 0.302405 26.6224L16.7619 37.5954C16.8915 37.6818 16.9779 37.725 17.1075 37.725C17.2371 37.725 17.3667 37.6818 17.4531 37.5954L37.8006 24.0304C37.9734 23.9008 38.103 23.728 38.103 23.512C38.0598 23.2528 37.9302 23.0368 37.7574 22.9503ZM20.9523 1.43642L36.2454 11.6318L33.7397 13.2734C33.6101 13.3166 33.4805 13.403 33.3941 13.4894L17.0643 24.376L4.79527 16.211C4.75207 16.1678 4.70887 16.1678 4.70887 16.1246L1.77123 14.1806L20.9523 1.43642ZM5.01128 17.9391L16.6755 25.7152C16.8915 25.8448 17.1939 25.8448 17.4099 25.7152L33.2645 15.131V20.4447L17.1507 31.0721L5.01128 23.296V17.9391ZM17.0643 36.2562L1.25282 25.7152V15.4334L3.75846 17.0751V23.6416C3.75846 23.8576 3.88806 24.0736 4.06086 24.2032L16.8483 32.4113C16.9347 32.4977 17.0643 32.4977 17.1939 32.4977C17.3235 32.4977 17.4531 32.4545 17.5395 32.4113L33.6965 21.7839L36.2454 23.512L17.0643 36.2562Z"
                    fill="#071937"/>
                <path
                    d="M18.1442 7.35491L25.834 12.6254C25.9636 12.7118 26.0932 12.755 26.1796 12.755C26.3956 12.755 26.5684 12.6686 26.698 12.4526C26.914 12.1502 26.8276 11.7614 26.5252 11.5454L18.8786 6.2749C18.5762 6.05889 18.1874 6.14529 17.9714 6.4477C17.7554 6.7501 17.8418 7.13891 18.1442 7.35491Z"
                    fill="#071937"/>
              </svg>

              <span class="lang_edu"> {{ currentCard.language }}</span>
            </div>
          </div>

          <div class="container_for_attr_cards">
            <div class="mesta">
              <p>количество мест: бюджет: <span class="budget">{{
                  currentCard.numberBudgetPlaces == null ? 0 : currentCard.budget
                }}</span></p>
              <p>контракт: <span class="contr">{{
                  currentCard.numberContractPlaces == null ? 0 : currentCard.contract
                }}</span></p>
            </div>
            <div class="price">
              <p>стоимость обучения в год для граждан РФ: <span class="budget">{{ currentCard.cost_rus }}</span></p>
              <p>для иностранных граждан: <span class="budget">{{ currentCard.cost_all }}</span></p>
            </div>
          </div>

          <p>проходной балл ЕГЭ: <span class="budget">{{ currentCard.average_budget }}</span></p>

          <span>{{ currentCard.description }}</span>
          <div v-if="false" class="container_for_buttons">
            <a v-if="currentCard.site" :href='currentCard.site'>Сайт программы</a>
            <a>Новости вуза</a>
          </div>
        </div>
      </div>

      <div class="container_for_media_and_map">
        <div class="container_for_media">
          <h3>КОНТАКТЫ</h3>
          <p>Полное наименование: <span> {{ currentOrganization.fullTitle }} </span></p>
          <p>Ректор: <span> {{ currentOrganization.supervisorFio }} </span></p>
          <p>Сайт: <span> {{ currentOrganization.site }} </span></p>
          <p>Электронная почта: <span> {{ currentCard.email }} </span></p>
          <p>Телефон: <span> {{ currentOrganization.phone }} </span></p>
          <p>Приемная комиссия: <span> {{ currentCard.telephone }} </span></p>
          <p>Адрес: <span> {{ currentOrganization.address }} </span></p>
          <p>Общежитие: <span> Есть </span></p>
          <RouterLink class="style_card" :to="{ name: 'organization', params: { id: currentOrganization.id } }"><span>Подробнее</span></RouterLink>
        </div>
        <div class="container_for_map">
          <iframe :src="'https://yandex.ru/map-widget/v1/?mode=search&text=' + currentOrganization.address"
                  width="100%"
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

.style_card {
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
  height: 250px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.container_for_attr_cards {
  display: flex;
  gap: 30px;
}

p {
  font-weight: 700;
}

span {
  font-weight: normal;
  line-height: 36px;
}

.container_for_text_and_logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.container_for_text_and_logo span {
  font-weight: bold;
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
.container_for_attr_cards {
  justify-content: center;
}

.container_for_attr_cards {
  flex-wrap: wrap;
}
}
@media screen  and (max-width: 700px) {
  .container_for_info {
    max-width: 95%;
    gap: 15px;
  }
  .container_for_media_and_map {
  flex-direction: column;
  gap: 20px;
  }
  .container_for_media {
    max-width: 95%;
  }
  .container_for_map {
    width: 100%;
  }
  .container_for_attr_cards {
  flex-wrap: wrap;
  justify-content: flex-start;
}
}

</style>