<template>
    <div class="content">
        <div class="content__up">
            <NavService/>
            <div class="greet">
                <h1 :style="{ color: textColor }"><span>Officers</span><br> list of officers</h1>
            </div>
        </div>
        <div class="content__down">
            <OfficerCard v-for="officerCard in officers" :key="officerCard._id" :officerCard="officerCard"
                :isActive="activeCase === officerCard._id" @toggleDetails="toggleCase(officerCard._id)" @hideDetails="hideCase(officerCard._id)" />
        </div>
        <MainMenu :textColor="textColor" />
    </div>
</template>

<script>
import { useOfficersStore } from '@/stores/officers.js';
import { mapState } from 'pinia'
import MainLink from "../components/UI/MainLink.vue";
import MainMenu from "../components/MainMenu.vue";
import OfficerCard from "../components/OfficerCard.vue";
import NavService from "../components/UI/NavService.vue";

export default {
    components: {
        MainLink,
        MainMenu,
        OfficerCard,
        NavService
    },
    data() {
        return {
            textColor: 'var(--red)',
            links: [
                {
                    name: 'Main',
                    discription: 'return to main page.',
                    link: '/'
                },
                {
                    name: 'Reports',
                    discription: 'Page with all theft reports.',
                    link: '/reports'
                },
            ],
            activeCase: null,
        }
    },
    methods: {
        toggleCase(caseId) {
            this.activeCase = this.activeCase === caseId ? null : caseId;
        },
        hideCase (caseId) {
            this.activeCase = null
        }
    },
    mounted() {
        this.officersStore.getAllOfficers();
    },
    computed: {
        officersStore() {
            return useOfficersStore()
        },
        ...mapState(useOfficersStore, {
            officers: 'officers',
        }),
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    padding: 100px;
    position: relative;
    overflow: hidden;
    gap: 50px;
    min-height: 100vh;
}

.content__up {
    display: flex;
    width: 100%;
    justify-content: space-between;
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

.content__down {
    display: grid;
    height: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    gap: 40px;
}
</style>