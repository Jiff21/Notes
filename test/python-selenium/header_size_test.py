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

			

			for current_link in nav_bar_links:
				print current_link.text
				# current_link.click()


			nav_bar_full = driver.find_element(By.CSS_SELECTOR, 'div.navbar-fixed-top')

			## Testing Medium width responsiveness
			driver.set_window_size(991,1000)
			nav_bar_size = nav_bar_full.size

			try: self.assertEqual(nav_bar_size["width"], 991)
			except AssertionError, e: self.verificationErrors.append("header_size: 2. At Small-Desktop size half full div wasn't 375. Instead: " + str(nav_bar_size["width"]) )
			## Testing Tablet width responsiveness
			try: self.assertEqual(len(nav_bar_links), 'SASS')
			except AssertionError, e: self.verificationErrors.append("header_size: Got this instead.  " + str(len(nav_bar_links)))

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
	unittest.main()


