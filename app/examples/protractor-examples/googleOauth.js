/**
 * Stubbed helper files for tests.
 */

// Globals and Excludes for jsHint.
/* global browser, beforeEach, afterEach, protractor, element, by, By, expect */
/* exported ptor */

'use strict';

var GoogleOauth = function () {

	var sBrowser = browser.driver,
	loginInfo = require('./loginInfo.js');

		// Helper function that logs into Google for Login. Not being used in Login Flow test because that needs expectations.
		this.LoginToGoogle = function (user, password) {
			// Ignore Sync part was causing weird error with Selenium. May need to ditch this.
			protractor.getInstance().ignoreSynchronization = true;
			console.log('ignoreSynchronization On!')
			console.log('Logging into google account with helper.')

			// Trying to clear in Safari, has some issues timing up clears in new window.
			var email,
				closebutton,
				correctAccount,
				loginbutton,
				lAccount = 'account-' + user + loginInfo.userAccounts.domain,
				lPw = password,
				lUser = user + loginInfo.userAccounts.domain,
				newAccountButton,
				nextbutton,
				pass;

			var turnOnSync = function () {
				console.log('ignoreSynchronization Off!')
				protractor.getInstance().ignoreSynchronization = false;
			};

			// Helper function for when the Google OAuth has multiple accounts remembered in this browser. Can't use superWait as OAuth is outside of Angular.
			var multipleAccountsFlow = function () {

				sBrowser.wait(function () {
					console.log('This has a list of accounts to choose from. Waiting for ' + lAccount + ' to appear.');
					return sBrowser.isElementPresent(by.id(lAccount)).then(function (el) {
						return el === true;
					});
				}, 10000)
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
											turnOnSync();
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
						turnOnSync();
					});
			};


			var noAccountsSinglePageFlow = function () {
				sBrowser.wait(function () {
					console.log("Waiting for login button to appear (No Account, single page flow).");
					return sBrowser.isElementPresent(by.name('signIn')).then(function (el) {
						return el === true;
					});
				}, 6200)
					.then(function () {
						// Fills out test login info and clicks sign in button. then waits for homepage to load.
						email = sBrowser.findElement(by.id('Email'));
						nextbutton = sBrowser.findElement(by.id('next'));
						email.sendKeys(lUser);
						nextbutton.click();
						sBrowser.wait(function () {
							console.log("Waiting for password enter button to appear.");
							return sBrowser.findElement(by.id('signIn')).isDisplayed().then(function (el) {
								return el === true;
							});
						}, 6200)
							.then(function () {
								// Fills out test login info and clicks sign in button. then waits for homepage to load.
								loginbutton = sBrowser.findElement(by.id('signIn'));
								pass = sBrowser.findElement(by.id('Passwd'));
								pass.sendKeys(lPw);
								loginbutton.click();
								turnOnSync();
							});
					});
			};

			var addToAccountList = function () {
				newAccountButton = sBrowser.findElement(by.id('account-chooser-add-account'));
				console.log('Clicking Add account.');
				newAccountButton.click();
				sBrowser.isElementPresent(by.id('Passwd')).then(function (val2) {
					if (val2 === false) {
						// No accounts detected login contains User field on seperate page then Password field.
						noAccountsSinglePageFlow(lUser, lPw);
					} else {
						sBrowser.isElementPresent(by.id('page-home')).then(function (val3) {
							if (val3 === true) {
								console.log('Previously Logged in.');
							} else {
								// No accounts detected login contains User and password field.
								noAccountsFlow(lUser, lPw);
							}
						});
					}
				});



			};


			sBrowser.wait(function () {
				console.log('Waiting for Google Oauth page to load.');
				return sBrowser.isElementPresent(by.className('wrapper')).then(function (el) {
					return el === true;
				});
			}, 6200)
				.then(function () {

					// Triggers decision on which of the above login flows to use.
					sBrowser.isElementPresent(by.id('account-list')).then(function (val) {
						if (val === true) {
							sBrowser.isElementPresent(by.id(lAccount)).then(function (el) {
								if (el === true) {
									multipleAccountsFlow(lUser, lPw, lAccount);
								} else {
									addToAccountList(lUser, lPw, lAccount);
								}
							});

							// 1st Helper function defined above.

						} else {
							sBrowser.isElementPresent(by.id('Passwd')).then(function (val2) {
								if (val2 === false) {
									// No accounts detected login contains User field on seperate page then Password field.
									noAccountsSinglePageFlow(lUser, lPw);
								} else {
									sBrowser.isElementPresent(by.id('page-home')).then(function (val3) {
										if (val3 === true) {
											console.log('Previously Logged in.');
										} else {
											// No accounts detected login contains User and password field.
											noAccountsFlow(lUser, lPw);
										}
									});
								}
							});
						}
					});
				});
		};
};

module.exports = new GoogleOauth();