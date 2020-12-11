// DOM SELECTORS
const btn = document.querySelector('form .btn')
const todoInput = document.querySelector('.todos-container form input')
const userName = document.querySelector('.username')
const id = document.querySelector('.id')
const ul =  document.querySelector('.todo-list')
const options =  document.querySelector('.filter')
const container = document.querySelector('.container')
const content = document.querySelector('.content')
const navBtn = document.querySelector('.nav-btn')
const navBar = document.querySelector('.navbar')
const updateNameBtn = document.querySelector('.update-username')
const openInstructionBtn = document.querySelector('.open-instruction')
const instructionBtn = document.querySelector('.instructions button')
const avatarBtn = document.querySelector('.select-avatar-btn')
const selectAvatar = document.querySelectorAll('.avatars-container .avatar')
const setAvatar = document.querySelector('#avatar')
const nameField = document.querySelector('.name')
const body = document.querySelector('body')

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodo)
window.addEventListener('scroll', hideMenu)
btn.addEventListener('click', addTodos)
ul.addEventListener('click', deleteCheck)
options.addEventListener('click', filter)
instructionBtn.addEventListener('click', closeInstruction)
openInstructionBtn.addEventListener('click', openInstruction)
selectAvatar.forEach(avatar => {
    avatar.addEventListener('click', chooseAvatar)
});
avatarBtn.addEventListener('click', () => {
    body.classList.toggle('show-avatar')
})
navBtn.addEventListener('click', () => {
    container.classList.toggle('change')
})
content.addEventListener('click', () => {
    container.classList.remove('change')
    container.classList.remove('open-instruction')
    body.classList.remove('show-avatar')
    container.classList.remove('ask-name')
})

//ADD BACKUP BACKGROUND ^_^
setTimeout(() => {
    const body = document.querySelector('body')
  
  body.style.background = 'linear-gradient(120deg, #f6d365, #fda085)'
}, 500);

//GET USERNAME AND PRINT
nameField.addEventListener('submit', (e)=>{
    e.preventDefault();
    container.classList.remove('ask-name')
    container.classList.remove('open-instruction')
    updateName()
})

getName()
function getName(){
    let name 

    if(localStorage.getItem('name') === null){
        setTimeout(() => {
        // Make Name field visible & focus into it
        container.classList.add('ask-name')
        document.querySelector('.name input').focus()

        // Get the value of input
        name = document.querySelector('.name input').value

        //clear input field
        document.querySelector('.name input').value = ''

        // Capitalize first Letter
        let arr = name.split('')
        let u = arr[0].toUpperCase()
        arr.splice(0,1,u)
        name  = arr.join('')
        userName.innerText = `${name}'s`
        id.innerText = `${name}`

        //Save to Localstorage
        saveName(name);
        }, 2000);
    } else {
        // Get saved name from localstorage and print
        name = localStorage.getItem('name')
        userName.innerText = `${name}'s`
        id.innerText = `${name}`
    }
}

//update username
updateNameBtn.addEventListener('click', ()=>{
    container.classList.remove('change')
    navBar.style.visibility = 'hidden'
    container.classList.add('ask-name')
    document.querySelector('.name input').focus()
})

function updateName() {
    //get name from localstorage & rest to new input value
    let name = localStorage.getItem('name')
    name = null
    name = document.querySelector('.name input').value

    //clear input field
    document.querySelector('.name input').value = ''

    // Capitalize first Letter
    let arr = name.split('')
    let u = arr[0].toUpperCase()
    arr.splice(0,1,u)
    name  = arr.join('')
    userName.innerText = `${name}'s`
    id.innerText = `${name}`

    //Save to Localstorage
    saveName(name);
}

function saveName(name) {
    localStorage.setItem('name', name)
    localStorage.setItem('id', name)
}

// **************   END OF NAME FUNTIONALITY

// ******  TODO FUNTIONALITY

