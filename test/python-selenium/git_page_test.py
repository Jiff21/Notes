import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *
import time

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
			driver.get(globes.base_url + '/git.html')
			driver.set_window_size(1200,1000)
			## Testing Large width responsiveness
			time.sleep(3)
			left_nav_comp_divs = driver.find_elements(By.CSS_SELECTOR, 'div.left-nav-companion')
			top_left_nav_comp = left_nav_comp_divs[0].size
			left_nav_comp_location = left_nav_comp_divs[0].location
			try: self.assertEqual(top_left_nav_comp["width"], 770)
			except AssertionError, e: self.verificationErrors.append("git_page: 1. At Medium-Desktop size half full div wasn't 770. Instead: " + str(top_left_nav_comp["width"]) )

			try: self.assertEqual(left_nav_comp_location["x"], 375)
			except AssertionError, e: self.verificationErrors.append("git_page: 2. At Medium-Desktop size half full div wasn't 375. Instead: " + str(left_nav_comp_location["x"]) )

			## Testing Medium width responsiveness
			driver.set_window_size(991,1000)
			time.sleep(3)
			left_nav_comp_divs = driver.find_elements(By.CSS_SELECTOR, 'div.left-nav-companion')
			top_left_nav_comp = left_nav_comp_divs[0].size
			left_nav_comp_location = left_nav_comp_divs[0].location
			try: self.assertEqual(top_left_nav_comp["width"], 631)
			except AssertionError, e: self.verificationErrors.append("git_page: 3. At Small-Desktop size half full div wasn't 631. Instead: " + str(top_left_nav_comp["width"]) )
			try: self.assertEqual(left_nav_comp_location["x"], 312)
			except AssertionError, e: self.verificationErrors.append("git_page: 4. At Medium-Desktop size half full div wasn't 312. Instead: " + str(left_nav_comp_location["x"]) )

			## Testing Tablet width responsiveness
			driver.set_window_size(767,1000)
			time.sleep(3)
			left_nav_comp_divs = driver.find_elements(By.CSS_SELECTOR, 'div.left-nav-companion')
			top_left_nav_comp = left_nav_comp_divs[0].size
			left_nav_comp_location = left_nav_comp_divs[0].location
			try: self.assertEqual(top_left_nav_comp["width"], 737)
			except AssertionError, e: self.verificationErrors.append("git_page: 5. At Tablet size half full div wasn't 737. Instead: " + str(top_left_nav_comp["width"]) )
			try: self.assertEqual(left_nav_comp_location["x"], 15)
			except AssertionError, e: self.verificationErrors.append("git_page: 6. At Medium-Desktop size half full div wasn't 15. Instead: " + str(left_nav_comp_location["x"]) )

			## Testing Mobile width responsiveness
			driver.set_window_size(400,1000)
			time.sleep(3)
			left_nav_comp_divs = driver.find_elements(By.CSS_SELECTOR, 'div.left-nav-companion')
			top_left_nav_comp = left_nav_comp_divs[0].size
			left_nav_comp_location = left_nav_comp_divs[0].location
			try: self.assertEqual(top_left_nav_comp["width"], 370)
			except AssertionError, e: self.verificationErrors.append("git_page: 7. At Mobile size half full div wasn't 370. Instead: " + str(top_left_nav_comp["width"]) )
			try: self.assertEqual(left_nav_comp_location["x"], 15)
			except AssertionError, e: self.verificationErrors.append("git_page: 8. At Medium-Desktop size half full div wasn't 15. Instead: " + str(left_nav_comp_location["x"]) )


	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()
	