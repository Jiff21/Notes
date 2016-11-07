import unittest
import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from globes import *
## Test Specific.
from datetime import datetime
import pytz
from pytz import timezone
# For Calendar Filter
import dateutil.relativedelta as relativedelta


# Formatter for class tages.
fmt = '%Y-%m-%d'
# Setting utc time right now.
d = datetime.now()
tz = timezone('US/Pacific')
d_tz = tz.normalize(tz.localize(d))
utc = pytz.timezone('UTC')
d_utc = d_tz.astimezone(utc)

def set_curr_tz(curr_camp):
	if curr_camp == '/london/en':
		curr_tz = timezone('Europe/London')
	elif curr_camp == '/madrid/es' or curr_camp == '/madrid/en':
		curr_tz = timezone('Europe/Madrid')
	elif curr_camp =='/sao-paulo/pt' or curr_camp == '/sao-paulo/en':
		curr_tz = timezone('America/Sao_Paulo')
	elif curr_camp == '/seoul/ko' or curr_camp ==  '/seoul/en':
		curr_tz = timezone('Asia/Seoul')
	elif curr_camp == '/tel-aviv/en':
		curr_tz = timezone('Asia/Tel_Aviv')
	elif curr_camp == '/warsaw/en':
		curr_tz = timezone('Europe/Warsaw')
	else:
		print "unknown Campus"
	return curr_tz

def check_calendar_date_status_based_on_list(wd, s, hours_to_check, minute_to_check, url_to_check):
	# Setting Time Zone Based on URL.
	curr_tz = set_curr_tz(url_to_check)

	d = datetime.now()
	time_traveler = d.replace(hour=hours_to_check, minute=minute_to_check)
	tz = timezone('US/Pacific')
	d_tz = tz.normalize(tz.localize(time_traveler))
	utc = pytz.timezone('UTC')
	d_utc = d_tz.astimezone(utc)

	# Getting locale time for current campus.
	loc_time = d_utc.astimezone(curr_tz)
	curr_today = loc_time.strftime(fmt)
	# print "The date in " +  campus_url + " is " + curr_today

	# Getting ELement with class of today.
	today_date_class = "date-" + curr_today
	today_date_el = wd.find_element_by_class_name(today_date_class)
	today_date_get_class = today_date_el.get_attribute('class')
	# print "Getting element with class of "  + str(today_date_get_class) + " for " + campus_url

 	# Now need an if to see if date header appear in body to cross check with Calendar?
	list_xpath = '//*[@id="date-' + curr_today + '"]/div/h3'
	does_today_exist_in_list = wd.find_elements_by_xpath(list_xpath)
	# print 'I found ' + str(len(does_today_exist_in_list)) + ' ids for today in list'

	if len(does_today_exist_in_list) >= 1:
		try: s.assertNotRegexpMatches(today_date_get_class, 'disabled')
		except AssertionError, e: s.verificationErrors.append(str(time_traveler) + " is disabled on the events calendar for " 
			+ url_to_check + ' but I found ' + str(len(does_today_exist_in_list)) + ' list header with that date at ')
	else:
		print 'No events in scheduled in ' + url_to_check + ' on ' + curr_today



