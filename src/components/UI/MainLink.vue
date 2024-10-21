<template>
    <div v-if="!link.meta" class="a__container" @click="pushTo(link.link)" @mouseover="changeTheme(); applyShadow()"
        @mouseleave="resetShadow">
        <!-- <RouterLink :style="{ textShadow: textShadow }">{{ link.name }}</RouterLink> -->
        <a :style="{ textShadow: textShadow }" @click="pushTo(link.link)" >{{ link.name }}</a>
        <span>{{ link.discription }}</span>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default {
    data() {
        return {
            textShadow: ''
        }
    },
    props: {
        link: {
            type: Object,
            required: true
        },
        color: {
            type: String
        }
    },
    methods: {
        changeTheme() {
            this.$emit("change-theme", this.link.name)
        },
        applyShadow() {
            if (this.link.name == 'Rent') {
                this.textShadow = '-30px 20px 100px var(--orange)';
            } else if (this.link.name == 'Be safe') {
                this.textShadow = '-30px 20px 100px var(--green)';
            } else if (this.link.name == 'Theft') {
                this.textShadow = '-30px 20px 100px var(--red)';
            } else if (this.link.name == 'Reports') {
                this.textShadow = `-30px 20px 100px ${this.color}`;
            } else if (this.link.name == 'Officers') {
                this.textShadow = `-30px 20px 100px ${this.color}`;
            } else if (this.link.name == 'Main') {
                this.textShadow = '-30px 20px 100px var(--text1)';
            }
        },
        resetShadow() {
            this.textShadow = ''
        },
        pushTo(link) {
            this.$router.push(link);
        }
    },
    // computed: {
    //     authStore() {
    //         return useAuthStore()
    //     },
    //     ...mapState(useAuthStore, {
    //         isLogged: 'isLogged',
    //     }),
    // }
}
</script>

<style scoped>
.a__container {
    position: relative;
    cursor: pointer;
}

.a__container span {
    position: absolute;
    top: 50%;
    width: 100%;
    left: 0;
    color: var(--text1);
}

.a__container:hover span {
    color: white;
    transition: .5s;
}

.a__container a {
    position: relative;
    font-size: 100px;
}
</style>