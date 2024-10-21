<template>
    <button @click="showSomething">i</button>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { useTheftStore } from '@/stores/thefts.js';
import { mapState } from 'pinia'

export default {
    data() {

    },
    methods: {
        showSomething() {
            alert (this.authStore.isLogged)
        }
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
        theftStore() {
            return useTheftStore();
        },
    }
}
</script>

<style scoped>
button {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 10px;
    background-color: black;
    color: white;
    cursor: pointer;
    z-index: 9;
    opacity: .1;
    transition: .5s;
}
button:hover {
    opacity: 1;
}
</style>