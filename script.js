// import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEL = document.getElementById('playerScore');
const playerChoiceEL = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');
const resultText = document.getElementById('resultText');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScoreNumber = 0;
let computerScoreNumber =0;
let computerChoice = '';

// Reset all 'selected' icons
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  import('./confetti.js')
    .then((module) => {
      module.stopConfetti();
      module.removeConfetti();
    });
}

// ResetScore & playerChoice/computerChoice
function resetAll()  {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEL.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEL.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
}
window.resetAll = resetAll;

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if(computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}

// Add 'selected' styling & computerChoice
function displayComputerChoice() {
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

// Check results, increase scores, update resultText
function updateScore(playerChoice) {
  if(playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice) > -1) {
      import('./confetti.js')
        .then((module) => {
          module.startConfetti();
          resultText.textContent = "You Won!";
          playerScoreNumber++;
          playerScoreEL.textContent = playerScoreNumber;
        });
    } else {
      resultText.textContent = "You Lose!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice)
}

// Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  // Add 'selected' styling & playerChoice
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEL.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEL.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEL.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEL.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEL.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}
window.select = select;

// On startup, set initial values
resetAll();