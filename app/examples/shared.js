/**
 */
var Helpers = function () {
	var me = this,
		sBrowser = browser.driver; // Needed for all Oauth that is outside of angular app.

	// Keep our protractor reference
	beforeEach(function () {
		// console.log('HELPERS ::::: beforeEach');
		ptor = protractor.getInstance();
	});

	afterEach(function () {

	});


	this.get = function (route) {
		// console.log('Helpers.get() ');
		route = route || '';
		browser.get('#/' + route);
	};

	this.title = function () {
		// console.log('Helpers.title() ');
		return browser.getTitle();
	};

	this.deleteUserData = function () {
		browser.driver.manage().deleteCookie('sessionid');
		browser.driver.manage().deleteCookie('loggedinbefore');
		browser.driver.manage().deleteCookie('userid');
		browser.driver.manage().deleteCookie('sessionid');
	};

	this.signInVars = {
		firstNameField: element(by.model('user.first_name')),
		lastNameField: element(by.model('user.last_name')),
		saveAndVerifyButton: $('.mod-cta-bar'),
		firstNameError: element(by.cssContainingText('.error', 'Your first name is required')),
		lastNameError: element(by.cssContainingText('.error', 'Your last name is required')),
		firstNameErrorShort: element.all(by.cssContainingText('.error', 'Your name must be more than 3 characters')).get(0),
		lastNameErrorShort: element.all(by.cssContainingText('.error', 'Your name must be more than 3 characters')).get(1),
		// firstNameErrorLong: element.all(by.cssContainingText('.error', 'Your name must be less than 20 characters')).get(0),
		// lastNameErrorLong: element.all(by.cssContainingText('.error', 'Your name must be less than 20 characters')).get(1);		
	};

	// FIXME 
	this.userAccounts = {
		mainEmail: '',
		mainPass: '',
		notSignedUpEmail: '',
		notSignedUpPass: '',
		trainingEmail: '',
		trainingPass: '',
		domain: '@gmail.com',
		accessCode;
		'#######',
	};

	/**
	 * Helper function that checks if modules are present.
	 * By Default this uses by.CSS() to find the module, but there's a good chance you will need to
	 * be more specific. To grab a module with by.cssContainingText('cssToGet','text'), set
	 * selectorType to 'CSSANDTEXT'. If you would like to find the module with by.id. Put the module id
	 * in the cssToGet field and change selector type to 'ID'.
	 **/
	this.moduleChecker = function (mods) {
		var i = 0,
			checkingModule,
			checkMod,
			mod;

		for (i; i < mods.length; i++) {
			// Feeding it objects 1 by 1 with self invoking function to force timing.
			mod = mods[i];

			(function (mod) {

				// Switch for grabbing by id.
				if (mod.selectorType === 'ID') {

					// Grabbing the module based on object css and forcing 1 by 1 test of expectations with self invoking function. 
					var checkingModule = element(by.id(mod.cssToGet));
					(function (checkMod) {
						checkMod.isPresent().then(function (val) {
							// console.log(val);
							expect(val).toBeTruthy();
						});

						// Ending IF Statement SIF.
					})(checkingModule);

					// Else grab by css containing text.
				} else if (mod.selectorType === 'CSSANDTEXT') {

					// Grabbing the module based on object css & Text and forcing 1 by 1 test of expectations with SIF.
					var checkingModule = element(by.cssContainingText(mod.cssToGet, mod.text));

					(function (checkMod) {
						checkMod.getText().then(function (text) {
							console.log('Is ' + text + ' present?')
						});
						checkMod.isPresent().then(function (val) {
							console.log(val);
							expect(val).toBeTruthy();
						});

						// Ending ELSE Statement SIF.
					})(checkingModule);

				} else if (mod.selectorType === 'NAME') {

					// Grabbing the module based on object link containing text and forcing 1 by 1 test of expectations with SIF.
					var checkingModule = element(by.name(mod.text));

					(function (checkMod) {
						checkMod.getText().then(function (text) {
							console.log('Is ' + text + ' present?')
						});
						checkMod.isPresent().then(function (val) {
							// console.log(val);
							expect(val).toBeTruthy();
						});

						// Ending ELSE Statement SIF.
					})(checkingModule);

				} else if (mod.selectorType === 'CLASS') {

					// Grabbing the module based on object link containing text and forcing 1 by 1 test of expectations with SIF.
					var checkingModule = element(by.className(mod.text));

					(function (checkMod) {
						checkMod.getText().then(function (text) {
							console.log('Is ' + text + ' present?')
						});
						checkMod.isPresent().then(function (val) {
							// console.log(val);
							expect(val).toBeTruthy();
						});

						// Ending ELSE Statement SIF.
					})(checkingModule);

				} else if (mod.selectorType === 'IMAGE') {
					// Grabbing the module based on object css only.
					var checkingModule = mod.cssToGet;

					(function (checkMod) {
						imageUrl = checkMod.getAttribute('src');
						browser.getCurrentUrl().then(function (url) {
							currentURL = browser.baseUrl;
							expectedURL = currentURL + mod.text;
							// console.log('This is the source were grabbing ' + imageUrl);
							expect(imageUrl).toBe(expectedURL);
						});

						// Ending ELSE Statement SIF.
					})(checkingModule);
				} else {

					// Grabbing the module based on object css only.
					var checkingModule = $(mod.cssToGet);

					(function (checkMod) {
						checkMod.getText().then(function (text) {
							console.log('Is ' + text + ' present?')
						});
						checkMod.isPresent().then(function (val) {
							// console.log(val);
							expect(val).toBeTruthy();
						});

						// Ending ELSE Statement SIF.
					})(checkingModule);
				};

				// Ending 1st SIF.
			})(mod);
		};
	};


	/**
	 * The first variable is the element
	 * it will wait for to be present. The second variable will default to
	 * browser.isElementPresent(by.css(element)), but can be change to
	 * browser.isElementPresent(by.ID(element)) or browser.isElementPresent(by.className(element)),
	 * by setting the variable to 'ID' or 'CLASSNAME', respectively.  You can wait for CSS not to be
	 * visible by setting it to 'CLASSNOTVISIBLE'. 3rd variable is timeout time.
	 * 4th and 5th are console log messages that should be self explanatory. The last is the function
	 * to run after the 1st variable is present.
	 **/

	this.superWait = function (element, selectorType, waitTime, waitMessage, successMessage, thenFunction) {

		if (selectorType === 'ID') {

			browser.wait(function () {
				// Message to console log while waiting for element to appear.
				console.log(waitMessage, ' with a timeout of', waitTime, 'ms...');

				// Checking elements presence by id in this instance.
				return browser.isElementPresent(by.id(element)).then(function (el) {
					return el === true;
				});
			}, waitTime)
				.then(function () {

					// Console log out a success message.
					console.log(successMessage);

					// Then run this function.
					thenFunction();
				});

		} else if (selectorType === 'CLASSNAME') {

			browser.wait(function () {

				// Message to console log while waiting for element to appear.
				console.log(waitMessage, ' with a timeout of ', waitTime, 'ms...');

				// Checking elements presence by class in this instance.
				return browser.isElementPresent(by.className(element)).then(function (el) {
					return el === true;
				});
			}, waitTime)
				.then(function () {

					// Console log out a success message.
					console.log(successMessage);

					// Then run this function.
					thenFunction();
				});

		} else if (selectorType === 'CLASSNOTVISIBLE') {

			browser.wait(function () {

				// Message to console log while waiting for element to appear.
				console.log(waitMessage, ' with a timeout of ', waitTime, 'ms...');

				// Checking elements presence by class in this instance.
				return browser.isElementPresent(by.className(element)).then(function (el) {
					return el === false;
				});
			}, waitTime)
				.then(function () {

					// Console log out a success message.
					console.log(successMessage);

					// Then run this function.
					thenFunction();
				});

		} else {

			browser.wait(function () {
				// Message to console log while waiting for element to appear.
				console.log(waitMessage, ' with a timeout of ', waitTime, 'ms...');

				// Checking elements presence by css in this instance.
				return browser.isElementPresent(by.css(element)).then(function (el) {
					return el === true;
				});
			}, waitTime)
				.then(function () {

					// Console log out a success message.
					console.log(successMessage);

					// Then run this function.
					thenFunction();
				});
		};

	};


	// Logs into CMS and deletes user from last test.  Need to add User back once Add User button is working again.
	this.eraseAccount = function (user, domain) {
		var lAccount = 'account-' + user + domain,
			lUser = user + domain;
		sBrowser.get("https://testing-dot-go-training.appspot.com/ta_admin/user_manager/customuser/");
		var correctAccount = sBrowser.findElement(by.id(lAccount))
			.findElement(by.tagName('button'));
		console.log('Selecting correct account.');
		correctAccount.click();
		sBrowser.findElement(By.partialLinkText('Users')).click();
		sBrowser.findElement(By.partialLinkText('Show all')).click();
		sBrowser.findElement(By.partialLinkText(lUser)).click();
		sBrowser.findElement(By.partialLinkText('Delete')).click();
		sBrowser.findElement(By.css('input[type="submit"]')).click();
	};


	// Helper function that logs into Google for Login form testing. Not being used in Login Flow test because that needs expectations.
	this.LoginToGoogle = function (user, password, domain) {
		console.log('Logging into google account with helper.')

		// Trying to clear in Safari, has some issues timing up clears in new window.
		browser.get('/welcome');

		var atWelcome,
			email,
			closebutton,
			correctAccount,
			currentURL,
			idField,
			idCheck,
			loginbutton,
			lAccount = 'account-' + user + domain,
			lPw = password,
			lUser = user + domain,
			pass,
			signInButton;

		// Helper function for when the Google OAuth has multiple accounts remembered in this browser. Can't use superWait as OAuth is outside of Angular.
		var multipleAccountsFlow = function () {
			sBrowser.wait(function () {
				console.log("This has a list of accounts to choose from. Waiting for Beyond QA Account.");
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
								console.log("Waiting for login button to appear (Muliple Accounts).");
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
						};
					});
				});
		};

		// Helper function for when the Google OAuth has no account appear to select in this browser.
		var noAccountsFlow = function () {
			// Waits for next page to load then fills out form and submits.
			sBrowser.wait(function () {
				console.log("Waiting for login button to appear (No Accounts).");
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
			console.log("Waiting for sign in button to appear");
			return sBrowser.isElementPresent(by.id('welcome')).then(function (el) {
				return el === true;
			});

		}, 5100)
			.then(function () {
				// sBrowser.findElement(by.id('retailer_code')).sendKeys(helpers.userAccounts.accessCode);
				// sBrowser.findElement(by.css('#page-welcome .hero form button')).click();
				// signInButton = $('.signin-button');

				signInButton = element(by.partialLinkText('SIGN'));

				// Fills out test login info and clicks sign in button. then waits for homepage to load.
				signInButton.click().then(function () {
					browser.sleep(2000);

					/// When Multiple Accounts are present on the browser.
					sBrowser.isElementPresent(by.id('accountchooser-card')).then(function (val) {
						if (val === true) {
							// 1st Helper function defined above.
							multipleAccountsFlow(lUser, lPw, lAccount);
						} else {
							sBrowser.isElementPresent(by.id('page-home')).then(function (val2) {
								if (val2 === true) {
									console.log('Prieviously Logged in.');
								} else {
									// 2nd Helper function defined above.
									noAccountsFlow(lUser, lPw);
								}
							});
						};
					});
				});
			});

		sBrowser.wait(function () {
			console.log("Waiting for Homepage to load.");
			return sBrowser.isElementPresent(by.id('page-home')).then(function (el) {
				return el === true;
			});

			// Needs crazy long timeout in-case there is no local storage yet.
		}, 15000)
			.then(function () {
				console.log("Homepage Loaded!");
				closebutton = element(by.cssContainingText('a', 'OK GOT IT'));
				closebutton.click();
			});
	};


	/**
	 * The first  two variables are the text that appear on the tabs themselves.
	 * After that you need to find something unique to each tabs content for a find element
	 * by.cssContainingText for tab 1 & tab 2, respectively. (e.g var 3 = text for unique content
	 * in Tab 1 , var 4 = css to grab to narrow down var 3's text, etc.)
	 **/
	this.tabChecker = function (tab1Name, tab2Name, tab1ContentText, tab1ContentCss, tab2ContentText, tab2ContentCss) {
		var tab1 = element(by.cssContainingText('li.ng-scope', tab1Name)),
			tab2 = element(by.cssContainingText('li.ng-scope', tab2Name)),
			tab1Content = element(by.cssContainingText(tab1ContentCss, tab1ContentText)),
			tab2Content = element(by.cssContainingText(tab2ContentCss, tab2ContentText));

		// Checking 1st tab is defaulted open and 2nd tab content is hidden.
		tab1Content.isDisplayed().then(function (val) {
			expect(val).toBeTruthy();
		});
		tab2Content.isDisplayed().then(function (val) {
			expect(val).toBeFalsy();
		});

		// Clicking 2nd tab and checking that its content is now visible and 1st tab content is not.
		tab2.click()
			.then(function () {
				tab2Content.isDisplayed().then(function (val) {
					expect(val).toBeTruthy();
				});
				tab1Content.isDisplayed().then(function (val) {
					expect(val).toBeFalsy();
				});
			})
			.then(function () {
				tab1.click().then(function () {
					// Clicked back to 1st tab and made sure content switched back to default.
					tab1Content.isDisplayed().then(function (val) {
						expect(val).toBeTruthy();
					});
					tab2Content.isDisplayed().then(function (val) {
						expect(val).toBeFalsy();
					});
				});
			});
	};


	// Helper function for when the Google OAuth has multiple accounts remembered in this browser. Can't use superWait as OAuth is outside of Angular.
	this.gMultipleAccountsFlow = function (user, password, domain) {
		var lAccount = 'account-' + user + domain,
			lPw = password,
			lUser = user + domain;

		console.log('In Multiple accounts.');
		// Waits for next page to load then fills out form and submits.
		sBrowser.wait(function () {
			console.log('This has a list of accounts to choose from.');
			return sBrowser.isElementPresent(by.id('account-chooser-add-account')).then(function (el) {
				return el === true;
			});
		}, 6200)
			.then(function () {
				sBrowser.isElementPresent(by.id(lAccount)).then(function (addAcc) {
					if (addAcc === false) {
						console.log('Clicking add account.')
						sBrowser.findElement(by.id('account-chooser-add-account')).click();
						sBrowser.wait(function () {
							console.log("Waiting for login button to appear (No Accounts).");
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
					} else {
						console.log('iTest account already there.')
						sBrowser.wait(function () {
							console.log('Waiting for iTest QA Account.');
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
											console.log("Waiting for login button to appear (Muliple Accounts).");
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
									};
								});
							});
					};
				});
			});
	};


	// Helper function for when the Google OAuth has no account appear to select in this browser.
	this.gNoAccountsFlow = function (user, password, domain) {
		var lPw = password,
			lUser = user + domain;

		console.log('In no accounts.');
		// Waits for next page to load then fills out form and submits.
		sBrowser.wait(function () {
			console.log("Waiting for login button to appear (No Accounts).");
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


	// Not finished. Not sure if it's necessary.
	this.waitForOverlayAnimation = function () {
		var container = element(by.className('dialog-container'));
		container.getOuterHtml().then(function (html) {
			console.log(html);
		})
		// browser.wait(function(){
		// 	return browser.
		// })

	}


};

module.exports = new Helpers();