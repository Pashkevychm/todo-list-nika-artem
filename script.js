function createTask(text) {
    let task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
        <input type="checkbox">
        <p class="task-text">${text}</p>
        <button class="delete-btn">Delete</button>
    `;
    return task
}


function saveTasks() {
    let encodedHTML = encodeURIComponent(task_list.innerHTML);
    let new_cookie = `tasks=${encodedHTML}; max-age=31536000; path=/`;
    document.cookie = new_cookie;
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
        saveTasks();
    }
})

task_list.addEventListener("click", function (e) {
    let taskElement = e.target.closest('.task');
    if (!taskElement) return;
    if (e.target.classList.contains('delete-btn')) {
        taskElement.remove();
    }
    if (e.target.type == 'checkbox'){
        if (e.target.checked){
            e.target.setAttribute('checked','');
        }else{
            e.target.removeAttribute('checked');
        }
    }
    saveTasks();
})

let cookie = false
let cookies = document.cookie.split(';')

for (let i = 0; i < cookies.length; i +=1) {
    let key_vaule = cookies[i].split('=')
    if (key_vaule[0] == 'tasks') {
        cookie = decodeURIComponent(key_vaule[1])
        break
    }
}

if (cookie) {
    task_list.innerHTML = cookie
}
