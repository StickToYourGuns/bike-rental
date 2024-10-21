<template>
    <transition>
        <AuthForm v-if="authFormVisible" :type="type" :color="textColor" @hide-form="hideAuthForm"
            @update-type="updateType" />
    </transition>
    <div class="menu" :class="{ 'hovered': isHovered, 'not-hovered': !isHovered }" @mouseover="isHovered = true"
        @mouseleave="isHovered = false">
        <div v-if="!isLogged" class="menu__auth-container">
            <a @click="showAuthForm(); this.type = 'signUp'" :style="{ color: textColor }" class="menu-item">Sign up</a>
            <a @click="showAuthForm(); this.type = 'signIn'" class="menu-item">Sign in</a>
        </div>
        <div v-else class="menu__auth-container">
            <span class="menu-item">{{ firstName }}</span>
            <a @click="logOut()" class="menu-item" :style="{ color: textColor }">Log Out</a>
        </div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth";
import AuthForm from "./AuthForm.vue";

export default {
    components: {
        AuthForm
    },
    props: {
        textColor: {
            type: String
        }
    },
    data() {
        return {
            authStore: useAuthStore(),
            authFormVisible: false,
            type: '',
            isHovered: false,
        }
    },
    methods: {
        showAuthForm() {
            this.authFormVisible = true;
        },
        hideAuthForm() {
            this.authFormVisible = false;
        },
        updateType(newType) {
            this.type = newType;
        },
        logOut() {
            this.authStore.logOut();
            this.$router.push('/');
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            isLogged: 'isLogged',
            firstName: 'userName',
        })
    }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: -50px;
    font-size: 20px;
    text-transform: uppercase;
    background-color: var(--dark2);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
    padding-bottom: 5px;
    box-shadow: 2px 5px 10px black;
    transition: .4s;
    animation-duration: 1s;
    animation-name: jumping;
    min-width: 400px;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
}

.menu__auth-container {
    width: 100%;
    justify-content: space-evenly;
    text-align: center;
    display: flex;
}

@keyframes jumping {
    from {
    }

    50% {
        bottom: -40px;
        box-shadow: 2px 5px 50px black;
    }

    to {
    }
}

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

a.menu-item:hover {
    background: rgba(170, 170, 170, 0.062);
    transition: 0.5s;
}
</style>