class Calendar_Test(unittest.TestCase):
	def setUp(self):
		self.maxDiff = 'None'
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []
		print('\n\ntest_today_not_disabled_on_calendar_now')

	def test_today_not_disabled_on_calendar_now(self):
		for driver in self.drivers:

			for campus_url in globes.campus_url_array:
				driver.get(globes.base_url + campus_url + '/events')
				print '\nOn New Campus: ' + campus_url + ' for test_today_not_disabled_on_calendar_now'

				# Setting utc time right now.
				d = datetime.now()
				minutes = d.minute
				hours = d.hour
				check_calendar_date_status_based_on_list(driver, self, hours, minutes, campus_url)


			# Single Locale Test.
			# campus_url = '/london/en'
			# driver.get(globes.base_url + campus_url +'/events')
			# d = datetime.now()
			# minutes = d.minute
			# hours = d.hour
			# check_calendar_date_status_based_on_list(driver, self, hours, minutes, campus_url)


	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



	def setUp(self):
		self.maxDiff = 'None'
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []
		print('\n\ntest_today_not_disabled_on_calendar_now')

	def test_today_not_disabled_on_calendar_now(self):
		for driver in self.drivers:

			for campus_url in globes.campus_url_array:
				driver.get(globes.base_url + campus_url + '/events')
				print '\nOn New Campus: ' + campus_url + ' for test_today_not_disabled_on_calendar_now'

				# Setting utc time right now.
				d = datetime.now()
				minutes = d.minute
				hours = d.hour
				check_calendar_date_status_based_on_list(driver, self, hours, minutes, campus_url)

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)





	def setUp(self):
		self.maxDiff = 'None'
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []
		print('\n\ntest_campus_programming_filter')

	def test_campus_programming_filter(self):
		for driver in self.drivers:

			tag_for_mentoring = '-tag-0'
			tag_for_startup = '-tag-1'
			tag_for_connect ='-tag-2'
			tag_for_presents ='-tag-3'
			tag_for_meetups ='-tag-4'

			def count_calendar_dots(tag_val):
				construct_select = '//td/div/div/span[contains(@class, "' + tag_val + '")]'
				count_of_dots = driver.find_elements_by_xpath(construct_select)
				return count_of_dots

			def find_selector(sel):
				if sel != '-tag-4':
					construct_select = 'ul.filter-types > li.' + sel + ' > div > label'
				else: 
					construct_select = 'div.events-filter._utility-wrapper.js-events-filter > ul.filter-types > li:nth-child(5) > div > label'
				current_filter_box = driver.find_element_by_css_selector(construct_select)
				return current_filter_box

			# # live?
			# 'div._time.js-event-time > span.icon.icon-type.'
			# # trusty
			# 'div._time > span.icon.icon-type.-tag-2'

			def find_event_in_list_by_type(tag_val):
				construct_select = 'div._time > span.icon.icon-type.' + tag_val
				a_elem_header = driver.find_element_by_css_selector(construct_select)
				return a_elem_header
				
			def check_a_tag(curr_tag):
				curr_dots = count_calendar_dots(curr_tag)
				if len(curr_dots) >= 1:
					check_to_click = find_selector(curr_tag)
					check_to_click.click()
					print '!!!!! Checking a tab. Should be checking ' + str(curr_tag) + ' for ' + campus_url
					time.sleep(5)

					curr_list_el = find_event_in_list_by_type(curr_tag)
					try: self.assertTrue(curr_list_el.is_displayed())
					except AssertionError, e: self.verificationErrors.append("Element not visible when it should be.")
					print 'Unlclicking filter!'
					check_to_click.click()
				else:
					print 'No dots for ' + curr_tag + ' on ' + campus_url

			def check_this_tag(tag_val):
				check_a_tag(tag_val)


			def check_existence_of_filter_box(tag_val):
				if tag_val != '-tag-4':
					construct_select = 'ul.filter-types > li.' + tag_val + ' > div > label'
				else: 
					construct_select = 'div.events-filter._utility-wrapper.js-events-filter > ul.filter-types > li:nth-child(5) > div > label'
				current_filter_box = driver.find_elements_by_css_selector(construct_select)
				print 'Looking for ' + str(tag_val) + ' found ' + str(len(driver.find_elements_by_css_selector(construct_select)))
				if len(driver.find_elements_by_css_selector(construct_select)) >= 1:
					check_this_tag(tag_val)
				else:
					print '!!Warn!! The ' + tag_val + ' filter checkbox is not present on ' + campus_url

			def check_for_tags():
				check_existence_of_filter_box(tag_for_mentoring)
				check_existence_of_filter_box(tag_for_startup)
				check_existence_of_filter_box(tag_for_connect)
				check_existence_of_filter_box(tag_for_presents)
				check_existence_of_filter_box(tag_for_meetups)

			def load_more_until_next_month(load_counter):
				print 'Load More max counter at ' + str(load_counter)
				wait = WebDriverWait(driver, 20)
				element = wait.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="events-list"]/div/button')))
				curr_tz = set_curr_tz(campus_url)
				loc_time = d_utc.astimezone(curr_tz)
				next_local_month = loc_time + relativedelta.relativedelta(months=+1)
				next_month = next_local_month.strftime('%Y-%m')

				load_more_button = driver.find_element_by_xpath('//*[@id="events-list"]/div/button')
				next_month_xpath = '//li[contains(@id, "' + next_month + '")]'
				print "Hitting Load more until " + str(next_month) + " appears"

				if len(driver.find_elements_by_xpath(next_month_xpath)) >= 1:
					print 'found next month'
					check_for_tags()
				else:
					load_more_button.click()
					load_counter += 1
					if load_counter <= 4:
						load_more_until_next_month(load_counter)
					else:
						print '!!Warn!! On ' + campus_url + " there is not a full month worth of events"
						check_for_tags()



			## Running test on all campuses
			for campus_url in globes.campus_url_array:
				driver.get(globes.base_url + campus_url + '/events')
				print '\nOn New Campus: ' + campus_url + ' for test_campus_programming_filter'
				curr_load_more = 0
				load_more_until_next_month(curr_load_more)

			## Single Locale Test.
			# campus_url = '/seoul/en'
			# driver.get(globes.base_url + campus_url +'/events')
			# curr_load_more = 0
			# load_more_until_next_month(curr_load_more)




	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



if __name__ == "__main__":
	unittest.main()