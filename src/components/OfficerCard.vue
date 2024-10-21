<template>
    <div ref="info" class="officerCard"
        :style="{ color: colorSetter, marginBottom: addMargin, backgroundImage: setImage(officerCard.approved) }">
        <ul @click.stop="toggleDetails()">
            <li class="officerCard__info-mini">{{ (officerCard._id) }}</li>
            <li><span class="officerCard__info">First Name: <br></span>
                {{ officerCard.firstName }}</li>
            <li><span class="officerCard__info">Last Name: <br></span>
                {{ officerCard.lastName }}</li>
        </ul>
        <OfficerCardDetails v-show="isActive"
            :style="{ left: leftOffset, backgroundImage: setDetailsImage(officerCard.approved) }"
            class="officerCard__details" :officerCard="officerCard" @hideDetails="hideDetails" />
    </div>
</template>

<script>
import OfficerCardDetails from './OfficerCardDetails.vue';

export default {
    components: {
        OfficerCardDetails
    },
    props: {
        officerCard: {
            type: Object,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            position: null,
        }
    },
    methods: {
        toggleDetails() {
            this.$emit('toggleDetails');
            this.$nextTick(() => {
                const element = this.$refs.info;
                const rect = element.getBoundingClientRect();
                this.position = -(rect.left + window.pageXOffset) + 'px';
            });
        },
        hideDetails() {
            this.$emit('hideDetails')
        },
        setImage(approved) {
            return approved ? "url('/src/assets/pics/card-officer.jpg')" : "url('/src/assets/pics/card-officer-disabled.jpg')";
        },
        setDetailsImage(approved) {
            return approved ? "url('/src/assets/pics/card-officer-full.jpg')" : "url('/src/assets/pics/card-officer-disabled-full.jpg')";
        },
        // dateFormatter(string) {
        //     let date = new Date(string);
        //     return date.toLocaleString("ru");
        // },
    },
    computed: {
        colorSetter() {
            return this.officerCard.approved ? 'var(--green)' : 'var(--red)'
        },
        addMargin() {
            return this.isActive ? '540px' : setTimeout(() => '0', 1000);
        },
        leftOffset() {
            return this.isActive ? this.position : '1000px';
        },
    },
    mounted() {
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    backdrop-filter: blur(3px);
    padding: 10px;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    color: var(--text1);
    font-size: 20px;
}

.officerCard {
    height: 300px;
    width: 100%;
    background-color: var(--text1);
    background-position: center;
    position: relative;
    box-shadow: 0 -10px;
    border-radius: 10px;
    transition: .5s;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    backdrop-filter: blur(5px);
    filter: drop-shadow(5px 5px 20px black);
    line-height: 1;
}

.officerCard:hover {
    box-shadow: 0 -20px;
}

.officerCard__info {
    font-size: 10px;
    color: var(--text2);
}

.officerCard__info-mini {
    font-size: 12px;
    text-align: right;
    margin-bottom: 5px;
    cursor: auto;
}

.officerCard__details {
    position: absolute;
    cursor: auto;
    width: 100vw;
    height: 500px;
    top: 340px;
    left: 1000px;
    background-color: black;
    /* background-image: url(../assets/pics/card-officer-full.jpg); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: drop-shadow(5px 5px 20px black);
    color: var(--text1);
}
</style>
