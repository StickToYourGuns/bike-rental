<template>
  <!-- <Loader :isLoading="isLoading" /> -->
  <div>
    <transition>
      <WelcomeItem v-show="firstTimeBannerVisible" @submit="hideWelcomeBanner" @hideWelcomeBanner="hideWelcomeBanner" />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import Info from "./components/UI/Info.vue";
import WelcomeItem from './components/WelcomeItem.vue';

export default {
  components: {
    WelcomeItem,
    Info
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem('userToken')),
      clientID: JSON.parse(localStorage.getItem('clientID')),
      firstTimeBannerVisible: false
    };
  },
  methods: {
    hideWelcomeBanner() {
      this.firstTimeBannerVisible = false;
    }
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  mounted() {
    if (this.token) {
      this.authStore.auth()
    };
    if (!this.clientID) {
      this.firstTimeBannerVisible = true;
    }
  }
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
