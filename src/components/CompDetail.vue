<template>
    <div class="text-white">
        <h2 class="text-lg pb-10" v-if="personas.length">Distribución de la cuenta:</h2>
        <button  
        @click="handlePersonsPayed"              
        >
        <ul class="grid grid-cols-3 gap-5">
            <detalle-pago 
            v-for="(person,index) in props.personas" :key="index" 
            :person="person"
            :index="index"
            @changeState="setState"
            />
        </ul>
        </button>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import DetallePago from "./DetallePago.vue";
const props = defineProps(['personas']);
const emit = defineEmits(['personsPayed']);
const personas_ = ref([]);
onMounted(()=>{
    personas_.value = p_.value;        
})
//personas_.value=props.personas;
const setState = (value) => {
    let {state,index} = value;
    personas_.value = p_.value;
    personas_.value[index].state = state;
    //console.log(personas_.value[index]);
    //console.log(index);
    //console.log(personas_.value);
    //console.log(personas_.value);
}
const p_ = computed(()=>{
    return props.personas;
})
const handlePersonsPayed = () => {
    personas_.value = p_.value;
    //console.log(personas_.value);
    emit('personsPayed',personas_.value)
}
</script>
<style lang="css" scoped></style>