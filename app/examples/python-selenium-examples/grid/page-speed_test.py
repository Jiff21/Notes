import requests
import json
import unittest
from globes import *

api_key = '' # Add API key. Found here: https://console.developers.google.com/apis/credentials/key/
base = 'http://example.com'
locale_code = 'en_US'
url_array = ['/', '/about/', '/contact/', '/faq/']

def get_insights_json(self, base_url, page_url, local, device_type, api_key, speed_or_useability, expected_score):
	url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + base_url + page_url + '&filter_third_party_resources=true&locale=' + local + '&screenshot=false&strategy=' + device_type + '&key=' + api_key
	# print "Getting :: " + url
	r = requests.get(url)
	# print 'GET for ', str(url), ' ::: Returned with a: ' , str(r.status_code)
	return_code = r.status_code
	# print 'GET for ', str(page_url), ' ::: Returned with the text: \n' , str(r.text)
	try: self.assertEqual(return_code, 200)
	except AssertionError, e: self.verificationErrors.append(base_url + str(page_url) + " did not return 200")
	return_text = r.text
	return_json = json.loads(return_text)
	score = return_json['ruleGroups'][speed_or_useability]['score']
	print 'Getting ' + speed_or_useability + ' for ' + base_url + page_url + ' and got a score of ' + str(score)
	try: self.assertTrue(int(score) >= expected_score)
	except AssertionError, e: self.verificationErrors.append(base_url + str(page_url) + ' expected ' + device_type + ' speed score to be greater than ' + expected_score + ', instead got ' + str(score) )

class TestAllAPIs(unittest.TestCase):

	def setUp(self):
		self.verificationErrors = []
		self.maxDiff = None

	def tearDown(self):
		self.assertEqual([], self.verificationErrors)

	def test_single_page_example(self):
		current_page = ''
		device_type = 'mobile'
		target = 'USABILITY'
		get_insights_json(self, base, current_page, locale_code, device_type, api_key, target, 80)

	def test_all_desktop_speed(self):
		## Get all links in nav.
		device_type = 'desktop'
		target = 'SPEED'
		for current_page in url_array:
			get_insights_json(self, base, current_page, locale_code, device_type, api_key, target, 80)

	def test_all_mobile_speed(self):
		## Get all links in nav.
		device_type = 'mobile'
		target = 'SPEED'
		for current_page in url_array:
			get_insights_json(self, base, current_page, locale_code, device_type, api_key, target, 80)

	def test_all_mobile_useability(self):
		device_type = 'mobile'
		target = 'USABILITY'
		for current_page in url_array:
			get_insights_json(self, base, current_page, locale_code, device_type, api_key, target, 95)

if __name__ == "__main__":
	unittest.main()

