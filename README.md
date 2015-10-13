# Jeff's Notes

Not for duplication or publication.

## Installation
After downloading be sure to run the following commands.

	sudo npm install
	bower install
	grunt build

## Running Locally
Use:

	grunt serve

## Running Tests
To run all tests:

	grunt test

To run Nightwatch tests:

	grunt test:e2e

To run Jasmine Tests (to be written)

	grunt test:unit

To setup PhantomCSS test:
casperjs test test/phantomcss/specs/ --pre=./test/phantomcss/start.js --includes=./test/phantomcss/inc.js --post=./test/phantomcss/end.js  --ssl-protocol=any --ignore-ssl-errors=true --rebase

To Run PhatomCSS tests:
casperjs test test/phantomcss/specs/ --pre=./test/phantomcss/start.js --includes=./test/phantomcss/inc.js --post=./test/phantomcss/end.js  --ssl-protocol=any --ignore-ssl-errors=true --web-security=no --version