# End-to-End

## Introduction

Test written using [Behave Framework](http://pythonhosted.org/behave/) and [Hamcrest Assertions](https://github.com/hamcrest/PyHamcrest)

## Install
*(if you didn't use main setup.sh script)*
Create a virtualenv if not already.
```
virtualenv -p python3 env
```
Install dependencies to virtualenv.
```
source env/bin/activate
pip3 install -U -r test-requirements.txt
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.17.0/geckodriver-v0.17.0-macos.tar.gz | tar xz -C env/bin
. test/chromedriver.sh
```

#### Safari setup
To test in Safari you must turn on automation in the dev menu, (Develop > Allow Remote Automation) and directly run webdriver once to authorize permissions (In Terminal: /usr/bin/safaridriver -p 8000).

## Running Tests
Be sure to source virtualenv (```source env/bin/activate```) before running tests.

#### Run all tests.

```
behave test/behave/features
```

#### Changing domain or browser
The Driver default, base url, and other variables are being defaulted in the qa/settings.py but can be overwritten on the command line.
```
DRIVER='chrome' BASE_URL='http://google.com' behave test/behave/features
```


Currently there's a bug in selenium that causes an error on remote chrome standalone. If you need to run the remote docker selenium standalone image do it on the 3.4 tag.
```
docker run -p 4444:4444 selenium/standalone-chrome:3.4
```



#### Notes
* To stop getting Python Permission prompts on Chromedriver launch follow these [instructions](http://bd808.com/blog/2013/10/21/creating-a-self-signed-code-certificate-for-xcode/) to create a certificate. Run `. env/bin/activate` once and then stop it to get in the virtual env. It should now say `(env)` on Terminal command line, then run this command, replacing *NAME* with the name of the certificate you created.
```
codesign -s NAME -f `which python`
```
