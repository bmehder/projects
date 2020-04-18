let page = document.querySelector('.page');
let toggle = document.querySelector('.menu_toggle');
let content = document.querySelector('.content');

toggle.addEventListener('click', e => {
  page.classList.toggle('shazam');
});

content.addEventListener('click', e => {
  page.classList.remove('shazam');
});
