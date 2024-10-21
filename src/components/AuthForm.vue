<template>
  <div @click.stop="hideAuthForm" class="auth-form">
    <div @click.stop class="auth-form__container" :class="{ 'rotate': isRotated }">
      <div :style="{ top: this.error ? '-10%' : '0' }" class="auth-form__container-message_error">
        {{ error }}
      </div>
      <div :style="{ top: this.redirrect ? '-10%' : '0' }" class="auth-form__container-message_ok">
        Wait a second
      </div>
      <div class="auth-form__container__left">
        <img class="auth-form__container__left-img" :src="authImg" alt="">
      </div>
      <form @submit.prevent="sign" class="auth-form__container__right">
        <button @click.prevent="hideAuthForm" class="auth-form__container__right-close">x</button>

        <div v-if="this.type === 'signUp'" class="auth-form__container__right-form"
          :style="{ height: containerHeight }">
          <label for="email">e-mail *</label>
          <input v-model="signUpForm.email" name="email" id="email" type="email" required>
          <label for="password">password *</label>
          <input :style="{ color: this.color }" v-model="signUpForm.password" name="password" id="password"
            type="password" minlength="3" maxlength="12" required>
          <label for="firstName">first Name</label>
          <input v-model="signUpForm.firstName" name="firstName" id="firstName" type="text">
          <label for="lastName">last Name</label>
          <input v-model="signUpForm.lastName" name="lastName" id="lastName" type="text">
        </div>

        <div v-else class="auth-form__container__right-form">
          <label for="email">e-mail *</label>
          <input v-model="signInForm.email" name="email" id="email" type="email" required>
          <label for="password">password *</label>
          <input :style="{ color: this.color }" v-model="signInForm.password" name="password" id="password"
            type="password" minlength="3" maxlength="12" required>
        </div>

        <div class="auth-form__container__right__buttom">
          <div v-if="this.type === 'signUp'" class="auth-form__container__right__buttom-left">Register</div>
          <div v-if="this.type === 'signIn'" class="auth-form__container__right__buttom-left">Enter</div>
          <button class="auth-form__container__right__buttom-right" :style="{ backgroundColor: this.color }"
            type="submit">
            <img src="/src/assets/pics/bicycle.svg" alt="">
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { mapState } from 'pinia'
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      authStore: useAuthStore(),
      router: useRouter(),
      signUpForm: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        clientId: JSON.parse(localStorage.getItem('clientID')).clientID,
      },
      signInForm: {
        email: '',
        password: '',
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String
    },
    color: {
      type: String
    }
  },
  methods: {
    hideAuthForm() {
      this.$emit('hide-form')
    },
    handleKeyPress(event) {
      if (event.key === 'Escape') {
        this.hideAuthForm();
      }
    },
    updateType() {
      this.$emit('update-type', 'signIn');
    },
    async sign() {
      if (this.type === 'signUp') {
        await this.authStore.signUp({
          email: this.signUpForm.email,
          firstName: this.signUpForm.firstName,
          lastName: this.signUpForm.lastName,
          password: this.signUpForm.password,
          clientId: this.signUpForm.clientId
        })
        this.signUpForm.email = '';
        this.signUpForm.password = '';
        this.signUpForm.firstName = '';
        this.signUpForm.lastName = '';
        this.signUpForm.clientId = '';
        if (!this.error) {
          this.isRotated = !this.isRotated;
          setTimeout(() => {
            this.updateType();
          }, 200)
        }
      } else {
        await this.authStore.signIn({
          email: this.signInForm.email,
          password: this.signInForm.password
        })
        if (!this.error) {
          setTimeout(() => {
            this.signInForm.email = '';
            this.signInForm.password = '';
            this.hideAuthForm()
          }, 1000)
        }
      }
    }
  },
  computed: {
    ...mapState(useAuthStore, {
      error: 'error',
      redirrect: 'redirrectToSignIn',
    }),
    containerHeight() {
      return this.type === 'signUp' ? '80%' : '70%';
    },
    authImg() {
      return this.type === 'signUp' ? '/src/assets/pics/signUp.png' : '/src/assets/pics/signIn.png';
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 10;
  backdrop-filter: blur(10px);
  perspective: 1000px;
}

.auth-form__container {
  display: flex;
  height: 60%;
  width: 60%;
  background: black;
  margin: auto;
  box-shadow: black 0 1px 10px;
  position: relative;
  transition: .6s;
  backface-visibility: hidden;
}

.auth-form__container.rotate {
  transform: rotateY(360deg);
}

.auth-form__container-message_error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-align: center;
  position: absolute;
  position: absolute;
  background-color: var(--red);
  width: 90%;
  height: 60px;
  top: 0%;
  margin-left: 5%;
  transition: .5s;
  z-index: 0;
}

.auth-form__container-message_error::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 60px solid var(--red);
}

.auth-form__container-message_error::after {
  content: '';
  position: absolute;
  right: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 60px solid var(--red);
}

.auth-form__container-message_ok {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-align: center;
  position: absolute;
  position: absolute;
  background-color: var(--green);
  width: 90%;
  height: 60px;
  top: 0%;
  margin-left: 5%;
  transition: .5s;
  z-index: 0;
}

.auth-form__container-message_ok::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 60px solid var(--green);
}

.auth-form__container-message_ok::after {
  content: '';
  position: absolute;
  right: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 60px solid var(--green);
}

.auth-form__container__left {
  width: 40%;
  z-index: 1;
}

.auth-form__container__left-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.auth-form__container__right {
  display: flex;
  width: 60%;
  flex-direction: column;
  color: var(--text1);
  position: relative;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
  background-color: black;
}

.auth-form__container__right-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text1);
  cursor: pointer;
  transition: .3s;
}

.auth-form__container__right-close:hover {
  color: white;
}

.auth-form__container__right-form {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 60%;
  font-size: 20px;
  gap: 10px;
}


input {
  background: none;
  border: none;
  border-bottom: 2px solid var(--text1);
  font-size: 30px;
  color: white;
  font-family: 'Red October';
}

input:focus {
  outline: none;
}

input:invalid {
  border-bottom: 2px solid var(--red);
}

.auth-form__container__right__buttom {
  display: flex;
  height: 15%;
  width: 100%;
  justify-content: space-between;
}

.auth-form__container__right__buttom-left {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: var(--dark2);
  color: var(--text1);
}

.auth-form__container__right__buttom-right {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  transition: .3s;
}

.auth-form__container__right__buttom-right:hover {
  scale: 1.1;
}

.auth-form__container__right__buttom-right:hover img {
  scale: 1.1;
}

img {
  height: 50%;
  transition: .3s;
}

@media screen and (max-width: 1000px) {
  .auth-form__container__left {
    display: none;
  }

  .auth-form__container__right {
    width: 100%;
  }
}
</style>