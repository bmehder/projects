const [current, imgs, opacity] = [
  document.querySelector('#current'),
  document.querySelectorAll('.imgs img'),
  0.4,
];

imgs[0].style.opacity = 0.6;

imgs.forEach((img) => img.addEventListener('click', imgClick));

function imgClick(e) {
  // Reset the opacity of all images
  imgs.forEach((img) => (img.style.opacity = 1));

  // Change current image
  current.src = e.target.src;

  // Fade In
  current.classList.add('fade-in');
  setTimeout(() => {
    current.classList.remove('fade-in');
  }, 500);

  // Change opacity
  e.target.style.opacity = opacity;
}
