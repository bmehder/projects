const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showAddBtn = document.getElementById('show');
const showEditBtn = document.getElementById('edit');
const hideAddBtn = document.getElementById('hide-add-container');
const hideEditBtn = document.getElementById('hide-edit-container');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const editContainer = document.getElementById('edit-container');

// Keep track of current card
let currentActiveCard = 0;

// Store the DOM cards
const cardsEl = [];

// Store card data
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $, or _ .'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'A container for a piece of data.'
//   },
//   {
//     question: 'Example of a case sensitive variable',
//     answer: 'thisIsAVariable'
//   }
// ];

const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
        ${data.answer}
        </p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  });

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add cards to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// Load Cards
createCards();

// Event Listeners

// Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard++;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Prev Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add container
showAddBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideAddBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Show edit container
showEditBtn.addEventListener('click', () =>
  editContainer.classList.add('show')
);

// Hide edit container
hideEditBtn.addEventListener('click', () => {
  editContainer.classList.remove('show');
});

// Add new Card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    // const newCard = { question: question, answer: answer };
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerText = '';
  window.location.reload();
});

// Load the cards from localstorage into the textbox.
// Line 90: Loop through the cards instead

// Overwrite the value of the cards with the value of the textbox.

// Load Cards ()
