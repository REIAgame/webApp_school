from flask import Flask,render_template,request,Blueprint

import pdfkit
import os

import pprint

app=Flask(__name__,instance_path='/workspace/webApp_school/UPimage',instance_relative_config=True)
app.register_blueprint(Blueprint("UPimage",__name__,static_url_path="/UPimage",static_folder="./UPimage"))
pdf=[""]
@app.route("/")
def main():
    return render_template("index.html")
@app.route("/",methods=["POST"])
def image():
    value=request.form.get("pdf")
    value2=request.files["image"]
    filename=value2.filename
    value2.save("UPimage/"+filename)
    return render_template("index.html",pdf=value,img='<img src="UPimage/'+filename+'">')
@app.route("/completed",methods=["POST","GET"])
def createPdf():
    if request.method=="POST":
        pdf[0]=request.form["pdf"]
        return ""
    else:
        sendfi
        pdfkit.from_file("templates/tmp.html","static/test.pdf")
        return ""
        # return render_template("tmp.html",pdf=pdf[0])
def listStr(StringList:list):
    target=os.listdir()
    result=""
    for i in target:
        result=result+i+"<br>"
    return result
if __name__=="__main__":
    app.run("127.0.0.1",8000)