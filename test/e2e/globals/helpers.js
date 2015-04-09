// Globals and Excludes for jsHint.
/* global browser */

'use strict';

// var Helpers = function () {

// 	this.browser = browser;

// 	this.standardSize = function (browser) {
// 		browser.resizeWindow(1000, 800);
// 	};

// 	this.xssUri = function (client) {
//   		client.urlHash('"><img src="x" onerror="alert(‘XSS?‘)”>');
// 	};

// 	this.loadTime = function (el){
// 		var endTimeInMilliseconds = null,
// 			loadTime = null,
// 			startTimeInMilliseconds = null;
// 		startTimeInMilliseconds = new Date().getTime();
// 		browser
// 			.url('http://localhost:9000')
// 			.waitForElementVisible(el, 10000)
// 			.then(function(){
// 				var endTimeInMilliseconds = new Date.getTime();
// 				return endTimeInMilliseconds;
// 			})
// 			.then(function() {
// 				loadTime = endTimeInMilliseconds - startTimeInMilliseconds;
// 				return loadTime;
// 			});
// 	};

	
// };

// module.exports = Helpers();