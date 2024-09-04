<template>
    <div class="flex flex-col justify-center items-center">
        <div class="relative p-2">        
        <input
        @change="updateValue"
        :checked="modelValue" 
        class="appearance-none cursor-pointer block w-[50px] h-[30px] rounded-full relative bg-transparent z-30 border-2 border-blue-400 peer checked:border-blue-600" type="checkbox">
        <span class="inline-block absolute bg-blue-400 min-w-[50px] h-[30px] rounded-full left-2 top-2 z-10 peer-checked:bg-blue-600"></span>
        <span class="inline-block absolute bg-white rounded-full size-[25px] left-[11px] top-[10px] z-20 peer-checked:left-[30px] transition-all duration-300 ease-linear"></span>                
        </div>
        <h6>{{ label }}</h6>
    </div>
</template>
<script setup>
const props = defineProps({
    label:{
        type:String,
        default:'!Ha pagado¡'
    },
    modelValue:{
        type:Boolean,
        default:false
    }
})
//const label = '!Ha pagado¡';
const emit = defineEmits(['update:modelValue'])
const updateValue = (e) => {
    emit('update:modelValue', e.target.checked)
}

</script>
<style lang="css" scoped></style>