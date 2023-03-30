"use strict";

// selecting element
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const score_0 = document.getElementById("score--0");
const score_1 = document.getElementById("score--1");
const current_0 = document.getElementById("current--0");
const current_1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores;
let currentScore;
let activePlayer;
let playing;

//initial condition
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score_0.textContent = 0;
    score_1.textContent = 0;
    current_0.textContent = 0;
    current_1.textContent = 0;

    diceEl.classList.add("hidden");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
};

//rolling dice
btnRoll.addEventListener("click", function () {
    if (playing) {
        //generating a random rice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //check for number 1
        if (dice !== 1) {
            //add to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        //current score add to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        //check for winner
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add("hidden");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            //switching to next player
            switchPlayer();
        }
    }
});

//reset game
btnNew.addEventListener("click", init);
