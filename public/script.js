if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", fetchSessionData);
    window.onbeforeunload= function(event) {
        const newTable= new Array(); 
       
        if (typeof Objects !== "undefined" && Objects.length > 0) {
            for(let i = 0; i < Objects.length; i++){
                namep=Objects[i][0];
                qtyp=Objects[i][1];
                pricep=Objects[i][2];
                newTable.push([namep,qtyp,pricep,Objects[i][3]]);
            }
        localStorage.setItem('obj',JSON.stringify(newTable));
        }
    };


    let Objects=[window.onload = function () {
        if (localStorage.getItem("obj") === '[[null,null,null,"l"]]' ||localStorage.getItem("obj") ==='[]' || localStorage.getItem("obj") ===null) {
            const saved=new Array();
            window.localStorage.clear('obj');
            return(saved);

        }
        else{
            let fromStorage =JSON.parse(localStorage.getItem("obj"));
            for(i=0;i<fromStorage.length;i++){
                Objects.push([fromStorage[i][0],parseInt(fromStorage[i][1]),fromStorage[i][2],fromStorage[i][3]]);
            }
            updateItems(Objects);

        }
    }];
    Objects.shift();

    function updateItems(Objects){
        let table= document.querySelector(".shopping-cart tbody");
        table.innerHTML="";

        for(i=0;i<Objects.length;i++){
            let tableRef = document.querySelector(".shopping-cart tbody");            
            let newRow = tableRef.insertRow(-1);

            let newName =document.createTextNode(Objects[i][0]);
            let newQty = document.createTextNode(Objects[i][1]);
            let newPrice =document.createTextNode(Objects[i][2]);
            let id= Objects[i][3];

            let newCell0=newRow.insertCell(0);
            newCell0.appendChild(newName);
            let newCell1=newRow.insertCell(1);
            newCell1.appendChild(newQty);
            let newCell2=newRow.insertCell(2);
            newCell2.appendChild(newPrice);
            
            let newCell3=newRow.insertCell(3)
            let newBtn= document.createElement("button");
            newBtn.innerHTML="X";
            newBtn.className="deleteButton";
            newCell3.appendChild(newBtn); 
            newBtn.addEventListener("click",function(btnevent){
                var i = btnevent.target.parentNode.parentNode.rowIndex;
                document.querySelector(".shopping-cart").deleteRow(i);
                let delName=btnevent.target.parentNode.parentNode.childNodes[0].firstChild.data;
                for(let k=0;k<Objects.length;k++){
                    if(Objects[k][0]===delName){
                        Objects.splice(k, 1);                        
                    }
                }
                updateItems(Objects);
                var j= document.getElementById(id);
                if (j==null){return};
                j.childNodes[3].childNodes[1].childNodes[3].childNodes[0].value= 0;
                
            })
            
            try{
                var j= document.getElementById(id);
                j.childNodes[3].childNodes[1].childNodes[3].childNodes[0].value=parseInt(Objects[i][1]);
        
            }catch(err){
                    console.log("not in page")
            }
        }
        let total=0;
        st=document.getElementById("stotal");
        st.innerHTML="";
        for(k=0;k<Objects.length;k++){
            total+=parseInt(Objects[k][2])
        }
        total=(total).toFixed(2)+'€';
        st.appendChild(document.createTextNode(total));
        
        window.localStorage.clear();
    }


    function plusButton(element){
        console.log("PLUSBUTTON")
        console.log(element.offsetParent.offsetParent.childNodes[1].childNodes[1].childNodes[0].data)
        console.log(element.offsetParent.offsetParent.id)
        element.parentNode.querySelector('input[type=number]').stepUp();
        let name=element.offsetParent.offsetParent.childNodes[1].childNodes[1].childNodes[0].data;
        let price=element.offsetParent.offsetParent.childNodes[1].childNodes[7].textContent;
        let quantity= parseInt(element.previousElementSibling.firstChild.value);
        console.log(quantity)
        let id= element.offsetParent.offsetParent.id;
        let exists=0;
        let addtable= document.querySelector(".shopping-cart tbody");
        console.log(element.offsetParent)
        if (addtable.children.length>0 ){
            for(i=0;i<addtable.children.length;i++){
            
                let newN=addtable.children[i].childNodes[0].childNodes[0].data;
                if(name==newN)
                {   
                    exists=1;
                    addtable.children[i].childNodes[1].childNodes[0].data = parseInt(addtable.childNodes[i].childNodes[1].childNodes[0].data) +1 ;
                    for(let m=0;m<Objects.length;m++){
                        if(Objects[m][0]===newN){
                            let oldQty=Objects[m][1];
                            Objects[m][1]=parseInt(Objects[m][1])+1;
                            Objects[m][2]= (parseFloat(Objects[m][2])*Objects[m][1]/oldQty).toFixed(2);
                            Objects[m][2] = Objects[m][2] +'€'; 
                            updateItems(Objects);
                        }
                        
                    }
                    break;
                }
                else{
                    continue;
                }
                
                
            }
            if(exists==0){
                addRow(name,Number(quantity),price,id);
                updateItems(Objects);
            }
        }
        else{
            addRow(name,parseInt(quantity),price,id);
            updateItems(Objects);
        }
    }

    function minusButton(element){
        element.parentNode.querySelector('input[type=number]').stepDown();
        console.log(element.offsetParent.offsetParent.childNodes[1].childNodes[1].childNodes[0].data)
        console.log(element.offsetParent.offsetParent.childNodes[1].childNodes[7].textContent)

        let name= element.offsetParent.offsetParent.childNodes[1].childNodes[1].childNodes[0].data;
        let price=element.offsetParent.offsetParent.childNodes[1].childNodes[7].textContent;
        let quantity= element.previousSibling.nextSibling.nextElementSibling.firstChild.value;
        let id= element.offsetParent.id;
        let table= document.querySelector(".shopping-cart tbody");
        if (table.childNodes.length>0){
            for(i=0;i<table.childNodes.length;i++){
                
                
                let newN=table.childNodes[i].firstChild.lastChild.data;
                if(name==newN)
                {
                    table.children[i].childNodes[1].childNodes[0].data = parseInt(table.childNodes[i].childNodes[1].childNodes[0].data) -1 ;
                    if( parseInt(table.children[i].childNodes[1].childNodes[0].data)==0){
                        let row= table.children[i];
                        row.parentNode.removeChild(row);

                        for (let l=0;l<Objects.length;l++) {
                            if (Objects[l][3] == id) {
                                Objects.splice(l, 1);
                            }
                        }
                        updateItems(Objects);
            
                    }
                    else{
                        for(let m=0;m<Objects.length;m++){
                            if(Objects[m][0]===newN){
                                oldQty=Objects[m][1]
                                Objects[m][1]=parseInt(Objects[m][1])-1;
                                Objects[m][2]= (parseFloat(Objects[m][2])*Objects[m][1]/oldQty).toFixed(2);
                                Objects[m][2] = Objects[m][2] +'€'; 
                                updateItems(Objects);
                            }
                        }
                    }
                }
            }
        }
                
        
    }

    function addRow(name,qty,price,id) {

        let tableRef = document.querySelector(".shopping-cart tbody");
    
        let newRow = tableRef.insertRow(-1);
    
        let newName =document.createTextNode(name);
        let newCell0=newRow.insertCell(0);
        newCell0.appendChild(newName);
    
        let newQty = document.createTextNode(qty);
        let newCell1=newRow.insertCell(1);
        newCell1.appendChild(newQty);

        let newPrice = document.createTextNode(price);
        let newCell2=newRow.insertCell(2);
        newCell2.appendChild(newPrice);
        
        let newCell3=newRow.insertCell(3)
        let newBtn= document.createElement("button");
        newBtn.innerHTML="X";
        newBtn.className="deleteButton";
        newCell3.appendChild(newBtn); 
        newBtn.addEventListener("click",function(btnevent){
            var i = btnevent.target.parentNode.parentNode.rowIndex;
            document.querySelector(".shopping-cart").deleteRow(i);
            let delName=btnevent.target.parentNode.parentNode.childNodes[0].firstChild.data;
            try{
            var j= document.getElementById(id);
            j.childNodes[3].childNodes[1].childNodes[3].childNodes[0].value= 0;
            }catch(err){
                console.log("not in page")
            }
            for(let k=0;k<Objects.length;k++){
                if(Objects[k][0]===delName){
                    Objects.splice(k, 1);
                    break;
                    
                }
            
            }
            updateItems(Objects);
            
        })
        
        const newObj= new Array(newName.data,newQty.data,newPrice.data,id);
        Objects.push(newObj);

    }

    function submitOrder(event){
        let cart= Objects;
        // console.log(JSON.stringify(cart))
        console.log(cart);
        const formData = new FormData(document.getElementById('checkout-order-form'));
        formData.forEach((value,key)=>{console.log(value)})

        // Create an object to hold the data
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value; // Store each form field in the data object
        });


        $.ajax({
            type: "POST",
            url: "/submitOrder", // The backend route where you will process the order
            data: JSON.stringify(cart), // Send as JSON
            contentType: "application/json",
            success: function(response) {
                alert("Order submitted successfully!");
                // Clear the cart after successful submission
                emptyCart();
            },
            error: function(error) {
                console.error(error);
                alert("Error submitting the order.");
            }
        });
        




    }


    function emptyCart(){
        let total=0;
        st=document.getElementById("stotal");
        tb=document.querySelector(".shopping-cart tbody");
        st.innerHTML="";
        tb.innerHTML="";
        Objects=[];
        updateItems(Objects);
        for(id=0;id<23;id++){
            var j= document.getElementById(id);
            if (j==null){continue};
            j.childNodes[3].childNodes[1].childNodes[3].childNodes[0].value= 0;
        }
    }




    async function fetchSessionData() {
        try {
            const response = await fetch('/sessionData'); 
            const email = await response.json();

            if (email) {
                document.getElementById('user-info').innerHTML = `<p>${email}</p>`;
            } else {
                document.getElementById('user-info').innerHTML = `
                    <p>You are not logged in.</p>
                `;
            }
        } catch (error) {
            console.error('Error fetching session data:', error);
        }
    }




}