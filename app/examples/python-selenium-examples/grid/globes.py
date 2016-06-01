# Global Variables
class globes:
	def __init__(self, number):
		self.number = number

	base_url = "https://google.com"


	desired_cap = []
	desired_cap.append ({'browserName':'chrome', 'javascriptEnabled':'true', 'version':'', 'platform':'ANY'})
	# desired_cap.append ({'browserName':'safari', 'javascriptEnabled':'true', 'version':'', 'platform':'ANY'})
	desired_cap.append ({'browserName':'firefox', 'javascriptEnabled':'true', 'version':'', 'platform':'ANY'})
	# desired_cap.append ({'browserName':'internet explorer', 'javascriptEnabled':'true', 'version':'9', 'platform':'ANY'})
	selenium_server_url = 'http://127.0.0.1:4444/wd/hub'