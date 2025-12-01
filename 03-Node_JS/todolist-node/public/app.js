//DECLARACIÓN E INICIALIZACIÓN -------------------------------------------
const todoListEl = document.getElementById('todo-list');
const todoInputEl = document.getElementById('todo-input');
const todoFormEl = document.getElementById('todo-form');
const emptyEl = document.getElementById('empty');
const errorEl = document.getElementById('error');

//Function - Declaración de funciones

// Función de control de errores ······················
function showError(message){
    errorEl.textContent = message;
    errorEl.style.display = message ? 'block':'none';
    // message ? 'block':'none'; -> es un OPERADOR TERNARIO... Si message es TRUE, entonces block, sino, none
}

//Carga de tareas al iniciar
window.addEventListener('DOMContentLoaded', loadTodos);//espera a que el HTML esté cargado y ejecuta la función loadTodos, todo antes del CSS

// Función de carga ······················
async function loadTodos(){
    try{
        const res = await fetch('/api/todos');// te voy a enviar a la principal
        const todos = await res.json();// pero cargando e interpretando el JSON que ya tenemos creado
    }
    catch (err){
        console.error(err);
        showError('Error en la carga de tareas');
    }
}

// Función de renderización (a pintar se ha dicho) ······················
function renderTodos(todos){
    //creamos un nuevo elemento "web" que irá en la UL de index.html
    todoListEl.innerHTML = '';
    //detecta si la lista de tareas (todos) está vacía y, si lo está, muestra un mensaje y detiene la ejecución del código
    if (!todos.length){
        emptyEl.style.display = 'block';//muestra el típico "No hay tareas" o similares
        return;//se detiene la función en este punto
    }
    emptyEl.style.display = 'none';//ocultamos el elemento

    //Ahora sí, tenemos una buena lista de tareas...
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;//se guarda un dato dentro de cada LI, es decir, inyectamos cada registro en cada LI

        //ahora, coge los colores, un folio y... ¡¡a pintar!!
        li.innerHTML =` 
            <div class="todo-left">
                <input type="checkbox" class="todo-check" ${todo.completed ? 'checked' : ''}/>
                <span class="todo-title ${todo.completed ? 'completed' : ''}">
                    ${escapeHtml(todo.title)}
                </span>
            </div>
            <div class="todo-actions">
                <button class="edit">Editar</button>
                <button class="save">Guardar</button>
                <button class="delete">Borrar</button>
            </div>
        `;
        todoListEl.appendChild(li);//añade un elemento al final del array visual
    });
}

// Añadiendo nuevas tareas, donde el formulario estará a la escucha continua ······················
todoFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();//eliminamos cualquier tipo de acción predeterminada
    showError('');

    const title = todoInputEl.value.trim();
    //quita los espacios del principio y final de lo que se recibe del input
    if(!title){
        showError('¡¡Escribe un título para la tarea!!');
        return;
    }
    try{
        //Primero lo intento, a ver si tengo suerte
        const res = await fetch('/api/todos',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        //contemplo errores:
            //leer el mensaje de error que devuelve el servidor y lanzar una excepción con ese mensaje
        if(!res.ok){
            const data = await res.json();
            throw new Error(data.error || 'Error al crear la tarea.');
        }
        
        //ahora, nos toca hacer las cosas bien...
        todoInputEl.value = '';//limpio el input de cualquier "suciedad textual"
        await loadTodos();//espera a que se cargue el nuevo listado con todo
    }
    catch (err){
        console.error(err);
        showError(err.message);
    }
});

//Subcontratando a los eventos: qué hago y cuándo lo hago
todoListEl.addEventListener('click', async(e) => {
    const li = e.target.closest('.todo-item');
    //encontraremos el elemento "más cercano" a donde se produjo el click

    if(!li) return;//por si aca... "corto liebre"

    const id = li.dataset.id;//obtenemos la ID del elemento clickado

    // Eliminar
    if (e.target.classList.contains('delete')) {await deleteTodo(id);}

    // Editar
    if (e.target.classList.contains('edit')) {startEdit(li);}

    // Guardar
    if (e.target.classList.contains('save')) {await saveEdit(li, id);}
});

//------- ESTO ES LO NUEVO, ¿OK?

// Checkbox para completar tarea
todoListEl.addEventListener('change', async (e) => {
    if (!e.target.classList.contains('todo-check')) return;

    const li = e.target.closest('.todo-item');
    const id = li.dataset.id;
    const completed = e.target.checked;
    await updateTodo(id, { completed });
});

//FUNCIONES DEL CRUD EN EL FRONT (API)
//deleteTodo
async function deleteTodo(id) {
  showError('');
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Error al eliminar la tarea.');
    }

    await loadTodos();//después de borrar, te vuelvo a lista la nueva lista
  } 
  catch (err) {
    console.error(err);
    showError(err.message);
  }
}

//updateTodo
async function updateTodo(id, changes) {
  showError('');
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Error al actualizar la tarea.');
    }

    await loadTodos();
  } 
  catch (err) {
    console.error(err);
    showError(err.message);
  }
}

//Modo Edición
function startEdit(li) {
  const titleSpan = li.querySelector('.todo-title');
  const editBtn = li.querySelector('.edit');
  const saveBtn = li.querySelector('.save');

  const currentText = titleSpan.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'todo-edit-input';

  titleSpan.replaceWith(input);
  editBtn.style.display = 'none';
  saveBtn.style.display = 'inline-block';

  input.focus();
  input.select();
}

//saveEdit
async function saveEdit(li, id) {
  const input = li.querySelector('.todo-edit-input');
  const editBtn = li.querySelector('.edit');
  const saveBtn = li.querySelector('.save');

  if (!input) return;

  const newTitle = input.value.trim();
  if (!newTitle) {
    showError('El título no puede estar vacío.');
    return;
  }

  await updateTodo(id, { title: newTitle });

  // UI se refresca con loadTodos() dentro de updateTodo
}

// Función para evitar XSS al pintar texto: <script>alert('hacked!'</script>
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}