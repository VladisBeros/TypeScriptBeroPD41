/**
 * @type {{description: string, completed: boolean, createdAt: Date}[]}
 */
let tasks = [];

/**
 * @param {string} task
 */
function addTask(task) {
    if (task !== "") {
        tasks.push({ description: task, completed: false, createdAt: new Date() });
        console.log(`Задача "${task}" добавлена.`);
    } else {
        console.log("Нельзя добавить пустую задачу.");
    }
}

function showTasks() {
    if (tasks.length === 0) {
        console.log("Нет задач.");
    } else {
        console.log("Список задач:");
        tasks.forEach((task, index) => {
            let status = task.completed ? "[x]" : "[ ]";
            console.log(`${index + 1}. ${status} ${task.description} (Создана: ${task.createdAt})`);
        });
    }
}

/**
 * Функция для удаления задачи
 * @param {number} index - Индекс задачи для удаления
 */
function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
        let removed = tasks.splice(index, 1);
        console.log(`Задача "${removed[0].description}" удалена.`);
    } else {
        console.log("Некорректный индекс задачи.");
    }
}

/**
 * Функция для завершения задачи
 * @param {number} index - Индекс задачи для завершения
 */
function completeTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        console.log(`Задача "${tasks[index].description}" выполнена.`);
    } else {
        console.log("Некорректный индекс задачи.");
    }
}

/**
 * Функция для поиска задачи по ключевым словам
 * @param {string} keyword - Ключевое слово для поиска
 */
function searchTask(keyword) {
    let foundTasks = tasks.filter(task => task.description.includes(keyword));
    if (foundTasks.length > 0) {
        console.log(`Найдены задачи с ключевым словом "${keyword}":`);
        foundTasks.forEach((task, index) => {
            let status = task.completed ? "[x]" : "[ ]";
            console.log(`${index + 1}. ${status} ${task.description}`);
        });
    } else {
        console.log(`Задач с ключевым словом "${keyword}" не найдено.`);
    }
}

/**
 * Функция для изменения текста задачи
 * @param {number} index - Индекс задачи для изменения
 * @param {string} newDescription - Новое описание задачи
 */
function editTask(index, newDescription) {
    if (index >= 0 && index < tasks.length && newDescription !== "") {
        console.log(`Задача "${tasks[index].description}" изменена на "${newDescription}".`);
        tasks[index].description = newDescription;
    } else {
        console.log("Некорректный индекс задачи или пустое описание.");
    }
}

function sortTasksAlphabetically() {
    tasks.sort((a, b) => a.description.localeCompare(b.description));
    console.log("Задачи отсортированы по алфавиту.");
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    console.log("Завершенные задачи удалены.");
}

function taskSummary() {
    let completedTasks = tasks.filter(task => task.completed).length;
    let incompleteTasks = tasks.length - completedTasks;
    console.log(`Всего задач: ${tasks.length}`);
    console.log(`Выполнено: ${completedTasks}`);
    console.log(`Не выполнено: ${incompleteTasks}`);
}

function showOldestTask() {
    if (tasks.length > 0) {
        let oldestTask = tasks.reduce((oldest, current) => {
            return new Date(oldest.createdAt) < new Date(current.createdAt) ? oldest : current;
        });
        console.log(`Старейшая задача: "${oldestTask.description}" (Создана: ${oldestTask.createdAt})`);
    } else {
        console.log("Нет задач.");
    }
}

function showNewestTask() {
    if (tasks.length > 0) {
        let newestTask = tasks.reduce((newest, current) => {
            return new Date(newest.createdAt) > new Date(current.createdAt) ? newest : current;
        });
        console.log(`Новейшая задача: "${newestTask.description}" (Создана: ${newestTask.createdAt})`);
    } else {
        console.log("Нет задач.");
    }
}

function clearAllTasks() {
    tasks = [];
    console.log("Все задачи удалены.");
}

addTask("Изучить JavaScript");
addTask("Написать код");
addTask("Отправить проект");
addTask("Проверить задачи");

showTasks();

completeTask(1);

showTasks();

editTask(2, "Отправить проект учителю");

deleteTask(0);

searchTask("проект");

sortTasksAlphabetically();

showTasks();

clearCompletedTasks();

showTasks();

showOldestTask();
showNewestTask();

taskSummary();

clearAllTasks();

showTasks();