var headerCount=0;
var pCount=0;
var uCount=0;
var tCount=0;
var pdfHeight;
var pdf;
var current=[];
var ulList=[];
var tempElement;
var headerSelector = createSelector("hSelect", { "h1": "見出し1", "h2": "見出し2", "h3": "見出し3", "h4": "見出し4", "h5": "見出し5", "h6": "見出し6"})
var input=document.createElement("input");
input.style.setProperty("float","left");
input.style.setProperty("border","solid 2px black");
input.placeholder="テキストを入力";
var complted;
var menu=[];
var propertyBox=document.createElement("div");
propertyBox.style.setProperty("float","right");
propertyBox.style.setProperty("margin-right","20%");
complted=document.createElement("button");
complted.innerHTML="確定";
complted.addEventListener("click",complete.bind(input));
window.onload=function(){
    headerCount=0;
    pdf=this.document.getElementById("pdf");
    for(var i=0;i<this.document.getElementById("menu").children.length;i++){
        if(this.document.getElementById("menu").children[i].tagName=="LI"){
            this.menu.push(this.document.getElementById("menu").children[i]);
        }
    }
    this.console.log("a");
    this.pdfHeight = Number(window.getComputedStyle(pdf, null).height.split("p")[0]);
    menu[0].addEventListener("click",function(){
       var header =document.createElement("h1");
       header.innerHTML="見出し１";
    //    var pdf=document.getElementById("pdf");
       header.id="h"+headerCount;
       headerCount++;
       header.setAttribute("contenteditable","ture");
       header.addEventListener("click",showProperty);
       pdf.appendChild(header);
        pdfHeight += Number(window.getComputedStyle(header, null).height.split("p")[0]) + 
            Number(window.getComputedStyle(header, null).marginTop.split("p")[0])+
            Number(window.getComputedStyle(header, null).marginBottom.split("p")[0]);
       pdf.style.height=String(pdfHeight)+"px";
    });
    menu[1].addEventListener("click",function(){
        console.log(this)
        var p=document.createElement("p");
        p.innerHTML="サンプルテキスト";
        p.id="p"+pCount;
        p.addEventListener("click",showProperty);
        pCount++;
        pdf.appendChild(p);
        pdfHeight += Number(window.getComputedStyle(p, null).height.split("p")[0]) + Number(window.getComputedStyle(p, null).marginTop.split("p")[0]) + Number(window.getComputedStyle(p, null).marginBottom.split("p")[0]);
        pdf.style.height=String(pdfHeight)+"px";
    });
    this.menu[2].addEventListener("click",function(){
        var ul=new menuList(pdf,uCount,propertyBox,removeProperty);
        pdfHeight += Number(window.getComputedStyle(document.getElementById(uCount.toString() + (ul.liCount - 1)), null).height.split("p")[0]) + (Number(window.getComputedStyle(document.getElementById("u"+uCount), null).marginTop.split("p")[0])*2);
        pdf.style.height=String(pdfHeight)+"px";
        ul.setHeight(pdfHeight);
        uCount++;
    })
    this.menu[3].addEventListener("click",function(){
        var tables=new table(tCount,pdf,propertyBox,removeProperty);
    })
    this.menu[4].addEventListener("click",function(){
        document.getElementById("getImage").click();
    });
    this.document.getElementById("getImage").addEventListener("change",function(e){
        document.getElementById("getPdf").value=this.pdf.innerHTML;
        document.getElementById("imageForm").submit();
    }.bind(this));
    this.document.getElementById("completed").onclick=function(){
        this.removeProperty(this.propertyBox);
        if(document.getElementById("html").value!=""){
            localStorage.setItem("pdf",document.getElementById("html").value);
        }else{
            localStorage.setItem("pdf",this.pdf.innerHTML);
        }
        window.open("tmp.html","_blank");
        

    }.bind(this);
}
/**
 * @param {String} id select tag id
 * @param {Dictionary} value <String,String> option Tag value,option tag display value;
 * @return {HTMLElement} selector
 */
function createSelector(id,value={}){
    var select=document.createElement("select");
    select.id=id;
    for(var v in value){
        var option=document.createElement("option");
        option.setAttribute("value",v);
        option.innerHTML=value[v];
        select.appendChild(option);
    }
    return select;
}
/**
 * 
 * @param {Array} tag used limited process exmaple button tag 
 */
function showProperty(e){
    console.log(this);
    removeProperty(propertyBox);
    this.setAttribute("contenteditable","true");
    tempElement = this;
    switch(this.tagName[0]){
        case "H":
            // pdf.insertBefore(input, this.nextElementSibling);
            propertyBox.appendChild(headerSelector);
            propertyBox.appendChild(complted);
            pdf.insertBefore(propertyBox,this.nextElementSibling);
            // pdf.insertBefore(complted,headerSelector.nextElementSibling);
            // input.focus();
            // current.push(input,headerSelector,complted);
            break;
        case "P":
            break;
        default:
            break;
    }
}
headerSelector.addEventListener("change", function(e){
    var tmp=document.createElement(e.srcElement.value);
    tmp.id=tempElement.id;    
    tmp.innerHTML=tempElement.innerHTML;
    tmp.addEventListener("click",showProperty);
    document.getElementById(tempElement.id).remove();
    pdf.insertBefore(tmp,this.propertyBox);
    tempElement=tmp;
}.bind(this));
function complete(){
    if(this.value!="")
        tempElement.innerHTML=this.value;
    this.value=null;
    while ((t = current.pop()) != undefined) {
        t.remove();
    }
}
function removeProperty(propertyBox){
    propertyBox.innerHTML=null;
    propertyBox.remove();   
}