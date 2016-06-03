'use strict'

describe('The home page', function() {
	it('should have a jubotron', function() {
		browser.url('/Home.html');
		console.log('Title is: ' + title);
		browser.getTitle().should.be.equal("Home of Jeff's Note");
		browser.click('btn-success');
		// browser.getUrl()
		
		// outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
	});
});