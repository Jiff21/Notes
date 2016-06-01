#!/usr/bin/env python

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import time

# Returns abs path relative to this file and not cwd
PATH = lambda p: os.path.abspath(
	os.path.join(os.path.dirname(__file__), p)
)


def get_desired_capabilities(app):
	desired_caps = {}

	desired_caps['platformName'] = 'Android'
	desired_caps['platformVersion'] = '6.0.1'
	desired_caps['deviceName'] = 'ZX1G22N7M5'
	desired_caps['app'] = PATH('../app/build/outputs/apk/' + app)
	desired_caps['app-package'] = 'com.google.android.apps.trainup'

	return desired_caps


def explicitly_wait_for(new_xpath, new_wait):
	print "Explicitily waiting for " , new_xpath
	wait_time = new_wait
	return WebDriverWait(wd, wait_time).until(expected_conditions.presence_of_element_located(wd.find_element_by_xpath(new_xpath)))
