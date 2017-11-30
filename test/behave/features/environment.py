# -*- coding: UTF-8 -*-
'''
before_step(context, step), after_step(context, step)
    These run before and after every step.
    The step passed in is an instance of Step.

before_scenario(context, scenario), after_scenario(context, scenario)
    These run before and after each scenario is run.
    The scenario passed in is an instance of Scenario.

before_feature(context, feature), after_feature(context, feature)
    These run before and after each feature file is exercised.
    The feature passed in is an instance of Feature.
before_tag(context, tag), after_tag(context, tag)
'''

import os
import logging
from behave import *
from test.settings import BASE_URL
from test.settings import ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME
from test.settings import EDITOR_EMAIL, EDITOR_PASSWORD, EDITOR_NAME
from test.settings import USER_EMAIL, USER_PASSWORD, USER_NAME
from test.behave.features.browser import Browser

logging.basicConfig()

ACCOUNTS = {
    'admin': {
        'email': ADMIN_EMAIL,
        'password': ADMIN_PASSWORD,
        'name': ADMIN_NAME
    },
    'editor': {
        'email': EDITOR_EMAIL,
        'password': EDITOR_PASSWORD,
        'name': EDITOR_NAME
    },
    'user': {
        'email': USER_EMAIL,
        'password': USER_PASSWORD,
        'name': USER_NAME
    }
}

def get_jira_number_from_tags(context):
    for tag in context.tags:
        if 'KEY-' in tag:
            return tag

# def before_all(context):

# def after_all(context):

# def before_feature(context, feature):
#
# def after_feature(context, feature):
#


def before_scenario(context, scenario):
    if 'browser' in context.tags:
        context.browser = Browser()
        context.driver = context.browser.get_browser_driver()
    if 'skip' in context.tags:
        jira_number = get_jira_number_from_tags(context)
        scenario.skip("\n\tSkipping tests until %s is fixed" % jira_number)
        return

def after_scenario(context, scenario):
    if 'browser' in context.tags:
        context.driver.quit()
