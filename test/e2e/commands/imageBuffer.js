// Globals and Excludes for jsHint.
/* global browser */
/* exported browser */

'use strict';


exports.command = function(file, callback) {
	var self = this, imageData, fs = require('fs');

	try {
		var originalData = fs.readFileSync(file);
		var base64Image = new Buffer(originalData, 'binary')
			.toString('base64');
		imageData = 'data:image/jpeg;base64,' + base64Image;
	} catch (err) {
		console.log(err);
		throw "Unable to open file: " + file;
	}

	this.execute(
		function(data) { // execute application specific code
			App.resizePicture(data);
			return true;
		},

	[imageData], // arguments array to be passed

		function(result) {
			if (typeof callback === "function") {
				callback.call(self, result);
			}
		}
	);

	return this; // allows the command to be chained.
};




// exports.command = {
// 	this.standardSize = function () {
// 		browser.resizeWindow(1000, 800);
// 	};

	// this.xssUri = function (client) {
 //  		client.urlHash('"><img src="x" onerror="alert(‘XSS?‘)”>');
	// };

	// this.loadTime = function (el){
	// 	var endTimeInMilliseconds = null,
	// 		loadTime = null,
	// 		startTimeInMilliseconds = null;
	// 	startTimeInMilliseconds = new Date().getTime();
	// 	browser
	// 		.url('http://localhost:9000')
	// 		.waitForElementVisible(el, 10000)
	// 		.then(function(){
	// 			var endTimeInMilliseconds = new Date.getTime();
	// 			return endTimeInMilliseconds;
	// 		})
	// 		.then(function() {
	// 			loadTime = endTimeInMilliseconds - startTimeInMilliseconds;
	// 			return loadTime;
	// 		});
	// };
// };