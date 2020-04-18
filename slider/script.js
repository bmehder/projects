let sliderImages = document.querySelectorAll('.slide');
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
let current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
}

// Init slider
function startSlides() {
  reset();
  sliderImages[0].style.display = 'block';
}

startSlides();

function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  current--;
}

function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  current++;
}

arrowLeft.addEventListener('click', () => {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

arrowRight.addEventListener('click', () => {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});
