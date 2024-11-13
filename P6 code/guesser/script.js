//global variables
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const resetBtn = document.querySelector("#reset-btn");
const resetDiv = document.querySelector("#reset-div");

// this function will geneate a random number between 1 and 100
const getSecretNumber = () => Math.floor(Math.random() * 100) + 1;

let secretNumber = getSecretNumber();

// this will keep track of all the user's guesses
const previousGuesses = [];


// add the click event for the guess button
guessBtn.addEventListener('click', function(){
    //get the guess from the user
    const userGuess = Number(guessInput.value);
    if(previousGuesses.includes(userGuess)){
        showMessage(`You have already guessed ${userGuess}`);
    }else{
        previousGuesses.push(userGuess);  // add the guess to the list
        guessesLeft();
    }
    nextGuess();

    // now let's check if they have guessed the number
    if(userGuess === secretNumber){
        // they won!
        showFeedback(`You won in ${previousGuesses.length} guesses!`);
        // the game is now over...
        gameOver("W");
    }else if (userGuess > secretNumber){
        showFeedback(`${userGuess} is too high, guess a lower number.`);
    }else{
        showFeedback(`${userGuess} is too low, guess a bigger number.`);
    }

    previousGuesses.length >= 10 ? gameOver("L") : null ;



});  //end of guess button event listener


// this function will add message to the message paragraph
function showMessage(msg){
    const messagePara = document.querySelector("#message");
    messagePara.textContent = msg;
}// end of showMessage

// this function will give the user some feedback on their guess
function showFeedback(msg){
    const feedbackPara = document.querySelector("#feedback");
    feedbackPara.textContent = msg;
}


// this function will set the game up for the next user guess
function nextGuess(){
    // clear out the input box
    guessInput.value = '';
    guessInput.focus();  // put the cursor back in the input box
}// end of nextGuess


// this function will tell the user how many guesses are left
function guessesLeft(){
    const numGuessesLeft = 10 - previousGuesses.length;
    showMessage(`You have ${numGuessesLeft} guesses left`);
}



//this function will disable the button and input to end the game
function gameOver(status){
    guessBtn.disabled = true;
    guessInput.disabled = true;
    // showFeedback("GAME OVER");
    status === "L" ?
        showMessage(`Sorry you ran out of guesses, it was ${secretNumber}`) :
        showMessage(`Way to go! The number was ${secretNumber}`);
    // show the reset button div
    resetDiv.style.display = 'block';
}//end of gameOver
