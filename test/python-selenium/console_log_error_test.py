import unittest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from globes import *

# Not working yet. But was trying to test number of elements in the sidebar. 
class CheckLogsForErrors(unittest.TestCase):
	def setUp(self):
		self.drivers = []
		self.maxDiff = 'None'
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_check_logs_for_error(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/home.html')
			all_nav_links = []
			nav_bar_links = driver.find_elements(By.CSS_SELECTOR, '.dropdown-menu > li > a')
			
			## Get all links in nav.
			for current_link in nav_bar_links:
				# print current_link.get_attribute("href")
				link_url = current_link.get_attribute("href")
				all_nav_links.append(link_url)

			try: self.assertTrue(len(all_nav_links) > 0 )
			except AssertionError, e: self.verificationErrors.append("large_string_window_test: Expected more urls: " + str(len(all_nav_links)))
			
			for link in all_nav_links:
				# print "test_for_overscroll: Getting link " + str(link)
				driver.get(link)
				for entry in driver.get_log('browser'):
					print  entry['level']
					try: assert "SEVERE" not in entry['level']
					except AssertionError, e: self.verificationErrors.append("On Page: " + link + ". Expeced no errors in log instead got: " + str(entry))

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()
