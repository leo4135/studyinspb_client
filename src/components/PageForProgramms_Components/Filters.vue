<script setup lang="ts">

import {defineEmits, onBeforeMount, reactive, watch} from 'vue'
import { ref } from "vue";
import { useCounterStore } from '../../main.ts'
import { storeToRefs } from "pinia";



// массив для хранения типа организаций

let dataFromInputs = reactive({
  cost_rus: [0 , 300000]
});

const emit = defineEmits(['sendDataFromInputs', 'resetAllFilters']);

const sendDataFromInputs = () => {
  emit('sendDataFromInputs', dataFromInputs);
}

const resetAllFilters = () => {
  resetFilters();
  emit('resetAllFilters');
}

const store = useCounterStore();
const { educationTabs } = storeToRefs(store);

const resetFilters = () => {
 Object.keys(dataFromInputs).forEach(key => {
   delete dataFromInputs[key];
 })
}

</script>

<template>
  <div class="wrapper" style="margin-top: 50px;">
    <div class="container_for_main_filtres">
      <v-combobox class="search_input"
                  clearable
                  multiple
                  chips
                  label="наименование образовательной программы"
                  :single-line='true'
                  v-model="dataFromInputs.title"
      ></v-combobox>

      <v-combobox class="search_input"
                  clearable
                  multiple
                  :single-line='true'
                  chips
                  label="наименование организации"
                  v-model="dataFromInputs.shortTitle"
      ></v-combobox>
      <button class="search" @click="sendDataFromInputs">Найти</button>
    </div>

    <div class="container_for_other_filtres" style="margin-top: 20px;">
      <v-expansion-panels>
        <v-expansion-panel title="дополнительные фильтры">
          <v-expansion-panel-text>
            <div class="container_for_filtres">
              <v-combobox
              v-if="false"
              class="search_input"
                          clearable
                          multiple
                          chips
                          :single-line='true'
                          label="уровень образования"
                          v-model="dataFromInputs.qualification"
              ></v-combobox>
              <v-combobox
                  class="search_input"
                  clearable
                  multiple
                  :single-line='true'
                  chips
                  label="форма обучения"
                  :items="['Очная', 'Очно-заочная', 'Заочная']"
                  v-model="dataFromInputs.form_education"
              ></v-combobox>
              <v-combobox
                  class="search_input"
                  style="max-width: max-content"
                  chips
                  :single-line='true'
                  clearable multiple
                  v-if="false"
                  label="егэ"
              ></v-combobox>
              <div class="price">
                <span class="price_for_text">Стоимость</span>
                <v-range-slider
                    v-model="dataFromInputs.cost_rus"
                    :max="800000"
                    :min="0"
                    step="10000"
                    thumb-label="always"
                ></v-range-slider>
              </div>
              <v-combobox
                  class="search_input okso"
                  style="max-width: max-content"
                  chips
                  :single-line='true'
                  clearable multiple
                  :items="['Математические и естественные науки', 'Инженерное дело, технологии и технические науки', 'Здравоохранение и медицинские науки', 'Сельское хозяйство и сельскохозяйственные науки', 'Науки об обществе', 'Гуманитарные науки', 'Искусство и культура', 'Образование и педагогические науки', 'Оборона и безопасность государства. Военные науки']"
                  v-model="dataFromInputs.okso"
                  label="оксо"
              ></v-combobox>
              <v-combobox
                  class="search_input vak"
                  style="max-width: max-content"
                  chips
                  :single-line='true'
                  clearable multiple
                  :items="['Естественные науки','Технические науки', 'Медицинские науки', 'Сельскохозяйственные науки','Социальные и гуманитарные науки']"
                  v-model="dataFromInputs.vak"
                  label="вак"
              ></v-combobox>
            </div>
            <div class="container_for_filtres">
              <v-combobox
                  class="search_input"
                  chips
                  :single-line='true'
                  :items="['Есть']"
                  v-model="dataFromInputs.budget"
                  clearable multiple
                  label="бюджетные места"
              ></v-combobox>
              <v-combobox class="search_input"
                          clearable
                          multiple
                          :single-line='true'
                          chips
                          :items="['Русский', 'Английский', 'Китайский', 'Тайский', 'Эстонский', 'Латышский', 'Немецкий', 'Итальянский', 'Французский', 'Чешский', 'Испанский', 'Нидерландский', 'Албанский', 'Шведский', 'Финский']"
                          label="язык"
                          v-model="dataFromInputs.language"
              ></v-combobox>
              <button @click="sendDataFromInputs" class="filtres font_edit">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H14L8.6336 6.93628V14.7075L5.81623 16L5.63472 6.93628L0 0Z" fill="#071937"/>
                </svg>
                фильтровать
              </button>
              <button @click="resetAllFilters" class="filtres">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M7.5 15.295C11.6421 15.295 15 11.9372 15 7.79504C15 3.65291 11.6421 0.295044 7.5 0.295044C3.35786 0.295044 0 3.65291 0 7.79504C0 11.9372 3.35786 15.295 7.5 15.295Z"
                      fill="#071937"/>
                  <path
                      d="M9.97343 4.65283L10.6363 5.31574L8.1563 7.79533L10.6363 10.2743L9.97343 10.9372L7.49443 8.45721L5.01484 10.9372L4.35193 10.2743L6.83255 7.79533L4.35193 5.31574L5.01484 4.65283L7.49443 7.13346L9.97343 4.65283Z"
                      fill="white"/>
                </svg>
                очистить фильтры
              </button>
            </div>

          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

  </div>
</template>

<style scoped>

.okso {
  min-width: 10%;
}
.vak {
  min-width: 15%;
}
.search_input {
  max-width: 500px;
  border-top: 1px solid #D6D6EB;
  border-left: 1px solid #D6D6EB;
  border-right: 1px solid #D6D6EB;
}

.container_for_main_filtres {
  display: flex;
  margin: 0  auto;
  justify-content: center;
  max-width: 75%
}

.search {
  border-radius: 25px;
  background: #071937;
  border: 1px solid #071937;
  color: #FFFFFF;
  padding: 15px 20px;
  margin-left: 50px;
  min-width: 150px;
}

.container_for_filtres {
  display: flex;
}

.container_for_other_filtres {
  max-width: 75%;
  margin: 0  auto;
}

.price {
  border: 1px solid #D6D6EB;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 15px;
  width: 35%;
}

.filtres {
  border: 1px solid #D6D6EB;
  padding: 0 15px;
  min-width: 20%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  transition: background 0.5s;
}

.font_edit {
  font-weight: bold;
}

.filtres:hover {
  background: #D6D6EB;
}

@media screen and (max-width: 1100px) {
  .container_for_filtres {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .price {
    gap: 20px;
    flex-direction: column;
    width: 100%;
  }
  .filtres {
    width: 100%;
    padding: 10px;
  }
  .search_input {
    width: 100%;
    max-width: 100% !important;
  }

}

@media screen and (max-width: 800px) {
  .price {
    display: none;
  }
  .container_for_main_filtres {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .search_input {
    width: 100%;
    max-width: 100% !important;
  }
  .search {
    margin-left: 0;
  }

  .container_for_filtres {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .price {
    gap: 20px;
    flex-direction: column;
    width: 100%;
  }
  .filtres {
    width: 100%;
    padding: 10px;
  }
}

</style>
