//DECLARACIÓN E INICIALIZACIÓN -------------------------------------------
const tareasListEl = document.getElementById('tareas-list');
const tareasInputEl = document.getElementById('tareas-input');
const tareasFormEl = document.getElementById('tareas-form');
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
window.addEventListener('DOMContentLoaded', loadtareass); //espera a que el HTML esté cargado y ejecuta la función loadtareass, tareas antes del CSS

// Función de carga ······················
async function loadtareass(){
    try{
        const res = await fetch('/api/tareass');// te voy a enviar a la principal
        const tareass = await res.json();// pero cargando e interpretando el JSON que ya tenemos creado
    }
    catch (err){
        console.error(err);
        showError('Error en la carga de tareas');
    }
}

// Función de renderización ······················
function rendertareass(tareass){
    //creamos un nuevo elemento "web" que irá en la UL de index.html
    tareasListEl.innerHTML = '';
    //detecta si la lista de tareas (tareass) está vacía y, si lo está, muestra un mensaje y detiene la ejecución del código
    if (!tareass.length){
        emptyEl.style.display = 'block';//muestra el típico "No hay tareas" o similares
        return;//se detiene la función en este punto
    }
    emptyEl.style.display = 'none';//ocultamos el elemento

    //Ahora sí, tenemos una buena lista de tareas...
    tareass.forEach(tareas => {
        const li = document.createElement('li');
        li.className = 'tareas-item';
        li.dataset.id = tareas.id;//se guarda un dato dentro de cada LI, es decir, inyectamos cada registro en cada LI

        //ahora, coge los colores, un folio y... ¡¡a pintar!!
        li.innerHTML =` 
            <div class="tareas-left">
                <input type="checkbox" class="tareas-check" ${tareas.completed ? 'checked' : ''}/>
                <span class="tareas-title ${tareas.completed ? 'completed' : ''}">
                    ${escapeHtml(tareas.title)}
                </span>
            </div>
            <div class="tareas-actions">
                <button class="edit">Editar</button>
                <button class="save">Guardar</button>
                <button class="delete">Borrar</button>
            </div>
        `;
        tareasListEl.appendChild(li);//añade un elemento al final del array visual
    });
}

// Añadiendo nuevas tareas, donde el formulario estará a la escucha continua ······················
tareasFormEl.addEventListener('submit', async (e) => {
    e.preventDefault(); //eliminamos cualquier tipo de acción predeterminada
    showError('');

    const title = tareasInputEl.value.trim();

    // Quita los espacios del principio y final de lo que se recibe del input
    if(!title){
        showError('¡¡Escribe un título para la tarea!!');
        return;
    }
    try{
        // Prueba la conexión
        const res = await fetch('/api/tareass',{
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
        
        tareasInputEl.value = '';// limpiamos el input para que no tenga nada guardado.
        await loadtareass(); // Carga todos los estados de tareas
    }
    catch (err){
        console.error(err);
        showError(err.message);
    }
});

// Subcontratando a los eventos: qué hago y cuándo lo hago
tareasListEl.addEventListener('click', async(e) => {
    const li = e.target.closest('.tareas-item');
    //encontraremos el elemento "más cercano" a donde se produjo el click

    if(!li) return;//por si aca... "corto liebre"

    const id = li.dataset.id;//obtenemos la ID del elemento clickado

    // Eliminar
    if (e.target.classList.contains('delete')) {await deletetareas(id);}

    // Editar
    if (e.target.classList.contains('edit')) {startEdit(li);}

    // Guardar
    if (e.target.classList.contains('save')) {await saveEdit(li, id);}
});

//------- ESTO ES LO NUEVO, ¿OK?

// Checkbox para completar tarea
tareasListEl.addEventListener('change', async (e) => {
    if (!e.target.classList.contains('tareas-check')) return;

    const li = e.target.closest('.tareas-item');
    const id = li.dataset.id;
    const completed = e.target.checked;
    await updatetareas(id, { completed });
});

//FUNCIONES DEL CRUD EN EL FRONT (API)
//deletetareas
async function deletetareas(id) {
  showError('');
  try {
    const res = await fetch(`/api/tareass/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Error al eliminar la tarea.');
    }

    await loadtareass();//después de borrar, te vuelvo a lista la nueva lista
  } 
  catch (err) {
    console.error(err);
    showError(err.message);
  }
}

//updatetareas
async function updatetareas(id, changes) {
  showError('');
  try {
    const res = await fetch(`/api/tareass/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Error al actualizar la tarea.');
    }

    await loadtareass();
  } 
  catch (err) {
    console.error(err);
    showError(err.message);
  }
}

//Modo Edición
function startEdit(li) {
  const titleSpan = li.querySelector('.tareas-title');
  const editBtn = li.querySelector('.edit');
  const saveBtn = li.querySelector('.save');

  const currentText = titleSpan.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'tareas-edit-input';

  titleSpan.replaceWith(input);
  editBtn.style.display = 'none';
  saveBtn.style.display = 'inline-block';

  input.focus();
  input.select();
}

//saveEdit
async function saveEdit(li, id) {
  const input = li.querySelector('.tareas-edit-input');
  const editBtn = li.querySelector('.edit');
  const saveBtn = li.querySelector('.save');

  if (!input) return;

  const newTitle = input.value.trim();
  if (!newTitle) {
    showError('El título no puede estar vacío.');
    return;
  }

  await updatetareas(id, { title: newTitle });

  // UI se refresca con loadtareass() dentro de updatetareas
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