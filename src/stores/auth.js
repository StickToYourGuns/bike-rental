// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      token: "",
      user: {
        id: "",
        email: "",
        firstName: null,
        lastName: null,
        approved: false
      }
    },
    error: '',
    isLogged: false,
    redirrectToSignIn: false,
    userToken: JSON.parse(localStorage.getItem('userToken')) || null
  }),
  getters: {
    // getError(state) {
    //   return state.error
    // },
    // redirrect(state) {
    //   return state.redirrectToSignIn
    // },
    userName(state) {
      return state.user.user.firstName
    }
  },
  actions: {
    firstTime(payload) {
      localStorage.setItem('clientID', JSON.stringify({ clientID : payload }))
    },
    async signUp(payload) {
      this.error = '';
      try {
        let response = await axios.post('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', {
          ...payload
        });
        if (response.status !== 200) {
          this.error = response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.message;
        setTimeout(() => {
          this.error = ''
        }, 2000);
      }
    },
    async signIn(payload) {
      this.error = '';
      try {
        let response = await axios.post('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', {
          ...payload
        });
        if (response.status === 200) {
          this.user.token = response.data.data.token;
          this.redirrectToSignIn = true;
          localStorage.setItem('userToken', JSON.stringify({ token: this.user.token }))
          this.auth()
          setTimeout (() => {
            this.redirrectToSignIn = false;
          }, 1000)
        } else {
          this.error = err.response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async auth() {
      try {
        let response = await axios.get('https://sf-final-project-be.herokuapp.com/api/auth/', {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'headers': { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}` },
        });
        if (response.status == 200) {
          this.isLogged = true;
          this.user.user.id = response.data.data.user.id;
          this.user.user.email = response.data.data.user.email;
          this.user.user.firstName = response.data.data.user.firstName;
          this.user.user.lastName = response.data.data.user.lastName;
          this.user.user.approved = response.data.data.user.approved;
          localStorage.setItem('userInfo', JSON.stringify({
            id: this.user.user.id,
            email: this.user.user.email,
            firstName: this.user.user.firstName,
            lastName: this.user.user.lastName,
            approved: this.user.user.approved
          }))
        } else {
          this.logOut()
        }
      }
      catch (err) {
        this.logOut()
      }
    },
    logOut() {  
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      // localStorage.removeItem('clientID');
      this.isLogged = false;
    },
  }
})
