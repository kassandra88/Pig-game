'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//starting conditions

let playing, currentScore, activePlayer, totalScores;

const init = () => {
    totalScores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

//Functions

init();

const switchPlayer = () => {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    currentScore = 0;

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling dice functionality

btnRoll.addEventListener('click', () => {
    if (playing) {
        //generating a random number
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display a dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // console.log(dice);

        // Chack for rolled 1
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        // Add current score to active player's total score

        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            totalScores[activePlayer];
        // Check if player's score is >= 100

        if (totalScores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            // Finish the game
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            // document.querySelector(`.player--${activePlayer}`).classList.add('name');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);