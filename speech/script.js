const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

console.log(randomNum);

let recognition = new window.SpeechRecognition();

recognition.start();
// recognition.stop();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number.</div>';
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 - 100</div>';
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number.</h2>
      <br><br>
      It was ${num}.
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>Go Lower</div>';
  } else {
    msgEl.innerHTML += '<div>Go Higher</div>';
  }
}

function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
