'use strict'

describe('The home page', function() {


	it('should have a jubotron', function() {
		browser.url('/Home.html');
		var title = browser.getTitle();
		expect(title).to.match(/Home of Jiff\'s Notes/);
		// browser.click('btn-success');
	});


});