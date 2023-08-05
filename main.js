//from the HTML
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusCheckbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.getElementById("delete");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");

//watching event
addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input", saveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change", handleFilter);

//keep sum value here
let sum = 0;

function updateSum(price) {
  //update js sum value
  sum += Number(price);

  // update sum info from HTMl
  sumInfo.innerText = sum;
}

function addExpense(event) {
  //block the refresh page
  event.preventDefault();

  // ! if one of the inputs is empty : start alert and stop the function
  if (!nameInput.value || !priceInput.value) {
    alert("Please fill the form...");
    return;
  }
  // ! if inputs are fill : create a card and send html

  //create a div
  const expenseDiv = document.createElement("div");

  //add class to div
  expenseDiv.classList.add("expense");

  // if paid checkbox is fill , add paid class
  if (statusCheckbox.checked === true) {
    expenseDiv.classList.add("payed");
  }

  //set the HTML inside
  expenseDiv.innerHTML = `
          <h2 class="name">${nameInput.value}</h2>
          <h2 class="price">${priceInput.value}</h2>
          <div class="btns">
            <img id="edit" src="images/pay-icon.png" />
            <img id="delete" src="images/delete-iconpng.png" />
          </div>
  `;

  // created element to HTML
  listArea.appendChild(expenseDiv);

  //update sum
  updateSum(priceInput.value);

  //clean form

  nameInput.value = "";
  priceInput.value = "";
  statusCheckbox.checked = false;
}

//It works when an element in the list is clicked.
function handleUpdate(e) {
  const ele = e.target;

  //access to container
  const parent = ele.parentElement.parentElement;

  //works just for delete
  if (ele.id === "delete") {
    //delete element
    parent.remove();

    // update sum value
    const price = parent.querySelector(".price").textContent;

    updateSum(Number(price) * -1);
  }

  // if element id is 'edit' payed , reverse class
  if (ele.id === "edit") {
    parent.classList.toggle("payed");
  }
}

//Save user to local
function saveUser(e) {
  localStorage.setItem("username", e.target.value);
}

//if username is added to localstorage
function getUser() {
  //get username from local -- print '' if name empty
  const username = localStorage.getItem("username") || "";

  userInput.value = username;
}

function handleFilter(e) {
  const selected = e.target.value;
  const items = list.childNodes;

  items.forEach((item) => {
    //watch the selected values
    switch (selected) {
      case "all":
        item.style.display = "flex";
        break;
      case "payed":
        if (item.classList.contains("payed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}
