'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

//One object for each account use object to mimic API
//whenever get data from api data comes in as objects
const account1 = {
  owner: 'Nez Mustafa',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 4563,
};

const account2 = {
  owner: 'Sarah Smith',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 7309,
};

const account3 = {
  owner: 'Axel Landin',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 5177,
};

const account4 = {
  owner: 'Olivia Jones',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 8692,
};




//put objects into array

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//const currencies = new Map([
//  ['USD', 'United States dollar'],
//  ['EUR', 'Euro'],
//  ['GBP', 'Pound sterling'],
//]);
//
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////





//but the arrat and foreach in seperate function

const displayMovements = function(movements) {
    //empty container
    containerMovements.innderHTML = '' ;
    //inner html returns everythign including html
    //function should recieve one array of movements and work with data
    //pass data directly on function
    movements.forEach(function(mov, i){
        //get current movement and index
        
     //if current movement greater than zero movement should be deposit
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        
        //html template literal
        //construct class using template literal
        //mov current element
        const html = `
       <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
         `;
        
        
        containerMovements.insertAdjacentHTML('afterbegin', html);
        //insert html into movements elements
        //adter begin option will insert at the top second parameter html want to insert
    });
};


displayMovements(account1.movements);


























