/**
 * Test Run Order.
 */

// Globals and Excludes for jsHint.
/* globals phantomcss, casper, basicTestSuite, secondaryTestSuite, endIt, largestDesktop, mediumDesktop, smallDesktop, largeTablet, smallTablet, largeMobile, mediumMobile, smallMobile */

'use strict';

casper.test.begin('Testing Large Desktop', function (test) {
	largestDesktop();
	basicTestSuite('Lrg-Desktop');
	secondaryTestSuite('Lrg-Desktop');
	endIt();
});

casper.test.begin('Testing Medium Desktop', function (test) {
	mediumDesktop();
	basicTestSuite('Mdm-Desktop');
	secondaryTestSuite('Mdm-Desktop');
	endIt();
});

casper.test.begin('Testing Small Desktop', function (test) {
	smallDesktop();
	basicTestSuite('Sml-Desktop');
	secondaryTestSuite('Sml-Desktop');
	endIt();
});

casper.test.begin('Testing Large Tablet', function (test) {
	largeTablet();
	basicTestSuite('Lrg-Tablet');
	secondaryTestSuite('Lrg-Tablet');
	endIt();
});

casper.test.begin('Testing Small Tablet', function (test) {
	smallTablet();
	basicTestSuite('Sml-Tablet');
	secondaryTestSuite('Sml-Tablet');
	endIt();
});

casper.test.begin('Testing Large Mobile', function (test) {
	largeMobile();
	basicTestSuite('Lrg-Mobile');
	secondaryTestSuite('Lrg-Mobile');
	endIt();
});

casper.test.begin('Testing Medium Mobile', function (test) {
	mediumMobile();
	basicTestSuite('Mdm-Mobile');
	secondaryTestSuite('Mdm-Mobile');
	endIt();
});

casper.test.begin('Testing Small Mobile', function (test) {
	smallMobile();
	basicTestSuite('Sml-Mobile');
	secondaryTestSuite('Sml-Mobile');
	endIt();
});

casper.test.begin('Triggering Compare All.', function (test) {
	console.log('Triggering Compare All');
	casper.then(function () {
		phantomcss.compareAll();
	});

	endIt();
});