<template>
  <div class="welcome">
    <div class="welcome__content">
      <div class="welcome__content--greet">
        <h1>Hello</h1>
        <p>Welcome to my humble project. For proper functionality, please come up with a code word for further
          interaction with the backend.</p>
      </div>
      <input type="text" v-model="clientID" minlength="5" required placeholder="At least 3 characters">
      <div class="welcome__buttom">
        <div class="welcome__buttom--left">Enter</div>
        <button @click="submit(clientID)" class="welcome__buttom--right" :style="{ backgroundColor: this.color }" type="submit">
          <img src="/src/assets/pics/bicycle.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';

export default {
  data() {
    return {
      clientID: ''
    }
  },
  methods: {
    submit(payload) {
      if (payload.length >= 3) {
        this.authStore.firstTime(payload);
        this.$emit('hideWelcomeBanner')
      }
    }
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  }
}
</script>

<style scoped>
h1 {
  color: var(--orange);
  margin-bottom: 50px;
}

p {
  text-align: justify;
}

input {
  width: 50%;
  align-self: center;
  height: 50px;
  background-color: var(--dark1);
  border: none;
  font-family: 'Red October';
  font-size: 30px;
  color: white;
  padding: 5px;
  text-align: center;
}

input:focus {
    outline: none;
}

input:invalid {
    border-bottom: 2px solid var(--orange);
}

.welcome {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 10;
  backdrop-filter: blur(10px);
  color: var(--text1);
}

.welcome__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60%;
  width: 60%;
  background: black;
  margin: auto;
  box-shadow: black 0 1px 10px;
  position: relative;
  transition: .6s;
}

.welcome__content--greet {
  display: flex;
  padding: 50px 50px 0 50px;
  flex-direction: column;
}

.welcome__buttom {
  display: flex;
  height: 15%;
  width: 100%;
  justify-content: space-between;
}

.welcome__buttom--left {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: var(--dark2);
  color: var(--text1);
}

.welcome__buttom--right {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  transition: .3s;
  background-color: var(--dark3);
}

.welcome__buttom--right:hover {
  background-color: var(--orange);
}

.welcome__buttom--right:hover img {
  scale: 1.1;
}

img {
  height: 50%;
  transition: .3s;
}
</style>