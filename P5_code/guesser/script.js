// global variables
const guessBtn = document.querySelector("#guess-btn");
const resetBtn = document.querySelector("#reset-btn");
const resetDiv = document.querySelector("#reset-div");
const guessInput = document.querySelector("#guess-input");

// this will return a random number between 1 and 100
const getSecretNumber = () => Math.floor(Math.random() * 100) + 1;

let secretNumber = getSecretNumber();

// this array will hold all the previous guesses
const previousGuesses = [];

// the event listener for the guess button
guessBtn.addEventListener('click', function(){
    // get the guess from the user as a number
    const userGuess = Number(guessInput.value);

    // check to see if they have guessed this number before
    if(previousGuesses.includes(userGuess)) {
        showMessage(`You have already guessed ${userGuess}`);
    }else{
        previousGuesses.push(userGuess);
        nextGuess();
    }

    // now check to see if the guess is correct or not
    if(userGuess === secretNumber){
        // they got it correct!
        showFeedback(`You won in ${previousGuesses.length} guesses!`);
        // the game is over
        gameOver("win");
    }else if(userGuess > secretNumber){
        // they guessed too high
        showFeedback(`${userGuess} is too high, guess a smaller number`);
    }else{
        showFeedback(`${userGuess} is too low, guess a bigger number`);
    }

    previousGuesses.length >= 10 ? gameOver("lose") : null ;

});
//end of event listener

// this function will print out different messages to the message paragraph
function showMessage(msg){
    // grab the paragrah element
    const messagePara = document.querySelector("#message");
    messagePara.textContent = msg;
}// end of showMessage

// this function will givefeedback to the user
function showFeedback(msg){
    // grab the paragrah element
    const feedbackPara = document.querySelector("#feedback");
    feedbackPara.textContent = msg;
}// end of showMessage


//this function will get us ready for the next guess
function nextGuess(){
    guessInput.value = ""; //erase what the user typed in
    guessInput.focus(); //put the cursor in the input box
    const guessesLeft = 10 - previousGuesses.length;
    showMessage(`You have ${guessesLeft} guesses left`);
} //end of nextGuess

// this function will end the game
function gameOver(status){

    guessBtn.disabled = true;
    guessInput.disabled = true;
    status === "lose" ?
        showFeedback('Sorry, you ran out of guesses') :
        null;
    showMessage("GAME OVER!");
    resetDiv.style.display = 'block';
}

