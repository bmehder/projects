// Layer 1
let layer1 = document.getElementById('layer1');

let scroll = window.pageYOffset;

document.addEventListener('scroll', (e) => {
  let offset = window.pageYOffset;
  scroll = offset;
  layer1.style.width = 100 + scroll / 5 + '%';
});

// Layer 2
let layer2 = document.getElementById('layer2');

document.addEventListener('scroll', (e) => {
  let offset = window.pageYOffset;
  scroll = offset;
  layer2.style.width = 100 + scroll / 5 + '%';
  layer2.style.left = scroll / 50 + '%';
});

// Text
let text = document.getElementById('text');

document.addEventListener('scroll', (e) => {
  let offset = window.pageYOffset;
  scroll = offset;
  layer2.style.width = 100 + scroll / 5 + '%';
  text.style.top = -scroll / 20 + '%';
});
