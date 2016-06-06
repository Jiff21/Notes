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

	def test_feeling_lucky(self):
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

# ## Counts the card elements on the page.
class Homepage_grids(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_homepage_grids(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/Home.html')
			get_all_the_cards = driver.find_elements(By.CSS_SELECTOR, 'div.col-md-3.col-sm-4.col-xs-6')
			counted_cards = len(get_all_the_cards)
			try: self.assertEqual(counted_cards,20)
			except AssertionError, e: self.verificationErrors.append("home_test: Not enoungh cards on home, there were only " + str(counted_cards) )

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



# ## Makes sure the Jumbotron loads
class Homepage_Jumbotron_elements(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_jumbotron_elemenst(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/Home.html')
			jumbo_diaz = driver.find_element(By.CSS_SELECTOR, 'div.jumbotron')
			try: self.assertTrue(jumbo_diaz.is_displayed())
			except AssertionError, e: self.verificationErrors.append("home_test: Jumbotron Div Missing")
			dark_overlay = driver.find_element(By.CSS_SELECTOR, 'div.dark-layer')
			try: self.assertTrue(dark_overlay.is_displayed())
			except AssertionError, e: self.verificationErrors.append("home_test: Missing Jumbotron text overlay")
			greeting_header = driver.find_element(By.CSS_SELECTOR, 'h1#welcome-message')
			try: self.assertTrue(greeting_header.is_displayed())
			except AssertionError, e: self.verificationErrors.append("home_test: Missing Jumbotron Header")

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



if __name__ == "__main__":
	unittest.main()