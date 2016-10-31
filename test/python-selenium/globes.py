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

	def edge_trottle_on():
		process = subprocess.Popen('mode=Edge osascript ~/Documents/Tools/thottle_on_nlc.scpt', shell=True, stdout=subprocess.PIPE)
		process.wait()
		print process.returncode

	def throttle_off():
		process = subprocess.Popen('osascript ~/Documents/Tools/throttle_off_nlc.scpt', shell=True, stdout=subprocess.PIPE)
		process.wait()
		print process.returncode