/* global before, after */
/* exported before, after */

'use strict';


module.exports = {

	before : function(browser) {
		console.log('');
	},

	after : function(browser) {
		console.log('');
	},

	'The Javascript page should a button that changes the color of the header': function(browser) {
		browser
			.url('http://localhost:9000/Views/javascript.html')
			.waitForElementVisible('body.javascript-body', 3000)
			.waitForElementVisible('button[value=button]', 500)
			.click('xpath','//*[@id="switcher"]/button').pause(100)
			.assert.cssProperty('header#switcher', 'background-color', 'rgba(169, 169, 169, 1)')
			.end();
	},

	// 'The Javascript page should a button that produces an alert': function(browser, session) {
	// 	var text;
	// 	browser
	// 		.url('http://localhost:9000/Views/javascript.html')
	// 		.waitForElementVisible('body.javascript-body', 3000)
	// 		.click('a.btn.btn-lg.btn-success').pause(1000);

	// 		session.getAlert('browser', function (text){
	// 			return text;
	// 		})
	// 		.assert.containsText(text, 'I need to think of something for this to do.')
	// 		.end();
	// }

	'The Javascript page should a specific hero image': function(browser) {
		browser
			.url('http://localhost:9000/Views/javascript.html')
			.waitForElementVisible('body.javascript-body', 3000)
			.assert.cssProperty('div.jumbotron', 'background-image', 'url("http://localhost:9000/images/JFKAlienHunter.jpg")')
			.end();
	},

};

