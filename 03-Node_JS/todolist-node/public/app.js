// Declaración e inicialización ---------------------------

const todoListEl = document. getElementsByID('todo-list');
const todoInputEl = document. getElementsByID('todo-input');
const todoFormEl = document. getElementsByID('todo-form');
const emptyEl = document. getElementsByID('empty');
const errorEl = document. getElementsByID('error');

//Function - declaración de funciones

// funcion de control de errores
function showError(message){
    errorEl.textContent = message;
    errorEl.style.display = message ? 'block': 'none';
    // message ? 'block': 'none'; -> es un OPERADOR TERNARIO... Si message es True, entocnes bloquealo, sino no

}

// Carrga de tareas al iniciar
window.addEventListener('DOMContentLoader', loadTodos); // espera a que el HTML esté cargado y ejecuta la funcion

// Función de carga -----------------

async function loadTodos(){
    try{
        const res = await fetch('/api/todos'); // te voy a enviar a la principal
        const todos= await res.json(); // pero cargando e interpretando el JSON que ya tenemos creado
    }
    catch(err){
        console.error(err);
        showError('Error en la carga de tareas')
    }
}

// Función de renderización (a pintar se ha dicho) ------------------------

function renderTodos (todos){
    // creamos un nuevo elemento "Web"que irá en la UL de index.html
    todoListEl. innerHTML = '';
    // detecta si la lista de tareas (todos) está vacia y, silo está, muestra un mensaje y 
    if (!todos.length){
        emptyEl.style.display= 'block'; // muestra el típico "No hay tareas" o similartes
        return; // se detiene la función
    }
    emptyEl.style.diaplay = 'none'; // ocultamos el elemento

    // Ahora si, tenemos una buena lista de tareas...
    todos.array.forEach(element => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todoFormEl.id; // se guarda un dato dentro del LI, es decir inyectamos el codigo
        
        // ahora, coge los colores, un folio y ¡¡ a pintar!!
        li.innerHTML = `
            <div class="todo-left">
                <input type = "checkbox" class="todo-check" ${todoFormEl.completed ? 'checked': ''}/>
                <span class= "todo-title ${todoFormEl.completed ? 'completed': ''}">
                    ${escapeHtml(todo.title)} <!-- Para evitar los ataques de XSS  -->
                </span>
            </div>
            <div class="todo-actions">
                <button class= "edit"> Editar </button>
                <button class= "edit"> Guardar </button>
                <button class= "edit"> Borrar </button>
            </div>
        `;
        todoListEl.appendChild(li); // añade un elemento al final del array visual

    });
}


// Añaadimos nuevas tareas , dodne el formulario estará escuchando----------------------
todoFormEl.addEventListener('submit', async (e)=>{
    e.preventDefault(); // eliminamos cualquier tipo de accion predeterminada
    showError('');
    
    const title = todoInputEl.ariaValueMax.trim(); // quuita los espacios del principio y del final
    if (!title){
        showError ('¡¡Escribe un título para la tarea !!');
        return;
    }
    try{
        const res = await fetch('/api/todos',{
            method: 'POST',
            HEADER: {'Content-type' : 'application.json'},
            body: JSON.stringify({ title })
        });
        if(!res.ok){
            const data = await res.json();
            throw new Error (data.error || 'Error al crear la tarea.')
        }
        //leer el mensaje de error que devuelve el servidor y lanzar una excepción con ese error.
    }
    catch(err){
        console.error(err);
        showError('Error en la carga de tareas')
    }

});