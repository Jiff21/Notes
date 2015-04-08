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
	}
};