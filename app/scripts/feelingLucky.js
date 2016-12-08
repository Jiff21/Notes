/* @flow */
/* exported luckyLink */

const luckyLink = () => {
  const allLinks = document.querySelectorAll(' div.navbar-collapse.collapse > ul > li.dropdown > ul > li > a');
  const linkNumber = Math.floor((Math.random() * allLinks.length));
  allLinks[linkNumber].click();
};
