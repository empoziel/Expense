//from the HTML
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusCheckbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.getElementById("delete");

//watching event
addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);

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

  //works just for delete
  if (ele.id === "delete") {
    //access to container
    const parent = ele.parentElement.parentElement;
    //delete element
    parent.remove();
  }
}
