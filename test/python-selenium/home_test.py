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

	def test_hero_carousel(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/Home.html')
			feeling_lucky_button = driver.find_element(By.CSS_SELECTOR, 'a.btn-success')
			feeling_lucky_button.click()
			current_url = driver.current_url
			try: self.assertNotEquals(current_url, 'http://0.0.0.0:9000/Views/home.html')
			except AssertionError, e: self.verificationErrors.append("home_test: Still on homepage." + current_url)

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

# ## Starter test that goes to homepage and makes sure the Hero Carousel is visible.
# class Homepage(unittest.TestCase):

# 	def setUp(self):
# 		self.drivers = []
# 		for driver_instance in globes.desired_cap:
# 			driver = webdriver.Remote(
# 				command_executor=globes.selenium_server_url,
# 				desired_capabilities=driver_instance)
# 			self.drivers.append(driver)
# 		self.verificationErrors = []

# 	def test_hero_carousel(self):
# 		for driver in self.drivers:
# 			driver.get(globes.base_url + '/Home.html')
# 			feeling_lucky_button = driver.find_element(By.CSS_SELECTOR, 'a.btn-success')
# 			feeling_lucky_button.click()
# 			current_url = driver.current_url()
# 			console.log(current_url)
# 			try: self.assertTrue(hero_carousel.is_displayed())
# 			except AssertionError, e: self.verificationErrors.append("home_test: Hero Carousel was not visible")

# 	def tearDown(self):
# 		for driver in self.drivers:
# 			driver.quit()
# 			self.assertEqual([], self.verificationErrors)



if __name__ == "__main__":
	unittest.main()