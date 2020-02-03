import time
from selenium import webdriver
from selenium.webdriver.chrome import options
_options=options.Options()
_options.binary_location="/workspace/webApp_school/chromium-browser"
_options.add_argument("--headless")
# _options.add_argument('disable-infobars')
_options.add_argument('--no-sandbox')
_options.add_argument("--window-size=1920,1080")

driver=webdriver.Chrome(executable_path="./chromedriver",options=_options)
driver.get("https://chromedriver.chromium.org/downloads")
time.sleep(3)
driver.save_screenshot("test.png")
driver.quit()