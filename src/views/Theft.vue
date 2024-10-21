<template>
  <div class="content">
    <div class="content__left">
      <TheftForm @select-color="selectColor" />
    </div>
    <div class="content__right">
      <div class="greet">
        <h1 :style="{ color: textColor }"><span>Theft</span><br> report form</h1>
      </div>
      <nav>
        <MainLink v-for="link in links" :key="link" :link="link" :color="textColor" />
      </nav>
    </div>
    <MainMenu :textColor="textColor" />
  </div>
</template>

<script>
import TheftForm from "../components/TheftForm.vue";
import MainLink from "../components/UI/MainLink.vue";
import MainMenu from "../components/MainMenu.vue";
import { useAuthStore } from "@/stores/auth";
import { mapState } from 'pinia'

export default {
  components: {
    TheftForm,
    MainLink,
    MainMenu,
  },
  data() {
    return {
      textColor: 'var(--red)',
    }
  },
  methods: {
    selectColor(color) {
      this.textColor = color;
    },
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    ...mapState(useAuthStore, {
      isLogged: 'isLogged',
    }),
    links() {
      return [
        {
          name: 'Main',
          discription: 'return to main page.',
          link: '/',
          meta: false
        },
        {
          name: 'Reports',
          discription: 'Page with all theft reports.',
          link: '/reports',
          meta: !this.isLogged
        },
        {
          name: 'Officers',
          discription: 'Page with all officers.',
          link: '/officers',
          meta: !this.isLogged
        },
      ]
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  padding: 100px;
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.content__left {
  width: 50%;
  height: 100%;
}

.content__right {
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.greet {
  line-height: 80px;
}

.greet span {
  font-size: 122px;
  color: black;
}

h1 {
  font-weight: bold;
  font-size: 60px;
  text-transform: uppercase;
  transition: .6s ease-in-out;
}

h1 span {
  letter-spacing: 14px;
}

nav {
  display: flex;
  flex-direction: column;
  text-align: right;
}
</style>