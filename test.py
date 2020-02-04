import time
from selenium import webdriver
from selenium.webdriver.chrome import options
import os
osName=os.name
dirName:str
ext:str

if osName =='nt':
   dirName="drivers/win/chromium/"
   ext=".exe"
elif osName=='posix':
    dirName='drivers/linux/chrome-linux/'
    ext=""
_options=options.Options()
_options.binary_location=dirName+"chrome"+ext
_options.add_argument("--headless")
_options.add_argument('disable-infobars')
_options.add_argument('--no-sandbox')
_options.add_argument("--window-size=1920,1080")

driver=webdriver.Chrome(executable_path=dirName+"chromedriver",options=_options)
driver.get("https://chromedriver.chromium.org/downloads")
time.sleep(3)
driver.save_screenshot("test.png")
driver.quit()
