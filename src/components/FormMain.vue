<template>
<div class="bg-slate-800 min-h-screen py-28 flex flex-col gap-10 justify-center items-center">    
    <form-data @mounts="getMounts" @clearMounts="clearMounts" class="" />
    <comp-detail @personsPayed="getPersonsPayed" :personas="Personas_.mounts"/>       
</div>
</template>
<script setup>
import { computed, ref } from 'vue';

import FormData from './FormData.vue';
import CompDetail from './CompDetail.vue';

const Personas_ = ref({
    total:0,
    persons:0,
    mounts:[]
});

const getMounts = (Personas) => {
    Personas_.value.total = Personas.total;
    Personas_.value.persons = Personas.persons;
    Personas_.value.mounts = Personas.mounts;
    //console.log(Personas_.value)    
}
const clearMounts = () => {
    Personas_.value = {
        total:0,
        persons:0,
        mounts:[]
    }
}
const getPersonsPayed = (p) => {
    Personas_.value.mounts = p;
    //console.log(Personas_.value.mounts);
}
const checkPayed = computed(()=>{
    const mountsPayed = Personas_.value.mounts.filter((mount)=> mount.state === true);
    return mountsPayed.length;
})
</script>
<style lang="css" scoped>

</style>