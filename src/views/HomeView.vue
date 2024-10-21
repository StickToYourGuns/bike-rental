<template>
  <main :style="{ backgroundImage: backgroundImage }">
    <div class="content">
      <div class="greet">
        <h1 :style="{ color: textColor }"><span>Bicycle</span><br> rental service</h1>
      </div>
      <nav>
        <MainLink v-for="link in links" :key="link" :link="link" @change-theme="changeTheme" />
      </nav>
    </div>
    <MainMenu :textColor="textColor" />
  </main>
</template>

<script>
import MainLink from "../components/UI/MainLink.vue";
import MainMenu from "../components/MainMenu.vue";

export default {
  components: {
    MainLink,
    MainMenu,
  },
  data() {
    return {
      backgroundImage: 'url(/src/assets/pics/bike.png)',
      textColor: 'var(--orange)',
      links: [
        {
          name: 'Rent',
          discription: 'Choose from a variety of top-quality bicycles, available for rent at the most convenient locations across the city. Easy booking and hassle-free returns.',
          link: '/'
        },
        {
          name: 'Be safe',
          discription: 'Your safety is our priority. All bikes are regularly maintained, and we offer 24/7 support to ensure a secure and enjoyable ride.',
          link: '/safety'
        },
        {
          name: 'Theft',
          discription: 'If your bicycle has been stolen, quickly report it here to initiate the recovery process. Our team is dedicated to assisting you in tracking down your bike and providing the necessary support.',
          link: '/theft'
        },
      ]
    }
  },
  methods: {
    changeTheme(name) {
      if (name == 'Rent') {
        this.backgroundImage = 'url(/src/assets/pics/bike.png)'
        this.textColor = 'var(--orange)';
      } else if (name == 'Be safe') {
        this.backgroundImage = 'url(/src/assets/pics/helmet.png)';
        this.textColor = 'var(--green)';
      } else if (name == 'Theft') {
        this.backgroundImage = 'url(/src/assets/pics/theft.png)'
        this.textColor = 'var(--red)';
      }
    },
    // showAuthForm() {
    //   this.authFormVisible = true;
    // },
    // hideAuthForm() {
    //   this.authFormVisible = false;
    // },
    // updateType(newType) {
    //   this.type = newType;
    // }
  },
  // computed: {
  //   ...mapState(useAuthStore, {
  //     isLogged: 'isLogged'
  //   })
  // }
}
</script>

<style scoped>
/* .v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */


main {
  background-repeat: no-repeat;
  background-position: left bottom 50px;
  background-size: 95vh;
  width: 100%;
  height: 100vh;
  position: relative;
  transition: .4s ease-in-out;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 100px 100px 100px 0;
  height: 100%;
  justify-content: space-between;
}

nav {
  display: flex;
  flex-direction: column;
  text-align: right;
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

/* .menu {
  position: absolute;
  bottom: -40px;
  font-size: 20px;
  text-transform: uppercase;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  max-width: 500px;
  min-width: auto;
  background-color: var(--dark2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  padding-bottom: 5px;
  box-shadow: 2px 5px 10px black;
  transition: .4s;
  animation-duration: 1s;
  animation-name: jumping;
} */

/* @keyframes jumping {
  from {
    bottom: -50px;
  }
  50% {
    bottom: -40px;
    scale: 1.1;
    box-shadow: 2px 5px 50px black;
  }
  to {
    bottom: -50px;
  }
} */
/* 
.menu.hovered {
  bottom: 0;
}

.menu-item {
  text-decoration: none;
  color: black;
  padding: 10px;
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  margin: 0;

}

.menu__auth-container {
  display: flex;
  justify-content: space-evenly;
}

a:hover {
  background: rgba(170, 170, 170, 0.062);
  transition: 0.5s;
} */
</style>