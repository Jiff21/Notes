/* exported luckyLink */

'use strict';

var luckyLink = function () {
	var b = 0,
		i = 0,
		correctLink,
		correctDropdownNumber,
		dropdowns = document.getElementsByClassName('dropdown-menu'),
		linksChecked = 0,
		linksInDropdown,
		linksInThisDropdown,
		linkNumber,
		loopGoesUpTo = 0,
		numberForThisDropdown = 0,
		totalLinks = 0;

	// Loopings through all of the nav to get total number of options.
	for (i ; i < dropdowns.length; i++) {
		linksInDropdown = dropdowns[i].getElementsByTagName('a');
		totalLinks = totalLinks + linksInDropdown.length;
	}

	// Picking a random number between 1 and total number of options.
	linkNumber = Math.floor((Math.random() * totalLinks) + 1);

	//
	for(b; b < dropdowns.length; b++) {

		linksInThisDropdown = dropdowns[b].getElementsByTagName('a');
		loopGoesUpTo += linksInThisDropdown.length;

		if (linkNumber <= loopGoesUpTo){

			correctDropdownNumber = dropdowns[b].getElementsByTagName('a');
			numberForThisDropdown = linkNumber - linksChecked -1;
			correctLink = correctDropdownNumber[numberForThisDropdown];
			console.log(correctLink);
			correctLink.click();
			break;
		} else {
			linksChecked += linksInThisDropdown.length;
		}
	}

};