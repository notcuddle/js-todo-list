// Definimos nuestras variables

const input = document.querySelector('.input-text')
const form = document.querySelector('.add-form')

const tasksList = document.querySelector('.add-tasks')
const deleteBtn = document.querySelector('.btn-borrar-tareas')

//treaer elementos del storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

console.log(form)

//agregar una tarea al localstorage
const saveLocalStorage = (taskList) => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
};

//creamos nuestro elemento a renderizar
const createTask = (task) =>
`
    <div class="task">
        <p>${task.name}</p>
        <button class="btn-custom borrar-tarea" data-id=${task.taskId} >borrar</button>
    </div>
`;

const renderTaskList = (todoList) =>{
    tasksList.innerHTML = todoList.map( task => createTask(task)).join('')
}

//crear logica de crear boton delete all

const hideDeleteAll = taskList =>{
    if(!taskList.length){
        deleteBtn.classList.add('hidden');
        return
    }

    deleteBtn.classList.remove('hidden');
}

const addTask = e =>{
    e.preventDefault();
    const taskName = input.value.trim();

    if(taskName === ""){
        alert("Por favor ingrese una tarea")
        return
    }else if(tasks.some(task => task.name.toLowerCase() === taskName.toLowerCase())){
        alert('Ya existe con ese nombre')
        return
    }

    tasks = [...tasks, {name: taskName, taskId: tasks.length + 1}]

    input.value = '';

    renderTaskList(tasks)
    saveLocalStorage(tasks)
    hideDeleteAll(tasks)
}


const removetask = (e) =>{
    if(!e.target.classList.contains('borrar-tarea'))return;
    const filterId = Number(e.target.dataset.id)

    tasks = tasks.filter(task => task.taskId !== filterId)
    console.log(filterId)
    renderTaskList(tasks)
    saveLocalStorage(tasks)
    hideDeleteAll(tasks)
}


const removeAll = () => {
    tasks = [];
    renderTaskList(tasks)
    saveLocalStorage(tasks)
    hideDeleteAll(tasks)
}


// crear funcion init()

const init = () =>{
    renderTaskList(tasks)
    form.addEventListener('submit', addTask);
    deleteBtn.addEventListener('click', removeAll)
    tasksList.addEventListener('click', removetask)
};

init()