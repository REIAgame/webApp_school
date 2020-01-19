class menuList{
    liCount;
    parent;
    addList;
    delList;
    Prop;
    ul;
    comp;
    input;
    pdfheight;
    removeProp;
    /**
     * 
     * @param {HTMLElement} parent HTMLElement for this class element 
     * @param {function} func function for bind li created by this class
     * @param {int} uCount id for this ul 
     */
    constructor(parent,uCount,Prop,removeProp){
        this.Prop=Prop;
        this.removeProp=removeProp;
        this.parent=parent;
        this.pdfheight=0;
        this.liCount=0;
        this.input = document.createElement("input");
        this.input.style.setProperty("float", "left");
        this.input.style.setProperty("border", "solid 2px black");
        this.input.placeholder = "テキストを入力";
        // this.input.addEventListener("focusout",this.valueChange.bind(this));
        this.addList=document.createElement("button");
        this.addList.addEventListener("click",this.createList.bind(this));
        this.Prop.appendChild(this.addList);
        this.delList=document.createElement("button");
        this.addList.innerHTML="リスト項目を追加";
        this.delList.innerHTML="リスト項目を削除";
        this.ul=document.createElement("ul");
        this.ul.id="u"+uCount;
        
        this.parent.appendChild(this.ul);
        this.createList();
        
        this.parent.insertBefore(this.Prop, document.getElementById(this.ul.id + (this.liCount - 1)).nextElementSibling);
    }
    /**
     *  @description li tag create and return;
     * @returns {HTMLElement} li tag
     */
    createList(){
        var li=document.createElement("li");
        li.addEventListener("click",this.showProperty.bind(this));
        li.innerHTML="サンプルテキスト";
        li.id=this.ul.id+this.liCount;
        this.liCount++;
        this.ul.appendChild(li);
        if(this.pdfheight!=0){
            this.pdfheight += 24;
            this.parent.style.height = String(this.pdfheight) + "px";
        }
    }
    showProperty(e){
        this.removeProp(this.Prop);
        this.Prop.appendChild(this.addList);
        var delbutton=this.delList;
        delbutton.id="d,"+e.srcElement.id;
        delbutton.addEventListener("click",this.ListDel.bind(this));
        this.Prop.appendChild(delbutton);
        this.tempElement=e.srcElement;
        this.tempElement.setAttribute("contenteditable","true");
        this.parent.insertBefore(this.Prop,e.path[1].nextElementSibling);
    }
    ListDel(e){
        document.getElementById(e.srcElement.id.split(",")[1]).remove();
        if(document.getElementById(e.srcElement.id.split(",")[1][0]).children.length==0){
            this.addList.remove();
            this.ul.remove();
            e.srcElement.remove();
        }
        
        delete this;
    }
    /**
     * 
     * @param {int} height parents height of this instance  
     */
    setHeight(height){
        this.pdfheight=height;
    }

    
}