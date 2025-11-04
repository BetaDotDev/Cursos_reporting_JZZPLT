// Este ejercicio lo empezamos el primer dia despues del primer descanso
// Ponemos de nombre como main pero no es un main persé

// Así escribimos un console log

/*

Esto es un comentario multilinea

*/


// Paracomentarios utilizamos las dos barras orientando a la derecha (la del 7 si tienes teclado ISO y la de al lado del "Shift" en caso de ANSI)

// ----- Constantes y variables -----

// Las variables se utilizan con lowerCamelCase, es decir, la primera letra en minuscula y la segunda con mayuscula.

// lowerCamelCase
// UpperCamelCase
// kebab-case
// snake_case

const numberPlayer1 = 6 // Así se declara una constante
let numberPlayer2 = 2 // Así una variable

/*
console.log(numberPlayer1) // Imprime la variable/ constante. Siembpre sin comillas porque si no es un string. 
console.log(typeof numberPlayer1) // Devuelve el tipo
*/


const namePlayer1 = "Jassito"
let scorePlayer1 = 6 //  Esto es un int
let victory = false // Esto es un bool

console.log(victory)

victory = "pepinillo rick" // La segunda vez ya podemos evitar poner el let. Tambien al ser interpretado lo cambiaria por un string al poner las comillas

console.log(victory)

console.log(3 + "chorizo") // al imprimirlo hace "relajacion de tipos" y hace que se concatenen los datos y lo haga un string.


// ----- Procesos-----

/*
// Los operandos para los tipos de operadores para cada tipo de dato
number: + - * / % // suma resta multiplicacion division y modulo
string: +
Boolean: and &&, or ||, not !
*/


// ----- Condicionales y bucles -----
scorePlayer1 = 5

if (scorePlayer1<=5){
    console.log("Sigue Jugando")
}
else{
    console.log("Bien jugado")
}


let steps = 0

while (steps < 3 ){
    console.log("Estoy en el paso: " + steps)
    steps = steps + 1
}

// ----- Arrays -----

const players = ["John", "Mary", "Anonymous"] // Los arrays se usan con const para que no se puedan variar 

players.map( player=> console.log(player))

// para cada elementos del array players
players.map(player =>{
    console.log(player)
    if(player === "Mary"){ // Se usan tres para el control de tipos
        console.log("Hola, Mary")
    }
})

// ----- Objetos -----

// Es una restructura de datos formados poarejas clave-valor

const enemy1 = {
    name: "Feldespato",
    level: 3,
    skills: ["Fuego blanco", "Llorar desesperadamente"]
}

console.log(enemy1.name)

// ----- funcion -----

const points = [ 2 , 4 , 6 ]

function sum(numbers){
    let result =0
    // desde el primero hasta el ultimo
    let i = 0

    while (i < numbers.length) {
        result = result + numbers[1]
        
        i++
    }
    // Añadir el valor del elemento consultado al total


    return result // una funcion siempre tiene return al final de la funcion
}










































process.exit(); // Cierra el proceso de Node