/**
* Login flows for .
 */

// Globals and Excludes for jsHint.
/* global afterEach, by, browser, beforeEach, describe, element, expect, it */
/* exported */

'use strict';

describe('the Application', function () {

	var helpers = require('./shared.js');
	// console.log('Helpers File :: ', helpers);

	beforeEach(function () {
		browser.get('#/welcome');
		browser.executeScript('window.localStorage.clear();');
		browser.driver.manage().deleteAllCookies();
	});

	afterEach(function () {

	});

	it('should be able to log the user in using the Sign Up Button.', function () {
		// Trying to clear in Safari, has some issues timing up clears in new window.

		var sBrowser = browser.driver, // Just shortening what I have to write when not on an Angular page.
			email,
			closebutton,
			correctAccount,
			currentURL,
			loginbutton,
			lAccount = 'account-' + helpers.userAccounts.mainEmail + helpers.userAccounts.domain,
			lPw = helpers.userAccounts.mainPass,
			lUser = helpers.userAccounts.mainEmail + helpers.userAccounts.domain,
			pass,
			signInButton;

		// Helper function for when the Google OAuth has multiple accounts remembered in this browser. Can't use superWait as OAuth is outside of Angular.
		var multipleAccountsFlow = function () {
			sBrowser.wait(function () {
				console.log('This has a list of accounts to choose from. Waiting for QA Account.');
				return sBrowser.isElementPresent(by.id(lAccount)).then(function (el) {
					return el === true;
				});
			}, 5000)
				.then(function () {
					correctAccount = sBrowser.findElement(by.id(lAccount))
						.findElement(by.tagName('button'));
					console.log('Selecting correct account.');
					correctAccount.click();
				})
				.then(function () {
					sBrowser.isElementPresent(by.name('signIn')).then(function (el) {
						if (el === true) {

							sBrowser.wait(function () {
								console.log('Waiting for login button to appear (Muliple Accounts).');
								return sBrowser.isElementPresent(by.name('signIn')).then(function (el) {
									return el === true;
								});
							}, 6200)
								.then(function () {
									// Fills out test login info and clicks sign in button. then waits for homepage to load.
									sBrowser.wait(function () {
										console.log('waiting for focus to enter password field.');
										pass = sBrowser.findElement(by.id('Passwd'));
										loginbutton = sBrowser.findElement(by.id('signIn'));
										pass.clear();
										pass.click();
										pass.sendKeys(lPw);
										loginbutton.click();
									}, 4440);
								});
						}
					});
				});
		};

		// Helper function for when the Google OAuth has no account appear to select in this browser.
		var noAccountsFlow = function () {

			// Waits for next page to load then fills out form and submits.
			sBrowser.wait(function () {
				console.log('Waiting for login button to appear (No Accounts).');
				return sBrowser.isElementPresent(by.name('signIn')).then(function (el) {
					return el === true;
				});
			}, 6200)
				.then(function () {

					// Fills out test login info and clicks sign in button. then waits for homepage to load.
					email = sBrowser.findElement(by.id('Email'));
					pass = sBrowser.findElement(by.id('Passwd'));
					loginbutton = sBrowser.findElement(by.id('signIn'));
					email.clear();
					pass.clear();
					email.sendKeys(lUser);
					pass.sendKeys(lPw);
					loginbutton.click();
				});
		};



		// Test needs to wait for page to load. Then click Sign in button.
		browser.driver.wait(function () {
			console.log('Waiting for sign up button to appear');
			return sBrowser.isElementPresent(by.id('welcome')).then(function (el) {
				return el === true;
			});

		}, 5100)
			.then(function () {
				sBrowser.findElement(by.id('retailer_code')).sendKeys(helpers.userAccounts.accessCode);
				sBrowser.findElement(by.css('#page-welcome .hero form button')).click();
				signInButton = $('.signin-button');

				// Fills out test login info and clicks sign in button. then waits for homepage to load.
				signInButton.click().then(function () {
					browser.sleep(2000);

					/// When Multiple Accounts are present on the browser.
					sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
						if (val === true) {
							// 1st Helper function defined above.
							multipleAccountsFlow();
						} else {
							// 2nd Helper function defined above.
							noAccountsFlow();
						}
					});
				});
			});

		sBrowser.wait(function () {
			console.log('Waiting for Homepage to load.');
			return sBrowser.isElementPresent(by.id('page-home')).then(function (el) {
				return el === true;
			});

			// Needs crazy long timeout in-case there is no local storage yet.
		}, 15000)
			.then(function () {
				console.log('Homepage Loaded!');
				closebutton = element(by.cssContainingText('a', 'OK GOT IT'));
				closebutton.click();
				browser.sleep(1000).then(function () {
					closebutton.isDisplayed().then(function (visibility) {
						expect(visibility).toBeFalsy();
					});

					// Checks to make sure we're on the homepage.
					browser.getCurrentUrl().then(function (url) {
						currentURL = url.replace(browser.baseUrl, '').replace('', '');
						expect(currentURL).toBe('#/');
					});
				});
			});
	});

	it('should display a warning if first name is too short.', function () {
		// Trying to clear in Safari, has some issues timing up clears in new window.
		var sBrowser = browser.driver, // Just shortening what I have to write when not on an Angular page.
			signInButton;

		// Test needs to wait for page to load. Then click Sign in button.
		browser.driver.wait(function () {
			console.log('Waiting for sign up button to appear');
			return sBrowser.isElementPresent(by.id('welcome')).then(function (el) {
				return el === true;
			});

		}, 11100)
			.then(function () {
				sBrowser.findElement(by.id('retailer_code')).sendKeys(helpers.userAccounts.accessCode);
				sBrowser.findElement(by.css('#page-welcome .hero form button')).click();
				signInButton = $('.signin-button');

				// Fills out test login info and clicks sign in button. then waits for homepage to load.
				signInButton.click().then(function () {
					browser.sleep(2000);

					/// When Multiple Accounts are present on the browser.
					sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
						if (val === true) {
							// 1st Helper function defined above.
							helpers.gMultipleAccountsFlow(helpers.userAccounts.notSignedUpEmail, helpers.userAccounts.notSignedUpPass, helpers.userAccounts.domain);
						} else {
							// 2nd Helper function defined above.
							helpers.gNoAccountsFlow(helpers.userAccounts.notSignedUpEmail, helpers.userAccounts.notSignedUpPass, helpers.userAccounts.domain);
						}
					});
					helpers.signInVars.firstNameField.click();
					helpers.signInVars.firstNameField.clear();
					helpers.signInVars.firstNameField.sendKeys('no');
					helpers.signInVars.firstNameErrorShort.isDisplayed().then(function(visibility){
						expect(visibility).toBeTruthy();
					});
					expect(helpers.signInVars.firstNameField.getCssValue('border-bottom-color')).toBe('rgba(255, 82, 78, 1)');
					helpers.signInVars.firstNameField.sendKeys('wgood');
					expect(helpers.signInVars.firstNameField.getCssValue('border-bottom-color')).toBe('rgba(204, 204, 204, 1)');
					helpers.signInVars.lastNameField.click();
					helpers.signInVars.lastNameField.clear();
					helpers.signInVars.lastNameField.sendKeys('al');
					expect(helpers.signInVars.lastNameField.getCssValue('border-bottom-color')).toBe('rgba(255, 82, 78, 1)');
					helpers.signInVars.saveAndVerifyButton.click();
					// helpers.signInVars.lastNameErrorShort.isDisplayed().then(function(visibility){
					// 	expect(visibility).toBeTruthy();
					// });
					helpers.signInVars.lastNameField.sendKeys('so good');
					expect(helpers.signInVars.firstNameField.getCssValue('border-bottom-color')).toBe('rgba(204, 204, 204, 1)');
				});
			});
	});


	it('should display warnings if name fields are empty.', function () {
		// Trying to clear in Safari, has some issues timing up clears in new window.
		var sBrowser = browser.driver, // Just shortening what I have to write when not on an Angular page.
			signInButton;

		// Test needs to wait for page to load. Then click Sign in button.
		browser.driver.wait(function () {
			console.log('Waiting for sign up button to appear');
			return sBrowser.isElementPresent(by.id('welcome')).then(function (el) {
				return el === true;
			});

		}, 11100)
			.then(function () {
				sBrowser.findElement(by.id('retailer_code')).sendKeys(helpers.userAccounts.accessCode);
				sBrowser.findElement(by.css('#page-welcome .hero form button')).click();
				signInButton = $('.signin-button');

				// Fills out test login info and clicks sign in button. then waits for homepage to load.
				signInButton.click().then(function () {
					browser.sleep(2000);

					/// When Multiple Accounts are present on the browser.
					sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
						if (val === true) {
							// 1st Helper function defined above.
							helpers.gMultipleAccountsFlow(helpers.userAccounts.notSignedUpEmail, helpers.userAccounts.notSignedUpPass, helpers.userAccounts.domain);
						} else {
							// 2nd Helper function defined above.
							helpers.gNoAccountsFlow(helpers.userAccounts.notSignedUpEmail, helpers.userAccounts.notSignedUpPass, helpers.userAccounts.domain);
						}
					});
					helpers.signInVars.firstNameField.click();
					helpers.signInVars.firstNameField.clear();
					helpers.signInVars.firstNameError.isDisplayed().then(function(visibility){
						expect(visibility).toBeTruthy();
					});
					helpers.signInVars.lastNameField.click();
					helpers.signInVars.lastNameField.clear();
					helpers.signInVars.saveAndVerifyButton.click();
					helpers.signInVars.lastNameError.isDisplayed().then(function(visibility){
						expect(visibility).toBeTruthy();
					});					
				});
			});
	});


	it('should allow a user to sign up using a code.', function () {
		// Trying to clear in Safari, has some issues timing up clears in new window.
		var sBrowser = browser.driver, // Just shortening what I have to write when not on an Angular page.
			currentURL,
			signInButton;


		// Test needs to wait for page to load. Then click Sign in button.
		browser.driver.wait(function () {
			console.log('Waiting for sign up button to appear');
			return sBrowser.isElementPresent(by.id('welcome')).then(function (el) {
				return el === true;
			});

		}, 11100)
			.then(function () {
				sBrowser.findElement(by.id('retailer_code')).sendKeys(helpers.userAccounts.accessCode);
				sBrowser.findElement(by.css('#page-welcome .hero form button')).click();
				signInButton = $('.signin-button');

				// Fills out test login info and clicks sign in button. then waits for homepage to load.
				signInButton.click().then(function () {
					browser.sleep(2000);

					/// When Multiple Accounts are present on the browser.
					sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
						if (val === true) {
							// 1st Helper function defined above.
							helpers.gMultipleAccountsFlow(helpers.userAccounts.notSignedUpEmail, helpers.userAccounts.notSignedUpPass, helpers.userAccounts.domain);
						} else {
							// 2nd Helper function defined above.
							helpers.gNoAccountsFlow(helpers.userAccounts.notSignedUpEmail, helpers.userAccounts.notSignedUpPass, helpers.userAccounts.domain);
						}
						browser.element(by.className('mod-cta-bar')).click();
					});
				});
			});


		sBrowser.wait(function () {
			console.log('Waiting for Homepage to load.');
			return sBrowser.isElementPresent(by.id('page-home')).then(function (el) {
				return el === true;
			});

			// Needs crazy long timeout in-case there is no local storage yet.
		}, 15000)
			.then(function () {
				console.log('Homepage Loaded!');
				browser.sleep(1000).then(function () {
					// Checks to make sure we're on the homepage.
					browser.getCurrentUrl().then(function (url) {
						currentURL = url.replace(browser.baseUrl, '').replace('', '');
						expect(currentURL).toBe('#/');
					});
				});
			});

		// Erasing iTest Account so future tests will work.
		helpers.eraseAccount(helpers.userAccounts.mainEmail, helpers.userAccounts.notSignedUpEmail);
		helpers.deleteUserData();
		helpers.LoginToGoogle(helpers.userAccounts.mainEmail, helpers.userAccounts.mainPass);
	});


});