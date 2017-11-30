import os

BASE_URL = os.getenv('BASE_URL', 'http://0.0.0.0:9000/')
DRIVER = os.getenv('DRIVER', 'chrome')
DRIVER = DRIVER.lower().replace(' ', '_').replace('-', '_')
LIGHTHOUSE_IMAGE = os.getenv('LIGHTHOUSE_IMAGE', 'http://localhost:8085')
SELENIUM = os.getenv('SELENIUM', 'http://localhost:4444/wd/hub')
SL_DC = os.getenv(
    'SL_DC',
    '{"platform": "Mac OS X 10.9", "browserName": "chrome", "version": "31"}'
)
PAGES_DICT = {
    'index': '/',
    'html page':'/Views/html.html',
    'javascript page':'/Views/javascript.html',
    'css page':'/Views/css.html',
    'sass and less page':'/Views/sass.html',
    'python page':'/Views/python.html',
    'node page':'/Views/nodejs.html',
    'php page':'/Views/php.html',
    'mysql page':'/Views/mysql.html',
    'jasmine page':'/Views/jasmine.html',
    'selenium page':'/Views/selenium.html',
    'protractor page':'/Views/protractor.html',
    'webdrivercss page':'/Views/webdrivercss.html',
    'nightwatch page':'/Views/nightwatch.html',
    'owasp page':'/Views/owasp.html',
    'sqlmap page':'/Views/sqlmap.html',
    'burpsuite page':'/Views/burpsuite.html',
    'beef page':'/Views/beef.html',
    'static page':'/Views/staticcodeanalysis.html',
    'git page':'/Views/git.html',
    'nightwatch page':'/Views/nightwatch.html',
    'ard page':'/Views/ard.html',
    'terminal page':'/Views/terminal.html',
    'sublime page':'/Views/sublime.html',
    'adb page':'/Views/adb.html'
}
QA_FOLDER_PATH = os.getenv('QA_FOLDER_PATH', 'qa/')
DRIVER = os.getenv('DRIVER', 'chrome')
# Admin Email and password for CMS Testing
ADMIN_URL_DICT = {
    'https://example.com': 'https://example.com/admin-uri',
    'https://www.testing.appspot.com': 'https://www.testing.appspot.com/admin-uri',
    'https://www.dev.appspot.com': 'https://www.dev.appspot.com/admin-uri',
    'https://www.staging.appspot.com': 'https://ewww.staging.appspot.com/admin-uri'
}
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'fakeUser1@gmail.com')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'fakepassword')
ADMIN_NAME = os.getenv('ADMIN_NAME', 'Al\' Admin')

EDITOR_EMAIL = os.getenv('EDITOR_EMAIL', 'fakeUser2@gmail.com')
EDITOR_PASSWORD = os.getenv('EDITOR_PASSWORD', 'fakepassword')
EDITOR_NAME = os.getenv('EDITOR_NAME', 'Eddie Editor')

USER_EMAIL = os.getenv('USER_EMAIL', 'fakeUser3@gmail.com')
USER_PASSWORD = os.getenv('USER_PASSWORD', 'fakepassword')
USER_NAME = os.getenv('USER_NAME', 'Vinny Testaverde')

RECOVERY_EMAIL = os.getenv('RECOVERY_EMAIL', 'another_fake_email@gmail.com')
RECOVERY_CITY = os.getenv('RECOVERY_CITY', 'New New York')
RECOVERY_PHONE = os.getenv('RECOVERY_PHONE', '555-555-5555')

ZAP_ADDRESS = os.getenv('ZAP_ADDRESS', 'http://localhost:8080')
ZAP_API_KEY = os.getenv('ZAP_API_KEY', '0123456789')

EYES_API_KEY = os.getenv('EYES_API_KEY', '0123456789')

# Google
CLIENT_ID = os.getenv(
    'CLIENT_ID', '012345678901-am29widj4kW0l57Kaqmsh3ncjskepsk2.apps.googleusercontent.co')
GOOGLE_APPLICATION_CREDENTIALS = os.getenv(
    'GOOGLE_APPLICATION_CREDENTIALS', '/path/to/json/web/token.json')
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY', '0123456789')
