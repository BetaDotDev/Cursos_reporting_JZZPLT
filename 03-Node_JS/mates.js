// Módulo de matematicas ----------------------

const { ReadStream } = require("fs");
const { setDefaultHighWaterMark } = require("stream");



// Declaración de variables

const PI = 3.141592;

// Bloque de declaracion de funciones

/*

function  nombre_funcion(parámetros que recibe para trabajar)
{
    hace lo que tenga que hacer;
}

A la hora de llamar a la funcion:

nombre_funcion(parametros que paso para que trabaje la función)

*/

function sumar(num1,num2) {
    let resultado =0;
    resultado = num1+num2;
    return resultado;
};

function restar(num1,num2){
    return num1+num2;
};

function multiplicar(num1,num2){return num1*num2;}

function dividir(num1,num2){

    if (num2==0){mostrarErrorDivision();} // mostrarErrorDivision() es una nueva funcion que me he creado (local)
    else {return num1/num2;}
}

function mostrarErrorDivision(){console.log('Imposible dividir entre 0')}

// Bloques de exportacion

module.exports = {sumar, restar, multiplicar, dividir, PI}