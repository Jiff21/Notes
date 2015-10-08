'use strict';

var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantomcss = require(path);

casper.test.begin('Setting up casper then trying to run a test.', function (test) {

	phantomcss.init({
		/*
		libraryRoot is relative to this file and must point to your 
		phantomcss folder (not lib or node_modules). If you are using 
		NPM, this will be './node_modules/phantomcss'.
	*/
		libraryRoot: './node_modules/phantomcss',

		screenshotRoot: './test/phantomcss/screenshots',

		/*
		By default, failure images are put in the './failures' folder. 
		If failedComparisonsRoot is set to false a separate folder will 
		not be created but failure images can still be found alongside 
		the original and new images.
	*/
		failedComparisonsRoot: './test/phantomcss/failures',

		/*
		Remove results directory tree after run.  Use in conjunction 
		with failedComparisonsRoot to see failed comparisons.
	*/
		cleanupComparisonImages: true,

		/*
		A reference to a particular Casper instance. Required for SlimerJS.
	*/
		casper: '',

		/*
		You might want to keep master/baseline images in a completely 
		different folder to the diffs/failures.  Useful when working 
		with version control systems. By default this resolves to the 
		screenshotRoot folder.
	*/
		comparisonResultRoot: './test/phantomcss/results',

		/*
		Don't add label to generated failure image
	*/
		addLabelToFailedImage: false,

		/*
		Mismatch tolerance defaults to  0.05%. Increasing this value 
		will decrease test coverage
	*/
		mismatchTolerance: 0.05,

		/*
		Callbacks for your specific integration
	*/
		onFail: function (test) {
			console.log('Test Failed: ' + test.filename, test.mismatch);
		},

		onPass: function (test) {
			console.log('Test Passed: ' + test.filename);
		},

		/* 
		Called when creating new baseline images
	*/
		onNewImage: function () {
			console.log('Image Created: ' + test.filename);
		},

		onTimeout: function () {
			console.log('Timed out in: ' + test.filename);
		},

		onComplete: function (allTests, noOfFails, noOfErrors) {
			allTests.forEach(function (test) {
				if (test.fail) {
					console.log(test.filename, test.mismatch);
				}
			});
		},

		/*
		Change the output screenshot filenames for your specific 
		integration
	*/
		fileNameGetter: function (root, filename) {
			// globally override output filename
			// files must exist under root
			// and use the .diff convention
			var name = root + '/somewhere/' + filename;
			if (fs.isFile(name + '.png')) {
				return name + '.diff.png';
			} else {
				return name + '.png';
			}
		},

		/*
		Prefix the screenshot number to the filename, instead of suffixing it
		*/
		prefixCount: true,

		/*
		Output styles for image failure outputs genrated by 
		Resemble.js
	*/
		outputSettings: {
			errorColor: {
				red: 255,
				green: 255,
				blue: 0
			},
			errorType: 'movement',
			transparency: 0.3
		},

		/*
		Rebase is useful when you want to create new baseline 
		images without manually deleting the files
		casperjs demo/test.js --rebase
	*/
		rebase: casper.cli.get("rebase")
	});

	console.log('Done with init.');

	casper.start(baseUrl, function () {
		casper.viewport(2549, 3307);
	});

	//best way to use include for me : you can both execute a folder or a file
	// phantom.injectJs(fs.workingDirectory + './test2.js');

	// casper.then(function () {
	// 	phantomcss.compareAll();
	// })

	console.log('Done with setup.');

	casper.then(function end_it() {
		casper.test.done();
	});
	/*
	Casper runs tests
	*/
	casper.run(function () {
		console.log('\nTHE END.');
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	});

});
/*
	Turn off CSS transitions and jQuery animations
*/
phantomcss.turnOffAnimations();