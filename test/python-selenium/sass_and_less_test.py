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
class Less_Button_Test(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_feeling_lucky(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/sass.html')
			sass_header = driver.find_element(By.CSS_SELECTOR, 'h3#sassy')
			try: self.assertEqual(sass_header.text, 'SASS')
			except AssertionError, e: self.verificationErrors.append("sass_and_less page: Got this instead.  " + sass_header.text)
			wait = WebDriverWait(driver, 10)
			element = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[text()="LESS"]')))
			less_button = driver.find_element(By.XPATH, '//button[text()="LESS"]')
			sass_button = driver.find_element(By.XPATH, '//button[text()="SASS"]')
			less_button.click()
			driver.implicitly_wait(2)
			less_header = driver.find_element(By.CSS_SELECTOR, 'h3#lassy')
			try: self.assertTrue(less_header.is_displayed())
			except AssertionError, e: self.verificationErrors.append("sass_and_less_test: Less Header not Visible after clicking less button.")
			try: self.assertFalse(sass_header.is_displayed())
			except AssertionError, e: self.verificationErrors.append("sass_and_less_test: Sass Header still visible after clicking less button.")
			sass_button.click()
			driver.implicitly_wait(2)
			try: self.assertFalse(less_header.is_displayed())
			except AssertionError, e: self.verificationErrors.append("sass_and_less_test: Less Header didn't hide after switching back to sass.")
			try: self.assertTrue(sass_header.is_displayed())
			except AssertionError, e: self.verificationErrors.append("sass_and_less_test: Sass Header ins't visible after switching back to sass.")

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
	unittest.main()