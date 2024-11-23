import { taskref } from "../index.js";
import {
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// clearing the input feilds
function clearFields() {
  const task = document.getElementById("Task");
  const priority = document.getElementById("Priority");
  task.value = "";
  priority.value = "Select";
}

// to flash message of success
function flashMessage() {
  const message = document.getElementById("message");
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 1000);
}

//writing the data in the firebase database
const button = document.getElementById("Submit");
button.addEventListener("click", function () {
  const task = document.getElementById("Task").value;
  const priority = document.getElementById("Priority").value;
  const element = {
    Task: task,
    Priority: priority,
    IsCompleted: false,
  };
  push(taskref, element);
  clearFields();
  flashMessage();
});

function delItems() {
  let container = document.getElementById("tasklist").children;
  const len = container.length;
  if (len == 0) {
  } else {
    const element = document.getElementById("tasklist");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

// this function creates a card which shows task card
const body = document.getElementById("tasklist");
function Create_Card(id, text, isCompleted) {
  // creation of html elements in body
  const div = document.createElement("div");
  const p = document.createElement("p");
  const check = document.createElement("input");

  // setting each elements properties and attributes

  //div properties
  div.setAttribute("class", "card");

  //checkbox properties
  check.setAttribute("type", "checkbox");
  check.setAttribute("data-id", id);
  if (isCompleted) {
    check.checked = true;
  } else {
    check.checked = false;
  }

  // event listener that updates the value of completeion to database
  check.addEventListener("change", function () {
    let isChecked;
    if (check.checked) {
      isChecked = true;
    } else {
      isChecked = false;
    }
    const updates = {
      id: { IsCompleted: isChecked },
    };
    update(taskref, updates)
      .then((response) => {
        console.log("data update successful!");
      })
      .catch((error) => {
        console.error(error);
      });
  });

  //p tag properties
  p.innerHTML = text;
  //placing each element
  body.appendChild(div);
  div.appendChild(p);
  div.appendChild(check);
}

/* this is more like a channel which keeps the track if the data on the databse has changed and whenever it is changed it recalls the block of code written in it */
onValue(taskref, function (snapShot) {
  const data = snapShot.val();
  console.log(data)
  delItems();
  for (let element in data) {
    Create_Card(element, data[element].Task, data[element].IsCompleted);
  }
});
