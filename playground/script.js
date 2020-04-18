// When the DOM is fully loaded...
$(document).ready(function() {
	// Set the height of the aside elements & the text areas based on the window height
	$('.grid').height( $(window).height() );
	$('textarea').height( $(window).height() / 3 );	
	
	// Retrieve values from local storage, and insert into textareas	
	if (localStorage.getItem('htmlContent')){
		$('#html').html(localStorage.getItem('htmlContent'));
	}
	
	if (localStorage.getItem('cssContent')){
		$('#css').html(localStorage.getItem('cssContent'));
	}
	
	// Set some variables. Makes for easier code read-ability later
	var contents = $('iframe').contents(),
	body = contents.find('body'),
	styleTag = $('<style></style>').appendTo(contents.find('head'));
	
	// Insert values into textareas
	body.html( $('#html').val() );
	styleTag.text( $('#css').val() );
	
	// Bind function to keyup event.
	$('textarea').bind('keyup', function() {
		var $this = $(this);
		if ( $this.attr('id') === 'html') {
			body.html( $this.val() );
			localStorage.setItem( 'htmlContent', $this.val() );
		} else {
			styleTag.text( $this.val() );
			localStorage.setItem( 'cssContent', $this.val() );
		}
	});
});