<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
import {computed, ref} from "vue";

const modules = [Navigation];
let curWindowWidth = ref(window.innerWidth);
</script>

<template>

  <section class="blogs">
    <div class="wrapper width">
      <div class="container">

        <h1>Блоги: студенты и вузы</h1>
        <div class="container_for_cards">
          <swiper
              :slidesPerView="curWindowWidth > 1000 ? 3 : curWindowWidth > 800 ? 2 : 1"
              :spaceBetween="40"
              :modules="modules"
              class="mySwiper"
              :navigation="true"
          >

            <swiper-slide>

                <iframe width="100%" height="545" src="https://www.youtube.com/embed/E_ABlKcziS8?si=gPtQ3k-1zWTjUFI2"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            </swiper-slide>

            <swiper-slide>

                <iframe width="100%" height="545" src="https://www.youtube.com/embed/yUvMswQ-58o?si=0mHVImI7dMy4Es64"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            </swiper-slide>

            <swiper-slide>

                <iframe width="100%" height="545" src="https://www.youtube.com/embed/a9JPq9b4bZI?si=2-uVQI6uJ7IyI9ya"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            </swiper-slide>

          </swiper>

        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

.width {
  width: 85%;
}

.blogs {
  background: #FD7436;
  color: #FFFFFF;
}

.container {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

h1 {
  font-size: 40px;
  margin: 20px 0;
}

.blog {
  width: 100%;
}


h2 {
  font-size: 16px;
  font-weight: 700;
}

p {
  font-size: 14px;
}


.container_for_cards {
  display: flex;
  gap: 25px;
}
</style>
