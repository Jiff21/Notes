import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from globes import *


## Starter test that goes to home, hits Feeeling Lucky Button, then makes sure you're not on Home URL.
class Header_Should_Match_Window_Size(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_header_at_different_window_sizes(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/sass.html')
			nav_bar_links = driver.find_elements(By.CSS_SELECTOR, '.dropdown-menu > li > a')
			total_menu_items = len(nav_bar_links)
			all_nav_links = []

			
			## Get all links in nav.
			for current_link in nav_bar_links:
				print current_link.get_attribute("href")
				link_url = current_link.get_attribute("href")
				all_nav_links.append(link_url)
			

			for link in all_nav_links:
				print "getting link " + str(link)
				nav_bar_full = driver.find_element(By.CSS_SELECTOR, 'div.navbar-fixed-top')
				# nav_bar_size = nav_bar_full.size
				driver.get(link)
				## Testing Large width responsiveness
				driver.set_window_size(1200,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 1200)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 1. At Medium-Desktop size half full header wasn't 1200. Instead: " + str(nav_bar_full.size["width"]) )
				## Testing Medium width responsiveness
				driver.set_window_size(991,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 991)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 2. At Small-Desktop size half full header wasn't 991. Instead: " + str(nav_bar_full.size["width"]) )
				## Testing Tablet width responsiveness
				driver.set_window_size(767,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 767)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 3. At Tablet size half full header wasn't 767. Instead: " + str(nav_bar_full.size["width"]) )
				## Testing Mobile width responsiveness
				driver.set_window_size(400,1000)
				try: self.assertEqual(nav_bar_full.size["width"], 400)
				except AssertionError, e: self.verificationErrors.append("header_size_test: 4. At Phone size half full header wasn't 400. Instead: " + str(nav_bar_full.size["width"]) )


			## Testing Tablet width responsiveness
			try: self.assertEqual(len(nav_bar_links), 'SASS')
			except AssertionError, e: self.verificationErrors.append("header_size: Got this instead.  " + str(len(nav_bar_links)))

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
	unittest.main()


