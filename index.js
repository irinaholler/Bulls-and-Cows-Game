// Bulls and Cows

const readlineSync = require("readline-sync");


function generateSecretNumber() {
  let digits = [];
  
  while (digits.length < 4) {
    let randomDigit = Math.floor(Math.random() * 10).toString();
    if (!digits.includes(randomDigit)) {
      digits.push(randomDigit);
    }
  }
  return digits.join("");
}

// Function to validate the player's guess
function isValidGuess(guess) {

  if (guess.length !== 4) return false;

  let guessSet = new Set(guess);  //store unique values
  return guessSet.size === 4 && !isNaN(guess);  //find the size of a Set
}

// Function to calculate bulls and cows
function getBullsAndCows(secret, guess) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }
  return { bulls, cows };
}

// Main game function
function playGame() {
  const secretNumber = generateSecretNumber();  //stores the secret 4-digit number that the computer generates
  let attempts = 0;
  console.log("Welcome to Bulls and Cows!");

  while (true) {
    const guess = readlineSync.question("Enter your 4-digit guess: ");

    if (!isValidGuess(guess)) {
      console.log(
        "Invalid guess! Make sure it's a 4-digit number with unique digits."
      );
      continue;
    }
    attempts++;

    const { bulls, cows } = getBullsAndCows(secretNumber, guess);

    if (bulls === 4) {
      console.log(
        `Congratulations! You've guessed the secret number ${secretNumber} in ${attempts} attempts!`
      );
      break;
    } else {
      console.log(`${bulls} bull(s) and ${cows} cow(s).`);
    }
  }
}

// Start the game
playGame();