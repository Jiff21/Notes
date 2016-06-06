import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *
import datetime


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


# ## Makes sure the Jumbotron loads
class Homepage_Greeting_Checker(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_greeting_message(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/Home.html')
			now = datetime.datetime.now()
			current_hour = now.hour
			driver.implicitly_wait(2)
			welcome_message = driver.find_element(By.CSS_SELECTOR, 'h1#welcome-message')
			if current_hour < 3:
				try: self.assertEqual(welcome_message.text, 'Shouldn&#39;t you be at a bar?')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			elif current_hour < 7:
				try: self.assertEqual(welcome_message.text, 'Why are you awake?')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			elif current_hour < 12:
				try: self.assertEqual(welcome_message.text, 'Good Morning.')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			elif current_hour < 17:
				try: self.assertEqual(welcome_message.text, 'Good afternoon.')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			elif current_hour < 21:
				try: self.assertEqual(welcome_message.text, 'Good evening.')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			elif current_hour < 23:
				try: self.assertEqual(welcome_message.text, 'Good night/')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			elif current_hour <= 24:
				try: self.assertEqual(welcome_message.text, 'Go to Sleep!')
				except AssertionError, e: self.verificationErrors.append("home_test: On a 24 hour clock the hour is " + str(current_hour) + " but the message is " + welcome_message.text )
			else:
				try: self.assertEqual(welcome_message.text, 'DOC-BROWN')
				except AssertionError, e: self.verificationErrors.append("home_test: There's something wrong with your clock.")

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



if __name__ == "__main__":
	unittest.main()