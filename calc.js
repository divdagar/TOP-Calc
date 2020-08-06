let buttons = document.querySelectorAll('.calc')
let display = document.getElementById('display')
let a=[];
let valid = 0;
let decToggle = 0;

//button listeners

for( let i=0; i<buttons.length;i++){

    buttons[i].addEventListener("mousedown", function(){
        
        if(this.classList.contains("num")||this.classList.contains("ops")){
            numInput(buttons[i].value);

        }
        if(this.classList.contains("clear")){
            clearAll();
        }
        
        if(this.classList.contains("operate")){
            operate();
        }
        if(this.id=="backspace"){
            del();
        }   

        //Check to enable/disable decimal point
        if(this.value=="."){
            decToggle = 1;
            ToggleDecimal()
        }
        if(!this.classList.contains("num")){
            decToggle=0;
            ToggleDecimal()
        }

    });
}

//Key listener

document.addEventListener('keydown', function(event) {
    if(event.key>-1&&event.key<10||event.key=="/"||event.key=="+"||event.key=="*"||event.key=="-"||event.key==".")
       { 
           numInput(event.key);
       }

    if(event.key=="Backspace"){
        del();
    }
    if(event.key=="c"){
        clearAll();
    }
    if(event.key=="Enter"||event.key=="="){
        operate();
    }
        
});

function ToggleDecimal(){
    if(decToggle){
        document.getElementById('decimal').disabled = true;
    }
    else{
        document.getElementById('decimal').disabled = false;

    }
}

function del(){
    let del = display.textContent.charAt(display.textContent.length - 1);
            display.textContent = display.textContent.slice(0,-1);
            if(del == "/"||del == "*"||del == "+"||del == "-"){
                a.pop();
                a.pop();
            }
            if(display.textContent==""){
                display.textContent="0";
            }
}

function clearAll(){
    display.textContent = 0;
    a=[];
}

function numInput(num){
    if(parseFloat(display.textContent)==0){
        display.textContent = num;
    }
    else{
        display.textContent = display.textContent + num;

    }
}

function operate(){
    a = display.textContent.split(/(\*)/).join(',').split(/(\-)/).join(',').split(/(\+)/).join(',').split(/(\/)/).join(',').split(',');
            a = a.filter(function(e){return e}); 
           // function to avoid to invalid expressions
            for(i=0; i<a.length;i=i+2){
                if((!(a[i]>0))||a[0]=="+"||a[0]=="-"||a[0]=="/"||a[0]=="*"){
                    console.log(a[i]);
                    display.textContent = "Invalid";
                    valid = 0;
                    break;
                }
                else{
                    valid = 1;
                    
                }
            }
            if(valid){
                display.textContent = solveEq(a);
                a=[]
            }
}
function solveEq(arr){
   //implementing PEMDAS with order of operations
    while (!(arr.indexOf("/") == -1) ) {
         let ind = arr.indexOf("/");
         arr.splice(ind+2, 0, divide(parseFloat(arr[ind-1]),parseFloat(arr[ind+1]))); 
         arr.splice(ind-1, 3); 

    }
    while (!(arr.indexOf("*") == -1) ) {
        let ind = arr.indexOf("*");
        arr.splice(ind+2, 0, multiply(parseFloat(arr[ind-1]),parseFloat(arr[ind+1]))); 
        arr.splice(ind-1, 3); 

   }
   while (!(arr.indexOf("+") == -1) ) {
        let ind = arr.indexOf("+");
        arr.splice(ind+2, 0, sum(parseFloat(arr[ind-1]),parseFloat(arr[ind+1]))); 
        arr.splice(ind-1, 3); 

    }
    while (!(arr.indexOf("-") == -1) ) {
        let ind = arr.indexOf("-");
        arr.splice(ind+2, 0, sub(parseFloat(arr[ind-1]),parseFloat(arr[ind+1]))); 
        arr.splice(ind-1, 3); 

   }
   arr[0] = Math.round( arr[0] * 100000 + Number.EPSILON ) / 100000;
   return arr;
}

function sum(a, b){
    return (a+b)
}

function sub(a, b){
    return (a-b)
}

function multiply(a, b){
    return (a*b)
}

function divide(a, b){
    return (a/b)
}
