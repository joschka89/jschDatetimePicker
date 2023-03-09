const inputElement=document.getElementById('jsch-datetime-picker');

inputElement.onfocus = function() {
    jschRenderPicker();
}

function jschRenderPicker() {
    jschInsertToPosition();
    jschChooser();
    /*document.getElementById('jsch-close').onclick = function() {
        document.getElementById('datetimepicker').remove();
    } */
}

function jschInsertToPosition() {
    var rect = inputElement.getBoundingClientRect();
    var inputHeight=inputElement.offsetHeight ;
    var t=rect.top+inputHeight+2;
    var l=rect.left;
    document.body.innerHTML+=`<div class="jsch-datetime-picker" id="datetimepicker" 
    style="top:${t}px;left:${l}px">
        <div class='jsch-datetime-picker-nav'>
            <div id='jsch-choose'>Year</div>
            <div id='jsch-close'>x</div>
        </div>
        <div class="jsch-datetimepicker-area" id="jsch-datetimepicker-area"></div>
    </div>`;
}

function jschAddInputValue() {
    var inputLength=document.getElementById('jsch-datetime-picker').value;
    return inputLength;
}

function jschStepHandler() {   
    var inputLength=jschAddInputValue().length;
    var id;
    switch(inputLength) {
        case 0: id='jsch-first-step'; break;
        case 2: id='jsch-second-step'; break;
        case 5: id='jsch-third-step'; break;
        case 8: id='jsch-fourth-step'; break;
        case 11: id='jsch-fifth-step'; break;
        case 14: id='jsch-sixth-step'; break;
        case 17: id='jsch-seventh-step'; break;
        case 19: id='end'; break;
    }
    return id;
}

function jschChooser() {
    var element=document.getElementById('jsch-datetimepicker-area');

    var id=jschStepHandler();
    var sign="";
    var nextchoose="Year";
    if(id=='jsch-first-step') {
        element.innerHTML=jschFirstStepChoose();
        nextchoose="Year";
        sign="";
    }
    if(id=='jsch-second-step') {
        element.innerHTML=jschSecondStepChoose();
        nextchoose="Month";
        sign="-";
    }
    if(id=='jsch-third-step') {
        element.innerHTML=jschThirdStepChoose();
        nextchoose="Day";
        sign="-";
    }
    if(id=='jsch-fourth-step') {
        element.innerHTML=jschFourthStepChoose();
        nextchoose="Hour";
        sign=" ";
    }
    if(id=='jsch-fifth-step') {
        element.innerHTML=jschFifthStepChoose();
        nextchoose="Minute";
        sign=":";
    }
    if(id=='jsch-sixth-step') {
        element.innerHTML=jschSixthStepChoose();
        nextchoose="Second";
        sign=":";
    }    
    if(id=='jsch-seventh-step') {
        element.innerHTML=jschSeventhStepChoose();
        nextchoose="";
        sign="";
    }    
    if(id!='end') {
        var children=document.getElementById(id).children;   
        
        for(var child of children) {
            child.onclick = function(e) {         
                var inputval=jschAddInputValue();          
                document.getElementById('jsch-choose').innerHTML=nextchoose;                
                document.getElementById('jsch-datetime-picker').value=inputval+e.target.innerText+sign;                
                jschChooser();                  
            }
        }     
    } else {
        document.getElementById('datetimepicker').remove();
    }   
}

function jschFirstStepChoose() {
    str=`
        <div class='jsch-datetime-picker-first-step' id='jsch-first-step'>
            <div>19</div>
            <div>20</div>
        </div>
    `;
    return str;
}

function jschSecondStepChoose() {  
    var btns='';
    for(i=1;i<100;i++) {
        if(i<10) {
            i='0'+i;
        }
        btns+=`<div>${i}</div>`;
    }    
    str=`
        <div class='jsch-datetime-picker-second-step' id='jsch-second-step'>
            ${btns}
        </div>
    `;
    return str;
}

function jschThirdStepChoose() {  
    var btns='';
    for(i=1;i<=12;i++) {
        if(i<10) {
            i='0'+i;
        }
        btns+=`<div>${i}</div>`;
    }    
    str=`
        <div class='jsch-datetime-picker-third-step' id='jsch-third-step'>
            ${btns}
        </div>
    `;
    return str;
}


function jschFourthStepChoose() {  
    var btns='';
    for(i=1;i<=31;i++) {
        if(i<10) {
            i='0'+i;
        }
        btns+=`<div>${i}</div>`;
    }    
    str=`
        <div class='jsch-datetime-picker-fourth-step' id='jsch-fourth-step'>
            ${btns}
        </div>
    `;
    return str;
}

function jschFifthStepChoose() {  
    var btns='';
    for(i=1;i<24;i++) {
        if(i<10) {
            i='0'+i;
        }
        btns+=`<div>${i}</div>`;
    }    
    str=`
        <div class='jsch-datetime-picker-fifth-step' id='jsch-fifth-step'>
            ${btns}
        </div>
    `;
    return str;
}


function jschSixthStepChoose() {  
    var btns='';
    for(i=0;i<60;i++) {
        if(i<10) {
            i='0'+i;
        }
        btns+=`<div>${i}</div>`;
    }    
    str=`
        <div class='jsch-datetime-picker-sixth-step' id='jsch-sixth-step'>
            ${btns}
        </div>
    `;
    return str;
}

function jschSeventhStepChoose() {  
    var btns='';
    for(i=0;i<60;i++) {
        if(i<10) {
            i='0'+i;
        }
        btns+=`<div>${i}</div>`;
    }    
    str=`
        <div class='jsch-datetime-picker-seventh-step' id='jsch-seventh-step'>
            ${btns}
        </div>
    `;
    return str;
}