'use strict'

describe('The Sass and Less page', function() {

	it('should have a visible less header after clicking a button', function () {
		return browser
			.url('/sass.html')
			.click('button=LESS')
			.pause(2000)
			.isVisible('#lassy').then(function(isVisible){
				expect(isVisible).true;
			})
			.call(done);
	});
});