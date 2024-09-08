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
        console.log(`Задача "${task}" додана.`);
    } else {
        console.log("Неможна додати пусту задачу.");
    }
}

function showTasks() {
    if (tasks.length === 0) {
        console.log("Нема задач.");
    } else {
        console.log("Список задач:");
        tasks.forEach((task, index) => {
            let status = task.completed ? "[x]" : "[ ]";
            console.log(`${index + 1}. ${status} ${task.description} (Створена: ${task.createdAt})`);
        });
    }
}

/**
 * @param {number} index
 */
function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
        let removed = tasks.splice(index, 1);
        console.log(`Задача "${removed[0].description}" видалена.`);
    } else {
        console.log("Некоректний индекс задачи.");
    }
}

/**
 * @param {number} index
 */
function completeTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        console.log(`Задача "${tasks[index].description}" виконана.`);
    } else {
        console.log("Некоректний индекс задачи.");
    }
}

/**
 * @param {string} keyword
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
        console.log(`Задач з ключовими словами "${keyword}" не знайдено.`);
    }
}

/**
 * @param {number} index
 * @param {string} newDescription
 */
function editTask(index, newDescription) {
    if (index >= 0 && index < tasks.length && newDescription !== "") {
        console.log(`Задача "${tasks[index].description}" змінена на "${newDescription}".`);
        tasks[index].description = newDescription;
    } else {
        console.log("Некорректный индекс задачи чи пустий опис.");
    }
}

function sortTasksAlphabetically() {
    tasks.sort((a, b) => a.description.localeCompare(b.description));
    console.log("Таски відсортовані.");
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    console.log("Таски видалені.");
}

function taskSummary() {
    let completedTasks = tasks.filter(task => task.completed).length;
    let incompleteTasks = tasks.length - completedTasks;
    console.log(`Усього задач: ${tasks.length}`);
    console.log(`Виконано: ${completedTasks}`);
    console.log(`Не виконано: ${incompleteTasks}`);
}

function showOldestTask() {
    if (tasks.length > 0) {
        let oldestTask = tasks.reduce((oldest, current) => {
            return new Date(oldest.createdAt) < new Date(current.createdAt) ? oldest : current;
        });
        console.log(`Старіша задача: "${oldestTask.description}" (Створена: ${oldestTask.createdAt})`);
    } else {
        console.log("Нема задач.");
    }
}

function showNewestTask() {
    if (tasks.length > 0) {
        let newestTask = tasks.reduce((newest, current) => {
            return new Date(newest.createdAt) > new Date(current.createdAt) ? newest : current;
        });
        console.log(`Новаіша задача: "${newestTask.description}" (Створена: ${newestTask.createdAt})`);
    } else {
        console.log("Нема задач.");
    }
}

function clearAllTasks() {
    tasks = [];
    console.log("Все видалено.");
}

addTask("Вивчити матеріал");
addTask("Написати код");
addTask("Відправити проект");
addTask("Перевірити задачу");

showTasks();

completeTask(1);

showTasks();

editTask(2, "Відправити проект");

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

clearAllTasks();

showTasks();
