<template>
    <div class="topbar">
        <div class="contents">
            <div class="slider-box">
                <div class="input-box">
                    <label>yaş aralığı: </label>
                    <InputText v-model.number="sliderAgeRange[0]" class="input-item" />
                    <InputText v-model.number="sliderAgeRange[1]" class="input-item" />
                </div>
                <Slider v-model="sliderAgeRange" class="slider-item" range />
            </div>
            <div class="selector-box">
                <Select v-model="selectedModel" :options="models" placeholder="Ürün Seçin" filter
                    :max-selected-labels="2" class="product-selector" />
                <Select v-model="selectedSize" :options="sizes" placeholder="Ürün Bedeni Seçin" filter
                    :max-selected-labels="2" class="product-selector" />
            </div>
            <div class="radio-buttons">
                <RadioButton v-model="selectedGender" :value="'female'" @click="toggleSelection('female')" />
                <label for="kadin">Kadın</label>

                <RadioButton v-model="selectedGender" :value="'male'" @click="toggleSelection('male')" />
                <label for="erkek">Erkek</label>

                <RadioButton v-model="selectedGender" :value="'other'" @click="toggleSelection('other')" />
                <label for="diğer">Diğer</label>
            </div>
        </div>
        <div class="sidebar-buttons">
            <Button class="sidebar-button" severity="danger" outlined="true" @click="handleLogout">Çıkış Yap</Button>
            <Button class="sidebar-button" icon="pi pi-bars" @click="toggleSidebarVisibility" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';

const router = useRouter()

const emit = defineEmits(['toggleSidebarVisibility', 'update'])

const toggleSelection = (value) => {
    selectedGender.value = selectedGender.value === value ? '' : value;
};

const selectedModel = ref("Bütün Modeller")
const selectedSize = ref("Bütün Bedenler")
const selectedGender = ref(null)

const sliderAgeRange = ref([0, 99])
const models = ref(["Bütün Modeller", 'Kot Pantolon', 'Kırmızı Kazak', 'Gri Atkı', 'Converse Ayakkabı', 'Sarı Mont'])
const sizes = ref(["Bütün Bedenler", "XXL", "XL", "L", "M", "S", "XS"])

let debounceTimeout = null
const debounceDelay = 500

watch([sliderAgeRange, selectedModel, selectedSize, selectedGender], () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout)
    }

    debounceTimeout = setTimeout(() => {
        emit('update', {
            sliderAgeRange: sliderAgeRange.value,
            model: selectedModel.value,
            size: selectedSize.value,
            gender: selectedGender.value
        })
    }, debounceDelay)
})

const toggleSidebarVisibility = () => {
    emit('toggleSidebarVisibility')
}

const handleLogout = () => {
    if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
        AuthService.logout()
        router.push('/auth')
    }
}
</script>

<style scoped>
.topbar {
    display: flex;
    align-items: center;
    height: 100px;
    justify-content: space-between;
    gap: 10px;
    padding: 0 20px;
    border: none;
    border-radius: 0;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--p-content-border-color);
}

.slider-item {
    width: 150px;
}

.input-item {
    width: 50px;
}

.slider-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-direction: column;
}

.input-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.listbox {
    width: 200px;
    height: 100%;
}

.contents {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.radio-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.selector-box {
    gap: 10px;
    display: flex;
}

.product-selector {
    height: 40px
}

.sidebar-button {
    min-width: 40px;
}

.sidebar-buttons {
    display: flex;
    align-items: center;
    gap: 8px
}

@media screen and (max-width: 950px) {
    .topbar {
        overflow-x: auto;
        white-space: nowrap;
    }


}
</style>
