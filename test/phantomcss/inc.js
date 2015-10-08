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
	baseUrl = 'https://www.localsbarguide.com';

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

	casper.thenOpen(baseUrl + '/News', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'News-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/Browse', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', longDelay, '', 'Browse-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/Specials', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', longDelay, '', 'Specials-'  + screenSize);
	});

	casper.thenOpen(baseUrl + '/Bars/View/Mars%20Bar', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'BarView-' + screenSize);
	});
};

var secondaryTestSuite = function(screenSize) {
	casper.start(baseUrl + '/News/Article/The%20original%20Irish%20Coffee', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Article-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/Search/Results/con', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Search-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/Contact', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Contact-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/About', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'About-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/About/Privacy', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Privacy-' + screenSize);
	});

	casper.thenOpen(baseUrl + '/About/Terms', function () {
		console.log('URL::', casper.getCurrentUrl());
		phantomcss.screenshot('body', noDelay, '', 'Terms-' + screenSize);
	});
};

var endIt = function(){
	casper.then(function endIt() {
		casper.test.done();
	});
};