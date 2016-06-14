import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *

class check_width_for_half_full_divs(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_div_width(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/terminal.html')
			driver.set_window_size(1200,1000)
			## Testing Large width responsiveness
			half_full_divs = driver.find_elements(By.CSS_SELECTOR, 'div.half-full')
			third_half_full = half_full_divs[0].size
			try: self.assertEqual(third_half_full["width"], 450)
			except AssertionError, e: self.verificationErrors.append("terminal_page: 1. At Medium-Desktop size half full div wasn't 450. Instead: " + str(third_half_full["width"]) )
			## Testing Medium width responsiveness
			driver.set_window_size(991,1000)
			half_full_divs = driver.find_elements(By.CSS_SELECTOR, 'div.half-full')
			third_half_full = half_full_divs[0].size
			try: self.assertEqual(third_half_full["width"], 375)
			except AssertionError, e: self.verificationErrors.append("terminal_page: 2. At Small-Desktop size half full div wasn't 375. Instead: " + str(third_half_full["width"]) )
			## Testing Tablet width responsiveness
			driver.set_window_size(767,1000)
			half_full_divs = driver.find_elements(By.CSS_SELECTOR, 'div.half-full')
			third_half_full = half_full_divs[0].size
			try: self.assertEqual(third_half_full["width"], 767)
			except AssertionError, e: self.verificationErrors.append("terminal_page: 3. At Tablet size half full div wasn't 767. Instead: " + str(third_half_full["width"]) )
			## Testing Mobile width responsiveness
			driver.set_window_size(400,1000)
			half_full_divs = driver.find_elements(By.CSS_SELECTOR, 'div.half-full')
			third_half_full = half_full_divs[0].size
			try: self.assertEqual(third_half_full["width"], 400)
			except AssertionError, e: self.verificationErrors.append("terminal_page: 4. At mobile size half full div wasn't 370. Instead: " + str(third_half_full["width"]) )

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()
	