// First time excecution
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    localStorage.setItem("list", JSON.stringify([]));
    const ourList = [];
    localStorage.setItem("hasCodeRunBefore", true);
  }
};

// Fetching Elements
let input = document.querySelector(".input");
const addButton = document.querySelector(".addButton");
const container = document.querySelector(".container");

// function for element creation
function createElement() {
  let item = document.createElement("div");
  item.className = "item";
  item.style.display = "flex";
  let itemInput = document.createElement("div");
  itemInput.className = "item_input";
  itemInput.innerHTML = input.value;
  item.append(itemInput);
  container.append(item);

  // editButton
  let editButton = document.createElement("button");
  editButton.innerHTML = "EDIT";
  editButton.className = "editButton";
  item.append(editButton);

  // doneButton
  let doneButton = document.createElement("button");
  doneButton.innerHTML = "DONE";
  doneButton.style.color = "#1C8D73";
  doneButton.style.fontSize = "1.4rem";
  doneButton.style.background = "transparent";
  doneButton.style.border = "none";
  doneButton.style.display = "none";
  doneButton.style.fontFamily = "Bebas Neue, cursive";
  item.append(doneButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "DELETE";
  deleteButton.className = "deleteButton";
  item.append(deleteButton);

  let temp = itemInput.innerText;
  let storedList = JSON.parse(localStorage.getItem("list"));
  let index = storedList.indexOf(temp);

  editButton.addEventListener("click", (e) => {
    itemInput.contentEditable = true;
    editButton.style.display = "none";
    doneButton.style.display = "block";
  });

  doneButton.addEventListener("click", () => {
    itemInput.contentEditable = false;
    editButton.style.display = "block";
    doneButton.style.display = "none";
    storedList.splice(index, 1, itemInput.innerText);
    localStorage.setItem("list", JSON.stringify(storedList));
  });

  deleteButton.addEventListener("click", () => {
    container.removeChild(item);
    storedList.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(storedList));
  });
}

// for rendering list on add click
function renderToDo() {
  let list = localStorage.getItem("list");
  let ourList = JSON.parse(list);

  ourList &&
    ourList.forEach((e, index, arr) => {
      let item = document.createElement("div");
      item.className = "item";
      item.style.display = "flex";
      let itemInput = document.createElement("div");
      itemInput.className = "item_input";
      itemInput.innerHTML = e;
      item.append(itemInput);
      container.append(item);

      let editButton = document.createElement("button");
      editButton.innerHTML = "EDIT";
      editButton.className = "editButton";
      item.append(editButton);

      let doneButton = document.createElement("button");
      doneButton.innerHTML = "DONE";
      doneButton.style.color = "#1C8D73";
      doneButton.style.fontSize = "1.4rem";
      doneButton.style.background = "transparent";
      doneButton.style.border = "none";
      doneButton.style.display = "none";
      doneButton.style.fontFamily = "Bebas Neue, cursive";
      item.append(doneButton);

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "DELETE";
      deleteButton.className = "deleteButton";
      item.append(deleteButton);

      editButton.addEventListener("click", () => {
        itemInput.contentEditable = true;
        editButton.style.display = "none";
        doneButton.style.display = "block";
      });

      doneButton.addEventListener("click", () => {
        itemInput.contentEditable = false;
        arr[index] = itemInput.innerText;
        localStorage.setItem("list", JSON.stringify(arr));
        let b = localStorage.getItem("list");
        editButton.style.display = "block";
        doneButton.style.display = "none";
      });

      deleteButton.addEventListener("click", () => {
        container.removeChild(item);
        let storedList = JSON.parse(localStorage.getItem("list"));
        storedList.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(storedList));
      });
    });
}

// add list handler
function addHandler() {
  if (localStorage.length == 0) {
    localStorage.setItem("list", JSON.stringify([]));
  }

  if (input.value !== "") {
    let storedList = JSON.parse(localStorage.getItem("list"));
    storedList.push(input.value);
    localStorage.setItem("list", JSON.stringify(storedList));
    createElement();
    input.value = "";
  }
}

addButton.addEventListener("click", addHandler);
renderToDo();
