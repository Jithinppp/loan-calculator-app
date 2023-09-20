const loanAmount = document.getElementById("loanAmountInput");
const loanInterest = document.getElementById("loanInterest");
const yearsToPay = document.getElementById("yearsToPay");
const inputForm = document.getElementById("inputForm");
const resultsContainer = document.querySelector(".resultsContainer");
const clearButton = document.getElementById("clearButton");
const resultItems = document.getElementById("resultItems");

function clearInputs() {
  loanAmount.value = "";
  loanInterest.value = "";
  yearsToPay.value = "";
}

function createResultItems(monthly, total, interest) {
  const monthlyItem = document.createElement("p");
  monthlyItem.textContent = `Monthly payment is : ${monthly}`;
  const totalItem = document.createElement("p");
  totalItem.textContent = `Total payment is : ${total}`;
  const interestItem = document.createElement("p");
  interestItem.textContent = `Total interest is : ${interest}`;

  resultItems.insertAdjacentElement("afterbegin", monthlyItem);
  resultItems.insertAdjacentElement("afterbegin", totalItem);
  resultItems.insertAdjacentElement("afterbegin", interestItem);
  clearInputs();
}

function showResults(monthly, total, interest) {
  document.getElementById("resultItems").innerHTML = "";
  const loader = document.createElement("p");
  loader.id = "loader";
  loader.textContent = "loading...";
  resultItems.appendChild(loader);

  resultsContainer.hidden = false;

  setTimeout(() => {
    createResultItems(monthly, total, interest);
    loader.hidden = true;
  }, 3000);
}

function calculate(principal, monthlyInterest, numberOfPayments) {
  const x = Math.pow(1 + monthlyInterest, numberOfPayments);
  //   get monthly payment
  const monthly = ((principal * x * monthlyInterest) / (x - 1)).toFixed(2);
  // get total payment
  const total = (monthly * numberOfPayments).toFixed(2);
  // get total interest
  const interest = (monthly * numberOfPayments - principal).toFixed(2);
  if (isNaN(monthly)) {
    alert("check your number");
    return;
  } else {
    console.log("calculation success");

    showResults(monthly, total, interest);
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  //   validate inputs
  if (!loanAmount.value || !loanInterest.value || !yearsToPay.value) {
    alert("please fill in all fields");
    return;
  }
  // else do the math
  const principal = parseFloat(loanAmount.value);
  const monthlyInterest = parseFloat(loanInterest.value);
  const numberOfPayments = parseFloat(yearsToPay.value);

  calculate(principal, monthlyInterest, numberOfPayments);
}

inputForm.addEventListener("submit", onFormSubmit);
clearButton.addEventListener("click", clearInputs);
