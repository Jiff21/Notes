'use strict'

// Example using Mocha
var assert = require('assert');
var b = 0;
var baseUrl = 'https://bynd.com';
var browsers = ['chrome', 'firefox', 'safari']
var main_pages = ['/about/', '/services/', '/people/', '/work/', '/careers/', '/contact/', '/news-ideas/'];
var i = 0;

function encodeForFileName(s) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\//g, '-');;
}

// Webdriverio setup. Pick which browsers you'd like to run.
var client = require('webdriverio').remote({
	desiredCapabilities: {
		browserName: 'chrome'
	}
})

// initialise WebdriverCSS for `client` instance.
require('webdrivercss').init(client, {
	// specifies where to get baseline files
	screenshotRoot: './webdriverio/baseline-screens',
	// specifies where to keep failures
	failedComparisonsRoot: './webdriverio/failed-diff-screens',
	// adjust mismatch tolerance to account for minor timing issues
	misMatchTolerance: 0.1,
	// Test at all your breakpoints in px
	screenWidth: [400,770,1450,2000],
	// change to true if you need to update the baseline images.
	updateBaseline: false
});

//Checking global elemeents
for (var i = 0; i < main_pages.length; i++) {
	client
		.init()
		.url(baseUrl + main_pages[i]) // navigation
		.pause(1.5)
		.webdrivercss((encodeForFileName(main_pages[i]) + '-global'),[ // this is naming the first half of the file
			{
				name: 'header',  // this names the 2nd half of the file and you need to adjust the function below to 'assert.ok(res.' then this name to make sure all elements get photos 
				elem: '#header-primary'  // tell it what element on page to compare. This can help you avoid errors due to changing content or animated/moving elements on page.
			}, {
				name: 'footer',
				elem: '#footer-primary'
			}
		], function(err, res) {
			assert.ifError(err);
			assert.ok(res.header[0].isWithinMisMatchTolerance); // remember one of these for each element grabbed above.
			assert.ok(res.footer[0].isWithinMisMatchTolerance);
		})
		.end();
}



// Testing about page
client
	.init()
	.url(baseUrl + main_pages[0])
	.pause(1.5)
	.webdrivercss((encodeForFileName(main_pages[0])),[
		{
			name: 'header',
			elem: '.heading-wrap structure'
		}, {
			name: 'who_what_why',
			elem: 'body > main > div'
		}, {
			name: 'our_heritage',
			elem: '.section-ourheritage'
		}, {
			name: 'awards',
			elem: 'section-awards'
		}
	], function(err, res) {
		assert.ifError(err);
		assert.ok(res.header[0].isWithinMisMatchTolerance);
		assert.ok(res.who_what_why[0].isWithinMisMatchTolerance);
		assert.ok(res.our_heritage[0].isWithinMisMatchTolerance);
		assert.ok(res.awards[0].isWithinMisMatchTolerance);
	})
	.end();
