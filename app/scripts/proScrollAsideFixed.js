/* @flow */

/*!
 * @docauthor Jeff Campbell
 */
 'use strict';


/* exported proAside */
function grabAsideByID () {
	return document.getElementById('proAside');
}

function keepInPlace (el){
	const scrollAt = 538;
	const posTop = document.body.scrollTop;
	if (posTop < scrollAt) {
		// console.log('removing');
		el.classList.remove('pro-fixed');
	} else if (posTop >= scrollAt) {
		// console.log('adding');
		el.addClass += 'pro-fixed';
		el.classList.add('pro-fixed');
	}
}

window.onload = function(){
	const proAside = grabAsideByID();
	window.addEventListener('scroll', function () {
		keepInPlace(proAside);
	});
};
