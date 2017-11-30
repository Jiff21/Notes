/* @flow */

/*!
 * @docauthor Jeff Campbell
 */
 // Letting jshint know these are Exported Variables.
 /* exported switchTwo, switchThree */

function switchTwo() {
  const oldVis = document.getElementsByClassName('three-six');
  const newVis = document.getElementsByClassName('two-seven');
  // Setting i length here because of live node list.
  let i = oldVis.length - 1;
  for (i; i >= 0; i -= 1) {
    // Loops through all previously visible elements and makes them hidden.
    oldVis[i].classList.add('hidden');
  }
  // Sets the new element to visible based on id that is passed into function.
  let j = newVis.length - 1;
  for (j; j >= 0; j -= 1) {
    // Loops through all previously visible elements and makes them hidden.
    newVis[j].classList.remove('hidden');
  }

  document.querySelector('button#two-button').disabled = 'disabled';
  document.querySelector('button#three-button').disabled = false;

}


function switchThree() {
  const oldVis = document.getElementsByClassName('two-seven');
  const newVis = document.getElementsByClassName('three-six');
  // Setting i length here because of live node list.
  let i = oldVis.length - 1;
  for (i; i >= 0; i -= 1) {
    // Loops through all previously visible elements and makes them hidden.
    oldVis[i].classList.add('hidden');
  }
  // Sets the new element to visible based on id that is passed into function.
  let j = newVis.length - 1;
  for (j; j >= 0; j -= 1) {
    // Loops through all previously visible elements and makes them hidden.
    newVis[j].classList.remove('hidden');
  }

  document.querySelector('button#three-button').disabled = 'disabled';
  document.querySelector('button#two-button').disabled = false;
}
