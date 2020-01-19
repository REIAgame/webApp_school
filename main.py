from flask import Flask,render_template,request,Blueprint
import os
app=Flask(__name__)
app.register_blueprint(Blueprint("UPimage",__name__,static_url_path="/UPimage",static_folder="./UPimage"))
@app.route("/")
def main():
    return render_template("index.html")
@app.route("/",methods=["POST"])
def image():
    value=request.form.get("pdf")
    value2=request.files["image"]
    filename=value2.filename
    value2.save("UPimage/"+filename)
    
def createPdf():
    pass
if __name__=="__main__":
    app.run(host="127.0.0.1",port=3000)