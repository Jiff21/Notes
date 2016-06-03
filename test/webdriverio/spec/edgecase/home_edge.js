'use strict'

describe('The home page', function() {

	it('Should have more at least 20 grid links', function async () {
		return browser
			.url('/Home.html')
			.elements('.home-grid a').then(function(res){
				expect(res.value.length).to.be.at.least(20);
			})
	});
});