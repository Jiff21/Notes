# Global Variables
class globes:
	def __init__(self, number):
		self.number = number

	base_url = "http://0.0.0.0:9000/Views"

	default_window_size = '800, 500'
	default_window_position = '200, 200'
	
	desired_cap = []
	desired_cap.append ({'browserName':'chrome', 'javascriptEnabled':'true', 'version':'', 'platform':'ANY', 'loggingPrefs': { 'browser':'ALL' }})
	# Not sure if Logging Pref works for all browseers. Investigate later.
	# desired_cap.append ({'browserName':'safari', 'javascriptEnabled':'true', 'version':'', 'platform':'ANY', 'loggingPrefs': { 'browser':'ALL' }})
	# desired_cap.append ({'browserName':'firefox', 'javascriptEnabled':'true', 'version':'', 'platform':'ANY', 'loggingPrefs': { 'browser':'ALL' }})
	# desired_cap.append ({'browserName':'internet explorer', 'javascriptEnabled':'true', 'version':'9', 'platform':'ANY', 'loggingPrefs': { 'browser':'ALL' }})
	selenium_server_url = 'http://127.0.0.1:4444/wd/hub'