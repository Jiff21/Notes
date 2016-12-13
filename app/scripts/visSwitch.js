/* @flow */

/*!
 * @docauthor Jeff Campbell
 */
 // Letting jshint know these are Exported Variables.
 /* exported makeVisible */

var i,
	oldVis,
	newVis;

function makeVisible(id){
	oldVis = document.getElementsByClassName('visible');
	newVis = id;
	// Setting i length here because of live node list.
	i = oldVis.length - 1;
	for(i; i >= 0; i--){
		// Loops through all previously visible elements and makes them hidden.
		oldVis[i].className = 'hidden';
	}
	// Sets the new element to visible based on id that is passed into function.
	newVis.className = 'visible';
}
