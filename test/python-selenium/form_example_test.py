import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from globes import *
import time

# import logging
# logging.basicConfig(filename="log.txt", level=logging.INFO)


## Starter test that goes to home, hits Feeeling Lucky Button, then makes sure you're not on Home URL.
class Test_Invalid_Username(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_invalid_username(self):
		for driver in self.drivers:
			driver.get('http://the-internet.herokuapp.com/login')
			# jumbo_button = driver.find_element(By.XPATH, '//a[text()="FPO"]')
			username_field = driver.find_element(By.ID, 'username')
			password_field = driver.find_element(By.ID, 'password')
			login_button =  driver.find_element(By.CSS_SELECTOR, 'button.radius')

			username_field.send_keys('Fake User Name')
			login_button.click()
			
			invalid_alert = driver.find_element(By.CSS_SELECTOR, 'div#flash')

			try: self.assertTrue(invalid_alert.is_displayed())
			except AssertionError, e: self.verificationErrors.append("invalid_alert did not appear")

			# print invalid_alert.text + '!!!!s'
			# try: self.assertEqual(invalid_alert.text, 'Your username is invalid!\xc3')
			# except AssertionError, e: self.verificationErrors.append("Expected text for invalid username did not appear.")

			dismiss_alert = driver.find_element(By.CSS_SELECTOR, 'a.close')
			dismiss_alert.click()
			time.sleep(1)

			# try: self.assertFalse(invalid_alert.is_present())
			# except AssertionError, e: self.verificationErrors.append("invalid_alert appeared after it had been dismissed")

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



if __name__ == "__main__":
	unittest.main()