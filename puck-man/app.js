// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

// prettier-ignore
const matrix = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
const grid = document.querySelector('#board');
const scoreDisplay = document.querySelector('#score');
const squareSize = 28;
const squares = [];
const scaredDuration = 10 * 1000;
const WINNING_SCORE = 274;

let pacmanIndex = 490;
let score = 0;

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

ghosts = [
  // new Ghost('blinky', 348, 250),
  // new Ghost('pinky', 376, 400),
  // new Ghost('inky', 351, 300),
  // new Ghost('clyde', 379, 500),
  new Ghost('blinky', 32, 250),
  new Ghost('pinky', 500, 400),
  new Ghost('inky', 250, 300),
  new Ghost('clyde', 379, 500),
];

const moveGhost = (ghost) => {
  const directions = [-1, +1, squareSize, -squareSize];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
    if (
      !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall')
    ) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
      //move into that space
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      //else find a new random direction ot go in
    } else direction = directions[Math.floor(Math.random() * directions.length)];

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost');
    }

    //if the ghost is currently scared and pacman is on it
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains('pac-man')
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        'ghost',
        'scared-ghost'
      );
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    }

    if (
      squares[pacmanIndex].classList.contains('ghost') &&
      !squares[pacmanIndex].classList.contains('scared-ghost')
    ) {
      gameOver();
    }

    if (score === WINNING_SCORE) {
      gameOver(true);
    }
  }, ghost.speed);
};

const moveGhosts = () => {
  ghosts.forEach((ghost) => moveGhost(ghost));
};

const unScareGhosts = () => {
  ghosts.forEach((ghost) => (ghost.isScared = false));
};

const createBoard = () => {
  for (let i = 0; i < matrix.length; i++) {
    const square = document.createElement('div');
    squares.push(square);
    grid.appendChild(square);

    //add matrix to the board
    switch (matrix[i]) {
      case 0:
        squares[i].classList.add('pac-dot');
        break;
      case 1:
        squares[i].classList.add('wall');
        break;
      case 2:
        squares[i].classList.add('ghost-lair');
        break;
      case 3:
        squares[i].classList.add('power-pellet');
        break;
      default:
        null;
    }
  }
};

const eatDot = () => {
  squares[pacmanIndex].classList.remove('pac-dot');
  score++;
  scoreDisplay.innerHTML = score;
};

const eatPower = () => {
  squares[pacmanIndex].classList.remove('power-pellet');
  score += 10;
  ghosts.forEach((ghost) => (ghost.isScared = true));
  setTimeout(unScareGhosts, scaredDuration);
};

const movePacman = (e) => {
  squares[pacmanIndex].classList.remove('pac-man');
  switch (e.code) {
    case 'ArrowLeft':
      if (
        pacmanIndex % squareSize !== 0 &&
        !squares[pacmanIndex - 1].classList.contains('wall') &&
        !squares[pacmanIndex - 1].classList.contains('ghost-lair')
      )
        pacmanIndex -= 1;
      if (squares[pacmanIndex - 1] === squares[363]) {
        pacmanIndex = 391;
      }
      break;
    case 'ArrowUp':
      if (
        pacmanIndex - squareSize >= 0 &&
        !squares[pacmanIndex - squareSize].classList.contains('wall') &&
        !squares[pacmanIndex - squareSize].classList.contains('ghost-lair')
      )
        pacmanIndex -= squareSize;
      break;
    case 'ArrowRight':
      if (
        pacmanIndex % squareSize < squareSize - 1 &&
        !squares[pacmanIndex + 1].classList.contains('wall') &&
        !squares[pacmanIndex + 1].classList.contains('ghost-lair')
      )
        pacmanIndex += 1;
      if (squares[pacmanIndex + 1] === squares[392]) {
        pacmanIndex = 364;
      }
      break;
    case 'ArrowDown':
      if (
        pacmanIndex + squareSize < squareSize * squareSize &&
        !squares[pacmanIndex + squareSize].classList.contains('wall') &&
        !squares[pacmanIndex + squareSize].classList.contains('ghost-lair')
      )
        pacmanIndex += squareSize;
      break;
  }
  squares[pacmanIndex].classList.add('pac-man');

  if (squares[pacmanIndex].classList.contains('pac-dot')) {
    eatDot();
  }

  if (squares[pacmanIndex].classList.contains('power-pellet')) {
    eatPower();
  }
};

const gameOver = (isWon) => {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.removeEventListener('keyup', movePacman);
  setTimeout(function () {
    if (isWon) {
      alert('You have WON!');
    } else {
      alert('Game Over');
    }
  }, 500);
};

const addPacman = () => squares[pacmanIndex].classList.add('pac-man');

createBoard();
moveGhosts();
addPacman();

document.addEventListener('keyup', movePacman);
