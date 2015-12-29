$(document).ready(function() {
	$('.loginEmailCheck').focusout(function(event) {	
		console.log('loginEmailCheck :'+$('#loginEmail').val());
	});
});
