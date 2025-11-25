// 1- Prevargas
// 2- Declaraciones
// 3- Main

// Bloque declaración de variables

const os = require ('node:os') // llama al modulo preinstalado

// Bloque Main (Principal)

console.log('Sistema operativo' + os.platform()); // Carga el sistema operativo
console.log('Version del Sistema operativo' + os.release()); // Carga la version
console.log('Memoria libre' + os.freemem() + 'bytes');
console.log('Memoria Total' + os.totalmem() + 'bytes');
console.log('Arquitectura CPU' + os.arch());
console.log('Número de Procesadores lógicos' + os.cpus().length());
//console.log*('Número de Procesadores lógicos' + os.());

os.cpus().forEach((cpu,index)=>{
    console.log( `Procesador lógico ${index + 1}`);
    console.log( `Nombre de la CPU:`+ cpu.model());
    console.log( `Tiempo:`+ cpu.times.sya());
    console.log( `Núcleos:`+ cpu.model());

});


/*
funcion flecha =>, función anónima
*/