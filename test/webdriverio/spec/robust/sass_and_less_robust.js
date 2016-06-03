'use strict'

describe('The Sass and Less page', function() {

	it('should have a visible less header after clicking a button', function async () {
		return browser
			.url('/sass.html')
			.emit('log', 'About to Click Less Button')
			.click(button="less")
			.pause(4000)
			.element('#lassy')
			.expect(element.isVisible()).true;
	});
});