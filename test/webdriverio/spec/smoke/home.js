'use strict'

describe('The home page', function() {


	it('should have a jubotron', function() {
		browser.url('/Home.html');
		var title = browser.getTitle();
		expect(title).to.match(/Home of Jiff\'s Notes/);
	});

	it('has a button that if you click it will take you to another page.', function() {
		browser.url('/Home.html');
		var currentUrl = browser.getUrl();
		expect(currentUrl).to.have.string('http://0.0.0.0:9000/Views/Home.html');
		browser.click('.btn-success');
		browser.pause(2000);
		var currentUrl = browser.getUrl();
		expect(currentUrl).to.not.have.string('http://0.0.0.0:9000/Views/Home.html');
	});


});