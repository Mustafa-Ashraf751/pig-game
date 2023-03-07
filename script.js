'use strict';
// define variable
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const currentOne = document.querySelector('#current--0');
const currentTwo = document.querySelector('#current--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
let randomSum = 0;

// make function to switch to player two
const switchTwo = function () {
  playerOne.classList.remove('player--active');
  playerTwo.classList.add('player--active');
};

// make function to switch to player one
const switchOne = function () {
  playerTwo.classList.remove('player--active');
  playerOne.classList.add('player--active');
};

// hide the dice when page load
dice.classList.add('hidden');

// make a function to add points to each player

const rollFunction = function () {
  // create randoms numbers from 1 to 6 and display it to user
  const random = Math.floor(Math.random() * 6) + 1;

  dice.classList.remove('hidden');
  switch (random) {
    case 1:
      dice.setAttribute('src', 'dice-1.png');
      break;
    case 2:
      dice.setAttribute('src', 'dice-2.png');
      break;
    case 3:
      dice.setAttribute('src', 'dice-3.png');
      break;
    case 4:
      dice.setAttribute('src', 'dice-4.png');
      break;
    case 5:
      dice.setAttribute('src', 'dice-5.png');
      break;
    case 6:
      dice.setAttribute('src', 'dice-6.png');
      break;
  }
  // check if random equel one and switch the player and clear the score if the user didnt hold his score
  randomSum += random;
  if (random !== 1 && playerOne.classList.contains('player--active')) {
    currentOne.textContent = randomSum;
  } else if (random === 1 && playerOne.classList.contains('player--active')) {
    switchTwo();
    currentOne.textContent = 0;
    randomSum = 0;
  } else if (random !== 1 && playerTwo.classList.contains('player--active')) {
    currentTwo.textContent = randomSum;
  } else if (random === 1 && playerTwo.classList.contains('player--active')) {
    switchOne();
    currentTwo.textContent = 0;
    randomSum = 0;
  }
};

rollBtn.addEventListener('click', rollFunction);

// when click on button hold move the score to the user and switch to another user
let totalOne = 0;
let totalTwo = 0;
scoreOne.textContent = 0;
scoreTwo.textContent = 0;

// make function to hold points for user

const holdFunction = function () {
  if (playerOne.classList.contains('player--active')) {
    totalOne += randomSum;
    scoreOne.textContent = totalOne;
    currentOne.textContent = 0;
    randomSum = 0;
    switchTwo();
  } else if (playerTwo.classList.contains('player--active')) {
    totalTwo += randomSum;
    scoreTwo.textContent = totalTwo;
    switchOne();
    currentTwo.textContent = 0;
    randomSum = 0;
  }
  // if  the player win stop the game and change background
  if (totalOne >= 100) {
    playerOne.classList.add('player--winner');
    dice.classList.add('hidden');
    rollBtn.removeEventListener('click', rollFunction);
    holdBtn.removeEventListener('click', holdFunction);
  } else if (totalTwo >= 100) {
    playerTwo.classList.add('player--winner');
    dice.classList.add('hidden');
    rollBtn.removeEventListener('click', rollFunction);
    holdBtn.removeEventListener('click', holdFunction);
  }
};

holdBtn.addEventListener('click', holdFunction);

// when the user click on new game reset everything

const newGame = document.querySelector('.btn--new');

newGame.addEventListener('click', () => {
  // reset all values
  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  dice.classList.add('hidden');
  totalOne = 0;
  totalTwo = 0;
  randomSum = 0;
  // call back functions to reuse the buttons
  rollBtn.addEventListener('click', rollFunction);
  holdBtn.addEventListener('click', holdFunction);
  // reset the player winner class and set the default active class to player one
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  if (playerOne.classList.contains('player--winner')) {
    playerOne.classList.remove('player--winner');
  } else if (playerTwo.classList.contains('player--winner')) {
    playerTwo.classList.remove('player--winner');
  }
});
