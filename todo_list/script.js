const form = document.querySelector("#form")
const input = document.querySelector("#input")
const todosUL = document.querySelector("#todos")

const todos = JSON.parse(localStorage.getItem("todos"))
if (todos) {
  todos.forEach((todo) => addTodo(todo))
}

function addTodo(todo) {
  let todoText = input.value
  if (todo) {
    todoText = todo.text
  }
  if (todoText) {
    const todoEl = document.createElement("li")
    if (todo && todo.completed) {
      todoEl.classList.add("completed")
    }
    todoEl.innerText = todoText
    todosUL.appendChild(todoEl)
    input.value = ""

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed")
      updateLS()
    })

    todoEl.addEventListener("contextmenu", (event) => {
      event.preventDefault()
      todoEl.remove()
    })

    updateLS()
  }
}

function updateLS() {
  const todosEL = document.querySelectorAll("li")
  const todos = []
  todosEL.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    })
  })
  localStorage.setItem("todos", JSON.stringify(todos))
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  addTodo()
})
