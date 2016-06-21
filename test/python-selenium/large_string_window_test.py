import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *
import time

## Starter test that goes to home, hits Feeeling Lucky Button, then makes sure you're not on Home URL.
class Page_Should_Not_Scroll_Larger_Than_Window(unittest.TestCase):

	def setUp(self):
		self.drivers = []
		self.maxDiff = 'none'
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_for_overscroll(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/sass.html')
			all_nav_links = []
			nav_bar_links = driver.find_elements(By.CSS_SELECTOR, '.dropdown-menu > li > a')
			
			## Get all links in nav.
			for current_link in nav_bar_links:
				# print current_link.get_attribute("href")
				link_url = current_link.get_attribute("href")
				all_nav_links.append(link_url)

			try: self.assertTrue(len(all_nav_links) > 0 )
			except AssertionError, e: self.verificationErrors.append("large_string_window_test: Expected more urls: " + str(len(all_nav_links)))
			

			for link in all_nav_links:
				print "test_for_overscroll: Getting link " + str(link)
				# nav_bar_size = nav_bar_full.size
				driver.get(link)
				nav_bar_full = driver.find_element(By.CSS_SELECTOR, 'div.navbar-fixed-top')
				# body = driver.find_element(By.TAG_NAME, 'body')
				driver.set_window_size(1200,1000)
				real_doc_width = driver.execute_script("return document.body.scrollWidth")
				## Testing Large width responsiveness
				try: self.assertEqual(real_doc_width, 1200)
				except AssertionError, e: self.verificationErrors.append("large_string_window_test: At Medium-Desktop size page scrollWidth wasn't 1200 on " + str(link) + " page. Instead: " + str(real_doc_width) )
				## Testing Medium width responsiveness
				driver.set_window_size(991,1000)
				real_doc_width = driver.execute_script("return document.body.scrollWidth")
				try: self.assertEqual(real_doc_width, 991)
				except AssertionError, e: self.verificationErrors.append("large_string_window_test: At Small-Desktop size page scrollWidth wasn't 991 on " + str(link) + " page. Instead: " + str(real_doc_width) )
				## Testing Tablet width responsiveness
				driver.set_window_size(767,1000)
				real_doc_width = driver.execute_script("return document.body.scrollWidth")
				try: self.assertEqual(real_doc_width, 767)
				except AssertionError, e: self.verificationErrors.append("large_string_window_test: At Tablet size page scrollWidth wasn't 767 on "  + str(link) + " page. Instead: " + str(real_doc_width) )
				## Testing Mobile width responsiveness
				driver.set_window_size(400,1000)
				real_doc_width = driver.execute_script("return document.body.scrollWidth")
				try: self.assertEqual(real_doc_width, 400)
				except AssertionError, e: self.verificationErrors.append("large_string_window_test: At Phone size page scrollWidth wasn't 400 on " + str(link) + " page. Instead: " + str(real_doc_width) )


	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
	unittest.main()


