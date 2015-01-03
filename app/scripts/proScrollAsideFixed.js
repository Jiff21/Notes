/*!
 * @docauthor Jeff Campbell
 */
'use strict';

window.addEventListener('scroll', function() {
	var proAside = $('#proAside');
	var posTop = document.body.scrollTop;
	if (posTop < 603) {
		proAside.removeClass('proFixed');
	} else if (posTop >= 603) {
		proAside.addClass('proFixed');
	}
});