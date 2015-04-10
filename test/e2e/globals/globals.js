// Globals and Excludes for jsHint.
/* global browser */
/* exported browser */

'use strict';

module.exports = {
	defaultTimeout: 10000,
	baseURL: 'http://localhost:9000/',
	email: 'jeff@example.com',
	password: 'Password1!',
	practice: 'Test Practice',
	organization: 'Test Organization',
	init: function (browser) {
	// Initial Navigation
		return browser
		.url(browser.globals.baseURL)
		// Bypass IE6 Certificate Security Error
		.acceptAlert()
		// Bypass IE8 Certificate Security Error
		.getTitle(function(title) {
			if(title.indexOf('Certificate Error') !== -1) {
				this.url('javascript:document.getElementById("overridelink").click();');
			}
		})

		.maximizeWindow()
		// Sanity Check - page loaded
		.waitForElementVisible('body', browser.globals.waitTimeout);
	}
};