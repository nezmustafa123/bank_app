'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANK APP

// Data

//One object for each account use object to mimic API
//whenever get data from api data comes in as objects
const account1 = {
    owner: 'Nez Mustafa',
    movements: [19000000, 200000, 490000, -14500, 30600000, -5006500, -13500, 700000, 1300000, -160030, 420000000],
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
    movements: [2500, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 5177,
};

const account4 = {
    owner: 'Olivia Jones',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 8692,
};

const account5 = {
    owner: 'John James',
    movements: [4300, 1000, -700, 5000, 96000, -6500],
    interestRate: 1.3,
    pin: 9892,
    
};






//put objects into array

const accounts = [account1, account2, account3, account4, account5];

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
//get input values
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
          <div class="movements__value">£${mov}</div>
        </div>
         `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
        //insert html into movements elements after begin so child elements appear before any older ones
        //adter begin option will insert at the top second parameter html want to insert
    });
};


//displayMovements(account1.movements);
//reference array in object


const calcDisplayBalance = function(acc) {//pass in entire account
    //set new property in account object recieved
    acc.balance = acc.movements.reduce(function(acc, mov){
        //accumulator first parameter starts at 0
        //acc is added to each iteratoin of loop so have to return the value use acc to keep track of sum on, each iteration returns accumulator and current element sum
        return acc + mov;
    }, 0);
//    acc.balance = balance;
    //it returns one single number so all values added together starter value 0
    //change balance labels text content
    
    labelBalance.textContent = `£${acc.balance}`;
};


//calcDisplayBalance(account1.movements);


const calcDisplaySummary = function(acc) {
    //will recienve whole account object
    const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov, 0);
    labelSumIn.textContent = `£${incomes}`;
    
    
    const outgoings = acc.movements.filter(mov => mov < 0)
    .reduce((acc,mov) => acc + mov, 0);
    labelSumOut.textContent = `£${Math.abs(outgoings)}`;
    //calc interest
//    const interestRate = 0.3;
    const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate) //multiply each deposit with accounts interest rate
    .filter((int, i, arr)=> {
        console.log(arr);
        return int >=1
        //only interest that are at least one will make it into the next step of pipeline (reduce)
        //exclude interest below one 
        //interests index arr
    })
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `£${interest}`
    
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
            .split(' ') //split string into words by space
            .map(function (name) {
                return name[0];

            })
            .join('');
        //no need to return
    });
};

createUsernames(accounts);

//implement transfers
btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    //vconvert to a number because value is string
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    ); //fund account that has username value qeual to value input into form 
    
//    console.log(amount, receiverAcc);
    
    
    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
       //amount needs to be greater than 0 and balance needs to be greater than or equal to amount transferring
       //optional chaining 
//       receiverAcc? will be undefined if doesnt exist
       console.log('Transfer valid');
       
       currentAccount.movements.push(-amount); //push negative amount on current account movements
       receiverAcc.movements.push(amount);
        //to the receiver account add positive moements
        console.log(receiverAcc);
       updateUI(currentAccount);

        
       }
});

const updateUI  = function(acc) {
        //pass currrent account in as parameter
        //display movements 
        //dynamically display movements

        displayMovements(acc.movements);

       //display balance 
        calcDisplayBalance(acc);

        //display summary
        calcDisplaySummary(acc);
        
        //update UI
        
};



//Event handler

let currentAccount;

//current account variable global know from which account to transfer money from


//define variable outside function because need information about current account outside functions
btnLogin.addEventListener('click', function(e){
    //Prevent from from submitting
    e.preventDefault();
//    console.log('LOGIN');
    //find name from accounts arrat user inputted
    //loop through accounts find username value
  //points to same object in memory 
    currentAccount =  accounts.find(acc => acc.username === inputLoginUsername.value);
    //compare value user inputs to that username
    //if no element matches condition then will return undefined

    //check to see if inputted pin is equal to current account pin
    //convert to a Number
    //optional chaining if account doesn't exist won't check pin
        
    inputTransferAmount.value = inputTransferTo.value = '';   
        
        
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
//        console.log('LOGIN');
       
       //display UI and message
       labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;


       //clear input fields  

       inputLoginUsername.value = inputLoginPin.value = '';
       inputLoginPin.blur();
       //assignment operator right to left assign both

          
         //refactor three functions taking in current account1
         updateUI(currentAccount);
        }
       });

        btnClose.addEventListener('click', function(e){
          e.preventDefault();
              console.log('Delete');
        //if user equal to current user and parseInt
       if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
                 
         }
   
});


