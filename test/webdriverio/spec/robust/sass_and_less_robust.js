'use strict'

describe('The Sass and Less page', function() {

	it('should have a visible less header after clicking the LESS button', function () {
		return browser
			.url('/sass.html')
			.click('button=LESS')
			.getText('h3=SASS').then(function(text){
				expect(text).to.contain('LESS')
			})
			// .pause(2000)
			// .isVisible('h3#lassy').then(function(isVisible){
			// 	console.log(isVisible)
			// 	expect(isVisible).to.be.true;
			// })
			// .isVisible('h3#sassy').then(function(isVisible){
			// 	expect(isVisible).to.be.false;
			// })
			.call(done);
	});
});