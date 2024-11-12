"use strict";
class TaskManager {
    constructor() {
        this.tasks = [];
        this.filteredTasks = [];
        this.loadTasks();
        this.filterTasks();
        this.initializeEventListeners();
    }
    addTask(task) {
        this.tasks.push({ ...task });
        this.saveTasks();
        this.filterTasks();
    }
    changeTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = task.status === 'Не выполнено' ? 'Выполнено' : 'Не выполнено';
            this.saveTasks();
            this.filterTasks();
        }
    }
    filterTasks() {
        const statusFilter = document.getElementById('statusFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        this.filteredTasks = this.tasks.filter(task => {
            const matchesStatus = statusFilter === 'all' || (statusFilter === 'Выполнено' && task.status === 'Выполнено') || (statusFilter === 'Не выполнено' && task.status === 'Не выполнено');
            const matchesType = typeFilter === 'all' || (typeFilter === 'urgent' && task.isUrgent) || (typeFilter === 'normal' && !task.isUrgent);
            return matchesStatus && matchesType;
        });
        this.renderTasks();
    }
    generateId() {
        return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
    }
    saveTasks() {
        localStorage.setItem(TaskManager.storageKey, JSON.stringify(this.tasks));
    }
    loadTasks() {
        const data = localStorage.getItem(TaskManager.storageKey);
        if (data) {
            const parsedTasks = JSON.parse(data);
            this.tasks = parsedTasks.map(task => ({
                ...task,
                deadline: task.deadline ? new Date(task.deadline) : undefined
            }));
        }
    }
    renderTasks() {
        const taskList = document.getElementById('taskList');
        if (taskList) {
            taskList.innerHTML = '';
            this.filteredTasks.forEach(task => {
                const taskHTML = `
                <div class="task-item">
                    <div class="task-info">
                        <span>${task.title}</span>
                        <span>${task.description}</span>
                        ${task.deadline ? `<span>Крайний срок: ${task.deadline.toLocaleDateString()}</span>` : ''}
                        ${task.assignee ? `<span>Ответственное лицо: ${task.assignee}</span>` : ''}
                        ${task.location ? `<span>Место: ${task.location}</span>` : ''}
                        <span>Статус: ${task.status}</span>
                    </div>
                    <button class="status-button" data-task-id="${task.id}">${task.status === 'Не выполнено' ? 'Отметить как выполнено' : 'Отметить как не выполнено'}</button>
                </div>  
                `;
                taskList.innerHTML += taskHTML;
                const buttons = document.querySelectorAll('.status-button');
                buttons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const target = event.target;
                        const taskId = Number(target.getAttribute('data-task-id'));
                        this.changeTaskStatus(taskId);
                    });
                });
            });
        }
    }
    initializeEventListeners() {
        document.getElementById('addTask')?.addEventListener('click', () => {
            const titleInput = document.getElementById('title');
            const descriptionInput = document.getElementById('description');
            const deadlineInput = document.getElementById('deadline');
            const assigneeInput = document.getElementById('assignee');
            const locationInput = document.getElementById('location');
            if (titleInput.value && descriptionInput.value) {
                this.addTask({
                    id: this.generateId(),
                    title: titleInput.value,
                    description: descriptionInput.value,
                    created: new Date(),
                    status: 'Не выполнено',
                    deadline: deadlineInput.value ? new Date(deadlineInput.value) : undefined,
                    assignee: assigneeInput.value || undefined,
                    location: locationInput.value || undefined,
                    isUrgent: (assigneeInput.value || locationInput.value || deadlineInput.value) ? true : false
                });
                titleInput.value = '';
                descriptionInput.value = '';
                deadlineInput.value = '';
                assigneeInput.value = '';
                locationInput.value = '';
            }
            else {
                alert('Ошибка\nДля добавления обычной задачи нужен заголовок и описание\nДля добавления срочной задачи нужно заполнить дополнительные поля');
            }
        });
        document.getElementById('statusFilter')?.addEventListener('change', () => this.filterTasks());
        document.getElementById('typeFilter')?.addEventListener('change', () => this.filterTasks());
    }
}
TaskManager.storageKey = 'taskManagerData';
const taskManager = new TaskManager();
