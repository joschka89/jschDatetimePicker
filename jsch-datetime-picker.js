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
            node.classList.remove("hide-05");
            node.style.display='inherit';
            //document.getElementById(inputElement.id).value='';
            return;
        }
        
        var rect = document.getElementById(UniqueId).getBoundingClientRect();
        var inputHeight=document.getElementById(UniqueId).offsetHeight;
        var t=rect.top+inputHeight+2;
        var l=rect.left;
        let windowheight = window.innerHeight;
        if((windowheight-t) < 200) {
            var t=rect.top-200-2;
        }
        var div = document.createElement("div");
        var createdDiv=document.body.appendChild(div);

        createdDiv.innerHTML+=`<div class="jsch-datetime-picker-style jsch-noselect reveal-05" id="jsch-datetimepicker-${UniqueId}" 
        style="top:${t}px;left:${l}px">
            <div class='jsch-datetime-picker-nav'>
                <div id='jsch-backstep-${UniqueId}'>Back</div>    
                <div id='jsch-choose-${UniqueId}'>Year</div>
                <div id='jsch-close-${UniqueId}'>Close</div>
            </div>
            <div class="jsch-datetimepicker-area" id="jsch-datetimepicker-area-${UniqueId}"></div>
        </div>`;
    }

    function jschSteps(step) { 
        var str='';
        switch(step) {
            case 1: first=19;last=20; break;
            case 2: first=0;last=99; break;
            case 3: first=1;last=12; break;
            case 4: first=1;last=jschGetDaysOfMonth(arr); break;
            case 5: first=0;last=23; break;
            case 6: first=0;last=59; break;
            case 7: first=0;last=59; break;
        }   
        var btns='';
        for(i=first;i<=last;i++) {
            if(i<10) i='0'+i;
            btns+=`<div>${i}</div>`;
        }

            str=`<div class='jsch-datetime-picker-${step}-step' id='jsch-${step}-step-${inputElement.id}'>
                ${btns}
            </div>`; 
        

       
        return str;    
    }
    
    function jschRenderValue(arr) {
        var str="";
        for(var elem of arr) {
            str=elem;
        }
        document.getElementById(inputElement.id).value=str;
    }    

    function jschChooser() {
        var UniqueId=inputElement.id;

        var element=document.getElementById('jsch-datetimepicker-area-'+UniqueId);

        //if datetime, then 7 step choose, if date, then 4 step
        var node=document.getElementById(UniqueId).className;
        var nodeArr=node.split(" ");
        if((arr.length >= 7 && nodeArr[1] == 'datetime') || (arr.length >= 4 && nodeArr[1] == 'date')) {
            jschClose();
        } else {
            var step=jschStepHandler().Step;
            var sign=jschStepHandler().Delimiter;
            var select=jschStepHandler().Select;
    
            element.innerHTML=jschSteps(step);
            document.getElementById(`jsch-choose-${UniqueId}`).innerHTML=select;
            var children=document.getElementById(`jsch-${step}-step-${UniqueId}`).children;  
                
            for(var child of children) {
                child.onclick = function(e) {         
                    
                    var inputval=jschAddInputValue();                                                      
                    arr.push(inputval+e.target.innerText+sign);  
                    jschStep();                   
                    
                }
            }                 
        }
    }

    function jschStepHandler() {   
        var inputLength=jschAddInputValue().length;
        var step=1;

        var StepsObject= {
            0: {Step:1,Select:'Year',Delimiter:''},
            2: {Step:2,Select:'Year',Delimiter:'-'},
            5: {Step:3,Select:'Month',Delimiter:'-'},
            8: {Step:4,Select:'Day',Delimiter:' '},
            11: {Step:5,Select:'Hour',Delimiter:':'},
            14: {Step:6,Select:'Minute',Delimiter:':'},
            17: {Step:7,Select:'Seconds',Delimiter:''}
        }
        return StepsObject[inputLength];
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
        node.classList.add("hide-05"); 
        setTimeout(() =>{
            node.classList.remove("reveal-05"); 
            node.style.display ='none';
        }, 450);  
    }

    function jschAddInputValue() {     
        var inputLength=document.getElementById(inputElement.id).value;
        return inputLength;
    }
}

function jschGetDaysOfMonth(arr) {     
    var arr2=arr[2].split("-");
    int_d = new Date(arr2[0],arr2[1],1);
    d = new Date(int_d - 1);
    var day = d.getUTCDate();
    return day;
}