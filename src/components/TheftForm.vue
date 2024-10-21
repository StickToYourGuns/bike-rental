<template>
    <form @submit.prevent="sendReport" class="theft-form">
        <div :style="{ top: this.error ? '-60px' : '0' }" class="theft-form-message_error">
            {{ error }}
        </div>
        <label for="licenseNumber">Номер лицензии *</label>
        <input v-model="theftForm.licenseNumber" name="licenseNumber" id="licenseNumber" type="text"
            :style="{ borderBottom: theftForm.licenseNumber ? 'none' : '2px solid red' }">
        <label for="ownerFullName">Имя владельца *</label>
        <input v-model="theftForm.ownerFullName" name="ownerFullName" id="ownerFullName" type="text"
            :style="{ borderBottom: theftForm.ownerFullName ? 'none' : '2px solid red' }">
        <label for="type">Тип велосипеда *</label>
        <Dropdown @click.prevent v-model="theftForm.type" :items="dropdownItemsType" id="type" />
        <label for="color">Цвет велосипеда *</label>
        <Dropdown @click.prevent v-model="theftForm.color" :items="dropdownItemsColor" :color="color" id="color" />
        <!-- <label for="type">Тип велосипеда *</label>
        <Dropdown @click.prevent :items="dropdownItemsType" @select-type="selectType" id="type" />
        <label for="color">Цвет велосипеда *</label>
        <Dropdown @click.prevent :items="dropdownItemsColor" :color="color" @select-type="selectColor" /> -->
        <label for="date">Дата кражи *</label>
        <input v-model="theftForm.date" name="date" id="date" type="date"
            :style="{ borderBottom: theftForm.date ? 'none' : '2px solid red' }">
        <!-- <label v-if="!this.isLogged" for="date">ID клиента *</label> -->
        <!-- <input v-if="!this.isLogged" v-model="theftForm.clientId" name="clientId" id="clientId" type="text"
            :style="{ borderBottom: theftForm.clientId ? 'none' : '2px solid red' }"> -->
        <label for="description">Дополнительная информация</label>
        <textarea v-model="theftForm.description" name="description" id="description">

        </textarea>
        <div class="theft_form__buttom">
            <div class="theft_form__buttom-sended" :style="{ backgroundColor: this.color, color: visibleColor }"
                :class="{ sended: isSended }">

            </div>
            <div class="theft_form__buttom-left" :class="{ sended: isSended }">Send report</div>
            <button class="theft_form__buttom-right" :class="{ sended: isSended }"
                :style="{ backgroundColor: this.color ? this.color : 'var(--red)' }" type="submit">
                <img src="/src/assets/pics/bicycle.svg" alt="">

            </button>
        </div>
    </form>
</template>

<script>
import Dropdown from "../components/UI/Dropdown.vue";
import { useAuthStore } from "@/stores/auth";
import { useTheftStore } from '@/stores/thefts.js';
import { mapState } from 'pinia'

