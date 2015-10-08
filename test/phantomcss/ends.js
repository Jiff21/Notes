'use strict';

casper.test.begin('In The End File..', function (test) {

	casper.then(function () {
		phantomcss.compareAll();
	})


	phantomcss.waitForTests()

	casper.test.done();

	/*
	Casper runs tests
// 	*/
	casper.run(function () {
		console.log('\nTHE END.');
		// phantomcss.getExitStatus() // pass or fail?
	});

});