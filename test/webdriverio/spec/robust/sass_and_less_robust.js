'use strict'

describe('The Sass and Less page', function() {

	it('should have a visible less header after clicking the LESS button', function () {
		return browser
			.url('/sass.html')
			.click('button=LESS')
			.getText('h3#lassy', function(err, text) {
				console.log(text);
				expect(text).to.have.string('LESsS');
			})
			// .isVisible('h3#lassy', function(err, vis){
			// 	expect(isVisible).to.be.true;
			// })
			// .call(done);
	});
});

