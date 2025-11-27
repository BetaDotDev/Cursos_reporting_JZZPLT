//DECLARACIÓN E INICIALIZACIÓN -------------------------------------------
const express = require('express');// importación del framework Express
const path = require('path');

const app = express();
const PORT = 3000;

//Middleware de parseo a JSON
app.use(express.json());

// Ahora, vamos a ver "ande" están los archivos estáticos (imágenes, html...)
app.use(express.static(path.join(__dirname,'public')));

// BBDD en memoria
let todos = []; // creación de una lista vacía, array vacío sin elementos
let nextId = 1; //Sirve para asignar identificadores únicos (ID) a cada tarea que agregues

//RUTAS API CRUD -------------------------------------------

//READ (R) - Obtener todas las tareas si un cliente visita la URL
app.get('/api/todos', (req, res) => {res.json(todos)}); 

//CREATE (C) - Crear una tarea
app.post('/api/todos', (req, res) => {
    //título
    const { title } = req.body;
    //¿El título está vacío o solo tiene espacios?
    if (!title || !title.trim()){return res.status(400).json({ error: 'El título es obligatorio' });}

    //creación del nuevo elemento en el array, es decir, un nuevo objeto
    const newTodo = {
        id: nextId++,
        title: title.trim(),
        completed: false,
        createdAt: new Date()
    };

    //grabandooooo!!!
    todos.push(newTodo); //añade el registro al array, al final
    res.status(201).json(newTodo); //creado!!

}); 

//UPDATE (U) - Actualización una tarea completa (título o estado)
app.put('/api/todos/:id', (req, res) => {
    //aquí tenemos la parte de la petición, editamos una ID determinada
    const id = Number(req.params.id); //parseamos la id para que no inyecten cualquier cosa
    const { title, completed } = req.body;//buscamos en el html el título y el completado
    const todo = todos.find(t => t.id === id);//busca y devuelve el primer elemento que coincida
    //t => t.id === id -> Encuentra el elemento t cuyo id sea igual a la variable id

    //contemplamos ciertos "errores"
    if(!todo){return res.status(404).json({ error: 'Tarea no encontrada, ¡¡ErrOrrrr' });}

    if(typeof title === 'string'){todo.title = title.trim();}
    //Si title es realmente un texto, entonces actualiza el título de la tarea, eliminando los espacios sobrantes (principio y fin)

    if(typeof completed === 'boolean'){todo.completed = completed;}

    res.json(todo); //guardamos, que si no...
}); 

//DELETE (D) - Eliminación de tareas
app.delete('/api/todos/:id', (req, res) => {
    //aquí tenemos la parte de la petición, editamos una ID determinada
    const id = Number(req.params.id); //parseamos la id para que no inyecten cualquier cosa
    const index = todos.findIndex(t => t.id === id);//busca y devuelve la posición del elemento    
    
    //contemplamos ciertos "errores"
    if(index === -1){return res.status(404).json({ error: 'Tarea no encontrada, ¡¡ErrOrrrr' });}

    const deleted = todos.splice(index, 1)[0]; //Borra 1 elemento del array "todos" en la posición "index"
    //array.splice(posición, cantidad);
    res.json(deleted); //guardamos, que si no...
}); 

//INICIALIZACIÓN DEL SERVER -------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor listo y a la escucha en http://localhost:${PORT}`);
});
//Arranque disponible en: http://localhost:3000
//() => {} -> función de callback, se ejecuta cuando el server arranca correctamente
// IMPORTANTE: esto guarda las tareas en memoria. Si reinicias el servidor, se pierden. 
// Para algo persistente podrías luego conectar una BD (Mongo, Postgres, etc.)