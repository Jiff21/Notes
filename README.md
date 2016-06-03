# Jeff's Notes

Not for duplication or publication.

## Installation
After downloading be sure to run the following commands.

	sudo npm install
	bower install
	grunt build

---

## Running Locally
Use:

	grunt serve

---

## Running Tests
To run all tests:

	grunt test

##### Nightwatch
To run Nightwatch tests

	grunt test:e2e

##### Jasmine
To run Jasmine Tests (to be written)

	grunt test:unit

##### PhantomCSS
To setup PhantomCSS test

	grunt serve
	casperjs test test/phantomcss/specs/ --pre=./test/phantomcss/start.js --includes=./test/phantomcss/inc.js --post=./test/phantomcss/end.js  --ssl-protocol=any --ignore-ssl-errors=true --rebase


To Run PhatomCSS tests:

	grunt serve
	casperjs test test/phantomcss/specs/ --pre=./test/phantomcss/start.js --includes=./test/phantomcss/inc.js --post=./test/phantomcss/end.js  --ssl-protocol=any --ignore-ssl-errors=true


*PhantomCSS Notes: it keeps trying to get you to run it with --web-security=no --version, but that breaks it on OSX 10.10.5. Also, ignore the warning about not running tests. On Rebase no tests are run intentionally. On run command it must be referring to end.js or start.js file as you can see tests running and producing results.


#### Webdriverio

If you haven't already install selenium-standalone & mocha.

	sudo npm install selenium-standalone -g
	sudo npm install mocha -g

Start a Selenium Server. Run the following commands in two terminal tabs.

	selenium-standalone start -- -role hub
	selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5556 -maxSessions 31 -browser browserName=firefox,javascriptEnabled=true,maxInstances=10,platform=ANY -browser browserName=chrome,javascriptEnabled=true,maxInstances=10,platform=ANY -browser browserName=safari,javascriptEnabled=true,maxInstances=10,platform=ANY


You can also register a Virtualbox with.

	selenium-standalone start -- -role node -hub http://[YOUR COMPUTERS IP ADDRESS]:4444/grid/register -port 5557 -maxSessions 6 -browser browserName="internet explorer",javascriptEnabled=true,maxInstances=3,version=9,platform=ANY

Then to run all tests.

	./node_modules/.bin/wdio wdio.conf.js

Or you can run a suite of tests defined in wdio.conf.js like so.

	./node_modules/.bin/wdio wdio.conf.js --suite edge


##### Flow
To Install Flow. 

	npm install --save-dev flow-bin -g

To run flow either do:

	flow check

Or start a Flow Server to check as you edit.

	flow


