'use strict'

describe('The home page', function() {


	it('should have a jubotron', function() {
		browser.url('/Home.html');
		var title = browser.getTitle();
		expect(title).to.match(/Home of Jiff\'s Notes/);
		// browser.click('btn-success');
	});

	it('has a button that if you click it will take you to another page.', function() {
		browser.url('/Home.html');
		var currentUrl = browser.getUrl();
		expect(currentUrl).to.match(/http\:\/\/0\.0\.0\.0\:9000\/Views\/\/Home\.html/);
		browser.pause(2000);
		browser.click('.btn-success');
		browser.pause(2000);
		var currentUrl = browser.getUrl();
		expect(currentUrl).to.not.match(/http\:\/\/0\.0\.0\.0\:9000\/Views\/\/Home\.html/);
	});


});