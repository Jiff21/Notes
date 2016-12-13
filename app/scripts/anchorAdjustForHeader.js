/*
* Internal anchor links are not taking into
* account the fixed header, need to adjust 50px.
*/
/* @flow */


$(document).ready(function () {
  $('a[href*=#]').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      let $target = $(this.hash);
      $target = $target.length && $target;
      if ($target.length) {
        const targetOffset = $target.offset().top - 60;
        $('html,body').animate({
          scrollTop: targetOffset
        }, 1000);
        return false;
      }
    }
  });
});
