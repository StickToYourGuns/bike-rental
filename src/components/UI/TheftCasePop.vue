<!-- <template>
  <div @click.stop="hidePop" class="theft-case-pop">
    <div class="theft-case-pop__container" >
      
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
        clientId: ''
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
    hidePop() {
      this.$emit('hide-form')
    },
    handleKeyPress(event) {
      if (event.key === 'Escape') {
        this.hidePop();
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
        this.signInForm.email = '';
        this.signInForm.password = '';
        if (!this.error) {
          setTimeout(() => {
            this.hidePop()
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
      return this.type === 'signUp' ? '80%' : '60%';
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
.theft-case-pop {
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

.theft-case-pop__container {
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

.theft-case-pop__container.rotate {
  transform: rotateY(360deg);
}

.theft-case-pop__container-message_error {
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

.theft-case-pop__container-message_error::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 60px solid var(--red);
}

.theft-case-pop__container-message_error::after {
  content: '';
  position: absolute;
  right: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 60px solid var(--red);
}

.theft-case-pop__container-message_ok {
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

.theft-case-pop__container-message_ok::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 60px solid var(--green);
}

.theft-case-pop__container-message_ok::after {
  content: '';
  position: absolute;
  right: -10px;
  top: -20px;
  border-top: 20px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 60px solid var(--green);
}

.theft-case-pop__container__left {
  width: 40%;
  z-index: 1;
}

.theft-case-pop__container__left-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.theft-case-pop__container__right {
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

.theft-case-pop__container__right-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text1);
  cursor: pointer;
  transition: .3s;
}

.theft-case-pop__container__right-close:hover {
  color: white;
}

.theft-case-pop__container__right-form {
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

.theft-case-pop__container__right__buttom {
  display: flex;
  height: 15%;
  width: 100%;
  justify-content: space-between;
}

.theft-case-pop__container__right__buttom-left {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: var(--dark2);
  color: var(--text1);
}

.theft-case-pop__container__right__buttom-right {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: var(--orange); */
  border: 0;
  cursor: pointer;
  transition: .3s;
}

.theft-case-pop__container__right__buttom-right:hover {
  scale: 1.1;
}

.theft-case-pop__container__right__buttom-right:hover img {
  scale: 1.1;
}

img {
  height: 50%;
  transition: .3s;
}

@media screen and (max-width: 1000px) {
  .theft-case-pop__container__left {
    display: none;
  }

  .theft-case-pop__container__right {
    width: 100%;
  }
}
</style> -->