$(window).load(function() {
	$('body').fadeIn(300);
	$.get('menu.html', function(data){$('#menu').append(data)});
});