export default {
    components: {
        Dropdown,
    },
    data() {
        return {
            theftForm: {
                ownerFullName: '',
                licenseNumber: '',
                type: '',
                color: '',
                date: '',
                // clientId: JSON.parse(localStorage.getItem('clientID')).clientID,
                description: '',
            },
            dropdownItemsType: ['', 'general', 'sport'],
            dropdownItemsColor: ['', 'red', 'green', 'blue', 'yellow', 'orange', 'cyan', 'purple', 'white', 'grey'],
            color: 'var(--red)',
            isSended: false,
            error: null,
        }
    },
    methods: {
        selectType(selected) {
            this.theftForm.type = selected;
        },
        selectColor(selected) {
            this.theftForm.color = selected;
            switch (selected) {
                case 'red':
                    this.color = 'var(--red)'
                    break;
                case 'green':
                    this.color = 'var(--green)'
                    break;
                case 'blue':
                    this.color = 'var(--blue)'
                    break;
                case 'yellow':
                    this.color = 'var(--yellow)'
                    break;
                case 'orange':
                    this.color = 'var(--orange)'
                    break;
                case 'cyan':
                    this.color = 'var(--cyan)'
                    break;
                case 'purple':
                    this.color = 'var(--purple)'
                    break;
                case 'white':
                    this.color = 'var(--white)'
                    break;
                case 'grey':
                    this.color = 'var(--dark3)'
                    break;
                default:
                    break;
            };
            this.$emit('select-color', this.color);
        },
        async sendReport() {
            if (this.isLogged) { // Если залогинен
                if (this.theftForm.licenseNumber && this.theftForm.ownerFullName && this.theftForm.type && this.theftForm.color && this.theftForm.date && this.theftForm.description) {
                    await this.theftStore.createCase({
                        ownerFullName: this.theftForm.ownerFullName,
                        licenseNumber: this.theftForm.licenseNumber,
                        type: this.theftForm.type,
                        color: this.theftForm.color,
                        date: this.theftForm.date,
                        officer: JSON.parse(localStorage.getItem('userInfo')).id,
                        description: this.theftForm.description,
                    });
                    if (!this.error) {
                        this.isSended = true;
                        setTimeout(() => {
                            this.isSended = false;
                            this.theftForm.ownerFullName = '';
                            this.theftForm.licenseNumber = '';
                            this.theftForm.type = '';
                            this.theftForm.color = '';
                            this.theftForm.date = '';
                            this.theftForm.description = ''
                        }, 5000)
                    }
                } else {
                    this.error = 'Заполните все поля';
                    setTimeout(() => {
                        this.error = null;
                    }, 1000)
                }
            }

            else { //если не залогинен
                if (this.theftForm.licenseNumber && this.theftForm.ownerFullName && this.theftForm.type && this.theftForm.color && this.theftForm.date && this.theftForm.description) {
                    await this.theftStore.createCasePublic({
                        ownerFullName: this.theftForm.ownerFullName,
                        licenseNumber: this.theftForm.licenseNumber,
                        type: this.theftForm.type,
                        color: this.theftForm.color,
                        date: this.theftForm.date,
                        clientId: JSON.parse(localStorage.getItem('clientID')).clientID,
                        description: this.theftForm.description,
                    });
                    if (!this.error) {
                        this.isSended = true;
                        setTimeout(() => {
                            this.isSended = false;
                            this.theftForm.ownerFullName = '';
                            this.theftForm.licenseNumber = '';
                            this.theftForm.type = '';
                            this.theftForm.color = '';
                            this.theftForm.date = '';
                            this.theftForm.description = '';
                        }, 5000)
                    }
                } else {
                    this.error = 'Заполните все поля';
                    setTimeout(() => {
                        this.error = null;
                    }, 1000)
                }
            }
        },
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
        theftStore() {
            return useTheftStore();
        },
        ...mapState(useAuthStore, {
            isLogged: 'isLogged',
        }),
        ...mapState(useTheftStore, {
            error: 'error',
        }),
        visibleColor() {
            switch (this.color) {
                case 'var(--yellow)':
                    return 'black';
                    break
                case 'var(--cyan)':
                    return 'black';
                    break
                case 'white':
                    return 'black';
                    break
                default:
                    return 'white';
            }
        },
    }
}
</script>

<style scoped>
.theft-form {
    background-color: black;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: var(--text1);
    align-items: left;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
}

.theft-form-message_error {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    text-align: center;
    position: absolute;
    position: absolute;
    background-color: var(--red);
    color: white;
    width: 90%;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    margin-inline: auto;
    transition: .5s;
    z-index: -1;
}

.theft-form-message_error::before {
    content: '';
    position: absolute;
    left: -10px;
    top: -20px;
    border-top: 20px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 60px solid var(--red);
}

.theft-form-message_error::after {
    content: '';
    position: absolute;
    right: -10px;
    top: -20px;
    border-top: 20px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 60px solid var(--red);
}

input {
    background: none;
    border: none;
    border-bottom: 2px solid var(--text1);
    font-size: 30px;
    color: white;
    font-family: 'Red October';
}

input:focus {
    outline: none;
}

/* input:invalid {
    border-bottom: 2px solid var(--red);
} */

textarea {
    background: none;
    border: none;
    color: white;
    font-family: 'Red October';
    height: 100%;
    /* border-left: 2px solid var(--text1);
    border-right: 2px solid var(--text1); */
    border-bottom: 2px solid var(--text1);
    font-size: 20px;
}

textarea:focus {
    outline: none;
}

.theft_form__buttom {
    display: flex;
    height: 15%;
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;
    transition: 1s;
}

.theft_form__buttom-sended {
    position: absolute;
    width: 0;
    height: 100%;
    text-align: center;
    align-content: center;
    font-size: 30px;
    /* background: var(--dark2); */
    z-index: -1;
    overflow: hidden;
    transition: 1s;
    z-index: 1;
}

/* .theft_form__buttom-sended::before {
    content: 'Report sended';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    width: fit-content;
    margin-inline: auto;
} */


.theft_form__buttom-sended::before {
    content: 'Report sended';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: fit-content;
    margin-inline: auto;
    opacity: 0;
    /* color: white; */
    /* Изначально скрыто */
    transition: opacity 1s ease 1s;
    /* Плавное появление с задержкой в 2 секунды */
}

.theft_form__buttom-sended.sended::before {
    opacity: 1;
    /* Показываем контент */
    /* z-index: 2; Увеличиваем z-index чтобы передать перед другими элементами */
}


.theft_form__buttom-sended.sended {
    width: 100%;
    display: block;
}

.theft_form__buttom-left {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    background-color: var(--dark2);
    color: var(--text1);
}

.theft_form__buttom-left.sended {
    opacity: 0;
}

.theft_form__buttom-right {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: var(--orange); */
    border: 0;
    cursor: pointer;
    transition: .4s;
}

.theft_form__buttom-right.sended {
    opacity: 0;
}

.theft_form__buttom-right:hover {
    scale: 1.1;
}

.theft_form__buttom-right:hover img {
    scale: 1.1;
}

img {
    height: 50%;
    transition: .4s;
}
</style>