/*!
 * @docauthor Jeff Campbell
 */
'use strict';

 /* exported headerChange */
let itemArray,
	switcher;

function getSwitcher () {
	return document.getElementById('switcher');
}

function getRed () {
	return document.getElementsByClassName('red');
}

function getWhite () {
	return document.getElementsByClassName('white');
}

function changeClassTo (items, newColor) {
	// items.map(){
	// 	item = items[i];
	// 	item.className = newColor;
	// }
	var i = 0;
	console.log(items.length);
	var item;

	for (i; i <= items.length; i++) {
		// Sets item to the current element in header array.
		item = items[i];
		item.className = newColor;
	}
}

function headerChange () {
	switcher = getSwitcher();
	if (switcher.className === 'red') {
		console.log('red');
		itemArray = getRed();
		changeClassTo(itemArray, 'white');
	} else {
		console.log('white');
		itemArray = getWhite();
		changeClassTo(itemArray, 'red');
	}
}


window.onload = function(){
	getSwitcher();
};


