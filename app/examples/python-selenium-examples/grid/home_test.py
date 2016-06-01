import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *

# import logging
# logging.basicConfig(filename="log.txt", level=logging.INFO)


## Starter test that goes to homepage and makes sure the Hero Carousel is visible.
class HeroCarousel(unittest.TestCase):

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
			driver.get(globes.base_url)
			hero_carousel = driver.find_element(By.CSS_SELECTOR, 'div.carousel-featured')
			try: self.assertTrue(hero_carousel.is_displayed())
			except AssertionError, e: self.verificationErrors.append("home_test: Hero Carousel was not visible")

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()