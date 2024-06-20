<script setup lang="ts">
import {defineEmits, reactive, watch} from 'vue'
import { ref } from "vue";
import { useCounterStore } from '../../main.ts'
import { storeToRefs } from "pinia";



// массив для хранения типа организаций
const itemsOrganizations = ref([]);
const itemsTypes = ref([]);


const dataFromInputs = reactive({});

const emit = defineEmits(['sendDataFromInputs', 'resetAllFilters']);

const sendDataFromInputs = () => {
  emit('sendDataFromInputs', dataFromInputs);
}

const resetAllFilters = () => {
  emit('resetAllFilters');
}

const store = useCounterStore();
const {educationTabs} = storeToRefs(store)
educationTabs.value = "государственные вузы";

// подписываемся на обновления стора
store.$subscribe(() => {
  store.dataOrganizations.forEach(item => {
    // при переходе между вкладками, необходимо обнулить массив с организацями, чтобы снова проитерироваться
    // по ним и запушить в массив только те, что подходят по типу
    if (item.type == educationTabs.value) {
      itemsOrganizations.value.push(item.shortTitle);
      itemsTypes.value.push(item.type);
    }
  });
})

watch(educationTabs, () => {
  itemsOrganizations.value = [];
  itemsTypes.value = [];
})

const resetFilters = () => {
  delete dataFromInputs.title
  delete dataFromInputs.type
}


</script>

<template>
  <div class="wrapper" style="margin-top: 50px;">
    <div class="container_for_main_filtres">
      <v-combobox class="search_input_main"
                  clearable
                  multiple
                  chips
                  label="наименование организации"
                  :items="[...new Set(itemsOrganizations)]"
                  :single-line='true'
                  v-model="dataFromInputs.title"
                  @input.native = "dataFromInputs.title = $event.srcElement.value"
      ></v-combobox>
      <button class="search" @click="sendDataFromInputs">Найти</button>
    </div>

    <div class="container_for_other_filtres" style="margin-top: 20px">
      <v-expansion-panels>
        <v-expansion-panel title="дополнительные фильтры">
          <v-expansion-panel-text>
            <div class="container_for_filtres">
              <v-combobox
                  class="search_input"
                  clearable
                  multiple
                  chips
                  :single-line='true'
                  label="тип организации"
                  :items="[... new Set(itemsTypes)]"
                  v-model="dataFromInputs.type"
                  @input.native = "dataFromInputs.type = $event.srcElement.value"
              ></v-combobox>
              <v-combobox
                  class="search_input"
                  style="max-width: max-content"
                  chips
                  clearable multiple
                  label="оксо"
                  :items="[]"
              ></v-combobox>
              <v-combobox
                  class="search_input"
                  style="max-width: max-content"
                  chips
                  clearable multiple
                  label="вак"
                  :items="[]"
              ></v-combobox>
              <button class="filtres font_edit" @click="sendDataFromInputs">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H14L8.6336 6.93628V14.7075L5.81623 16L5.63472 6.93628L0 0Z" fill="#071937"/>
                </svg>
                фильтровать
              </button>
              <button class="filtres" @click="resetFilters">
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
.search_input {
  min-width: 150px;
  border-top: 1px solid #D6D6EB;
  border-left: 1px solid #D6D6EB;
  border-right: 1px solid #D6D6EB;
}

.search_input_main {
  max-width: 100%;
  border-top: 1px solid #D6D6EB;
  border-left: 1px solid #D6D6EB;
  border-right: 1px solid #D6D6EB;
}

.container_for_main_filtres {
  display: flex;
  margin: 0 auto;
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
  margin: 0 auto;
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
    gap: 10px;
    align-items: center;
  }

  .search_input {
    max-width: 100% !important;
    width: 100%;
  }
  .filtres {
    padding: 15px;
    max-width: 100%;
  }
}

</style>
