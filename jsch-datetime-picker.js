const inputElements=document.getElementsByClassName('jsch-datetime-picker');
console.log(inputElements);

for(var inputElement of inputElements) {
    
    var e=0;

    const arr=[];
    inputElement.onclick = function() {
        jschRenderPicker();
    }

    function jschRenderPicker() {
        jschInsertBoxToPosition();
        jschChooser();
        
        document.getElementById('jsch-backstep-'+e).onclick = function() {
            jschBackStep();
        }         
        document.getElementById('jsch-close-'+e).onclick = function() {
            jschClose();
        }        
    }

    function jschInsertBoxToPosition() {
        var rect = inputElement.getBoundingClientRect();
        var inputHeight=inputElement.offsetHeight ;
        var t=rect.top+inputHeight+2;
        var l=rect.left;
        document.body.innerHTML+=`<div class="jsch-datetime-picker-style" id="datetimepicker-${e}" 
        style="top:${t}px;left:${l}px">
            <div class='jsch-datetime-picker-nav'>
                <div id='jsch-backstep-${e}'><</div>    
                <div id='jsch-choose-${e}'>Year</div>
                <div id='jsch-close-${e}'>x</div>
            </div>
            <div class="jsch-datetimepicker-area" id="jsch-datetimepicker-area-${e}"></div>
        </div>`;
    }

    function jschAddInputValue() {
        var inputLength=inputElement.value;
        return inputLength;
    }

    function jschStepHandler() {   
        var inputLength=jschAddInputValue().length;
        var id;
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
        var element=document.getElementById('jsch-datetimepicker-area-'+e);
        var arrayy=[
            ["Year",""],
            ["Month","-"],
            ["Day","-"],
            ["Hour"," "],
            ["Minute",":"],
            ["Seconds",":"],
            ["",""],
        ];
        
        var step=jschStepHandler();
        var sign=arrayy[step-1][1];
        var nextchoose=arrayy[step-1][0];

        element.innerHTML=jschSteps(step);

        var children=document.getElementById(`jsch-${step}-step-${e}`).children;   
            
        for(var child of children) {
            child.onclick = function(e) {         
                var inputval=jschAddInputValue();          
                //document.getElementById('jsch-choose-'+e).innerHTML=nextchoose;                                             
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
        document.getElementById('datetimepicker-'+e).remove;
        //arr=[];
        jschRenderValue(arr); 
        jschChooser();     
    }

    function jschRenderValue(arr) {
        var str="";
        for(var elem of arr) {
            str=elem;
        }
        inputElement.value=str;
    }

    function jschSteps(step) {
        
        switch(step) {
            case 1: first=1;last=2; break;
            case 2: first=1;last=100; break;
            case 3: first=1;last=12; break;
            case 4: first=1;last=31; break;
            case 5: first=0;last=24; break;
            case 6: first=0;last=60; break;
            case 7: first=0;last=60; break;
        }   

        var btns='';
        for(i=first;i<=last;i++) {
            if(i<10) {
                i='0'+i;
            }
            btns+=`<div>${i}</div>`;
        }

        str=`
            <div class='jsch-datetime-picker-${step}-step' id='jsch-${step}-step-${e}'>
                ${btns}
            </div>
        `;
        
        if(step==1) {
            str=`
                <div class='jsch-datetime-picker-${step}-step' id='jsch-${step}-step-${e}'>
                    <div>19</div>
                    <div>20</div>
                </div>
            `;
        }

        return str;    
    }

    e++;
}
