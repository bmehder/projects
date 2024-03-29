// Get DOM Elements
const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const f1Teams = [
  'Mercedes',
  'Red Bull',
  'Racing Point',
  'Ferrari',
  'McLaren',
  'Renault',
  'Alpha Tauri',
  'Alfa Romeo',
  'Williams',
  'Haas'
];

const listItems = [];

let dragStartIndex;

// Insert List Items into DOM
function createList() {
  [...f1Teams]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
      </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
}
createList();

function dragStart() {
  // console.log('dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('dragenter');
  this.classList.add('over');
}

function dragOver(e) {
  // console.log('dragOver');
  e.preventDefault();
}

function dragLeave() {
  // console.log('dragLeave');
  this.classList.remove('over');
}

function dragDrop() {
  // console.log('drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== f1Teams[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
