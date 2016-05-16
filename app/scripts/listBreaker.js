/* @flow */

/* exported breakList */
/* imported $ */

'use strict';

function breakList(numOfLists, list, color){
	var listLength = list.find('li').size();
	var numInRow = Math.ceil(listLength / numOfLists);
	var listNumber = 0;

	for(var b = 0; b < numOfLists; b++) {
		// console.log(b);
		var fourthDiv = document.createElement('div');
		fourthDiv.className = 'fourth breaking-list same-list ' + color;
		document.getElementsByClassName('list-container')[0].appendChild(fourthDiv);
	}


	for (var i = 0; i < numOfLists; i++){
		var listItems = list.find('li').slice(0, numInRow);
		var newList = $('<ul/>').append(listItems);
		// var newList = document.createElement('UL').append(listItems);

		if (i%4) {
			listNumber = listNumber + 1;
		}

		console.log(document.getElementsByClassName('fourth breaking-list same-list ' + color)[listNumber]);

		var currentDiv = document.getElementsByClassName('fourth breaking-list same-list ' + color)[listNumber];
		// currentDiv.appendChild(newList);
		$(currentDiv).append(newList);
	}
}