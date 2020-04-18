// Get DOM elements
const container = document.getElementById('container');
const text = document.getElementById('text');

// Settings for the app.
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

// Add, remove, and change class names corresponding to css animations
function breathAnimation() {
  text.innerText = 'Breathe In';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';
    setTimeout(() => {
      text.innerText = 'Breathe Out';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

// Basically, and init function.
breathAnimation();

// Repeat the function after the initial full rotation.
setInterval(breathAnimation, totalTime);
