function createTask(text) {
    let task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
        <p>${text}</p>
        <button class="delete-btn">Delete</button>
    `;
    return task
}

let input_field = document.querySelector("input")
let add_btn = document.querySelector(".btn")
let task_list = document.querySelector(".tasks")

add_btn.addEventListener("click", function () {
    let taskText = input_field.value.trim();
    if (taskText !== '') {
        let newTask = createTask(taskText);
        task_list.appendChild(newTask);
        input_field.value = '';
        let new_cookie = `tasks=${task_list.innerHTML}; max-age=100000`
        document.cookie = new_cookie
    }
})

task_list.addEventListener("click", function (e) {
    let taskElement = e.target.closest('.task');
    if (!taskElement) return;
    if (e.target.classList.contains('delete-btn')) {
        taskElement.remove();
        return;
    }
})

let cookie = false
let cookies = document.cookie.split(';')

for (let i = 0; i < cookies.length; i +=1) {
    let key_vaule = cookies[i].split('=')
    if (key_vaule[0] == 'tasks') {
        cookie = key_vaule[1]
        break
    }
}

if (cookie) {
    task_list.innerHTML = cookie
}