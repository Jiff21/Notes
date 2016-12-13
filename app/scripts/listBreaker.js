/* @flow */

/* exported breakList */
/* imported $ */

function breakList(numOfLists, list, color){
	var listLength = list.find('li').size();
	// console.log('There are this many list items ' + list.find('li').size());
	var numInRow = Math.ceil(listLength / numOfLists);
	// console.log('We need to put at least this many in each row' + numInRow);
	var listNumber = 0;

	for(var b = 0; b < numOfLists; b++) {
		// console.log(b);
		var fourthDiv = document.createElement('div');
		fourthDiv.className = 'fourth breaking-list same-list ' + color;
		document.getElementsByClassName('list-container')[0].appendChild(fourthDiv);
	}


	for (var i = 0; i < numOfLists; i++){
		// Cuts out numInRow Items to be put in their own list.
		var listItems = list.find('li').slice(0, numInRow);
		var newList = $('<ul/>').append(listItems);
		// var newList = document.createElement('UL').append(listItems);

		// Increment the row if we're at the splice number
		if (i%numInRow) {
			listNumber = listNumber + 1;
		}

		// Get the correct div and the appends the new list to it.
		// console.log(document.getElementsByClassName('fourth breaking-list same-list ' + color)[listNumber]);
		var currentDiv = document.getElementsByClassName('fourth breaking-list same-list ' + color)[listNumber];
		// currentDiv.appendChild(newList);
		$(currentDiv).append(newList);
	}
}
