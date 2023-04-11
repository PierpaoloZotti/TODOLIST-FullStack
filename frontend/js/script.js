const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.containerForm');
const inputTask = document.querySelector('.inputTarefa');

const fetchTasks = async () => {
    const res = await fetch('http://localhost:3333/tasks');
    const tasks = await res.json()

    return tasks;
};

const addTask = async (event) => {
    event.preventDefault();
    const task = {
        title: inputTask.value
    };
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task),
    });
    inputTask.value = '';
    loadTasks();
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });
    loadTasks();
};

const updateTask = async ({ id, title, status }) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            title,
            status,
        }),
    });
    loadTasks();
};

const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-BR', options);
    return date;
};

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    if (innerText) {
        element.innerText = innerText;
    }
    return element;
};

const createSelect = (status) => {
    const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em andamento</option>
    <option value="completada">Completada</option>
    `;
    const select = createElement('select', '', options);
    select.value = status;
    return select;
};


const createRow = (task) => {
    const { id, title, created_at, status } = task;
    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdAction = createElement('td');

    const select = createSelect(status);
    select.addEventListener('change', ({ target }) => updateTask({ id, title, created_at, status: target.value }));

    const btnEdit = createElement('button', '', '<span class="material-symbols-outlined"> edit </span>');
    const btnDelete = createElement('button', '', '<span class="material-symbols-outlined"> delete </span>');
    btnEdit.classList.add('btnAction');
    btnDelete.classList.add('btnAction');
    btnDelete.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);
    tdAction.appendChild(btnEdit);
    tdAction.appendChild(btnDelete);


    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAction);

    return tr;
};

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
};


addForm.addEventListener('submit', addTask);
loadTasks();
