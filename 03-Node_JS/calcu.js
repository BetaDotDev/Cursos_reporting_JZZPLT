// bloque de precargas

const mat = require('./mates');

// main
console.log ('La suma de 2+4 es ' + mat.sumar(2,4));
console.log ('La resta de 2-4 es ' + mat.restar(2,4));
console.log ('La multiplicacion de 2x4 es ' + mat.multiplicar(2,4));
console.log ('La suma de 2 entre 4 es ' + mat.dividir(2,0)); // muestra error
console.log ('La suma de 2 entre 4 es ' + mat.dividir(2,4));
console.log('El valor de PI es ' + mat.PI);

