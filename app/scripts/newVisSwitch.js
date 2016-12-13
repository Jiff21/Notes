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

const addAndRemove = (currArray, toAdd, toRemove, startAt) => {
  let i = startAt;
  for (i; i < currArray.length; i += 1) {
    // Loops through all previously visible elements and makes them hidden.
    currArray[i].classList.remove(toRemove);
    currArray[i].classList.add(toAdd);
  }
};

const changeExample = () => {
  // HTML Collections live update. Put it in an array to stop it.
  const oldVis = [].slice.call(document.getElementsByClassName('visible'));
  const newVis = [].slice.call(document.getElementsByClassName('hidden'));
  addAndRemove(oldVis, 'hidden', 'visible', 0);
  addAndRemove(newVis, 'visible', 'hidden', 0);
};

const makeVisible = () => {
  changeButton();
  changeExample();
};
