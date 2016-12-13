/* @flow */

/*!
 * @docauthor Jeff Campbell
 */
 // Letting jshint know these are Exported Variables.
 /* exported makeVisible */
'use strict';

const changeButton = () => {
  const buttonTitle = document.getElementById('jumboButton');
  if (buttonTitle.text === 'Newer Examples') {
    buttonTitle.text = 'Older Examples';
  } else {
    buttonTitle.text = 'Newer Examples';
  }
};

const changeExample = () => {
  let i = 0;
  let l = 0;
  // HTML Collections live update. Put it in an araay to stop it.
  const oldVis = [].slice.call(document.getElementsByClassName('visible'));
  const newVis = [].slice.call(document.getElementsByClassName('hidden'));

  const numberOfOld = oldVis.length;
  for (i; i < numberOfOld; i += i) {
    // Loops through all previously visible elements and makes them hidden.
    oldVis[l].classList.add('hidden');
    oldVis[l].classList.remove('visible');
  }

  const numberOfNew = newVis.length;
  for (l; l < numberOfNew; l += l) {
    // Loops through all previously visible elements and makes them hidden.
    newVis[l].classList.add('visible');
    newVis[l].classList.remove('hidden');
  }
};

const makeVisible = () => {
  changeButton();
  changeExample();
};
