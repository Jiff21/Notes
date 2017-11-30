'''Feature: My notes should follow best practices

  Scenario: There should be no errors returned when I run html validation
    Given html exists in expect file
    When I run the validator
    Then no validator errors should exist'''

import glob
import pprint
import subprocess
import time
from behave import given, when, then
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

# Locator Map
HEADER_PATH = (By.CSS_SELECTOR, 'section.section.blog > h2.section-title')


@step('html exists in expect file')
def step_impl(context):
    context.html_location = 'app/Views/'
    context.html_count = len(glob.glob1(context.html_location,"*.html"))
    assert context.html_count != 0, 'No html files found at %s' % context.html_location
    print('Checking %i html files for validation errors.' % context.html_count)

@step('I run the validator')
def step_impl(context):
    context.process = subprocess.run(
        'html5validator --root app/Views/',
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True
    )

@then('no validator errors should exist')
def step_impl(context):
    try:
        assert context.process.returncode == 0
    except:
        print('Got the following errors:\n%s' % context.process.stderr)
        raise
