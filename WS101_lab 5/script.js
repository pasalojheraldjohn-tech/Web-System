const BASE_URL = 'http://localhost:8080/todos';

const todoForm = document.getElementById('todoForm');
const todoIdInput = document.getElementById('todoId');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const completedInput = document.getElementById('completed');
const todoList = document.getElementById('todoList');
const cancelEditBtn = document.getElementById('cancelEdit');

let editingId = null;

async function fetchTodos() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Error loading todos. Ensure backend is running.');
    }
}

function renderTodos(todos) {
    todoList.innerHTML = ''; 
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.title} - ${todo.description}</span>
            <div>
                <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const todo = {
        title: titleInput.value,
        description: descriptionInput.value,
        completed: completedInput.checked
    };
    
    try {
        let response;
        if (editingId) {
            response = await fetch(`${BASE_URL}/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            });
            if (!response.ok) throw new Error('Failed to update todo');
            editingId = null;
            todoIdInput.value = '';
            cancelEditBtn.style.display = 'none';
        } else {
            response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            });
            if (!response.ok) throw new Error('Failed to create todo');
        }
        
        todoForm.reset();
        fetchTodos();
    } catch (error) {
        console.error('Error saving todo:', error);
        alert(`Error: ${editingId ? 'Updating' : 'Creating'} todo failed.`);
    }
}

function editTodo(id) {
    fetch(`${BASE_URL}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch todo');
            return response.json();
        })
        .then(todo => {
            titleInput.value = todo.title;
            descriptionInput.value = todo.description;
            completedInput.checked = todo.completed;
            todoIdInput.value = id;
            editingId = id;
            cancelEditBtn.style.display = 'inline-block';
            titleInput.focus();
        })
        .catch(error => {
            console.error('Error editing todo:', error);
            alert('Error loading todo for edit.');
        });
}

async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete todo');
        fetchTodos(); 
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Error deleting todo.');
    }
}

function cancelEdit() {
    todoForm.reset();
    todoIdInput.value = '';
    editingId = null;
    cancelEditBtn.style.display = 'none';
}

todoForm.addEventListener('submit', handleSubmit);
cancelEditBtn.addEventListener('click', cancelEdit);
cancelEditBtn.style.display = 'none';

document.addEventListener('DOMContentLoaded', fetchTodos);
