import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from globes import *
import datetime


# import logging
# logging.basicConfig(filename="log.txt", level=logging.INFO)


## Starter test that goes to home, hits Feeeling Lucky Button, then makes sure you're not on Home URL.
# class fpo_alert_button(unittest.TestCase):

# 	def setUp(self):
# 		self.drivers = []
# 		for driver_instance in globes.desired_cap:
# 			driver = webdriver.Remote(
# 				command_executor=globes.selenium_server_url,
# 				desired_capabilities=driver_instance)
# 			self.drivers.append(driver)
# 		self.verificationErrors = []

# 	def test_alert_button(self):
# 		for driver in self.drivers:
# 			driver.get(globes.base_url + '/javascript.html')
# 			# jumbo_button = driver.find_element(By.XPATH, '//a[text()="FPO"]')
# 			jumbo_button = driver.find_element(By.XPATH, '//div/p[2]/a')
# 			jumbo_button.click()
# 			driver.implicitly_wait(2)
# 			try: WebDriverWait(driver, 3).until(EC.alert_is_present(),'Timed out waiting for PA creation ' + 'confirmation popup to appear.')
# 			except AssertionError, e: self.verificationErrors.append("javascript_page: Alert did not appear.")
# 			alert = driver.switch_to_alert()
# 			alert.accept()

# 	def tearDown(self):
# 		for driver in self.drivers:
# 			driver.quit()
# 			self.assertEqual([], self.verificationErrors)


class fpo_alert_button(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_in_action_button(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/javascript.html')
			in_action_button = driver.find_element(By.CSS_SELECTOR, '#switcher > button')
			in_action_button.click()
			driver.implicitly_wait(2)
			in_action_background = driver.find_element(By.CSS_SELECTOR, 'header#switcher')
			in_action_background_color = in_action_background.value_of_css_property('background-color')
			try: self.assertEqual(in_action_background_color, 'rgba(169, 169, 169, 1)')
			except AssertionError, e: self.verificationErrors.append("javascript_page: Background color isn't brown. Instead: " + in_action_background_color)

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()