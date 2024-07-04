document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task function
    const addTask = (text, completed = false) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);

        if (completed) {
            li.classList.add('completed');
        }

        // Mark task as completed/uncompleted
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Edit task
        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit your task:', span.textContent);
            if (newText !== null && newText.trim() !== '') {
                span.textContent = newText.trim();
                saveTasks();
            }
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
        saveTasks();
    };

    // Add task button click event
    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            addTask(text);
            taskInput.value = '';
        }
    });

    // Add task with Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = taskInput.value.trim();
            if (text !== '') {
                addTask(text);
                taskInput.value = '';
            }
        }
    });

    // Load tasks when page loads
    loadTasks();
});
