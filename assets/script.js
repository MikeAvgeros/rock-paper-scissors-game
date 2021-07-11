const gameBlock = document.querySelector('.game__block--wrapper');
const gameResult = document.querySelector('.game__result');
const scoreNumber = document.querySelector('.game__header--score--number');
const storedScore = localStorage.getItem("userScore");
let isDraw = false;
let userScore;

window.onload = () => {
    if (localStorage.userScore) {
        userScore = storedScore;
    } else {
        userScore = 0;
    }
    updateScore();
}

function updateScore() {
    scoreNumber.innerHTML = `<p>${userScore}</p>`;
}

const saveToLocalStorage = () => {
    localStorage.setItem("userScore", userScore);
}

gameBlock.addEventListener('click', event => {
    if (event.target.className === 'game__block--choice') {
        getWinner(event.target.id);
    }
});

function compPick() {
    possibleOptions = ['rock', 'paper', 'scissors'];
    randomIndex = Math.floor(Math.random() * possibleOptions.length);
    return possibleOptions[randomIndex];
}

function getWinner(playerPick) {
    let computerPick = compPick();
    switch (playerPick) {
        case 'paper':
            if (computerPick === 'rock') {
                setTimeout(win, 2500);
            } else if (computerPick === 'scissors') {
                setTimeout(lose, 2500);
            } else {
                draw();
            }
            break;
        case 'rock':
            if (computerPick === 'scissors') {
                setTimeout(win, 2500);
            } else if (computerPick === 'paper') {
                setTimeout(lose, 2500);
            } else {
                draw();
            }
            break;
        case 'scissors':
            if (computerPick === 'paper') {
                setTimeout(win, 2500);
            } else if (computerPick === 'rock') {
                setTimeout(lose, 2500);
            } else {
                draw();
            }
            break;
        default:
            alert("There's a problem");
    }
    removeAllChoices();
    displayCurrentChoices(playerPick, computerPick);
}

function displayCurrentChoices(playerPick, computerPick) {
    let playerChoice = document.getElementById(playerPick);
    let computerChoice = document.getElementById(computerPick);
    playerChoice.style.opacity = "0";
    computerChoice.style.opacity = "0";
    if (isDraw) {
        playerChoice.style.display = 'grid';
        playerChoice.style.gridArea = 'bottom';
        playerChoice.style.marginBottom = '15rem';
        playerChoice.style.opacity = "1";
    } else {
        const youChose = document.querySelector('#you-picked');
        const houseChose = document.querySelector('#house-picked');
        playerChoice.style.display = 'grid';
        playerChoice.style.gridArea = 'left';
        playerChoice.style.marginBottom = '6.25rem';
        computerChoice.style.display = 'grid';
        computerChoice.style.gridArea = 'right';
        computerChoice.style.marginBottom = '6.25rem';
        youChose.style.opacity = "1";
        houseChose.style.opacity = "1";
        setTimeout(() => {
            playerChoice.style.opacity = "1";
        }, 500)
        setTimeout(() => {
            computerChoice.style.opacity = "1";
        }, 1500)
    }
}

function removeAllChoices() {
    buttonElements = document.getElementsByClassName("game__block--choice");
    gameBlock.style.pointerEvents = 'none';
    for (let i = 0; i < buttonElements.length; i++) {
        buttonElements[i].style.display = 'none';
    }
}

function win() {
    userScore++;
    saveToLocalStorage();
    updateScore();
    gameResult.innerHTML = 
    `<h1>YOU WON!</h1>
    <button id="play-again">Play Again</button>`;
    const playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });
}

function lose() {
    if (userScore > 0) {
        userScore--;
    }
    saveToLocalStorage();
    updateScore();
    gameResult.innerHTML = 
    `<h1>YOU LOST</h1>
    <button id="play-again">Play Again</button>`;
    const playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });
}

function draw() {
    isDraw = true;
    gameResult.innerHTML = 
    `<h1>IT'S A DRAW</h1>
    <button id="play-again">Play Again</button>`;
    const playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });
}
  
document.getElementById("rule-button").onclick = function() {toggle_modal()};
document.getElementById("close__button").onclick = function() {toggle_modal()};

function toggle_modal(){
    document.getElementById("modal-rules").classList.toggle("show");
}
