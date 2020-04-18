const container = document.getElementById('container');
const count = 40;

for (let i = 0; i < 40; i++) {
  const gooeyBox = document.createElement('div');
  gooeyBox.className = 'circle';
  container.appendChild(gooeyBox);
}

let gooey = document.querySelectorAll('.circle');
setInterval(() => {
  for (let i = 0; gooey.length; i++) {
    // gooey[i].style.left = 0;
    gooey[i].style.left = Math.floor(Math.random() * 90) + 'vw';
    gooey[i].style.top = Math.floor(Math.random() * 80) + 'vh';
  }
}, 3000);
