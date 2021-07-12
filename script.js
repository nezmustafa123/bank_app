"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANK APP

// Data

//One object for each account use object to mimic API
//whenever get data from api data comes in as objects
const account1 = {
  owner: "Nez Mustafa",
  movements: [19000, 2000, 4900, 14500, 3060, -5006, -13500, 7000],
  interestRate: 1.2, // %
  pin: 4563,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2021-07-12T10:51:36.790Z",
  ],
  currency: "GBP",
  locale: "en-gb", // en-gb
};

const account2 = {
  owner: "Sarah Smith",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 7309,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:44:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:13:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "GBP",
  locale: "en-gb", // en-gb
};

const account3 = {
  owner: "Axel Landin",
  movements: [2500, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 5177,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-18T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:39:59.371Z",
    "2020-07-26T12:08:20.894Z",
  ],
  currency: "GBP",
  locale: "en-gb", // en-gb
};

const account4 = {
  owner: "Olivia Jones",
  movements: [430, 1000, 700, 50, 90, 3920, 1000, 800],
  interestRate: 1,
  pin: 8692,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2021-07-10T18:49:59.371Z",
    "2021-07-11T12:01:20.894Z",
  ],
  currency: "GBP",
  locale: "en-gb", // en-gb
};

const account5 = {
  owner: "John James",
  movements: [4300, 1000, -700, 5000, 96000, -6500, 2300, 1220],
  interestRate: 1.3,
  pin: 9892,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2021-07-11T12:01:20.894Z",
  ],
  currency: "GBP",
  locale: "en-gb", // en-gb
};

//put objects into array

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
//get input values
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), date);
  //days passed between now and dates in object
  console.log(daysPassed);

  if (daysPassed === 0) return "Today"; //when hit return function stops executing
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    //get day month year
    return `${day}/${month}/${year}`;
  }
};

//put the array and foreach in seperate function

const displayMovements = function (acc, sort = false) {
  //set sort to false first then call it with true
  //empty container defaults
  containerMovements.innerHTML = "";
  //inner html returns everythign including html
  //function should recieve one array of movements and work with data
  //pass data directly in function
  //don't sort underlying movements array create copy using slice method
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  //if sort is false then should just return movements as is and print on screen as is
  //if true then create shallow copy using slice then sort
  console.log(movs);
  movs.forEach(function (mov, i) {
    //;oop through the current accounts movements
    //use movements just created
    //get current movement and index

    //if current movement greater than zero movement should be deposit
    const type = mov > 0 ? "deposit" : "withdrawal";
    //use the available index to also loop over movementDates reference elements with the equivalent index in dates array
    const date = new Date(acc.movementsDates[i]); //convert back to javascript object to get day month etc
    const displayDate = formatMovementDate(date); //printing the result of the formatMovementDate in the template literal (display date)
    //html template literal
    //construct class using template literal
    //mov current element
    const html = `
       <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div> 
          <div class="movements__value">£${mov.toFixed(2)}</div>
        </div>
         `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    //insert html into movements elements after begin so child elements appear before any older ones
    //adter begin option will insert at the top second parameter html want to insert
  });
};

//displayMovements(account1.movements);
//reference array in object

const calcDisplayBalance = function (acc) {
  //pass in entire account
  //set new property in account object recieved
  acc.balance = acc.movements.reduce(function (acc, mov) {
    //accumulator first parameter starts at 0
    //acc is added to each iteratoin of loop so have to return the value use acc to keep track of sum on, each iteration returns accumulator and current element sum
    return acc + mov;
  }, 0);
  //    acc.balance = balance;
  //it returns one single number so all values added together starter value 0
  //change balance labels text content

  labelBalance.textContent = `£${acc.balance.toFixed(2)} £`;
};

//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  //will recienve whole account object
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `£${incomes}`;

  const outgoings = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `£${Math.abs(outgoings.toFixed(2))}`;
  //calc interest
  //    const interestRate = 0.3;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * acc.interestRate) //multiply each deposit with accounts interest rate
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
      //only interest that are at least one will make it into the next step of pipeline (reduce)
      //exclude interest below one
      // has access to interests index arr
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `£${interest.toFixed(2)}`;
};

