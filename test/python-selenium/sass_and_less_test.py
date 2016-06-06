import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *


# import logging
# logging.basicConfig(filename="log.txt", level=logging.INFO)


## Starter test that goes to home, hits Feeeling Lucky Button, then makes sure you're not on Home URL.
class Homepage_Lucky_Button(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_switching_buttons(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/sass.html')
			less_button = driver.find_element(By.XPATH, '//button[text()="LESS"]')
			sass_button = driver.find_element(By.XPATH, '//button[text()="LESS"]')
			less_button.click()
			driver.implicitly_wait(2)
			sass_button.click()
			driver.implicitly_wait(2)
			current_url = driver.current_url
			try: self.assertNotEquals(current_url, 'http://0.0.0.0:9000/Views/home.html')
			except AssertionError, e: self.verificationErrors.append("home_test: Still on homepage." + current_url)

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
	unittest.main()