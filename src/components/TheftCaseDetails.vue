<template>
    <div>
        <div class="theftCase__details__container">
            <div class="theftCase__details__container__content">
                <div class="theftCase__details__container__content__more" :style="{ color: colorSetter }">
                    <div class="theftCase__details__container__content__more__left">
                        <ul>
                            <li><span class="theftCase__details__container__content__more-info">Date of theft:
                                    <br></span>
                                {{ dateFormatter(theftCase.date) }}</li>
                            <li><span class="theftCase__details__container__content__more-info">ownerFullName:
                                    <br></span>
                                {{ theftCase.ownerFullName }}</li>
                            <li><span class="theftCase__details__container__content__more-info">licenseNumber:
                                    <br></span>
                                {{ theftCase.licenseNumber }}</li>
                            <li><span class="theftCase__details__container__content__more-info">type: <br></span>
                                {{ theftCase.type }}</li>
                            <li><span class="theftCase__details__container__content__more-info">color: <br></span>
                                {{ theftCase.color }}</li>
                        </ul>
                    </div>
                    <div class="theftCase__details__container__content__more__right">
                        <ul>
                            <li><span class="theftCase__details__container__content__more-info">created at: <br></span>
                                {{ dateFormatter(theftCase.createdAt) }}</li>
                            <li v-if="theftCase.updatedAt"><span
                                    class="theftCase__details__container__content__more-info">updated at: <br></span>
                                {{ dateFormatter(theftCase.updatedAt) }}</li>
                            <li><span class="theftCase__details__container__content__more-info">officer: <br></span>
                                {{ officerName() }}</li>
                            <li v-if="theftCase.resolution"><span
                                    class="theftCase__details__container__content__more-info">resolution: <br></span>
                                {{ theftCase.resolution }}</li>
                            <li v-if="this.resolution"><span
                                    class="theftCase__details__container__content__more-info">resolution: <br></span>
                                    <textarea name="resolution" id="resolution" v-model="resolutionText" placeholder="type something"></textarea>
                                </li>
                        </ul>
                    </div>
                    <div class="theftCase__details__container__content__more__bottom">
                        <span class="theftCase__details__container__content__more-info">description:
                            <br></span>
                        <div class="theftCase__details__container__content__more-info description">
                            {{ theftCase.description }}
                        </div>
                    </div>
                </div>
            </div>
            <Transition>
            <CaseButtons :resolutionText="resolutionText"  :theftCase="theftCase" :cardType="cardType" @addResolution="addResolution" @closeReport="closeReport(2, theftCase._id, this.resolutionText)" />
            </Transition>
            <button class="theftCase__details__container-hide" @click="hideDetails">
                x
            </button>
        </div>
    </div>
</template>

<script>
import { useTheftStore } from '@/stores/thefts.js';
import { useOfficersStore } from '@/stores/officers.js';
import { mapState } from 'pinia'
import CaseButtons from './UI/CardButtons.vue';

export default {
    data() {
        return {
            resolution: null,
            resolutionText: '',
            cardType: 'theft'
        }
    },
    components: {
        CaseButtons
    },
    props: {
        theftCase: {
            type: Object
        }
    },
    methods: {
        hideDetails() {
            this.$emit('hideDetails')
        },
        dateFormatter(string) {
            let date = new Date(string);
            return date.toLocaleString("ru");
        },
        officerName() {
            const officer = this.officersStore.officers.find(officer => officer._id === this.theftCase.officer);
            return officer ? `${officer.firstName} ${officer.lastName}` : 'Unknown';
        },
        addResolution() {
            this.resolution = this.resolution ? null : true;
        },
        closeReport(step, id, resolutionText) {
            if (this.resolution) {
                this.theftStore.editCase(step, id, resolutionText);
                this.resolution = null;
            }
        },
    },
    computed: {
        theftStore() {
            return useTheftStore()
        },
        officersStore() {
            return useOfficersStore()
        },
        ...mapState(useOfficersStore, {
            officers: 'officers',
        }),
        colorSetter() {
            switch (this.theftCase.status) {
                case 'new':
                    return 'var(--red)';
                case 'in_progress':
                    return 'var(--yellow)';
                default:
                    return 'var(--green)';
            }
        },
    }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

ul {
    color: var(--text1);
    font-size: 20px;
    list-style: none;
    padding: 10px;
}

.theftCase__details__container {
    backdrop-filter: blur(3px);
    height: 100%;
    width: 100%;
    padding: 40px 100px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.theftCase__details__container__content {
    display: flex;
    justify-content: center;
    width: 50%;
    height: 100%;
    background-color: #000000ef;
    border-radius: 10px;
}

.theftCase__details__container__content__more {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: -10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "left right"
        "full full";
    column-gap: 40px;
}

.theftCase__details__container__content__more__left {
    grid-column: 1;
    grid-row: 1;
}

.theftCase__details__container__content__more__right {
    grid-column: 2;
    grid-row: 1;
}

.theftCase__details__container__content__more__bottom {
    grid-column: 1 / span 2;
    grid-row: 2;
    margin: 10px;
    color: var(--text1);
}

.theftCase__details__container__content__more-info {
    font-size: 10px;
    color: var(--text2);
}

textarea {
    width: 100%;
    background-color: transparent;
    height: 100px;
    color: white;
    font-family: 'Red October';
}

.description {
    background: black;
    font-size: 20px;
}

.theftCase__details__container-hide {
    position: absolute;
    background: none;
    top: 10px;
    right: 30px;
    color: white;
    border: 1px solid var(--text2);
    border-radius: 5px;
    cursor: pointer;
    padding: 3px 5px;
    transition: .25s;
}

.theftCase__details__container-hide:hover {
    background-color: var(--text1);
    color: black;
}
</style>