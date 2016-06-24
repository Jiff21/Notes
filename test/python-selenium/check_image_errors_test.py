import unittest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from globes import *
import requests


class Check_All_Images_For_Errors(unittest.TestCase):
	def setUp(self):
		self.drivers = []
		self.maxDiff = 'None'
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_images_for_error(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/home.html')
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
				# print "test_for_overscroll: Getting link " + str(link)
				driver.get(link)
				images = driver.find_elements(By.TAG_NAME, 'img')
				for image in images:
					current_link = image.get_attribute("src")
					# print current_link
					r = requests.get(current_link)
					# print r.status_code
					try: self.assertEqual(r.status_code, 200)
					except AssertionError, e: self.verificationErrors.append('On Page: ' + link + '. And this image: ' + current_link + ' delivered response code of ' + str(r.status_code))

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
	unittest.main()