import unittest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from globes import *


## Goes to News & Ideas page, searches for Superhero article. Checks to make sure 'No posts were found' does not appear. And that the headline of the post it should find appears.
class SearchOneResult(unittest.TestCase):
	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_one_result(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/news-ideas/')
			elem = driver.find_element_by_name("s")
			elem.send_keys("Superhero")
			elem.send_keys(Keys.RETURN)
			wait = WebDriverWait(driver, 10)
			element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME,'message-results')))
			try: assert "No posts were found..." not in driver.page_source
			except AssertionError, e: self.verificationErrors.append("news_and_ideas: No Posts incorrectly appeared.")
			try: assert "Become a superhero by hacking yourself" in driver.page_source
			except AssertionError, e: self.verificationErrors.append("news_and_ideas: Could not find post that should exist.")

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)

## Goes to News & Ideas page, searches for something with no results. Checks to make sure there is only 1 post and 'No posts were found' appears.
class SearchNoResults(unittest.TestCase):
	def setUp(self):
		self.drivers = []
		for driver_instance in globes.desired_cap:
			driver = webdriver.Remote(
				command_executor=globes.selenium_server_url,
				desired_capabilities=driver_instance)
			self.drivers.append(driver)
		self.verificationErrors = []

	def test_no_results(self):
		for driver in self.drivers:
			driver.get(globes.base_url + '/news-ideas/')

			elem = driver.find_element_by_name("s")
			# Example of an Action chain.
			actions = ActionChains(driver)
			actions.click(elem)
			actions.send_keys("Automated Testing IGNORE ME!!!!")
			actions.send_keys(Keys.RETURN)
			actions.perform()

			wait = WebDriverWait(driver, 10)
			element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME,'message-results')))
			posts = driver.find_elements_by_class_name('post')
			try: self.assertEqual(len(posts), 1)
			except AssertionError, e: self.verificationErrors.append('news_and_ideas: ' + str(len(posts)) + ' many posts when there should only be 1 for no port message.')
			
			try: assert 'No posts were found...' in driver.page_source
			except AssertionError, e: self.verificationErrors.append('news_and_ideas: Post found when they should not be.')

	def tearDown(self):
		for driver in self.drivers:
			driver.quit()
			self.assertEqual([], self.verificationErrors)



## Not working yet. But was trying to test number of elements in the sidebar. 
# class CountNewsSideBar(unittest.TestCase):
	# def setUp(self):
	# 	self.drivers = []
	# 	for driver_instance in globes.desired_cap:
	# 		driver = webdriver.Remote(
	# 			command_executor=globes.selenium_server_url,
	# 			desired_capabilities=driver_instance)
	# 		self.drivers.append(driver)
	# 	self.verificationErrors = []

# 	def test_other(self):
# 		driver = self.driver
# 		driver.get(globes.base_url + '/news-ideas/')
# 		side_bar_list_items = driver.find_element(By.CSS_SELECTOR, 'li.sidebar-news-ideas')
# 		# side_bar_list_items = driver.find_elements_by_css_selector('li.sidebar-news-ideas')
# 		try: self.assertEqual(len(side_bar_list_items), 8)
# 		except AssertionError, e: self.verificationErrors.append('news_and_ideas: ' + str(len(side_bar_list_items)) + ' many side bar list items when there should be 8.')
		
	# def tearDown(self):
	# 	for driver in self.drivers:
	# 		driver.quit()
	# 		self.assertEqual([], self.verificationErrors)




if __name__ == "__main__":
	unittest.main()
