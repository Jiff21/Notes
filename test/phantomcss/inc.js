/**
 * Includes for PhantomCSS
 */

// Globals and Excludes for jsHint.
/* globals casper, phantomcss */
/* exported delay, baseUrl*/

'use strict';

var noDelay = 0,
	smallDelay = 1000,
	mediumDelay = 2000,
	longDelay = 3000,
	specialsDelay = 6000,
	baseUrl = 'http://0.0.0.0:9000/';

var largestDesktop = function () {
	casper.viewport(2549, 3000);
};

var mediumDesktop = function () {
	casper.viewport(1200, 3000);
};

var smallDesktop = function () {
	casper.viewport(994, 3000);
};

var largeTablet = function () {
	casper.viewport(991, 6000);
};

//iPad Air portrait width.
var smallTablet = function () {
	casper.viewport(768, 6000);
};

//iPhone 6 portrait width.
var largeMobile = function () {
	casper.viewport(736, 7000);
};

//iPhone 6 portrait width.
var mediumMobile = function () {
	casper.viewport(375, 7000);
};

//iPhone 5S portrait width.
var smallMobile = function () {
	casper.viewport(320, 7000);
};


var basicTestSuite = function (screenSize) {
	casper.start(baseUrl, function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', smallDelay, '', 'Homepage-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/html.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Html-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/javascript.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', longDelay, '', 'javascript-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/css.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', longDelay, '', 'CSS-'  + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/sass.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'BarView-' + screenSize);
	});
};

var secondaryTestSuite = function(screenSize) {
	casper.start(baseUrl + 'Views/jasmine.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Jasmine-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/selenium.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Selenium-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/protractor.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Protractor-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/nightwatch.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Nightwatch-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/owasp.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Owasp-' + screenSize);
	});

	casper.thenOpen(baseUrl + 'Views/sqlmap.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'SQLMap-' + screenSize);
	});
	casper.thenOpen(baseUrl + 'Views/burpsuite.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'burpsuite-' + screenSize);
	});
	casper.thenOpen(baseUrl + 'Views/beef.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'beef-' + screenSize);
	});
	casper.thenOpen(baseUrl + 'Views/staticcodeanalysis.html', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'SCAT-' + screenSize);
	});
};

var endIt = function(){
	casper.then(function endIt() {
		casper.test.done();
	});
};