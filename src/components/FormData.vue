<template>
    <div class="relative">
        <div class="absolute -rotate-12 left-[-40px] top-[-75px] z-20 size-[90px] ">
            <ico-form class="h-full w-full" />
        </div>
        <div
            class="border-white backdrop-blur-md z-10 relative cont-form flex flex-col justify-center gap-10 p-4 border-2 rounded-md w-[70vw]">
            <div class="w-full cont-input">
                <label class="text-white">Total Cuenta: $ 0.00 </label>
                <input @keydown="validateNumber" @focus="resetInput" @blur="blurInput"
                    class="without-style w-full bg-transparent border-b-2 border-white text-slate-400 px-2 py-1"
                    type="number" v-model="$txtTotal">
            </div>
            <div class="w-full cont-input">
                <label class="text-white">Numero de Personas:</label>
                <input @keydown="validateNumberPersonas" @focus="resetInputPersonas" @blur="blurInputPersonas"
                    class="without-style w-full bg-transparent border-b-2 border-white text-slate-400 px-2 py-1"
                    type="number" v-model="$txtPersonas">
            </div>
            <div class="grid grid-cols-2 gap-5">
                <div class="relative z-10">
                <div class="absolute inset-0 scale-[1.02] blur-[5px]"
                    :class="[isHover ? 'animate-flap bg-gradient-hover' : 'bg-shadow-custom']"></div>
                <button 
                @pointerenter="isHover = !isHover" 
                @pointerleave="isHover = !isHover" 
                @click="handleClick"
                :disabled="disabled"
                    class="border-2 border-white relative bg-slate-800 size-full rounded-md text-white py-2">Generar
                    Aportes
                </button>
                
            </div>
            <div class="relative z-10">
                <div class="absolute inset-0 scale-[1.02] blur-[5px]"
                    :class="[isHoverReset ? 'animate-flap bg-gradient-hover' : 'bg-shadow-custom-reset']"></div>
                <button @pointerenter="isHoverReset = !isHoverReset" @pointerleave="isHoverReset = !isHoverReset" @click="resetForm"
                    class="border-2 border-red-400 relative bg-slate-800 size-full rounded-md text-white py-2">
                    Reset
                </button>
                
            </div>
            </div>            
            <div class="absolute poligono bg-sky-300"></div>
            <div class="absolute poligono-2 bg-pink-300"></div>
        </div>
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import IcoForm from './svg/IcoForm.vue';

const emit = defineEmits(['mounts','clearMounts'])
const mounts = ref([]);
const disabled = ref(false);
const data = ref({
    total:0,
    persons:0,
    mounts:[]
});
const handleClick = () => {
    const total = parseFloat($txtTotal.value);
    const personas = parseInt($txtPersonas.value);
    data.value.total = total;
    data.value.persons = personas;
    const monto = total / personas;
    const montoFormateado = monto.toFixed(2);
    mounts.value = [];
    let restMount = ((montoFormateado * personas) - total).toFixed(2);
    for (let i = 0; i < personas; i++) {
        const mount = {
            mount: montoFormateado,
            state: false
        }
        mounts.value.push(montoFormateado);
        data.value.mounts.push(mount);
    }    
    if (restMount > 0) {
        for (let i = 0; i < parseInt(restMount / 0.01); i++) {
            mounts.value[i] = (mounts.value[i] - 0.01).toFixed(2);
            data.value.mounts[i].mount = mounts.value[i];
        }
    }
    else if (restMount < 0) {
        restMount = Math.abs(restMount);
        for (let i = 0; i < parseInt(restMount / 0.01); i++) {
            mounts.value[i] = (parseFloat(mounts.value[i]) + 0.01).toFixed(2);
            data.value.mounts[i].mount = mounts.value[i];
        }
    }
    disabled.value = true;
    emit('mounts', data.value);
}
const resetForm = () => {
    $txtTotal.value = '0.00';
    $txtPersonas.value = '0';
    mounts.value = [];
    disabled.value = false;
    data.value = {
        total:0,
        persons:0,
        mounts:[]
    }
    emit('clearMounts');
}
const $txtTotal = ref('0.00');
const $txtPersonas = ref('0');

