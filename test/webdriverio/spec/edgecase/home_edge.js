'use strict'

describe('The home page', function() {

	// Synchronous test style.
	it('Should have more than 20 grid elements', function async () {
		return browser
			.url('/Home.html')
			.elements('a').then(function(res){
				expect(res.value.length).to.be.above(400);
			})
	});
});