//calcDisplaySummary(account1.movements);

//function to compute usernames oneo for each user in accounts
const createUsernames = function (accs) {
  //create function with username variable
  //recieve array of accounts modify array gotten by function as input
  accs.forEach(function (acc) {
    //loop through array on each iteration create new property on object
    //create new property username equate it to user owner modified
    acc.username = acc.owner
      .toLowerCase()
      .split(" ") //split string into words by space
      .map(function (name) {
        return name[0];
      })
      .join("");
    //no need to return
  });
};

createUsernames(accounts);

//implement transfers
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  //vconvert to a number because value is string
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  ); //find account that has username value qeual to value input into form

  //    console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //amount needs to be greater than 0 and balance needs to be greater than or equal to amount transferring
    //optional chaining
    //       receiverAcc? will be undefined if doesnt exist
    console.log("Transfer valid");

    currentAccount.movements.push(-amount); //push negative amount on current account movements
    receiverAcc.movements.push(amount);
    //to the receiver account add positive moements

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString()); //create new date and push to current
    receiverAcc.movementsDates.push(new Date().toISOString()); // add to reciever account
    console.log(receiverAcc);
    updateUI(currentAccount);
  }
});

const updateUI = function (acc) {
  //pass currrent account in as parameter
  //display movements
  //dynamically display movements

  displayMovements(acc);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);

  //update UI
};

//Event handlers

let currentAccount;

//current account variable global so you know from which account to transfer money from and to afterwards
//fake always logged in
//automatically login change current account and ui login as account one
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//define variable outside function because need information about current account outside functions

btnLogin.addEventListener("click", function (e) {
  //Prevent from from submitting
  e.preventDefault();
  //    console.log('LOGIN');
  //find name from accounts arrat user inputted
  //loop through accounts find username value
  //points to same object in memory
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  //compare value user inputs to that username
  //if no element matches condition then will return undefined

  //check to see if inputted pin is equal to current account pin
  //convert to a Number
  //optional chaining if account doesn't exist won't check pin

  inputTransferAmount.value = inputTransferTo.value = "";

  if (currentAccount?.pin === +inputLoginPin.value) {
    //        console.log('LOGIN');

    //display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;
    //whenever log in create new date
    const now = new Date();
    // create new date object now's date
    // labelDate.textContent = now;
    //set datelabel to now
    const day = `${now.getDate()}`.padStart(2, 0); //day
    //use pad start two charachters long write zero if day 16 zero wouldn't be added
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    //create new string with the vvalues from date object
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //clear input fields

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    //assignment operator right to left assign both

    //refactor three functions taking in current account1
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //round down
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //if ANY movement in current account is greater than 10 percent of requested amount will return true
    //add movement
    currentAccount.movements.push(amount);

    //add loan date
    currentAccount.movementsDates.push(new Date().toISOString()); //create new date and push to current

    //update UI
    updateUI(currentAccount);
    //pass current account into update UI function
  }
  inputLoanAmount.value = "";
});

//use find index and splice to delete specific account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Delete");
  //if user equal to current user and parseInt
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    //use splice method to delete account in accounts arary
    //pass in calculated index using find index and delete item
    //swap number with plus sign
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    //returns index of first element in array that matches this condition
    //loop over array on each iteration check if acc user name is same as

    //delete account

    accounts.splice(index, 1);

    //hide UI

    containerApp.style.opacity = 0;

    console.log(index);
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

//state variable
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  //olt pass in sported parameter/arument in this event handler
  displayMovements(currentAccount, !sorted);
  //if sorted is false iniitially want sorted true
  //then wanted sorted to be true
  sorted = !sorted;
});

//select all the elements that have this class
// const movementsUI = Array,from(document.querySelectorAll('.movements_value'));
//will load all the elements with movements value class

//add evelnt listener to label blance to get values added dynamically need to use event handler

labelBalance.addEventListener("click", function () {
  //add to event handler
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    //colour every other row check if index is divisible by 2 get the row itself and index
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    //if index is even then change row colour to orange red
    // 0 3 6 9

    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});
