// 1. Variables y Constantes

// Ejercicio 1.1: Declaración de variables

const pi = 3.14159

let contador = 0

const nombreApp = "Mi App React"

// Ejercicio 1.2: Reasignación de variables

const edad = 25;
let puntos = 100;

// Intenta reasignar las variables (comenta qué sucede)
// edad = 26;        // ¿Que pasa? Da error porque es una cosntante y no se puede modificar
puntos = 150;     // ¿Que pasa? Lo modifica porque es una variable
console.log(edad) 
console.log(puntos) 

// 2. Tipos de Datos

// Ejercicio 2.1: Identificar tipos

/*
// Completa las variables
const numero = // Un número
const texto = // Un string
const esVerdadero = // Un boolean
const lista = // Un array
const persona = // Un objeto


// Imprime el tipo de cada variable
console.log(typeof numero);     // Resultado esperado: "number"
console.log(typeof texto);      // Resultado esperado: "string"
console.log(typeof esVerdadero);// Resultado esperado: "boolean"
console.log(typeof lista);      // Resultado esperado: "object"
console.log(typeof persona);    // Resultado esperado: "object"
*/
const numero = 1
console.log(typeof numero);

// Ejercicio 2.2: Trabajando con objetos

const estudiante = {
  // Tu código aquí
  nombre: "Luis",
  edad: 29,
  materias:["Lenguaje de marcas", "Sistemas de gestión empresarial"],
  activo: true
};

console.log(estudiante);

// 3. Condicionales (if)

// Ejercicio 3.1: Clasificar edad

function clasificarEdad(edad) {
  // Tu código aquí
    if (edad<=12){
        console.log("Niño")
    }
    else if (edad >= 13 && edad <= 17 ){
        console.log("Adolescente")
    }
    else if (edad >= 18 && edad <= 64 ){
        console.log("Adulto")
    }
    else{
        console.log("Adulto mayor")
    }
}

// Pruebas
console.log(clasificarEdad(10));  // "Niño"
console.log(clasificarEdad(15));  // "Adolescente"
console.log(clasificarEdad(30));  // "Adulto"
console.log(clasificarEdad(70));  // "Adulto mayor"

// Ejercicio 3.2: Calificaciones

function obtenerLetra(calificacion) {
  // Tu código aquí
    if (calificacion >=90 && calificacion <= 100){
        console.log("A")
    }
    else if (calificacion >= 80 && calificacion <= 89 ){
        console.log("B")
    }
    else if (calificacion >= 70 && calificacion <= 79 ){
        console.log("C")
    }
    else if (calificacion >= 60 && calificacion <= 69 ){
        console.log("D")
    }
    else if(calificacion <= 59 ){
        console.log("F")
    }
}

// Pruebas
console.log(obtenerLetra(95));   // "A"
console.log(obtenerLetra(83));   // "B"
console.log(obtenerLetra(72));   // "C"
console.log(obtenerLetra(65));   // "D"
console.log(obtenerLetra(45));   // "F"


// Ejercicio 3.3: Validador de acceso

function puedeAcceder(edad, cuentaActiva, estaBloqueado) {
  // Tu código aquí
  // Devuelve true si puede acceder, false si no
    if (edad >= 18 && cuentaActiva === true && estaBloqueado === false){
        return true;
    }
    
    else{
        return false;
    }
}

// Pruebas
console.log(puedeAcceder(20, true, false));   // true
console.log(puedeAcceder(17, true, false));   // false (menor de edad)
console.log(puedeAcceder(25, false, false));  // false (cuenta inactiva)
console.log(puedeAcceder(30, true, true));    // false (está bloqueado)

// 4. Bucles (while)

// Ejercicio 4.1: Contador simple

function contarHastaDiez() {
    let i = 1;
  // Tu código aquí con while
    while (i < 10 ){
        console.log(i)
        i = i + 1
    }
}

contarHastaDiez(); 

// Salida esperada: 1 2 3 4 5 6 7 8 9 10

// Ejercicio 4.2: Suma acumulativa
function sumaAcumulativa(limite) {
  let suma = 0;
  let i = 1;
  // Tu código aquí con while
  while (i < sumaAcumulativa ){

        suma = i + 1
        i = suma
    }

  return suma;
}

console.log(sumaAcumulativa(5));   // 15 (1+2+3+4+5)
console.log(sumaAcumulativa(10));  // 55 (1+2+3+...+10)

// Ejercicio 4.3: Buscar en array

function encontrarPosicion(array, elemento) {
  let i = 0;
  // Tu código aquí con while
  while (i<array.length){
    if (arr[i] === elemento) {
      posicionEncontrada = i;
      break;
    }
    i++;
  }

  // Devuelve el índice si lo encuentra, -1 si no
}

const frutas = ["manzana", "pera", "naranja", "uva"];
console.log(encontrarPosicion(frutas, "naranja")); // 2
console.log(encontrarPosicion(frutas, "kiwi"));    // -1










// Ejercicio 4.4: Generar números pares

function primerosCincoPares() {
  let contador = 0;
  let numero = 2;
  const pares = [];
  
  // Tu código aquí con while
  
  return pares;
}

console.log(primerosCincoPares()); // [2, 4, 6, 8, 10]

















// 5. Arrays y el método map()

// Ejercicio 5.1: Duplicar números

const numeros = [1, 2, 3, 4, 5];

const duplicados = numeros.map(/* Tu código aquí */);

console.log(duplicados); // [2, 4, 6, 8, 10]


// Ejercicio 5.2: Nombres a mayúsculas



const nombres = ["ana", "carlos", "maría", "josé"];

const nombresMayus = nombres.map(/* Tu código aquí */);

console.log(nombresMayus); // ["ANA", "CARLOS", "MARÍA", "JOSÉ"]


// Ejercicio 5.3: Crear objetos persona

const nombress = ["Pedro", "Laura", "Miguel"];

const personas = nombress.map(/* Tu código aquí */);

console.log(personas);
// Resultado esperado:
// [
//   { nombre: "Pedro", id: 1 },
//   { nombre: "Laura", id: 2 }, 
//   { nombre: "Miguel", id: 3 }
// ]


// Ejercicio 5.4: Calcular precios con descuento

const productos = [
  { nombre: "Laptop", precio: 1000 },
  { nombre: "Mouse", precio: 20 },
  { nombre: "Teclado", precio: 50 }
];

const productosConDescuento = productos.map(/* Tu código aquí */);

console.log(productosConDescuento);
// Resultado esperado:
// [
//   { nombre: "Laptop", precio: 1000, precioConDescuento: 800 },
//   { nombre: "Mouse", precio: 20, precioConDescuento: 16 },
//   { nombre: "Teclado", precio: 50, precioConDescuento: 40 }
// ]

// Ejercicio 5.5: Extraer información

const estudiantes = [
  { id: 1, nombre: "Ana", edad: 20, carrera: "Ingeniería" },
  { id: 2, nombre: "Luis", edad: 22, carrera: "Medicina" },
  { id: 3, nombre: "Sofia", edad: 19, carrera: "Arte" }
];

const soloNombres = estudiantes.map(/* Tu código aquí */);

console.log(soloNombres); // ["Ana", "Luis", "Sofia"]

// Ejercicio Integrador


process.exit(); // Cierra el proceso de Node