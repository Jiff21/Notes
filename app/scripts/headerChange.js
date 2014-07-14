/*!
 * @docauthor Jeff Campbell
 */
'use strict';

function headerChange() {
	// Defining variables outside loop.
	var i = 0;
	var item;
	var headerArray;
	var startingLength;
	var witch = document.getElementById('switcher');
	// grabs element by switcher id to figure out which replace loop should be run.
	if (witch.className === 'red') {
		headerArray = document.getElementsByClassName('red');
		startingLength = headerArray.length;
		i = 0;
		for (i; i < startingLength; i++) {
			// Sets item to the current element in header array.
			item = headerArray[i];
			console.log('#####2 Inside Red Loop. Item is set as:', item.className, '.  I is currently ', i, ' and item.length is still ', startingLength);
			item.className = 'white';
		}
	}else{
		headerArray = document.getElementsByClassName('white');
		startingLength = headerArray.length;
		i = 0;
		for (i; i < startingLength; i++) {
			item = headerArray[i];
			console.log('#####3 Inside White Loop.', item, ' I is currently', i, ' and headerH1 length is still ', startingLength);
			item.className = 'red';
		}
	}

}


