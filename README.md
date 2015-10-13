# Jeff's Notes

Not for duplication or publication.

## Installation
After downloading be sure to run the following commands.

	sudo npm install
	bower install
	grunt build

##Running Locally
Use:

	grunt serve

---

### Running Tests
To run all tests:

	grunt test

#### Nightwatch
To run Nightwatch tests:

	grunt test:e2e

#### Jasmine
To run Jasmine Tests (to be written)

	grunt test:unit

#### PhantomCSS
To setup PhantomCSS test:
	grunt serve
	casperjs test test/phantomcss/specs/ --pre=./test/phantomcss/start.js --includes=./test/phantomcss/inc.js --post=./test/phantomcss/end.js  --ssl-protocol=any --ignore-ssl-errors=true --rebase

To Run PhatomCSS tests:
	grunt serve
	casperjs test test/phantomcss/specs/ --pre=./test/phantomcss/start.js --includes=./test/phantomcss/inc.js --post=./test/phantomcss/end.js  --ssl-protocol=any --ignore-ssl-errors=true

*Note it keeps trying to get you to run it with --web-security=no --version, but that seems to be stopping it from running, also it says it isn't running tests because the end file has nbo tests. That isn't for all tests.*