function addTodos(ev) {
    ev.preventDefault()


    if(todoInput.value == '' || todoInput.value.trim() == '') {
      return
    } else {
    //DIV WRAPPER
    const div = document.createElement('div')
    div.classList.add('todo')

    //TODO CONTENT
    const li =  document.createElement('li')
    li.classList.add('todo-item')
    li.textContent = todoInput.value
    div.appendChild(li)
    saveToLocalStorage(todoInput.value)
    //BUTTONS
    const checkMark = document.createElement('button')
    const deleteBtn = document.createElement('button')

    checkMark.innerHTML = '<i class="fas fa-check"></i>'
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    checkMark.classList.add('check')
    deleteBtn.classList.add('delete')


    div.appendChild(checkMark)
    div.appendChild(deleteBtn)
    

    ul.appendChild(div)
    todoInput.value = ''
    }

}

function deleteCheck(e) {
 let item = e.target
 let parent = item.parentElement

 //CHECK COMPLETED AND DELETE
    if(item.classList.contains('delete')){
        parent.classList.add('animate')
        deleteTodoFromLStorage(parent)
        //EVENT WAITS FOR TRANSITION TO END THEN FIRES
        parent.addEventListener('transitionend', () => {
            parent.remove()
        })
    } else if (item.classList.contains('check')){
        parent.classList.toggle('completed')
    } else {
        return
    }
}

function filter(e) {
    console.log(e.target.value)
    const todos  = document.querySelectorAll('.todo')
    todos.forEach(todo => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed': 
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex'
            } else {
                todo.style.display = 'none'
            }
            break
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
        }
    })
}

function saveToLocalStorage(todo) {
    //CHECK IF TODOS EXISTS IN LOCALSTORAGE
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }  else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    let updateList = JSON.stringify(todos)
    localStorage.setItem('todos', updateList)
}

function getTodo(){
    //CHECK IF TODOS EXISTS IN LOCALSTORAGE
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }  else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach((todo) => {
        //DIV WRAPPER
        const div = document.createElement('div')
        div.classList.add('todo')

        //TODO CONTENT
        const li =  document.createElement('li')
        li.classList.add('todo-item')
        li.textContent = todo
        div.appendChild(li)

        //BUTTONS
        const checkMark = document.createElement('button')
        const deleteBtn = document.createElement('button')

        checkMark.innerHTML = '<i class="fas fa-check"></i>'
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        checkMark.classList.add('check')
        deleteBtn.classList.add('delete')


        div.appendChild(checkMark)
        div.appendChild(deleteBtn)
        

        ul.appendChild(div)
    })
}

function deleteTodoFromLStorage(todo) {
    //CHECK IF TODOS EXISTS IN LOCALSTORAGE
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }  else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    let todoIndex = todo.children[0].innerText
    let index = todos.indexOf(todoIndex)
    todos.splice(index,1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// ************ END OF TODO FUNCTIONALITY


//open & close Instructions

function openInstruction() {
    container.classList.remove('change')
    container.classList.add('open-instruction')
    navBar.style.visibility = 'hidden'
}

function closeInstruction() {
        container.classList.remove('open-instruction')
}

//Select Avatar
saveAvatar()
function saveAvatar() {
    let url
    if(localStorage.getItem('avatar') === null) {
         url = setAvatar.getAttribute('src')
        localStorage.setItem('avatar', url)
    } else {
        url = localStorage.getItem('avatar')
        setAvatar.setAttribute('src', url)
    }
    
}

function chooseAvatar(){
    let url = this.getAttribute('src')
    let resetAvatar = localStorage.getItem('avatar')
    resetAvatar = url
    localStorage.setItem('avatar', resetAvatar)
    setAvatar.style.filter = 'blur(3px)'
    setTimeout(() => {
        setAvatar.setAttribute('src', url)
        setAvatar.style.filter = 'blur(1px)'
        setTimeout(() => {
            setAvatar.style.filter = 'blur(0px)'
        }, 1400);
    }, 3000);
}

// Hide Menu on Scroll

function hideMenu(){
    let btnBottom = navBtn.getBoundingClientRect().bottom
    let inputBottom = todoInput.getBoundingClientRect().bottom

    if(inputBottom < btnBottom) {
        container.classList.add('hide-menu')
    } else {
        container.classList.remove('hide-menu')
    }
}