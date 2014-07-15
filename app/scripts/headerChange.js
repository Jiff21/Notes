/*!
 * @docauthor Jeff Campbell
 */
'use strict';

function headerChange() {
	// Defining variables outside loop.
	var i,
		item,
		itemArray,
		switcher = document.getElementById('switcher');
	// grabs element by switcher id to figure out which replace loop should be run.
	if (switcher.className === 'red') {

		itemArray = document.getElementsByClassName('red');
		i = itemArray.length - 1;

		for (i; i >= 0; i--) {
			// Sets item to the current element in header array.
			item = itemArray[i];
			item.className = 'white';
		}
	}else{

		itemArray = document.getElementsByClassName('white');
		i = itemArray.length - 1;
		
		for (i ; i >= 0; i--) {
			item = itemArray[i];
			item.className = 'red';
		}
	}
}

headerChange();