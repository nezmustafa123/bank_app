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




//put the array and foreach in seperate function

const displayMovements = function (movements) {
    //empty container defaults
    containerMovements.innderHTML = '';
    //inner html returns everythign including html
    //function should recieve one array of movements and work with data
    //pass data directly in function
    movements.forEach(function (mov, i) {
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
        //insert html into movements elements after begin so child elements appear before any older ones
        //adter begin option will insert at the top second parameter html want to insert
    });
};


displayMovements(account1.movements);
//reference array in object


const calcDisplayBalance = function(movements) {
    const balance = movements.reduce(function(acc, mov){
        //accumulator first parameter starts at 0
        //acc is added to each iteratoin of loop so have to return the value use acc to keep track of sum on, each iteration returns accumulator and current element sum
        return acc + mov;
    }, 0);
    //it returns one single number so all values added together starter value 0
    //change balance labels text content
    labelBalance.textContent = `${balance} GBP`;
};


calcDisplayBalance(account1.movements);


const calcDisplaySummary = function(movements) {
    //will recienve movements from account 1 atm
    const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov, 0);
}






//function to compute usernames oneo for each user in accounts
const createUsernames = function (accs) {
    //create function with username variable
    //recieve array of accounts modify array get as input
    accs.forEach(function (acc) {
        //create new property username equate it to user owner modified
        acc.username = acc.owner
            .toLowerCase()
            .split(' ') //split string into words by space
            .map(function (name) {
                return name[0];

            })
            .join('');
        //no need to return
    });
};

createUsernames(accounts);
console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//reduce for maximum value sum multiplication or string object
//find max value of movments
const max = movements.reduce((acc, mov) => {
   //usee acc to keep track of current maximum
    //acc in this case starts as the first value in array
    if (acc > mov) {
        return acc; //have to return acc on next iteration don't change
    } else {
        //return movement as next iteration
        return mov
    }
},movements[0]); //put first value of array



const euroToGBP = 1.3;
//chain all the array methods into one
movements.filter(function(mov){
    //filter for movements positive
    return mov > 0;
}).map(function(mov, i, arr){
    console.log(arr); //console.log arr to debug checkout current array in next array method call map method on result of filter this callback is called 5 times 
    //chain map
    //convert Euros into pounds
   return  mov => mov * euroToGBP; 
}).reduce(function(acc, mov){
    //chain reduce add all values together accumulator mov
    //add all values together
    return acc + mov;
},0);
//could chain other methods oo as long as they return arrays can't chain map or filter after reduce
//data pipline processing
console.log(eurToGBP);








