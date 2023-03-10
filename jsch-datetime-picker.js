// query
var inputElements=document.getElementsByClassName('jsch-datetime-picker');

// set unique ID for inputs
for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].setAttribute('id','jsch-'+(i+1));
}

for(const inputElement of inputElements) {
    
    const arr=[];
    inputElement.onclick = function() {
        jschRenderPicker();
    }

    function jschRenderPicker() {
        var UniqueId=inputElement.id;
        
        jschInsertBoxToPosition();
        jschChooser();

        var node = document.getElementById(`jsch-datetimepicker-${UniqueId}`);
        if(node) {
            node.style.display='inherit';
        }        
        
        document.getElementById('jsch-backstep-'+UniqueId).onclick = function() {
            jschBackStep();
        }         
        document.getElementById('jsch-close-'+UniqueId).onclick = function() {
            jschClose();
        }        
    }

    function jschInsertBoxToPosition() {
        var UniqueId=inputElement.id;
        
        //if exist
        var node = document.getElementById(`jsch-datetimepicker-${UniqueId}`);
        if(node) {
            node.style.display='inherit';
            document.getElementById(inputElement.id).value='';
            return;
        }
        
        var rect = document.getElementById(UniqueId).getBoundingClientRect();
        var inputHeight=document.getElementById(UniqueId).offsetHeight ;
        var t=rect.top+inputHeight+2;
        var l=rect.left;

        var div = document.createElement("div");
        var createdDiv=document.body.appendChild(div);

        createdDiv.innerHTML+=`<div class="jsch-datetime-picker-style jsch-noselect" id="jsch-datetimepicker-${UniqueId}" 
        style="top:${t}px;left:${l}px">
            <div class='jsch-datetime-picker-nav'>
                <div id='jsch-backstep-${UniqueId}'>Back</div>    
                <div id='jsch-choose-${UniqueId}'>Year</div>
                <div id='jsch-close-${UniqueId}'>Close</div>
            </div>
            <div class="jsch-datetimepicker-area" id="jsch-datetimepicker-area-${UniqueId}"></div>
        </div>`;
    }

    function jschAddInputValue() {
        var UniqueId=inputElement.id;
        
        var inputLength=document.getElementById(UniqueId).value;
        return inputLength;
    }

    function jschStepHandler() {   
        var inputLength=jschAddInputValue().length;

        switch(inputLength) {
            case 0: step=1; break;
            case 2: step=2; break;
            case 5: step=3; break;
            case 8: step=4; break;
            case 11: step=5; break;
            case 14: step=6; break;
            case 17: step=7; break;
        }
        return step;
    }

    function jschChooser() {
        var UniqueId=inputElement.id;

        var element=document.getElementById('jsch-datetimepicker-area-'+UniqueId);

        //if datetime, then 7 step choose, if date, then 4 step
        var node=document.getElementById(UniqueId).className;
        var nodeArr=node.split(" ");
        if((arr.length == 7 && nodeArr[1] == 'datetime') || (arr.length == 4 && nodeArr[1] == 'date')) {
            jschClose();
        }

        var arrayy=[
            ["Year",""],
            ["Year","-"],
            ["Month","-"],
            ["Day"," "],
            ["Hour",":"],
            ["Minute",":"],
            ["Seconds",""],
        ];

        var step=jschStepHandler();
        var sign=arrayy[step-1][1];
        var nextchoose=arrayy[step-1][0];

        element.innerHTML=jschSteps(step);

        document.getElementById(`jsch-choose-${UniqueId}`).innerHTML=nextchoose;
        var children=document.getElementById(`jsch-${step}-step-${UniqueId}`).children;  
            
        for(var child of children) {
            child.onclick = function(e) {         
                var inputval=jschAddInputValue();                                                      
                arr.push(inputval+e.target.innerText+sign);  
                jschStep();                   
            }
        }     

    }

    function jschBackStep() {
        arr.pop();
        jschRenderValue(arr)
        jschChooser(); 
    }

    function jschStep() {       
        jschRenderValue(arr); 
        jschChooser(); 
    }

    function jschClose() {           
        var node=document.getElementById('jsch-datetimepicker-'+inputElement.id);
        while(arr.length!=0) {
            arr.pop();
        }
        node.style.display ='none';    
    }

    function jschRenderValue(arr) {
        var str="";
        for(var elem of arr) {
            str=elem;
        }
        document.getElementById(inputElement.id).value=str;
    }

    function jschSteps(step) {
   
        switch(step) {
            case 1: first=1;last=2; break;
            case 2: first=0;last=99; break;
            case 3: first=1;last=12; break;
            case 4: first=1;last=jschGetDaysOfMonth(arr); break;
            case 5: first=0;last=23; break;
            case 6: first=0;last=59; break;
            case 7: first=0;last=59; break;
        }   

        var btns='';
        for(i=first;i<=last;i++) {
            if(i<10) {
                i='0'+i;
            }
            btns+=`<div>${i}</div>`;
        }

        str=`
            <div class='jsch-datetime-picker-${step}-step' id='jsch-${step}-step-${inputElement.id}'>
                ${btns}
            </div>
        `;
        
        if(step==1) {
            str=`
                <div class='jsch-datetime-picker-${step}-step' id='jsch-${step}-step-${inputElement.id}'>
                    <div>20</div>
                    <div>19</div>
                </div>
            `;
        }

        return str;    
    }
}

function jschGetDaysOfMonth(arr) {     
    var arr2=arr[2].split("-");
    int_d = new Date(arr2[0],arr2[1],1);
    d = new Date(int_d - 1);
    var day = d.getUTCDate();
    return day;
}