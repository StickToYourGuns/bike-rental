<template>
    <div>
        <div class="officerCard__details__container">
            <div class="officerCard__details__container__content">
                <div class="officerCard__details__container__content__more" :style="{ color: colorSetter }">
                    <div class="officerCard__details__container__content__more__top">
                        <ul>
                            <li v-if="!this.editMode"><span
                                    class="officerCard__details__container__content__more-info">First Name:
                                    <br></span>
                                {{ officerCard.firstName }}</li>

                            <li v-else><span class="officerCard__details__container__content__more-info">First Name:
                                    <br></span>
                                <input :style="{ color: editingFirst }" v-model="this.firstName" name="firstName"
                                    id="firstName" type="text">
                            </li>

                            <li v-if="!this.editMode"><span
                                    class="officerCard__details__container__content__more-info">Last Name:
                                    <br></span>
                                {{ officerCard.lastName }}</li>

                            <li v-else><span class="officerCard__details__container__content__more-info">Last Name:
                                    <br></span>
                                <input :style="{ color: editingLast }" v-model="this.lastName" name="lastName"
                                    id="lastName" type="text">
                            </li>

                            <li><span class="officerCard__details__container__content__more-info">email: <br></span>
                                {{ officerCard.email }}</li>
                            <li :style="{ color: colorSetter }"><span
                                    class="officerCard__details__container__content__more-info">approved: <br></span>
                                {{ officerCard.approved ? 'yes' : 'no' }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <CardButtons :officerCard="officerCard" :cardType="cardType" :editMode="editMode" @setOfficer="setOfficer()"
                @pushOfficer="pushOfficer()" />
            <button class="officerCard__details__container-hide" @click="hideDetails">
                x
            </button>
        </div>
    </div>
</template>

<script>
import { useOfficersStore } from '@/stores/officers.js';
import { mapState } from 'pinia'
import CardButtons from './UI/CardButtons.vue';

export default {
    data() {
        return {
            cardType: 'officer',
            editMode: false,
            firstName: this.officerCard.firstName,
            lastName: this.officerCard.lastName
        }
    },
    components: {
        CardButtons
    },
    props: {
        officerCard: {
            type: Object
        }
    },
    methods: {
        hideDetails() {
            this.$emit('hideDetails')
        },
        setOfficer() {
            this.editMode = true;
        },
        setOfficerOff() {
            this.editMode = false;
        },
        pushOfficer() {
            this.officersStore.updateOfficer(this.officerCard._id, {
                firstName: this.firstName,
                lastName: this.lastName,
            });
            if (this.updated) {
                this.setOfficerOff();
            }
        },
    },
    computed: {
        colorSetter() {
            return this.officerCard.approved ? "var(--green)" : "var(--red)"
        },
        officersStore() {
            return useOfficersStore()
        },
        editingFirst() {
            if (this.firstName === this.officerCard.firstName) {
                return "var(--red)"
            }
        },
        editingLast() {
            if (this.lastName === this.officerCard.lastName) {
                return "var(--red)"
            }
        },
        ...mapState(useOfficersStore, {
            updated: 'updated',
        }),
    }
}
</script>

<style scoped>
ul {
    color: var(--text1);
    font-size: 20px;
    list-style: none;
    padding: 10px;
}

input {
    background: none;
    border: none;
    border-bottom: 2px solid var(--text1);
    font-size: 20px;
    color: white;
    font-family: 'Red October';
    padding-block: 0;
    padding-inline: 0;
    padding: 0;
    height: 19px;
    width: 100%;
}

input:focus {
    outline: none;
}

.officerCard__details__container {
    backdrop-filter: blur(5px);
    height: 100%;
    width: 100%;
    padding: 40px 100px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.officerCard__details__container__content {
    display: flex;
    justify-content: center;
    width: 50%;
    background-color: #000000ef;
    border-radius: 10px;
}

.officerCard__details__container__content__more {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: -10px 0;
    display: grid;
}

.officerCard__details__container__content__more__top {
    grid-column: 1;
    grid-row: 1;
}

.officerCard__details__container__content__more-info {
    font-size: 10px;
    color: var(--text2);
}

.officerCard__details__container__content__more__buttons {
    width: 10%;
    background-color: #fff;
}

.description {
    background: black;
}

.officerCard__details__container-hide {
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

.officerCard__details__container-hide:hover {
    background-color: var(--text1);
    color: black;
}
</style>