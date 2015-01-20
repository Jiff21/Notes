/*
* Internal anchor links are not taking into
* account the fixed header, need to adjust 50px.
*/
'use strict';

$(document).ready(function () {
	$('a[href*=#]').click(function () {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')   && location.hostname === this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target;
			if ($target.length) {
				var targetOffset = $target.offset().top - 60;
				$('html,body')    .animate({
					scrollTop: targetOffset
				}, 1000);
				return false;
			}
		}
	});
});