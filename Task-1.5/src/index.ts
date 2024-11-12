interface Task {
    id: number;
    title: string;
    description: string;
    created: Date;
    status: 'Выполнено' | 'Не выполнено';
    isUrgent: boolean; 
}

interface UrgentTask extends Task {
    deadline?: Date;
    assignee?: string;
    location?: string;
}

class TaskManager {
    private tasks: UrgentTask[] = [];
    private static storageKey = 'taskManagerData';
    private filteredTasks: UrgentTask[] = [];

    constructor() {
        this.loadTasks();
        this.filterTasks();
        this.initializeEventListeners();
    }

    private addTask(task: UrgentTask): void {
        this.tasks.push({...task});
        this.saveTasks();
        this.filterTasks();
    }

    private changeTaskStatus(taskId: number): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = task.status === 'Не выполнено' ? 'Выполнено' : 'Не выполнено';
            this.saveTasks();
            this.filterTasks();
        }
    }

    private filterTasks() {
        const statusFilter = (document.getElementById('statusFilter') as HTMLSelectElement).value;
        const typeFilter = (document.getElementById('typeFilter') as HTMLSelectElement).value;
    
        this.filteredTasks = this.tasks.filter(task => {
            const matchesStatus = statusFilter === 'all' || (statusFilter === 'Выполнено' && task.status === 'Выполнено') || (statusFilter === 'Не выполнено' && task.status === 'Не выполнено');
            const matchesType = typeFilter === 'all' || (typeFilter === 'urgent' && task.isUrgent) || (typeFilter === 'normal' && !task.isUrgent);
            
            return matchesStatus && matchesType;
        });
    
        this.renderTasks();
    }

    private generateId(): number {
        return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
    }

    private saveTasks(): void {
        localStorage.setItem(TaskManager.storageKey, JSON.stringify(this.tasks));
    }

    private loadTasks(): void {
        const data = localStorage.getItem(TaskManager.storageKey);
        if (data) {
            const parsedTasks: UrgentTask[] = JSON.parse(data);
            this.tasks = parsedTasks.map(task => ({
                ...task,
                deadline: task.deadline ? new Date(task.deadline) : undefined
            }));
        }
    }

    private renderTasks(): void {
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
                        const target = event.target as HTMLElement;
                        const taskId: number = Number(target.getAttribute('data-task-id'));
                        this.changeTaskStatus(taskId);
                    });
                });
            });
        }
    }

    private initializeEventListeners(): void {
        document.getElementById('addTask')?.addEventListener('click', () => {
            const titleInput = document.getElementById('title') as HTMLInputElement;
            const descriptionInput = document.getElementById('description') as HTMLInputElement;
            const deadlineInput = document.getElementById('deadline') as HTMLInputElement;
            const assigneeInput = document.getElementById('assignee') as HTMLInputElement;
            const locationInput = document.getElementById('location') as HTMLInputElement;

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
            } else {
                alert('Ошибка\nДля добавления обычной задачи нужен заголовок и описание\nДля добавления срочной задачи нужно заполнить дополнительные поля');
            }
        });

        document.getElementById('statusFilter')?.addEventListener('change', () => this.filterTasks());
        document.getElementById('typeFilter')?.addEventListener('change', () => this.filterTasks());
    }
}

const taskManager = new TaskManager();