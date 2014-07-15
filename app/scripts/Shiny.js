/*!
 * @docauthor Jeff Campbell
 */
'use strict';
var config = new shinejs.Config({
	numSteps: 9,
	opacityPow: 4.3,
	shadowRGB: new shinejs.Color(187, 222, 159)
});

var shine = new Shine(document.getElementById('shiny'), config);

window.addEventListener('mousemove', function(event) {
	shine.light.position.x = event.clientX;
	shine.light.position.y = event.clientY;
	shine.draw();
}, false);