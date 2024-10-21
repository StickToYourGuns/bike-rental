<template>
    <div v-if="cardType === 'theft'" class="card-buttons">
        <div v-if="theftCase.status === 'new'" class="card-buttons--container" @click="updateStatus(1, theftCase._id)">
            <img src="/src/assets/pics/icons/person-add.svg" alt="add officer">
        </div>
        <div v-if="theftCase.status === 'in_progress' && !this.resolutionText" class="card-buttons--container" @click="addResolution">
            <img src="/src/assets/pics/icons/pencil.svg" alt="add resolution">
        </div>
        <div v-if="theftCase.status === 'in_progress' && this.resolutionText" class="card-buttons--container" @click="closeReport">
            <img src="/src/assets/pics/icons/check.svg" alt="close report">
        </div>
        <div v-if="theftCase.status === 'done'" class="card-buttons--container" @click="deleteCase(3, theftCase._id)">
            <img src="/src/assets/pics/icons/trash.svg" alt="delete case">
        </div>
    </div>

    <div v-if="cardType === 'officer'" class="card-buttons">
        <div v-if="!officerCard.approved" class="card-buttons--container" @click="officerApprove(officerCard._id)" :style="{pointerEvents: pointerEvents, backgroundColor: backgroundColor}">
            <img src="/src/assets/pics/icons/person-check.svg" alt="approve officer">
        </div>
        <div v-if="!this.editMode" class="card-buttons--container" @click="officerEdit()">
            <img src="/src/assets/pics/icons/person-settings.svg" alt="set officer">
        </div>
        <div v-else class="card-buttons--container" @click="officerPush()">
            <img src="/src/assets/pics/icons/person-up.svg" alt="set officer">
        </div>
        <div class="card-buttons--container" @click="removeOfficer(officerCard._id)" :style="{pointerEvents: pointerEvents, backgroundColor: backgroundColor}">
            <img src="/src/assets/pics/icons/person-remove.svg" alt="delete officer">
        </div>
    </div>
</template>

<script>
import { useTheftStore } from '@/stores/thefts.js';
import { useOfficersStore } from '@/stores/officers.js';

export default {
    props: {
        resolutionText: {
            type: String
        },
        officerCard: {
            type: Object,
        },
        theftCase: {
            type: Object,
        },
        cardType: {
            type: String
        },
        editMode: {
            type: Boolean
        }
    },
    methods: {
        updateStatus(step, id) {
            this.theftStore.editCase(step, id)
        },
        addResolution() {
            this.$emit('addResolution')
        },
        closeReport() {
            this.$emit('closeReport')
        },
        deleteCase(step, id) {
            this.theftStore.editCase(step, id)
        },
        officerApprove(id) {
            this.officersStore.approveOfficer(id)
        },
        officerEdit() {
            this.$emit("setOfficer");
        },
        officerPush() {
            this.$emit("pushOfficer");
        },
        removeOfficer(id) {
            this.officersStore.deleteOfficer(id)
        }
    },
    computed: {
        theftStore() {
            return useTheftStore()
        },
        officersStore() {
            return useOfficersStore()
        },
        pointerEvents() {
            if (this.editMode) {
                return 'none';
            }
        },
        backgroundColor() {
            if (this.editMode) {
                return 'var(--dark1)'
            }
        }
    }
}
</script>

<style scoped>
.card-buttons {
    width: 5%;
    background-color: #ffffff50;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
}

.card-buttons--container {
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-top-right-radius: 10px; */
    transition: .4s;
}

.card-buttons img {
    transition: .4s;
    scale: 1.5;
}

.card-buttons--container:hover img {
    scale: 2;
}

.card-buttons--container:hover {
    background-color: #00000070;
}
</style>