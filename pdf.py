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
    #デバッグ
    driver.add_cookie({"name":"user_session","value":"Nkol2HUYQ1-pNTst_hLG9eMtHz_s-HAla9CdPV-1Ux","domain":"github.com"})
    driver.add_cookie({"name":"_gitpod_io_ws_c27d6d51-650e-481d-8163-9a2085f1b5aa_port_auth_","value":"ae02b11c-f281-4f56-8309-e5455188d7d2","domain":"gitpod.io"})
    driver.add_cookie({"name":"_gitpod_io_ws_c5fa4079-a33f-4f64-865f-afa53876c06d_port_auth_","value":"bb82e227-8da8-4f35-a9f3-6c0fb9362a79","domain":"gitpod.io"})
    #end
    
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


    