let $els = $('.menu a, .menu header');
let count = $els.length;
let grouplength = Math.ceil(count / 3);
let groupNumber = 0;
let i = 1;

$('.menu').css('--count', count + '');
$els.each(function(j) {
  if (i > grouplength) {
    groupNumber++;
    i = 1;
  }
  $(this).attr('data-group', groupNumber);
  i++;
});

$('.menu footer button').on('click', e => {
  e.preventDefault();
  $els.each(function(j) {
    $(this).css(
      '--top',
      $(this)[0].getBoundingClientRect().top +
        $(this).attr('data-group') * -15 -
        20
    );
    $(this).css('--delay-in', j * 0.1 + 's');
    $(this).css('--delay-out', (count - j) * 0.1 + 's');
  });
  $('.menu').toggleClass('closed');
  e.stopPropagation();
});
