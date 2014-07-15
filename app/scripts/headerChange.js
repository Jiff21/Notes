/*!
 * @docauthor Jeff Campbell
 */
'use strict';

var ourItems = document.getElementsByClassName('red'),
	red = [],
	white = [];

function headerChange() {

	console.log('OUR ITEMS :::: ', ourItems);

	// Defining variables outside loop.
	var i = 0,
		itemCount = ourItems.length,
		item,
		startingLength,
		switcher = document.getElementById('switcher');


	for (i; i < itemCount; i++) {
		var currentItem = ourItems[i],
			currentClass = currentItem.getAttribute('class');

		// console.log('CURRENT ITME :::: ', currentItem);
		console.log('CURRENT CLASS :::: ', currentItem.setAttribute);

		// // grabs element by switcher id to figure out which replace loop should be run.
		if (currentClass === 'red') {
			console.log('IS RED :: MAKE WHITE');
			currentItem.setAttribute('class', 'white');
		} 

		// Other wise we are making them white? 
		else {
			console.log('IS WHITE :: MAKE RED!!!!');
			currentItem.setAttribute('class', 'red');
		}
	}
}

headerChange();