import time
from selenium import webdriver
from selenium.webdriver.chrome import options
import os
def getScreenshot(url:str):
    osName=os.name
    dirName:str
    ext:str
    filename=url
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
    _options.add_argument("--window-size=1920,1080")

    driver=webdriver.Chrome(executable_path="/usr/bin/chromedriver",options=_options)
    driver.get(url)
    time.sleep(3)
    driver.save_screenshot(filename+".png")
    driver.quit()
    return filename
def createPdf(filename:str):
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import A4, portrait
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib.units import mm
    
    font="/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf"
    pdf=canvas.Canvas(filename+".pdf",pagesize=portrait(A4))
    pdfmetrics.registerFont(TTFont("Gothic",font))
    pdf.setFont("Gothic",size=20)
    pdf.drawImage("test.png",50*mm,50*mm,width=300,height=225)
    pdf.showPage()
    pdf.save()


if __name__=='__main__':
    createPdf("test")
    

    