import os
import unittest
from appium import webdriver
from time import sleep
from appium.webdriver.common.touch_action import TouchAction
import desired_capabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class TrainUpSmokeTests(unittest.TestCase):
	def setUp(self):
		desired_caps = desired_capabilities.get_desired_capabilities('app-debug.apk')
		self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

	def tearDown(self):
		self.driver.quit()

	# def test_intro_carousel_appears_and_can_be_skipped(self):
	# 	wd = self.driver
	# 	sleep(10)
	# 	account = wd.find_element_by_android_uiautomator('text("example@gmail.com")')
	# 	account.click()
	# 	ok_button = wd.find_element_by_android_uiautomator('text("OK")')
	# 	ok_button.click()

	# 	sleep(8)
	# 	activity = wd.current_activity
	# 	self.assertTrue(activity, 'com.google.android.apps.trainup/com.rossumrobotstudio.intro.IntroScreenActivity')
	# 	skip_button = wd.find_element_by_android_uiautomator('text("SKIP")')
	# 	skip_button.click()
		
	# 	sleep(5)
	# 	enter_app_button = wd.find_element_by_android_uiautomator('text("ENTER APP")')
	# 	enter_app_button.click()
	# 	sleep(1)
	# 	self.assertTrue(activity, 'com.google.android.apps.trainup/com.rossumrobotstudio.intro.MainDrawerActivity')

	def test_you_can_get_to_product_sections(self):
		wd = self.driver
		action = TouchAction(wd)
		wait = WebDriverWait(wd, 20)

		## Waiting for the Account Selector to appear, then Selecting account.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.CheckedTextView[@text="example@gmail.com"]')))
		account = wd.find_element_by_android_uiautomator('text("example@gmail.com")')
		account.click()
		ok_button = wd.find_element_by_android_uiautomator('text("OK")')
		ok_button.click()


		## Skipping the Intro Carousel		
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.Button[@text="SKIP"]')))
		skip_button = wd.find_element_by_android_uiautomator('text("SKIP")')
		skip_button.click()


		# This is to deal with the first time pop up but dont get it some times.
		element = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.Button[@text="ENTER APP"]')))
		enter_app_button = wd.find_element_by_android_uiautomator('text("ENTER APP")')
		enter_app_button.click()


		## Waits for Homepage to load then click Products Colored card nodule.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="PRODUCTS"]')))
		products_colored_card = wd.find_element_by_android_uiautomator('text("PRODUCTS")')
		products_colored_card.click()


		## Waits for Accordion Panel for Products Overview page to load then clicks Home Entertainment.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Home Entertainment"]')))		
		home_entertainment_accordion_panel = wd.find_element_by_android_uiautomator('text("Home Entertainment")')
		self.assertIsNotNone(home_entertainment_accordion_panel)
		home_entertainment_accordion_panel.click()


		## Waits for Chromecast Audio to be visible. Then Clicks it.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Chromecast Audio"]')))
		chromecast_audio_product_overview = wd.find_element_by_android_uiautomator('text("Chromecast Audio")')
		chromecast_audio_product_overview.click()


		## Waits for Text to load in the asserts that the Carousel Header matches correct text.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="What is Chromecast Audio?"]')))
		chromecast_audio_hero_carousel = wd.find_element_by_android_uiautomator('text("What is Chromecast Audio?")')
		self.assertIsNotNone(chromecast_audio_hero_carousel)
		

		## Clicks on the Specs Section.
		chromecast_audio_specs = wd.find_element_by_android_uiautomator('text("Specs")')
		# action.press(x=700, y=466).move_to(chromecast_audio_specs).release().perform()
		chromecast_audio_specs.click()


		## Waits for Specs page to load then asserts first header has correct text.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.view.View[@content-desc="Dimensions"]')))
		chromecast_audio_specs_header = wd.find_element_by_android_uiautomator('new UiSelector().description("Dimensions")')
		self.assertIsNotNone(chromecast_audio_specs_header)


		## Backs out of details page to Products Overview.
		nav_back_button = wd.find_element_by_xpath('//android.widget.ImageButton[@content-desc="Navigate up"]')
		nav_back_button.click()

		## Could use this instead of back. Let's see which makes more sense.
		# wd.back()


		## Scrolls to bottom of screen and checks to make sure Overview is clickable. Then clicks it.
		chromecast_audio_overview = wd.find_element_by_android_uiautomator('text("Overview")')
		action.press(x=700, y=466).move_to(chromecast_audio_overview).release().perform()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.RelativeLayout[@resource-id="com.google.android.apps.trainup:id/overview"]')))
		chromecast_audio_overview.click()


		## Checks for Overviews page header for correct text.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.view.View[@content-desc="What is Chromecast Audio?"]')))
		chromecast_audio_overview_header = wd.find_element_by_android_uiautomator('new UiSelector().description("What is Chromecast Audio?")')
		self.assertIsNotNone(chromecast_audio_overview_header)

		nav_back_button.click()


		## Waits for FAQ section to be visible and clicks it. 
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.RelativeLayout[@resource-id="com.google.android.apps.trainup:id/faqs"]')))
		chromecast_audio_faqs = wd.find_element_by_android_uiautomator('text("FAQs")')
		chromecast_audio_faqs.click()


		## Waits for the the First Accordion to be visible and checks for correct text.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Which apps can I use?"]')))
		chromecast_audio_faqs_panel_title = wd.find_element_by_android_uiautomator('text("Which apps can I use?")')
		self.assertIsNotNone(chromecast_audio_faqs_panel_title)

		nav_back_button.click()

		## Scroll Videos into view
		action.press(x=700, y=466).move_to(x=700, y=-200).release().perform()
		## Waits for Videos section to be clickable then clicks.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.RelativeLayout[@resource-id="com.google.android.apps.trainup:id/videos"]')))
		chromecast_audio_video = wd.find_element_by_android_uiautomator('text("Videos")')
		chromecast_audio_video.click()


		## Makes sure first video title appears on the page.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Chromecast Audio: How to cast"]')))
		chromecast_audio_video_title = wd.find_element_by_android_uiautomator('text("Chromecast Audio: How to cast")')
		self.assertIsNotNone(chromecast_audio_video_title)

		nav_back_button.click()


		## Scrolls to bottom of page. Waits for Demo Ideas section to be clickable then clicks.
		action.press(x=700, y=466).move_to(x=700, y=-200).release().perform()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.RelativeLayout[@resource-id="com.google.android.apps.trainup:id/demoideas"]')))
		chromecast_audio_demo_ideas = wd.find_element_by_android_uiautomator('text("Demo Ideas")')
		chromecast_audio_demo_ideas.click()


		## Waits for Demo Ideas accordion then checks for correct text.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Explore Cast-enabled apps"]')))
		chromecast_audio_demo_ideas_panel_title = wd.find_element_by_android_uiautomator('text("Explore Cast-enabled apps")')
		self.assertIsNotNone(chromecast_audio_demo_ideas_panel_title)

		nav_back_button.click()

		## Scrolls to bottom of page and waits for Featured apps section to be clickable. Then clicks.
		action.press(x=700, y=466).move_to(x=700, y=-200).release().perform()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.RelativeLayout[@resource-id="com.google.android.apps.trainup:id/featuredapps"]')))
		chromecast_audio_featured_apps = wd.find_element_by_android_uiautomator('text("Featured Apps")')
		chromecast_audio_featured_apps.click()


		## Waits for 2nd Featured app on page to load then checks for correct text.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Google Play Music"]')))
		chromecast_audio_featured_apps_app_2 = wd.find_element_by_android_uiautomator('text("Google Play Music")')
		self.assertIsNotNone(chromecast_audio_featured_apps_app_2)



		## Backs out to Product Overview page and navigates to Training through the side nav.
		nav_back_button.click()
		nav_back_button.click()
		menu_button = wd.find_element_by_xpath('//android.widget.ImageButton[@content-desc="Open"]')
		menu_button.click()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Training"]')))
		training_button_side_nav = wd.find_element_by_xpath('//android.widget.TextView[@text="Training"]')
		training_button_side_nav.click()

		## Wait for the description text on Training Overview. Then Assert coins and Knowledge points are there.	
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Complete the subjects below to earn knowledge points and coins. You can exchange your coins for rewards in the Reward Store."]')))
		my_knowledge_points_point_value = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/curriculums_header_points"]')
		self.assertIsNotNone(my_knowledge_points_point_value)
		my_coins_coin_value = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/curriculums_header_coins"]')
		self.assertIsNotNone(my_coins_coin_value)
		android_tv_class = wd.find_element_by_xpath('//android.widget.TextView[@text="Android TV"]')
		android_tv_class.click()

		## Waits for Training difficulty page to load. Asserts coin module exists then clicks Basic.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="My Android TV knowledge points"]')))
		android_tv_coins = wd.find_element_by_xpath('//android.widget.TextView[@text="My Android TV knowledge points"]')
		self.assertIsNotNone(android_tv_coins)
		basic_difficulty = wd.find_element_by_xpath('//android.widget.TextView[@text="Basic"]')
		basic_difficulty.click()


		## Waits for Course Header then clicks Begin Class Button for first class.
		currently_waiting_for = wait.until(EC.presence_of_element_located((By.XPATH,'//android.widget.TextView[@text="Introducing Android TV"]')))
		begin_1st_class = wd.find_element_by_xpath('//android.widget.LinearLayout[@index="0"]/android.widget.Button[@index="1"]')
		begin_1st_class.click()

		##  Waits for Point Module to load and asserts it equals 60 points for this class.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/intro_pointsinfo"]')))
		into_card_points_total = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/intro_pointsinfo"]')
		self.assertEqual('60 points', into_card_points_total.get_attribute('text'))

		## Clicks to next card button. Until it gets to 1st Question. Selects correct answer and submits. Why Does this keep selecting Wrong Next Button?
		# next_card_button = wd.find_element_by_xpath('//android.widget.Button[@content-desc="Next"]')



		next_card_button = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_next"]')
		next_card_button.click()

		def go_to_next_card(num):
			sleep(num)
			next_card_button = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_next"]')
			next_card_button.click()


		go_to_next_card(1.5)
		go_to_next_card(1.5)
		go_to_next_card(1.5)
		go_to_next_card(1.5)

		answer_1 = wd.find_element_by_xpath('//android.widget.RadioButton[@text="B.   False"]')
		answer_1.click()

		submit_button = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_submit"]')
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_submit"]')))
		submit_button.click()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_next"]')))
		go_to_next_card(1)

		go_to_next_card(2)
		go_to_next_card(1.5)
		go_to_next_card(1.5)
		go_to_next_card(1.5)
		go_to_next_card(1.5)
		go_to_next_card(1.5)
		go_to_next_card(1.5)

		sleep(2)
		answer_2 = wd.find_element_by_xpath('//android.widget.RadioButton[@resource-id="com.google.android.apps.trainup:id/quiz_answer3"]')
		# currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.RadioButton[@text="D.   Phone calls"]')))
		answer_2.click()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_submit"]')))
		submit_button = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_submit"]')
		submit_button.click()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_next"]')))
		go_to_next_card(1)

		go_to_next_card(2)
		go_to_next_card(1.5)

		sleep(2)
		answer_3 = wd.find_element_by_xpath('//android.widget.RadioButton[@resource-id="com.google.android.apps.trainup:id/quiz_answer0"]')
		answer_3.click()
		submit_button = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_submit"]')
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_submit"]')))
		submit_button.click()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/clazz_next"]')))
		go_to_next_card(1)

		go_to_next_card(1.5)
		go_to_next_card(1.5)


		## Waits for Summary Card to load. Checks to see if it got a perfect score, rating module exists then hits Done Button.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.Button[@text="DONE"]')))
		summary_points = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/quiz_summaryPoints"]')
		self.assertEqual('60 ', summary_points.get_attribute('text'))
		star_ratings = wd.find_element_by_xpath('//android.widget.RatingBar[@resource-id="com.google.android.apps.trainup:id/ratingBar"]')
		self.assertIsNotNone(star_ratings)
		rating_text = wd.find_element_by_xpath('//android.widget.EditText[@resource-id="com.google.android.apps.trainup:id/ratingText"]')
		self.assertIsNotNone(rating_text)
		rating_submit = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/ratingSubmit"]')
		self.assertIsNotNone(rating_submit)
		done_button = wd.find_element_by_xpath('//android.widget.Button[@text="DONE"]')
		done_button.click()


		## Backs out to Training Overview Screen.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH, '//android.widget.ImageButton[@content-desc="Navigate up"]')))
		## Kill next line once not testing this section.
		nav_back_button = wd.find_element_by_xpath('//android.widget.ImageButton[@content-desc="Navigate up"]')
		nav_back_button.click()
		nav_back_button.click()

		## Navigates to My Profile Page using the side nav.
		menu_button = wd.find_element_by_xpath('//android.widget.ImageButton[@content-desc="Open"]')
		##
		menu_button.click()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="Training"]')))
		profile_button_side_nav = wd.find_element_by_xpath('//android.widget.TextView[@text="My Profile"]')
		profile_button_side_nav.click()

		currently_waiting_for = wait.until(EC.presence_of_element_located((By.XPATH, '//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/profile_name"]')))
		profile_name = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/profile_name"]')
		self.assertEqual('Example Name', profile_name.get_attribute('text'))
		profile_points_module = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/profile_points"]')
		self.assertIsNotNone(profile_points_module)

		## Changes name of User. Then Asserts name stayed.
		profile_first_name = wd.find_element_by_xpath('//android.widget.EditText[@resource-id="com.google.android.apps.trainup:id/profile_firstname"]')
		profile_first_name.click()
		profile_first_name.clear()
		profile_first_name.send_keys("Automated")
		wd.hide_keyboard()
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.EditText[@resource-id="com.google.android.apps.trainup:id/profile_lastname"]')))
		profile_last_name = wd.find_element_by_xpath('//android.widget.EditText[@resource-id="com.google.android.apps.trainup:id/profile_lastname"]')
		profile_last_name.click()
		profile_last_name.clear()
		profile_last_name.send_keys("Testing")
		wd.hide_keyboard()
		apply_button  = wd.find_element_by_xpath('//android.widget.Button[@resource-id="com.google.android.apps.trainup:id/profile_apply"]')
		apply_button.click()
		## Asserts that it updates immediately.
		self.assertEqual('Automated Testing', profile_name.get_attribute('text'))

		## Navigates away then back to make sure the change saves.
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.ImageButton[@content-desc="Open"]')))
		menu_button.click()
		home_button_side_nav = wd.find_element_by_xpath('//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/name"]')
		home_button_side_nav.click()
		sleep(5)
		print "CLicked on Home"
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.ImageButton[@content-desc="Open"]')))
		menu_button.click()
		print "CLicked on Nav"
		sleep(2)
		currently_waiting_for = wait.until(EC.element_to_be_clickable((By.XPATH,'//android.widget.TextView[@text="My Profile"]')))
		profile_button_side_nav = wd.find_element_by_xpath('//android.widget.TextView[@text="My Profile"]')
		profile_button_side_nav.click()
		print "CLicked on My Profile"
		sleep(2)
		currently_waiting_for = wait.until(EC.presence_of_element_located((By.XPATH, '//android.widget.TextView[@resource-id="com.google.android.apps.trainup:id/profile_name"]')))
		self.assertEqual('Automated Testing', profile_name.get_attribute('text'))


		## Changes name back.
		profile_first_name.click()
		profile_first_name.clear()
		profile_first_name.send_keys("example")
		wd.hide_keyboard()
		profile_last_name.click()
		profile_last_name.clear()
		profile_last_name.send_keys("Name")
		wd.hide_keyboard()
		apply_button.click()
		sleep(5)



