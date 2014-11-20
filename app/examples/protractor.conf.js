exports.config = {
	allScriptsTimeout: 7 * 10000,

	specs: [
		'test/e2e/*.js',
		'test/e2e/**/*.js'
	],

	// Downloadable @ http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar
	seleniumServerJar: 'selenium-server-standalone-2.43.1.jar', // Placing it here so we all have the same file, no bower or NPM package for this particular build
	// seleniumServerJar: 'node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.40.0.jar', // Doesn't work with Safari

	chromeDriver: 'node_modules/chromedriver/bin/chromedriver',

	/**
	 * Single Browser setup
	 */
	// capabilities: {
	// 	'name': 'Chrome',
	// 	'browserName': 'chrome'
	// },

	/**
	 * Multiple Browser setup
	 */
	multiCapabilities: [{
		'name': 'Chrome',
		'browserName': 'chrome'
	}, {
		'name': 'Firefox',
		'browserName': 'firefox'
	}, {
		'name': 'Safari',
		'browserName': 'safari'
	}],

	onPrepare: function () {
		var helpers = require('./test/e2e/shared.js');
		console.log('Running onPrepare.')
		browser.manage().window().setSize(1500, 1000);
		browser.manage().window().setPosition(0, 0);
		browser.get('#/welcome');
		helpers.deleteUserData();
		helpers.LoginToGoogle(helpers.userAccounts.mainEmail, helpers.userAccounts.mainPass);
	},

	// baseUrl: 'http://localhost:9001/',
	// baseUrl: 'http://0.0.0.0:9000/',
	// baseUrl: 'http://127.0.0.1.xip.io:9000/', We use this for login

	baseUrl: 'https://example.com/', // We use this for login.  FIXME

	// seleniumAddress: 'http://localhost:4444/wd/hub',

	framework: 'jasmine',

	rootElement: 'div',

	jasmineNodeOpts: {
		// // onComplete will be called just before the driver quits.
		// onComplete: null,
		// // If true, display spec names.
		// isVerbose: true,
		// // If true, print colors to the terminal.
		// showColors: true,
		// // If true, include stack traces in failures.
		// includeStackTrace: true,
		// Default time to wait in ms before a test fails. Upped severaly as Login test takes a long time.
		defaultTimeoutInterval: 90000,
	}
};