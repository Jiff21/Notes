// Globals and Excludes for jsHint.
/* global browser */
/* exported browser */

'use strict';

exports.command = function (element, waitTime) {

	if (waitTime === undefined) {
		waitTime = 10000;
	}

	this
		.waitForElementVisible(element, waitTime, false)
		.click(element);

	return this;
};