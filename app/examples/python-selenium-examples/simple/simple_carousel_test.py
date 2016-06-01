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
		self.driver = webdriver.Firefox()
		self.verificationErrors = []

	def test_hero_carousel(self):
		driver = self.driver
		driver.get('http://example.com')

		hero_carousel = driver.find_element(By.CSS_SELECTOR, 'div.carousel-featured')
		try: self.assertTrue(hero_carousel.is_displayed())
		except AssertionError, e: self.verificationErrors.append("home_test: Hero Carousel was not visible")

	def tearDown(self):
		self.driver.close()
		self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()