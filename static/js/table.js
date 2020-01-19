class table{
    parent;
    pdfheight;
    createSelector;
    table;
    colum;
    row;
    caption;
    header;
    Prop;
    check;
    removeProp;
    constructor(tCount,parent,Prop,removeProp){
        this.parent=parent;
        this.table=document.createElement("table");
        this.table.id=tCount;
        this.table.setAttribute("border","1px");
        this.colum=document.createElement("input");
        this.colum.id="colum";
        
        this.colum.addEventListener("change",this.Change.bind(this));
        
        this.colum.style.setProperty("width", "40px");
        this.row=document.createElement("input");
        this.row.addEventListener("change",this.Change.bind(this));
        
        this.row.id="row";
        this.row.style.setProperty("width","40px");
        this.header=document.createElement("label");
        this.check=document.createElement("input");
        this.check.type="checkbox";
        this.check.addEventListener("change",this.header.bind(this.table));
        this.header.innerHTML += "1行目を強調する";
        this.header.appendChild(check);
        this.Prop=Prop;
        this.removeProp=removeProp;
        this.Prop.appendChild(this.header);
        this.Prop.appendChild(new Text("行数"));
        this.Prop.appendChild(this.row);
        this.Prop.appendChild(new Text("列数"));
        this.Prop.appendChild(this.colum);
        this.parent.appendChild(Prop);
    }
    Change(e){
        var tab;
        var datas=[]; 
        var rows=[];
        if((tab=document.getElementById(this.table.id))!=null){
            for(var tr of tab.children){
                for(var td of tr.children){
                    rows.push(td.innerText);
                }
                datas.push(rows);
                rows=[];
            }

        }
        if(this.row.value!="" && this.colum.value!=""){
            if (document.getElementById(this.table.id)== null)
                this.parent.appendChild(this.table);
            else
                this.table.innerHTML=null;
            var rows=this.row.value
            var colums=this.colum.value;
            for (var rc = 0;rc<rows;rc++){
                var tr = document.createElement("tr");
                tr.id=rc;
                this.table.appendChild(tr);
                for(var cc=0;cc<colums;cc++){
                    var td=document.createElement("td");
                    td.id=rc.toString()+cc.toString();
                    if(datas[rc]!=undefined)
                        if(datas[rc][cc]!=undefined)
                            td.innerText=datas[rc][cc];
                        else
                            td.innerText = "a";
                    else
                        td.innerText = "a";
                    td.setAttribute("contenteditable","true");
                    this.table.children[rc].appendChild(td);
                }
            }  
            
        }

    }
    headered(e){
        var datas=[];
        var tr;
        for(var child of this.children){
            if(child.tagName=="TR"){
                tr=child;
                for(var data of child.children){
                    datas.push(data.id,data.innerText);
                    data.remove();   
                }
                break;
            }
        }
        console.log(e);
        
    }
}