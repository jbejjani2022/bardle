document.addEventListener("DOMContentLoaded", () => {

  // also in local storage
  let guessedWordCount = 0;
  let availableSpace = 1;
  let guessedWords = [[]];

  // 0 is false, 1 is true
  let gameOver = 0;
  let typingDisabled = false;

  let d = new Date();
  let currentDate = d.toLocaleDateString('en-US');

  const words = {'3/17/2022': 'faith', '3/18/2022': 'grime', '3/19/2022': 'flies', '3/20/2022': 'doits', '3/21/2022': 'eaves', '3/22/2022': 'flesh', '3/23/2022': 'knack', '3/24/2022': 'quaff', '3/25/2022': 'belie', '3/26/2022': 'stead', '3/27/2022': 'chaps', '3/28/2022': 'husht', '3/29/2022': 'mimic', '3/30/2022': 'altar', '3/31/2022': 'brisk', '4/1/2022': 'janus', '4/2/2022': 'wooer'};
  let currentWord = words[currentDate];

  const bard_not_five_letters = ["Give me 5 letters, sirrah!", "Give me 5 letters, villain!",
                                "Give me 5 letters, young fry of treachery!", "'Tis not 5 letters thou rump-fed runion.",
                                "'Tis not 5 letters thou cream-faced loon.", "'Tis not 5 letters thou scurvy scullion.",
                                "'Tis not 5 letters thou saucy rogue.", "'Tis not 5 letters thou finical fustilarian.",
                                "'Tis not 5 letters thou bunch-backed toad.", "'Tis not 5 letters thou lily-livered rampallian.",
                                "'Tis not 5 letters thou rascally knave."];

  const bard_not_valid_word = ["Fie! 'Tis rubbish!", "Pah! 'Tis not a word!",
                                "How now?What English is this?", "What, you egg!", "Is that French?"];

  const bard_win = {'1': ["Fie! Impossible!", "Go to, you are too shrewd."],
                    '2-3': ["Marry, you are too shrewd.", "Thy wit is as quick as the greyhound’s mouth.", "Thou witty fellow!"],
                    '4': ["Thy wit is a very bitter sweeting, it is a most sharp sauce.", "Marry, thou hast a fine wit.", "Thou witty fellow!", "Thy wit is as quick as the greyhound’s mouth."],
                    '5-6': ["Better a witty fool than a foolish wit. God bless thee!", "Go to, thou art a witty fool."]};

  const bard_loss = ['Fie! Thou damned and luxurious mountain goat.', 'Fie! Thou lump of foul deformity.',
                      'Fie! Thou hast no more brain than I have in mine elbows!', 'Fie! Thou sodden-witted lord!',
                      'Fie! Thy brain is as dry as the remainder biscuit after a voyage.', 'Fie! Thou art the cap of all the fools.',
                      'Fie! Thou hast not so much brain as ear-wax.', "Fie! Thou art proclaim'd fool.",
                      "You are not worth another word, else I'd call you knave.", 'What, you egg!'];


  const alert_duration = 900;

  initLocalStorage();
  initHelpModal();
  initStatsModal();
  createSquares();
  addKeyboardClicks();
  addKeyboardTyping();
  loadLocalStorage();
  // getNewWord();


  function initLocalStorage() {
    const storedCurrentDate = window.localStorage.getItem('currentDate');
    if (!storedCurrentDate) {
      window.localStorage.setItem('currentDate', currentDate);
    } else {

      if (currentDate != storedCurrentDate) {
        getWord();
        resetGameState();
        window.localStorage.setItem('currentDate', currentDate);
        document.location.reload();
      }
    }

    const storedCurrentWord = window.localStorage.getItem('currentWord');
    if (!storedCurrentWord) {
      window.localStorage.setItem('currentWord', currentWord);
    } else {
      // local storage only stores strings, so have to convert back to number
      currentWord = storedCurrentWord;
    }

  }

  function loadLocalStorage() {
    currentWord = window.localStorage.getItem('currentWord') || currentWord;
    guessedWordCount = Number(window.localStorage.getItem('guessedWordCount')) || guessedWordCount;
    availableSpace = Number(window.localStorage.getItem('availableSpace')) || availableSpace;
    guessedWords = JSON.parse(window.localStorage.getItem('guessedWords')) || guessedWords;
    currentDate = Number(window.localStorage.getItem('currentDate')) || currentDate;
    gameOver = Number(window.localStorage.getItem('gameOver')) || gameOver;

    const storedBoardContainer = window.localStorage.getItem('boardContainer');
    if (storedBoardContainer) {
      document.getElementById('board-container').innerHTML = storedBoardContainer;
    }

    const storedKeyboardContainer = window.localStorage.getItem('keyboardContainer');
    if (storedKeyboardContainer) {
      document.getElementById('keyboard-container').innerHTML = storedKeyboardContainer;
      addKeyboardClicks();
    }
  }

  function resetGameState() {
    window.localStorage.removeItem("guessedWordCount");
    window.localStorage.removeItem("guessedWords");
    window.localStorage.removeItem("keyboardContainer");
    window.localStorage.removeItem("boardContainer");
    window.localStorage.removeItem("availableSpace");
    window.localStorage.removeItem("gameOver");
  }

  function getWord() {
    currentWord = words[currentDate];
    window.localStorage.setItem('currentWord', currentWord);
  }

  // const animateCSS = (node, animation, prefix = 'animate__') =>
//
  //   // We create a Promise and return it
  //   new Promise((resolve, reject) => {
  //   const animationName = `${prefix}${animation}`;
//
  //   node.classList.add(`${prefix}animated`, animationName);
//
  //   // When the animation ends, we clean the classes and resolve the Promise
  //   function handleAnimationEnd(event) {
  //       event.stopPropagation();
  //       node.classList.remove(`${prefix}animated`, animationName);
  //       resolve('Animation ended');
  //   }
//
  //   node.addEventListener('animationend', handleAnimationEnd, {once: true});
  //   });

  // gets random word from wordsapi
  // function getNewWord() {
  //   fetch(
  //     `https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&frequencymin=7`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  //         "x-rapidapi-key": "f67c21006bmshc510e9bc5e7aca9p14c25djsn0ad143dca1b8",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((res) => {
  //       currentWord = res.word;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("animate__animated");
      square.classList.add("square");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  }

  function preserveGameState() {
    window.localStorage.setItem('guessedWords', JSON.stringify(guessedWords));

    const keyboardContainer = document.getElementById('keyboard-container');
    window.localStorage.setItem('keyboardContainer', keyboardContainer.innerHTML);

    const boardContainer = document.getElementById('board-container');
    window.localStorage.setItem('boardContainer', boardContainer.innerHTML);
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedLetters(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(availableSpace);

      availableSpaceEl.textContent = letter;
      availableSpace = availableSpace + 1;
    }
  }

  // function showResult() {
  //   const finalResultEl = document.getElementById("final-score");
  //   finalResultEl.textContent = "Wordle 1 - You win!";
  // }

  // function showLosingResult() {
  //   const finalResultEl = document.getElementById("final-score");
  //   finalResultEl.textContent = `Wordle 1 - Unsuccessful Today!`;
  // }

  // function clearBoard() {
  //   for (let i = 0; i < 30; i++) {
  //     let square = document.getElementById(i + 1);
  //     square.textContent = "";
  //   }
//
  //   const keys = document.getElementsByClassName("keyboard-button");
//
  //   for (var key of keys) {
  //     key.disabled = true;
  //   }
  // }

  function getIndicesOfLetter(letter, arr) {
    const indices = [];
    let idx = arr.indexOf(letter);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(letter, idx + 1);
    }
    return indices;
  }

  function getTileClass(letter, index, currentWordArr) {
    const isCorrectLetter = currentWord
      .toUpperCase()
      .includes(letter.toUpperCase());

    if (!isCorrectLetter) {
      return "incorrect-letter";
    }

    const letterInThatPosition = currentWord.charAt(index);
    const isCorrectPosition =
      letter.toLowerCase() === letterInThatPosition.toLowerCase();

    if (isCorrectPosition) {
      return "correct-letter-in-place";
    }

    const isGuessedMoreThanOnce =
      currentWordArr.filter((l) => l === letter).length > 1;

    if (!isGuessedMoreThanOnce) {
      return "correct-letter";
    }

    const existsMoreThanOnce =
      currentWord.split("").filter((l) => l === letter).length > 1;

    // is guessed more than once and exists more than once
    if (existsMoreThanOnce) {
      return "correct-letter";
    }

    const hasBeenGuessedAlready = currentWordArr.indexOf(letter) < index;

    const indices = getIndicesOfLetter(letter, currentWord.split(""));
    const otherIndices = indices.filter((i) => i !== index);
    const isGuessedCorrectlyLater = otherIndices.some(
      (i) => i > index && currentWordArr[i] === letter
    );

    if (!hasBeenGuessedAlready && !isGuessedCorrectlyLater) {
      return "correct-letter";
    }

    return "incorrect-letter";
  }

  function updateTotalGames() {
    const totalGames = window.localStorage.getItem('totalGames') || 0;
    window.localStorage.setItem('totalGames', Number(totalGames) + 1);
  }

  function updateStatsPostWin() {
    const totalWins = window.localStorage.getItem('totalWins') || 0;
    window.localStorage.setItem('totalWins', Number(totalWins) + 1);

    const currentStreak = window.localStorage.getItem('currentStreak') || 0;
    window.localStorage.setItem('currentStreak', Number(currentStreak) + 1);
  }

  function updateStatsPostLoss() {
    window.localStorage.setItem('currentStreak', 0);
  }

  async function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    const guessedWord = currentWordArr.join("");

    if (guessedWord.length !== 5) {
      // const firstLetterId = guessedWordCount * 5 + 1;
      // currentWordArr.forEach((letter, index) => {
//
      //   const letterId = firstLetterId + index;
      //   const letterEl = document.getElementById(letterId);
//
      //   animateCSS(letterEl, "headShake");
      // });

      var popUp = document.getElementById('alert');
      let message = bard_not_five_letters[Math.floor(Math.random()*bard_not_five_letters.length)];
      popUp.textContent = message;
      $('#alert').show();

      setTimeout(() => {
        $('#alert').fadeOut('slow');
      }, alert_duration);

      return;
    }

    try {
       const res = await fetch(
         `https://wordsapiv1.p.rapidapi.com/words/${guessedWord.toLowerCase()}`,
         {
           method: "GET",
           headers: {
             "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
             "x-rapidapi-key": "f67c21006bmshc510e9bc5e7aca9p14c25djsn0ad143dca1b8",
           },
         }
       );

       if (!res.ok & !Object.keys(words).includes(guessedWord.toLowerCase())) {
         throw Error();
      }

      const firstLetterId = guessedWordCount * 5 + 1;

      window.localStorage.setItem("availableSpace", availableSpace);

      typingDisabled = true;

      const interval = 400;
      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
          const tileClass = getTileClass(letter, index, currentWordArr);
          if (tileClass) {
            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            // animateCSS(letterEl, "flipInX");
            letterEl.classList.add("animate__flipInX");
            letterEl.classList.add(tileClass);

            const keyboardEl = document.querySelector(`[data-key=${letter}]`);
            keyboardEl.classList.add(tileClass);
          }

          if (index === 4) {
            preserveGameState();
            typingDisabled = false;
          }

        }, index * interval);
      });

      guessedWordCount += 1;
      window.localStorage.setItem('guessedWordCount', guessedWordCount);

      if (guessedWord === currentWord) {
        gameOver = 1;
        window.localStorage.setItem('gameOver', gameOver);

        const interval = 2000;
        setTimeout(() => {

          const firstLetterId = (guessedWordCount - 1) * 5 + 1;
          currentWordArr.forEach((letter, index) => {

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);

            // animateCSS(letterEl, "flip");
            letterEl.classList.add("animate__flip");
          });

        }, interval);


        var popUp = document.getElementById('alert');
        let key = '1';

        if (guessedWordCount == 1) {
          key = '1';
        }
        else if (guessedWordCount == 2 || guessedWordCount == 3) {
          key = '2-3';
        }
        else if (guessedWordCount == 4) {
          key = '4';
        }
        else {
          key = '5-6';
        }
        // console.log(key);

        let msg_list = bard_win[key];
        // console.log(msg_list);
        let message = msg_list[Math.floor(Math.random()*msg_list.length)];
        // console.log(message);
        popUp.textContent = message;

        setTimeout(() => {
          $('#alert').show();
          //updateWordIndex();
          updateTotalGames();
          updateStatsPostWin();
          // resetGameState();
        }, 3000);

        setTimeout(() => {
          $('#alert').fadeOut('slow');
          // const okSelected = window.confirm("Nice nerd.");
          // if (okSelected) {
          //   clearBoard();
          //   showResult();
          // }
          return;
        }, 6000);
      }

      if (guessedWords.length === 6 && guessedWord !== currentWord) {
        gameOver = 1;
        window.localStorage.setItem('gameOver', gameOver);

        var popUp = document.getElementById('alert');
        let message = bard_loss[Math.floor(Math.random()*bard_loss.length)];
        popUp.textContent = message + ` The BARDLE is ${currentWord.toUpperCase()}.`;

        setTimeout(() => {
          $('#alert').show();
          //updateWordIndex();
          updateTotalGames();
          updateStatsPostLoss();
          // resetGameState();
          return;
        }, 2000);
      }

      guessedWords.push([]);
    } catch (_error) {
        // const firstLetterId = guessedWordCount * 5 + 1;
        // currentWordArr.forEach((letter, index) => {
//
        //   const letterId = firstLetterId + index;
        //   const letterEl = document.getElementById(letterId);
//
        //   animateCSS(letterEl, "headShake");
        // });

        var popUp = document.getElementById('alert');
        let message = bard_not_valid_word[Math.floor(Math.random()*bard_not_valid_word.length)];
        popUp.textContent = message;

        $('#alert').show();

        setTimeout(() => {
          $('#alert').fadeOut('slow');
        }, alert_duration);

    }
  }

  function handleDelete() {
    const currentWordArr = getCurrentWordArr();

    if (!currentWordArr.length) {
      return;
    }

    currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(availableSpace - 1);

    lastLetterEl.innerHTML = "";
    availableSpace = availableSpace - 1;
  }

  function addKeyboardClicks() {
    const keys = document.querySelectorAll(".keyboard-row button");
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", ({ target }) => {
        const key = target.getAttribute("data-key");

        if (gameOver == 1|| typingDisabled) {
          return;
        }

        if (key === "enter") {
          handleSubmitWord();
          return;
        }

        if (key === "del") {
          handleDelete();
          return;
        }

        updateGuessedLetters(key);
      });
    }
  }

  function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

  function addKeyboardTyping() {
    // Add event listener on keydown
    document.addEventListener('keydown', (event) => {
        const name = event.key;
        const code = event.code;

        if (gameOver == 1 || typingDisabled) {
          return;
        }

        if (name === 'Enter') {
            handleSubmitWord();
            return;
        }

        if (name === 'Backspace') {
            handleDelete();
            return;
        }

        if (!isLetter(name)) {
            return;
        }

        updateGuessedLetters(name);

    }, false);
  }

  function initHelpModal() {
    const modal = document.getElementById("help-modal");

    // Get the button that opens the modal
    const btn = document.getElementById("help");

    // Get the <span> element that closes the modal
    const span = document.getElementById("close-help");

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", function () {
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  function updateStatsModal() {
    const currentStreak = window.localStorage.getItem("currentStreak");
    const totalWins = window.localStorage.getItem("totalWins");
    const totalGames = window.localStorage.getItem("totalGames");

    document.getElementById('current-streak').textContent = currentStreak;
    document.getElementById('total-played').textContent = totalGames;
    document.getElementById('total-wins').textContent = totalWins;

    const winPct = Math.round((totalWins / totalGames) * 100) || 0;
    document.getElementById('win-pct').textContent = winPct;
  }

  function initStatsModal() {
    const modal = document.getElementById("stats-modal");

    // Get the button that opens the modal
    const btn = document.getElementById("stats");

    // Get the <span> element that closes the modal
    const span = document.getElementById("close-stats");

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", function () {
      // update stats here
      updateStatsModal();
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
});