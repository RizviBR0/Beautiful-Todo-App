const form = document.querySelector("form");
const input = document.querySelector("input");
const todos = document.querySelector(".todos");

// creation and appending
function createAndAppend(todoid, item) {
  const todo = document.createElement("div");
  todo.id = todoid;
  todo.classList.add("todo");

  const p = document.createElement("p");
  p.textContent = item;

  const i = document.createElement("i");
  i.classList.add("fas", "fa-trash");

  todo.appendChild(p);
  todo.appendChild(i);
  todos.appendChild(todo);

  todo.style.transform = "translateX(-100%)";
  todo.style.transition = "transform 0.3s ease-in";

  setTimeout(() => {
    todo.style.transform = "translateX(0px)";
  }, 100);
}

// generating random id
function todoId() {
  const todoid = Date.now().toString();
  return todoid;
}

const getTodosFromLocal = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// main event
form.addEventListener("submit", (event) => {
  event.preventDefault();

  createAndAppend(todoId(), input.value);

  const todos = getTodosFromLocal();
  todos.push({ id: todoId(), item: input.value });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  input.value = "";
});

// delete event
todos.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    const todoElem = event.target.parentElement;
    let todos = getTodosFromLocal();

    todos = todos.filter((todo) => todoElem.id !== todo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoElem.style.transform = "translateX(-100%)";
    setTimeout(() => {
      todoElem.remove();
    }, 300);
  }

  if (event.target.tagName === "P") {
    event.target.style.textOverflow = "clip";
    event.target.style.whiteSpace = "normal";
    event.target.style.color = "#000";
    console.log(event.target);
    setTimeout(() => {
      event.target.style.textOverflow = "ellipsis";
      event.target.style.whiteSpace = "nowrap";
      event.target.style.color = "#555";
    }, 3000);
  }
});

// method 1 for loading todos
window.addEventListener("DOMContentLoaded", () => {
  const todos = getTodosFromLocal();
  todos.forEach((todo) => {
    createAndAppend(todo.id, todo.item);
  });
});

// // method 2 for loading todos
// window.addEventListener("DOMContentLoaded", () => {
//   const todos = getTodosFromLocal();
//   todos.map((todo) => createAndAppend(todo.id, todo.item));
// });
