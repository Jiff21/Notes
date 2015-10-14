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

___


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