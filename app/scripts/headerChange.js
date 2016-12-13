/*!
 * @docauthor Jeff Campbell
 */

 /* exported headerChange, runOnClick */
let itemArray;
let switcher;

function getSwitcher() {
  return document.getElementById('switcher');
}

function getByColor(col) {
  return document.getElementsByClassName(col);
}

function changeClassTo(items, newColor) {
  // items.map(){
  // 	item = items[i];
  // 	item.className = newColor;
  // }

  let i = 0;
  // console.log(items.length);
  let item;

  for (i; i <= items.length; i += 1) {
    // Sets item to the current element in header array.
    item = items[i];
    item.className = newColor;
  }
}

function headerChange() {
  switcher = getSwitcher();
  if (switcher.className === 'red') {
    itemArray = getByColor('red');
    changeClassTo(itemArray, 'white');
  } else {
    itemArray = getByColor('white');
    changeClassTo(itemArray, 'red');
  }
}

var oldstyle = 'example2';
var newstyle = 'example';

function exampleChange (oldClass, newClass) {
  // document.getElementsByClassName returns a node list in older browser and HTMLCollection in Dom 4. See here: http://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
  var examples = Array.from(document.getElementsByClassName(oldClass));
  examples.forEach( function(element) {
    // console.debug(element);
    element.className = newClass;
  });
  oldstyle = newClass;
  newstyle = oldClass;
  return oldstyle, newstyle;
}

function runOnClick() {
  headerChange();
  exampleChange(oldstyle, newstyle);
}
