<template>
  <div class="chatbot-container">
    <div class="header">
      <img src="../../public/bird.svg" alt="Logo" class="logo" />
      <h1>NEURO STUDY</h1>
    </div>
    <div class="chat-window">
      <div class="messages" ref="messagesContainer">
        <transition-group name="fade" tag="div">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message"
            :class="{ 'user-message': msg.isUser, 'bot-message': !msg.isUser }"
          >
            <span v-if="msg.isUser"><h2>Вы:</h2></span>
            <span v-else><h2>NEURO STUDY:</h2></span>
            <p>{{ msg.text }}</p>
          </div>
        </transition-group>
        <div v-if="loading" class="loader">
          <div class="loader-dot"></div>
          <div class="loader-dot"></div>
          <div class="loader-dot"></div>
        </div>
      </div>
      <div class="input-area">
        <input
          type="text"
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Введите сообщение..."
          @focus="inputFocused = true"
          @blur="inputFocused = false"
          :class="{ 'input-focused': inputFocused }"
        />
        <button @click="sendMessage" :class="{ 'button-active': inputFocused }">Отправить</button>
        <button @click="clearChat" class="clear-button">Очистить чат</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const userInput = ref('');
const messages = ref([]);
const loading = ref(false);
const inputFocused = ref(false);
const messagesContainer = ref(null);

// Загрузка сообщений из localStorage
const loadMessages = () => {
  const storedMessages = localStorage.getItem('chatHistory');
  if (storedMessages) {
    messages.value = JSON.parse(storedMessages);
  }
};

// Сохранение сообщений в localStorage
const saveMessages = () => {
  localStorage.setItem('chatHistory', JSON.stringify(messages.value));
};

// Отправка сообщения
const sendMessage = async () => {
  if (userInput.value.trim() === '') return;

  // Добавление сообщения пользователя
  messages.value.push({ text: userInput.value, isUser: true });
  const input = userInput.value;
  userInput.value = '';
  loading.value = true;
  nextTick(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    });

  // Сохраняем текущее состояние в localStorage
  saveMessages();

  try {
    const response = await fetch('http://localhost:3000/api/chatBird', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    console.log(data)
    messages.value.push({ text: data.answer, isUser: false });

    // Сохранение обновленного списка сообщений в localStorage
    saveMessages(); 
  } catch (error) {
    messages.value.push({ text: 'Ошибка при отправке сообщения', isUser: false });
  } finally {
    loading.value = false;

    // Прокрутка к последнему сообщению
    nextTick(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    });
  }
  saveMessages();
};

// Очистка чата
const clearChat = () => {
  messages.value = [];
  localStorage.removeItem('chatHistory'); // Очистка localStorage
};

// Приветственное сообщение
const welcomeMessage = () => {
  if (messages.value.length === 0) {
    messages.value.push({
      text: 'Здравствуйте! Я — виртуальный помощник Neuro Study, готов помочь вам с любыми вопросами об образовательных программах и обучении. Обращайтесь! 🚀',
      isUser: false,
    });
  }
};

// Загрузка сообщений при монтировании компонента
onMounted(() => {
  loadMessages();
  welcomeMessage(); // Отправка приветственного сообщения при загрузке
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Inter", sans-serif; 
}

h1 {
  font-weight: 700;
}
h2 {
  font-weight: 700;
}

.chatbot-container {
  background: linear-gradient(to top, #4CC6C6, #FD7436);
  border-radius: 20px;
  padding: 16px;
  width: 70%; /* 70% ширины */
  height: 70vh; /* 70% высоты */
  margin: 0 auto; /* Центрирование */
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.chat-window {
  background: #F4F6F6;
  border-radius: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  overflow: hidden; /* Скрытие излишков контента */
  animation: fadeIn 0.5s; /* Анимация при загрузке */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  position: relative; /* Позиционирование для анимации */
}

.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 12px; /* Закругленные углы */
  position: relative;
  word-wrap: break-word; /* Перенос длинных слов */
  transition: background 0.3s, transform 0.2s;
  opacity: 0; /* Начальная непрозрачность для анимации */
  animation: fadeIn 0.3s forwards; /* Анимация появления сообщения */
}

.user-message {
  background: #D1E7DD; /* Цвет для сообщений пользователя */
  align-self: flex-end; /* Выравнивание сообщения пользователя вправо */
}

.bot-message {
  background: #E2E6EA; /* Цвет для сообщений бота */
  align-self: flex-start; /* Выравнивание сообщения бота влево */
}

.input-area {
  display: flex;
  margin-top: 10px;
}

.input-area input {
  flex: 1;
  padding: 12px;
  border: 2px solid #071937;
  border-radius: 20px; /* Закругленные углы */
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
  font-size: 16px; /* Увеличенный шрифт */
  background-color: #ffffff; /* Белый фон для ввода */
}

.input-area input.input-focused {
  border-color: #FD7436;
  box-shadow: 0 0 5px rgba(253, 116, 54, 0.5);
  background-color: #f9f9f9; /* Светлый фон при фокусе */
}

.input-area button {
  padding: 12px;
  background: #071937; /* Цвет кнопки */
  color: white;
  border: none;
  border-radius: 20px; /* Закругленные углы */
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.input-area button:hover {
  background: #0d4a6e; /* Более темный цвет при наведении */
  transform: scale(1.05); /* Увеличение при наведении */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Тень при наведении */
}

.clear-button {
  background: #e74c3c; /* Цвет кнопки очистки */
}

.clear-button:hover {
  background: #c0392b; /* Цвет кнопки очистки при наведении */
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.loader-dot {
  width: 10px;
  height: 10px;
  margin: 0 3px;
  border-radius: 50%;
  background-color: #071937;
  animation: loading 0.6s infinite alternate;
}

@keyframes loading {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .chatbot-container {
    width: 90%;
    height: 80vh; /* Измененная высота на мобильных устройствах */
  }
}
</style>
