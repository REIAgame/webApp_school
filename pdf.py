import time
from selenium import webdriver
from selenium.webdriver.chrome import options
import os
import math
from reportlab.lib.pagesizes import A4, portrait
def getScreenshot(url:str):
    osName=os.name
    dirName:str
    ext:str
    filename=url.split("/")[2][0:10]
    if osName =='nt':
        dirName="drivers/win/chromium/"
        ext=".exe"
    elif osName=='posix':
        dirName='drivers/linux/chrome-linux/'
        ext=""
    _options=options.Options()
    _options.binary_location="/usr/bin/chromium-browser"
    _options.add_argument("--headless")
    _options.add_argument('disable-infobars')
    _options.add_argument('--no-sandbox')
    _options.add_argument('--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"')
    _options.add_argument("--window-size=1920,1080")

    driver=webdriver.Chrome(executable_path="/usr/bin/chromedriver",options=_options)
    driver.get(url)
    time.sleep(3)
    # element=driver.find_element_by_id("hplogo")
    # driver.execute_script("arguments[0].remove();",element)
    time.sleep(2)
    driver.save_screenshot(filename+".png")
    driver.quit()
    return filename+".png"
def createPdf(filename:str):
    from reportlab.pdfgen import canvas

    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib.units import mm
    
    font="/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf"
    pdf=canvas.Canvas(filename+".pdf",pagesize=portrait(A4))
    pdfmetrics.registerFont(TTFont("Gothic",font))
    pdf.setFont("Gothic",size=20)
    width=math.floor(A4[0])
    height=(width/16)*9
    pdf.drawImage(filename,0,A4[1]-height,width=width,height=height)
    pdf.showPage() 
    pdf.save()


    