<template>
    <div class="content">
        <div class="content__up">
            <NavService />
            <div class="greet">
                <h1 :style="{ color: textColor }"><span>Reports</span><br> cases of theft</h1>
            </div>
        </div>
        <div class="content__down" v-if="cases.length > 0">
            <TheftCase v-for="theftCase in cases" :key="theftCase._id" :theftCase="theftCase"
                :isActive="activeCase === theftCase._id" @toggleDetails="toggleCase(theftCase._id)"
                @hideDetails="hideCase(theftCase._id)" />
        </div>
        <div class="content__down-empty" v-else>Phew, there are no cases in the reports.</div>
        <MainMenu :textColor="textColor" />
    </div>
</template>

<script>
import { useTheftStore } from '@/stores/thefts.js';
import { useOfficersStore } from '@/stores/officers.js';
import { mapState } from 'pinia'
import MainLink from "../components/UI/MainLink.vue";
import MainMenu from "../components/MainMenu.vue";
import TheftCase from "../components/TheftCase.vue";
import NavService from "../components/UI/NavService.vue";

export default {
    components: {
        MainLink,
        MainMenu,
        TheftCase,
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
        hideCase(caseId) {
            this.activeCase = null
        }
    },
    mounted() {
        this.theftStore.getAllCases();
        this.officersStore.getAllOfficers();
        console.log(this.cases);

    },
    computed: {
        theftStore() {
            return useTheftStore()
        },
        officersStore() {
            return useOfficersStore()
        },
        ...mapState(useTheftStore, {
            cases: 'cases',
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

.content__down-empty{
    display: flex;
    justify-content: center;
    margin-top: 10%;
}
</style>