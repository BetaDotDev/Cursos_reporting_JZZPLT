const app = express()

//declaracion e inicializacion  ------------------------------------------------------
const { create } = require('domain');
const expresss = require('express');//importacion del framework express
const path = require ('path');
const { title } = require('process');

const app= express();
const PORT = 3000;
 
//Middleware de parseo a JSON
app.use(express.json());

// Ahora, vamos a ver donde entan los  archivos estaticos 

app.use(express.static(path.join(__dirname,'public')));

// BBDD en memoria

let todos = [];//creacion de array vacio 
let nextId = 1; //sirve para asignar identificadores unicos (ID) a cada tarea que agregues

// RUTAS API CRUD ------------------------------------------------------
                        

// READ (R) - Obtener todas las tareas si un cliente visita la URL
app.get('/api/todos', (req,res) =>{res.json(todos)});

//CREATE (C) - Crear una tarea 
app.post('/api/todos', (req, res) =>{
    //Titulo
    const {title} = req.body;

    //¿El titulo esta vacio o solo tiene espacios?
    if(!title || !title.trim()){
        return res.status(400).json({ error:"400 Bad Request"})
    };

    //cracion del nuevo elemento en el array, es decir, un nuevo objeto

    const newTodo = {
        id: nextId++,
        title: title.trim(),
        completed :false,
        createAT: new Date()
    };

    //Grabardoooo!!! // añade el registro al array
    todos.push(newTodo);
    res.status(201).json(newTodo)
});



// UPDATE (U) - Actualización una tarea completa (título o estado)
app.put('/api/todos/:id', (req,res)=>{
    // aqií tenemos la parte de la petición, editamos una ID determinada
    const id = Number(req.params.id) // Parseamos la id para que no inyecten cualquier cosa
    const {title,completed} = req.body; // buscamos en el html el titulo completo
    const todo = todos.find(t=>t.id===id); // busca y devuelve el primer elemento que consiga
    // t=>t.id === id -> Encuentra el elemento t cuyo id sea igual a la variable id

    //contemplamos ciertos "errores"
    if(!todo){return res.status(404).json({error: 'Tarea no encontrada, ¡Err0rrrr!'});}

    if(typeof title === 'string'){todo.title = title.trim();}
    //si el t'tulo es realmente un texto, enrtonces se actualiza el título de la tarea, eliminando los espacios sobrantes (principio y fin)

    if(typeof completed === 'bolean'){todo.completed = completed;}

    res.json(todo); // guardamos en json

});

/// Delete (D) - Eliminación de tareas

app.delete('/api/todos/:id', (req,res)=>{
    // aqií tenemos la parte de la petición, editamos una ID determinada
    const id = Number(req.params.id) // Parseamos la id para que no inyecten cualquier cosa
    const index = todos.findIndex( t => t.id === id); // Devuelve la posicion del elemento

    //contemplamos ciertos "errores"
    if(index===-1){return res.status(404).json({error:'Tarea no encontrada, '})}

    const deleted = todos.splice(index,1)[0] //Borra 1 elemento del array todos en la posicion index
    // array.splice(posición,cantidad); // Es una funcion precocinada

    res.json(todo); // guardamos

});

// INICIALIZACION DEL SERVER

app.listen(PORT, ()=>{
    console.log(`Servidor listo y a la escucha en http://localhost:${PORT}`)
});
// Arranque disponible en http://localhost:3000
// ()=>{} -> función de callback, se ejecuta cuando el server arranca correctamente

///// IMPORTANTE: Esto guarda las tareas en memoria. Si reinicias el servidor, se pierden.
// Para algo persistente podrias luego conectar una ND (Mongo, Postgre,etc. )

