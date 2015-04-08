'use strict';

module.exports = {
	'You should be able to navigate to the Sass & Less page': function(browser) {
		browser
			.url('http://localhost:9000')
			.waitForElementVisible('body.home-body', 3000)
			.click('xpath', '/html/body/div[2]/div[2]/div/div[5]/a/h6[text()="SASS & LESS"]')
			.waitForElementVisible('body.sass-body', 1000)
			.click('xpath', '/html/body/div[2]/article/div/div[1]/button[2]').pause(1000)
			.assert.containsText('h3#lassy', 'LESS')
			.assert.hidden('h3#sassy')
			.click('xpath', '/html/body/div[2]/article/div/div[1]/button[1]').pause(1000)
			.assert.containsText('h3#sassy', 'SASS')
			.assert.hidden('h3#lassy')			
			.end();
	}
};
