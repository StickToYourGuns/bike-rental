<template>
    <div ref="info" class="theftCase"
        :style="{ color: colorSetter, marginBottom: addMargin, backgroundImage: setImage(theftCase.type) }">
        <ul @click.stop="toggleDetails()">
            <li class="theftCase__info-mini">{{ dateFormatter(theftCase.createdAt) }}</li>
            <li class="theftCase__info-mini">{{ (theftCase._id) }}</li>
            <li><span class="theftCase__info">Owner: <br></span>
                {{ theftCase.ownerFullName }}</li>
            <li><span class="theftCase__info">Type: <br></span>
                {{ theftCase.type }}</li>
        </ul>
        <transition name="fade">
            <TheftCaseDetails v-show="isActive"
                :style="{ left: leftOffset, backgroundImage: setDetailsImage(theftCase.type) }"
                class="theftCase__details" :theftCase="theftCase" @hideDetails="hideDetails" />
        </transition>
    </div>
</template>

<script>
import TheftCaseDetails from './TheftCaseDetails.vue';

export default {
    components: {
        TheftCaseDetails
    },
    props: {
        theftCase: {
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
            marginBottom: '0'
        }
    },
    watch: {
        isActive(newVal) {
            if (newVal) {
                this.setMarginBottom('540px');
            } else {
                this.resetMarginBottomWithDelay();
            }
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
        setImage(type) {
            return type === 'general' ? "url('/src/assets/pics/card-regular.jpg')" : "url('/src/assets/pics/card-sport.jpg')";
        },
        setDetailsImage(type) {
            return type === 'general' ? "url('/src/assets/pics/card-regular-full.jpg')" : "url('/src/assets/pics/card-sport-full.jpg')";
        },
        dateFormatter(string) {
            let date = new Date(string);
            return date.toLocaleString("ru");
        },
        setMarginBottom(value) {
            this.marginBottom = value;
        },
        resetMarginBottomWithDelay() {
            setTimeout(() => {
                this.marginBottom = '0';
            }, 300);
        }
    },
    computed: {
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
        addMargin() {
            return this.marginBottom
        },
        leftOffset() {
            return this.position
        },
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

.theftCase {
    height: 300px;
    width: 100%;
    background-color: var(--text1);
    position: relative;
    box-shadow: 0 -10px;
    border-radius: 10px;
    transition: .3s;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    backdrop-filter: blur(5px);
    filter: drop-shadow(5px 5px 20px black);
    line-height: 1;
}

.theftCase:hover {
    box-shadow: 0 -20px;
}

.theftCase__info {
    font-size: 10px;
    color: var(--text2);
}

.theftCase__info-mini {
    font-size: 12px;
    text-align: right;
    margin-bottom: 5px;
    cursor: auto;
}

.theftCase__details {
    position: absolute;
    cursor: auto;
    width: 100vw;
    height: 500px;
    top: 340px;
    background-color: black;
    background-repeat: no-repeat;
    background-size: cover;
    filter: drop-shadow(5px 5px 20px black);
    color: var(--text1);
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active в <2.1.8 */
    {
    opacity: 0;
    /* Прозрачный при входе и выходе */
}
</style>
