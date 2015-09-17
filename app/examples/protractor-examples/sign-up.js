/**
 * Sign flows for Training App.
 */

// Globals and Excludes for jsHint.
/* global afterEach, by, browser, beforeEach, describe, element, expect, it, protractor */
/* exported */

'use strict';

describe('Google Training App', function () {

	var helpers = require('./shared.js'),
		loginInfo = require('./loginInfo.js'),
		googleOauth = require('./googleOauth.js');
	// console.log('Helpers File :: ', helpers);

	beforeEach(function () {
		var currentURL;

		browser.executeScript('window.localStorage.clear();')
			.then(function () {
				// browser.driver.manage().deleteAllCookies();
				helpers.deleteUserData();
			})
			.then(function () {
				browser.get('#/welcome');
			});
		browser.driver.getCurrentUrl().then(function (val) {
			currentURL = val;
		}).then(function () {
			console.log(browser.baseUrl);
			if (currentURL === (browser.baseUrl + '#/welcome')) {
				console.log('At the Welcome Cookies should be clear');
				browser.driver.manage().getCookie('token').then(function (cook) {
					if (cook === null) {
						console.log('Token cookie is null');
						browser.refresh();
					} else {
						console.log('Timing off cookies not cleared yet, should retry on its own.');
						// console.log(cook);
					}
				});
			} else {
				console.log('Not at Welcome!!!!!!!!!!');
			}
		});
	});

	afterEach(function () {
		console.log('in AfterEach');
		var returnToLoggedIn = function () {
			browser.sleep(1000)
				.then(function () {
					helpers.deleteUserData();
				})
				.then(function () {
					browser.sleep(500);
				})
				.then(function () {
					browser.get('#/welcome');
					console.log('ignoreSynchronization off');
					protractor.getInstance().ignoreSynchronization = false;
				})
				.then(function () {
					element(by.partialLinkText('SIGN UP')).click().then(function () {
						googleOauth.LoginToGoogle(loginInfo.userAccounts.mainEmail, loginInfo.userAccounts.mainPass);
					});
				});
		};

		// Erasing Delete User Account so future tests will work.
		console.log('ignoreSynchronization On');
		protractor.getInstance().ignoreSynchronization = true;
		helpers.eraseAccount(loginInfo.userAccounts.mainEmail, loginInfo.userAccounts.notSignedUpEmail);
		helpers.superWait('alert-success', 'CLASSNAME', '8000', 'Waiting for delete confirmation...', 'Delete success', returnToLoggedIn);
	});

	it('should display warnings when validation doesnt pass', function () {
		// Trying to clear in Safari, has some issues timing up clears in new window.
		var sBrowser = browser.driver, // Just shortening what I have to write when not on an Angular page.
			helpers = require('./shared.js'),
			googleOauth = require('./googleOauth.js'),
			loginInfo = require('./loginInfo.js');

		var checkFirstNameError = function () {
			helpers.signInVars.firstNameField.click();
			helpers.signInVars.firstNameField.clear().then(function () {
				helpers.signInVars.firstNameError.isDisplayed().then(function (visibility) {
					expect(visibility).toBeTruthy();
				});
			});
		};

		var checkFirstNameMin = function () {
			helpers.signInVars.firstNameField.sendKeys('F');
			helpers.signInVars.firstNameErrorShort.isDisplayed().then(function (visibility) {
				expect(visibility).toBeTruthy();
			});
		};

		var checkLastNameError = function () {
			helpers.signInVars.lastNameField.click();
			helpers.signInVars.lastNameField.clear();
			helpers.signInVars.lastNameField.sendKeys('1234567890123456789012345678901')
			// .then(function(){
			// 	expect(helpers.signInVars.firstErrorBar.getCssValue('color')).toBe('rgb(255, 0, 0)');
			// });	
		};

		var checkLastNameMax = function () {
			helpers.signInVars.nextButton.click();
			helpers.signInVars.lastNameErrorLong.isDisplayed().then(function (visibility) {
				expect(visibility).toBeTruthy();
			});
		};

		var checkNextButtonValid = function () {
			helpers.signInVars.lastNameField.clear()
				.then(function () {
					helpers.signInVars.lastNameField.sendKeys('Last Name Good too');
				})
				.then(function () {
					helpers.signInVars.termsCheckbox.click();
				})
				.then(function () {
					expect(helpers.signInVars.nextButton.getCssValue('background-color')).toBe('rgba(3, 155, 229, 1)');
				});
		};

		var checkSaveButtonValid = function () {
			helpers.signInVars.jobTitleSelector.click()
				.then(function () {
					helpers.signInVars.job.click();
				})
				.then(function () {
					helpers.signInVars.retailerField.sendKeys('Beyond');
				})
				.then(function () {
					helpers.signInVars.zipCityState.sendKeys('94103');
				})
				.then(function () {
					browser.wait(function () {
						console.log('Waiting for Store Selector.');
						return browser.isElementPresent(helpers.signInVars.storeAddress).then(function (el) {
							return el === true;
						});
					}, 8000)
						.then(function () {
							helpers.signInVars.storeAddress.click();
						})
						.then(function () {
							helpers.signInVars.storeNotListed.click();
						})
						.then(function () {
							expect(helpers.signInVars.saveAndVerifyButton.getCssValue('background-color')).toBe('rgba(3, 155, 229, 1)');
						});
				});
		};


		var checkInvalidWhenRetailerCleared = function () {
			helpers.signInVars.retailerField.clear()
				.then(function () {
					expect(helpers.signInVars.saveAndVerifyButton.getCssValue('background-color')).toBe('rgba(184, 184, 184, 1)');
				});
		};

		// Checks various sign up fields for warnings messages and disabled buttons states.
		var checkValidation = function () {
			sBrowser.wait(function () {
				console.log('Waiting for First Register page to load.');
				// return sBrowser.isElementPresent(by.id('page-register')).then(function (el) {
				return helpers.signInVars.firstNameField.isDisplayed().then(function (el) {
					return el === true;
				});
			}, 8000)
				.then(function () {
					helpers.signInVars.firstNameField.click()
						.then(function () {
							checkFirstNameError();
						})
						.then(function () {
							checkFirstNameMin();
						})
						.then(function () {
							helpers.signInVars.firstNameField.clear();
							helpers.signInVars.firstNameField.sendKeys('FirstNameFieldIsNowGood')
						})
						.then(function () {
							checkLastNameError();
						})
						.then(function () {
							checkLastNameMax();
						})
						.then(function () {
							checkNextButtonValid();
						})
						.then(function () {
							helpers.signInVars.nextButton.click();
						});
					sBrowser.wait(function () {
						console.log('Waiting for Second Register page to load.');
						return sBrowser.findElement(by.id('company-form')).isDisplayed().then(function (el) {
							return el === true;
						});
					}, 8000)
						.then(function () {
							checkSaveButtonValid();
						})
						.then(function () {
							checkInvalidWhenRetailerCleared();
						})
				});
		};

		var loginWithNotSignedUp = function () {
			sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
				googleOauth.LoginToGoogle(loginInfo.userAccounts.notSignedUpEmail, loginInfo.userAccounts.notSignedUpPass);
				checkValidation();
			});
		};


		// Starting test Here.
		browser.driver.wait(function () {
			console.log('Waiting for sign up button to appear');
			return sBrowser.isElementPresent(by.id('page-welcome')).then(function (el) {
				return el === true;
			});

		}, 5100)
			.then(function () {
				element(by.partialLinkText('SIGN UP')).click().then(function () {
					loginWithNotSignedUp();
				});
			});



	});

	it('should allow a user to sign up for the site', function () {

		// Trying to clear in Safari, has some issues timing up clears in new window.
		var currentURL,
			googleOauth = require('./googleOauth.js'),
			loginInfo = require('./loginInfo.js'),
			sBrowser = browser.driver; // Just shortening what I have to write when not on an Angular page.

		var checkHomepageLoaded = function () {
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
		};

		// Fills out 2nd page of registration.
		var register2ndPage = function () {
			sBrowser.wait(function () {
				console.log('Waiting for Register page #2 to load.');
				return sBrowser.findElement(by.id('company-form')).isDisplayed().then(function (el) {
					return el === true;
				});
			}, 8000)
				.then(function () {
					console.log('2nd Page loaded!');
					helpers.signInVars.jobTitleSelector.click()
						.then(function () {
							helpers.signInVars.job.click();
						})
						.then(function () {
							helpers.signInVars.retailerField.sendKeys('Beyond');
						})
						.then(function () {
							helpers.signInVars.zipCityState.sendKeys('94103');
						})
						.then(function () {
							browser.wait(function () {
								console.log('Waiting for Store Selector.');
								return browser.isElementPresent(helpers.signInVars.storeAddress).then(function (el) {
									return el === true;
								});
							}, 8000)
								.then(function () {
									helpers.signInVars.storeAddress.click();
								})
								.then(function () {
									helpers.signInVars.storeNotListed.click();
								})
								.then(function () {
									helpers.signInVars.saveAndVerifyButton.click();
								})
								.then(function () {
									console.log('Triggering Homepage checker,');
									checkHomepageLoaded();
								});
						});
				});
		};

		// Fills out 1st page of registration.
		var register1stPage = function () {
			browser.wait(function () {
				console.log('Waiting for Register page #1 to load.');
				return sBrowser.isElementPresent(by.id('personal-form')).then(function (el) {
					return el === true;
				});
			}, 8000)
				.then(function () {
					console.log('1st Page is loaded!');
					browser.sleep(1000)
						.then(function () {
							helpers.signInVars.firstNameField.clear();
						})
						.then(function () {
							helpers.signInVars.firstNameField.sendKeys('Protractor');
						})
						.then(function () {
							helpers.signInVars.lastNameField.clear();
							helpers.signInVars.lastNameField.sendKeys('Automated Test');
						})
						.then(function () {
							helpers.signInVars.termsCheckbox.click();
						}).then(function () {
							helpers.signInVars.nextButton.click();
						}).then(function () {
							register2ndPage();
						});
				});
		};

		var loginWithNotSignedUp = function () {
			sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
				googleOauth.LoginToGoogle(loginInfo.userAccounts.notSignedUpEmail, loginInfo.userAccounts.notSignedUpPass);
				register1stPage();
			});
		};


		// Starting test Here.
		browser.driver.wait(function () {
			console.log('Waiting for sign up button to appear');
			return sBrowser.isElementPresent(by.id('page-welcome')).then(function (el) {
				return el === true;
			});

		}, 5100)
			.then(function () {
				element(by.partialLinkText('SIGN UP')).click().then(function () {
					loginWithNotSignedUp();
				});
			});
	});
});