/* @flow */

/*!
 * @docauthor Jeff Campbell
 */

 /* imported $ */
 function grabAsideByID () {
  const proAside = document.getElementById('#proAside');
  console.log('I ran');
  return proAside;
}

function keepInPlace (el){
  const scrollAt = 538;
  const posTop = document.body.scrollTop;
  if (posTop < scrollAt) {
    console.log('removing');
    el.removeClass += 'pro-fixed';
    el.classList.remove('pro-fixed');
    // el.removeClass('pro-fixed');
  } else if (posTop >= scrollAt) {
    console.log('adding');
    // el.addClass += 'pro-fixed';
    el.classList.add('pro-fixed');
  }
}

window.onload = function(){
  grabAsideByID()
  window.addEventListener('scroll', function () {
    keepInPlace(proAside)
  });
};