const isHover = ref(false);
const isHoverReset = ref(false);

const resetInput = (e) => {
    if ($txtTotal.value === '0.00') {
        $txtTotal.value = '';
    }
}
const blurInput = (e) => {
    if ($txtTotal.value === '') {
        $txtTotal.value = '0.00';
    }
}
const resetInputPersonas = (e) => {
    if ($txtPersonas.value === '0') {
        $txtPersonas.value = '';
    }
}
const blurInputPersonas = (e) => {
    if ($txtPersonas.value === '') {
        $txtPersonas.value = '0';
    }
}

const validateNumber = (e) => {
    const regex = /^[0-9]$/;
    const value = e.target.value;

    if (e.key === '.' || e.key === 'Backspace' || e.key === 'Tab') {
        return;
    }
    if (!regex.test(e.key)) {
        e.preventDefault();
    }
    const regexCoin = /^\d*\.?\d{0,2}$/;
    const newValue = value + e.key;
    if (!regexCoin.test(newValue)) {
        e.preventDefault();
    }
}
const validateNumberPersonas = (e) => {
    const regex = /^[0-9]$/;
    if (e.key === 'Backspace') {
        return;
    }
    if (!regex.test(e.key)) {
        e.preventDefault();
    }
}
</script>
<style scoped>
.without-style {
    -moz-appearance: textfield;
    -webkit-appearance: none;
    margin: 0;
    appearance: none;
    outline: none;

    &:focus {
        color: white;
    }
}

.bg-shadow-custom {
    background: linear-gradient(45deg,
            rgb(214, 214, 214), rgb(115, 115, 115), rgb(136, 136, 136), rgb(102, 102, 105),
            rgb(214, 214, 214), rgb(86, 86, 86), rgb(112, 112, 112), rgb(102, 102, 105));
    background-size: 800%;
    transition: background .5s ease-in-out;
}
.bg-shadow-custom-reset {
    background: linear-gradient(45deg,
            rgb(253, 118, 118), rgb(115, 115, 115), rgb(136, 136, 136), rgb(255, 53, 53),
            rgb(253, 27, 27), rgb(86, 86, 86), rgb(112, 112, 112), rgb(238, 66, 66));
    background-size: 800%;
    transition: background .5s ease-in-out;
}

.bg-gradient-hover {
    background: linear-gradient(45deg,
            rgb(136, 241, 241), rgb(158, 210, 193), rgb(233, 248, 120), rgb(102, 102, 105),
            #33cfeb, rgb(108, 242, 252), rgb(197, 245, 120), rgb(102, 102, 105));
    background-size: 800%;
    transition: background .5s ease-in-out;
}

.cont-form {
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 20px 20px 50px rgba(255, 255, 255, 0.4);
}

.poligono {
    width: 8px;
    height: 100%;
    top: -5%;
    left: 45%;
    transform: rotate(40deg);
    filter: blur(8px);
    z-index: 1;
}

.poligono-2 {
    width: 8px;
    height: 100%;
    top: -5%;
    left: 50%;
    transform: rotate(40deg);
    filter: blur(8px);
    z-index: 1;
}
.circle{
    position:absolute;         
    width:200px;
    height:150px;
}
.circle-1{
    background-color: rgba(51, 239, 239, 0.231);    
    z-index: 1;
    left: -20%;
    top: -20%;
    border-radius: 30% 20% 30% 70%;    
    animation: move 3s ease-in-out alternate infinite;

}
.circle-2{
    background-color: rgba(177, 104, 233, 0.56);
    z-index: 1;
    bottom:-15%;
    right:-20%;
    border-radius: 18% 60% 43% 80%;    
    animation: move 3s ease-in-out alternate infinite;
}
.circle-3{
    background-color: aquamarine;
    z-index: 1;
    left: 10%;
    bottom: 10%;
}

@keyframes move {
    from{
        transform: skewY(-12deg) scale(0.8);

    }
    to{
        transform: skewY(-20deg) scale(0.9);
    }
    
}
</style>