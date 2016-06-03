'use strict'

describe('The home page', function() {

	// Asynchronous test Notice it declares it is asynchronous next to function in the It.
	it('should have the correct title', function async () {
		browser.url('/Home.html');
		var title = browser.getTitle();
		expect(title).to.match(/Home of Jiff\'s Notes/);
	});

	// You can stil write in that style without going async
	it('has a button that if you click it will take you to another page.', function () {
		browser.url('/Home.html');
		var currentUrl = browser.getUrl();
		expect(currentUrl).to.have.string('http://0.0.0.0:9000/Views/Home.html');
		browser.click('.btn-success');
		currentUrl = browser.getUrl();
		expect(currentUrl).to.not.have.string('http://0.0.0.0:9000/Views/Home.html');
	});

});