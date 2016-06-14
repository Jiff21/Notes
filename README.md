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

##### Nightwatch
To run Nightwatch tests

	grunt serve
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

##### Flow
To Install Flow. 

	npm install --save-dev flow-bin -g

To run flow either do:

	flow check

Or start a Flow Server to check as you edit.

	flow


---

##### Python Selenium

Install Selenium [Standalone](https://www.npmjs.com/package/selenium-standalone)

	pip install selenium-standalone

###### Setting Up Hub
Before running tests, start a selenium-standalone server. with this command:

	selenium-standalone start

Or if you plan on testing many browsers. Start a selenium hub:

	selenium-standalone start -- -role hub

Add as many nodes as needed. e.g.:

	selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5556
	selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5557

You can also specify how many sessions can be going on the node at the same time or how many instances of each browser you'll allow to run at one time on the node. (some additional work may be necessary for safari* or IE**)

	selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5556 -maxSessions 31 -browser browserName=firefox,javascriptEnabled=true,maxInstances=10,platform=ANY -browser browserName=chrome,javascriptEnabled=true,maxInstances=10,platform=ANY -browser browserName=safari,javascriptEnabled=true,maxInstances=10,platform=ANY

Then if you go to [http://localhost:4444/grid/console](http://localhost:4444/grid/console) address you should see register machines.

###### Running Tests

To run all tests cd into the project folder. Then run the following command.

	grunt test:pyfull

To run individual tests you can simply run

	python python-selenium-tests/test_name_test.py

You can also run a suite of tests by importing them into a file. See full_runner.py or smoke_suite.py for how the tests are imported. Or run a set of commands with something like this.

	grunt: test:pysmoke

With this setup, remember to configure the full_runner and suites by editing the imports as you add tests.


Registering a Node from a Virtualbox can be accoplished with the following command. But first you need to install Node, Python, Java on the virtualbox. Then also run 'npm install selenium-standalone@latest -g' & 'selenium-standalone install' in command prompt. (currently this registers the node but getting a timeout trying to run tests against it)

	selenium-standalone start -- -role node -hub http://[YOUR COMPUTERS IP ADDRESS]:4444/grid/register -port 5557 -maxSessions 6 -browser browserName="internet explorer",javascriptEnabled=true,maxInstances=3,version=9,platform=ANY


Notes: 

* Useful documentation can be found [here](http://selenium-python.readthedocs.io/) and [here](http://www.seleniumhq.org/docs/).

* Remember to get webdriver to work in Safari you must install [safari driver extension](http://selenium-release.storage.googleapis.com/index.html?path=2.48/). At the link find SafariDriver.safariextz once downloaded drag it into extensions found in Safari Preferences.

* I did like nosetests a little better for the --process but had to work around [this](http://apple.stackexchange.com/questions/209572/how-to-use-pip-after-the-os-x-el-capitan-upgrade) by installing python somewhere else. But then that seemed to break NPM after an upgrade. Using pyTest or manual runner for now.