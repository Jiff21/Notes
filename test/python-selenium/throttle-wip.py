import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from globes import *
## Imports for triggering cl process. From http://stackoverflow.com/questions/325463/launch-a-shell-command-with-in-a-python-script-wait-for-the-termination-and-ret
import subprocess


# Think this should run the process. Need to change the command to what you want to run.
process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
process.wait()
print process.returncode