'use strict'

describe('The home page', function() {
	it('should have a jubotron', function() {
		browser.url('/Home.html');
		// browser.setValue('#search_form_input_homepage', 'WebdriverIO');
		// browser.click('#search_button_homepage');

		var title = browser.getTitle();
		console.log('Title is: ' + title);
		// outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
	});
});