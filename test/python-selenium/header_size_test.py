import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *
import time

## Starter test that goes to home, hits Feeeling Lucky Button, then makes sure you're not on Home URL.
class Header_Should_Match_Window_Size(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		self.maxDiff = 'none'
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_header_at_different_window_sizes(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/sass.html')
			all_nav_links = []
			nav_bar_links = driver.find_elements(By.CSS_SELECTOR, '.dropdown-menu > li > a')
			
			## Get all links in nav.
			for current_link in nav_bar_links:
				# print current_link.get_attribute("href")
				link_url = current_link.get_attribute("href")
				all_nav_links.append(link_url)

			try: self.assertTrue(len(all_nav_links) > 0 )
			except AssertionError, e: self.verificationErrors.append("header_size_test: Expected more urls: " + str(len(all_nav_links)))


			for link in all_nav_links:
				# print "test_header_at_different_window_sizes: Getting link " + str(link)
				driver.get(link)
				nav_bar_full = driver.find_element(By.CSS_SELECTOR, 'div.navbar-fixed-top')

				## Testing Large width responsiveness
				driver.set_window_size(1200,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 1200)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 1. At Medium-Desktop size half full header wasn't 1200 on " + str(link) + " page. Instead: " + str(nav_bar_full.size["width"]) )

				## Testing Medium width responsiveness
				driver.set_window_size(992,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 992)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 2. At Small-Desktop size half full header wasn't 992 on " + str(link) + " page. Instead: " + str(nav_bar_full.size["width"]) )
				## Testing Tablet width responsiveness
				driver.set_window_size(768,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 768)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 3. At Tablet size half full header wasn't 768 on " + str(link) + " page. Instead: " + str(nav_bar_full.size["width"]) )
				## Testing Mobile width responsiveness
				driver.set_window_size(400,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 400)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 4. At Phone size half full header wasn't 400 on " + str(link) + " page. Instead: " + str(nav_bar_full.size["width"]) )


	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
	unittest.main()


