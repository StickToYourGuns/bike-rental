<template>
    <div class="dropdown">
        <button :style="{ color: (this.modelValue) ? (this.color ? this.color : 'white') : 'var(--red)' }" @click="toggleDropdown"
            class="dropdown-btn">
            {{ modelValue || 'Выберите элемент' }}
        </button>
        <!-- <button :style="{ color: (this.selectedItem) ? (this.color ? this.color : 'white') : 'var(--red)' }" @click="toggleDropdown"
            class="dropdown-btn">
            {{ selectedItem || 'Выберите элемент' }}
        </button> -->
        <ul v-if="isOpen" class="dropdown-menu">
            <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array
        },
        color: {
            type: String
        },
        modelValue: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isOpen: false,
            // selectedItem: null
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectItem(item) {
            this.$emit('update:modelValue', item); // Обновляем v-model в родителе
            this.isOpen = false;
            this.$emit('select-type', item);
        }
        // selectItem(item) {
        //     this.selectedItem = item;
        //     this.isOpen = false;
        //     this.$emit('select-type', this.selectedItem)
        // },
    }
};
</script>

<style scoped>
.dropdown {
    position: relative;
    width: 100%;
}

.dropdown-btn {
    background-color: black;
    color: var(--red);
    font-size: 30px;
    padding: 0;
    border: none;
    cursor: pointer;
    font-family: 'Red October';
    width: 100%;
    text-align: left;
}

.dropdown-menu {
    font-size: 30px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(3px);
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 2;
    border-radius: 5px;
}

.dropdown-menu li {
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: var(--dark2);
}
</style>