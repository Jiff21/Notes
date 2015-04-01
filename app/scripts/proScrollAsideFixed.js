/*!
 * @docauthor Jeff Campbell
 */
'use strict';

window.addEventListener('scroll', function() {
	var scrollAt = 538;
	var proAside = $('#proAside');
	var posTop = document.body.scrollTop;
	if (posTop < scrollAt) {
		proAside.removeClass('pro-fixed');
	} else if (posTop >= scrollAt) {
		proAside.addClass('pro-fixed');
	}
});