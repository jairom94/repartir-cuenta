<template>
    <li class="border-2 border-white w-[10rem] rounded-md py-6">
        <h4 class="text-center font-bold underline pb-4">Persona {{ props.index + 1 }}</h4>
        <h6 class="text-center">$ {{ props.person.mount }}</h6>
        <div>
            <check-custom 
            v-model="payed"
            :label="computedPayed"
            @change="handleChangeState"
            >
            </check-custom>            
        </div>
    </li>
</template>
<script setup>
import { computed, ref } from 'vue';
import CheckCustom from './CheckCustom.vue';
const props = defineProps(['person','index']);
const payed = ref(false);
const computedPayed = computed(()=>{    
    return payed.value ? 'Pagado' : 'No ha pagado';
});
const emit = defineEmits(['changeState']);
const handleChangeState = () => {  
    const person = {
        state:payed.value,
        index:props.index
    }  
    emit('changeState',person)
}
</script>
<style lang="css" scoped></style>