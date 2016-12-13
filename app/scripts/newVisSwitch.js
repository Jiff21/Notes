/* @flow */

/*!
 * @docauthor Jeff Campbell
 */
// Letting jshint know these are Exported Variables.
/* exported makeVisible */

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
  // const oldVis = Array.from(document.getElementsByClassName('visible'));
  // const newVis = Array.from(document.getElementsByClassName('hidden'));
  const oldVis = [].slice.call(document.getElementsByClassName('visible'));
  const newVis = [].slice.call(document.getElementsByClassName('hidden'));
  console.debug(oldVis.length);
  console.debug(newVis.length);

  const numberOfOld = oldVis.length;
  for (i; i < numberOfOld; i += 1) {
    // Loops through all previously visible elements and makes them hidden.
    console.debug(oldVis[l]);
    oldVis[l].classList.add('hidden');
    oldVis[l].classList.remove('visible');
  }

  console.debug(oldVis.length);
  console.debug(newVis.length);
  const numberOfNew = newVis.length;
  for (l; l < numberOfNew; l += 1) {
    // Loops through all previously invisible elements and makes them visible.
    console.debug(newVis[l]);
    newVis[l].classList.add('visible');
    newVis[l].classList.remove('hidden');
  }
};

const makeVisible = () => {
  changeButton();
  changeExample();
};
