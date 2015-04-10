/* exported luckyLink */

'use strict';

var luckyLink = function () {
	var b = 0,
		i = 0,
		correctLink,
		checkLoop,
		correctDropdownNumber,
		dropdowns = document.getElementsByClassName('dropdown-menu'),
		linksChecked = 0,
		linksInDropdown,
		linksInThisDropdown,
		linkNumber,
		numberForThisDropdown = 0,
		totalLinks = 0;

	// Loopings through all of the nav to get total number of options.
	for (i ; i < dropdowns.length; i++) {
		linksInDropdown = dropdowns[i].getElementsByTagName('a');
		totalLinks = totalLinks + linksInDropdown.length;
	}

	// Picking a random number between 1 and total number of options.
	linkNumber = Math.floor((Math.random() * totalLinks));
	console.log('######!1 link Number is : ' + linkNumber);

	//
	for(b; b < dropdowns.length; b++) {

		linksInThisDropdown = dropdowns[b].getElementsByTagName('a');

		checkLoop = 0;
		checkLoop = linkNumber - linksChecked;
		checkLoop -= linksInThisDropdown.length;

		console.log(' checkLoop ' + checkLoop + ' and b is ' + b);
		if (checkLoop < 0){
			correctDropdownNumber = dropdowns[b].getElementsByTagName('a');
			numberForThisDropdown = linkNumber - linksChecked;
			correctLink = correctDropdownNumber[numberForThisDropdown];
			// correctLink.click();
			break;
		} else {
			linksChecked += linksInThisDropdown.length;
		}
	}

};