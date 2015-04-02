/* exported breakList */

'use strict';

function breakList(numOfLists, list){
	var listLength = list.find('li').size();
	var numInRow = Math.ceil(listLength / numOfLists);
	var listNumber = 0;

	for(var b = 0; b < numOfLists; b++) {
		// console.log(b);
		var fourthDiv = document.createElement('div');
		fourthDiv.className = 'fourth gold breaking-list rtlist same-list';
		document.getElementsByClassName('list-container')[0].appendChild(fourthDiv);
	}


	for (var i = 0; i < numOfLists; i++){
		var listItems = list.find('li').slice(0, numInRow);
		var newList = $('<ul/>').append(listItems);
		// var newList = document.createElement('UL').append(listItems);

		if (i%4) {
			listNumber = listNumber + 1;
		}

		console.log(document.getElementsByClassName('fourth gold breaking-list rtlist same-list')[listNumber]);

		var currentDiv = document.getElementsByClassName('fourth gold breaking-list rtlist same-list')[listNumber];
		// currentDiv.appendChild(newList);
		$(currentDiv).append(newList);
	}
}

breakList(4, $('.to-be-spliced'));