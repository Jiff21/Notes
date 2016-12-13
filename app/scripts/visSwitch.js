/* @flow */

/*!
 * @docauthor Jeff Campbell
 */
 // Letting jshint know these are Exported Variables.
 /* exported makeVisible */

function makeVisible(id) {
  const oldVis = document.getElementsByClassName('visible');
  const newVis = id;
  // Setting i length here because of live node list.
  let i = oldVis.length - 1;
  for (i; i >= 0; i -= 1) {
    // Loops through all previously visible elements and makes them hidden.
    oldVis[i].className = 'hidden';
  }
  // Sets the new element to visible based on id that is passed into function.
  newVis.className = 'visible';
}
