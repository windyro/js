var array=[];
var output=[];
function init(){
    array.push({key: "0", map: []});
    array.push({key: "1", map: []});
    array.push({key: "2", map: ["a", "b", "c"]});
    array.push({key: "3", map: ["d", "e", "f"]});
    array.push({key: "4", map: ["g", "h", "i"]});
    array.push({key: "5", map: ["j", "k", "l"]});
    array.push({key: "6", map: ["m", "n", "o"]});
    array.push({key: "7", map: ["p", "q", "r", "s"]});
    array.push({key: "8", map: ["t", "u", "v"]});
    array.push({key: "9", map: ["w", "x", "y", "z"]});
};
init();


function getResult(){  
    
    let a=myform.input.value;  

    process(a);
    myform.output.value = output;    
};

function unitTest(){  
    
    let case1 = "1";
    process(case1);
    let result = "Input: " + case1 + "  Output: " + output + "\n";    
      

    let case2 = "0,4"
    process(case2);
    result += "Input: " + case2 + "  Output: " + output + "\n";  

    let case3 = "5,6,9"
    process(case3);
    result += "Input: " + case3 + "  Output: " + output + "\n"; 

    let case4 = "s,2,3"
    process(case4);
    result += "Input: " + case4 + "  Output: " + output + "\n"; 

    myform.output.value = result; 
};

function process(input){
    output=[];
    inputStr = input.replace(/\s+/g, '');
    let regNum = new RegExp("^[0-9\,]*$");
    if(!regNum.test(inputStr)){
        output.push("Only accept 0-9 and ',' ");
        return;
    }

    let possibleArrays = possibleArray(inputStr);
    //console.log(JSON.stringify(possibleArrays));
    combineArray("", possibleArrays);
    //console.log(JSON.stringify(output));
};

function possibleArray(digit){
    let result =[];
    let digitList = digit.split(",");
    
    for(let i=0; i<digitList.length; i++){
       let numArrays = array.find(item=>{
            return item.key == digitList[i] ;
       });
       if(numArrays.map.length !=0){
            let exist = result.find(item=>{
                return item.key == digitList[i] ;
            });
            if(!exist){
                result.push(numArrays);
            }
       }    
    }
    console.log(JSON.stringify(result));
    return result;
};

function combineArray(str, arraysLeft){

    let arrayCurrent = arraysLeft.slice(0,1);
    if(arrayCurrent.length==0){
        return;
    }
    console.log("arrayCurrent: " + JSON.stringify(arrayCurrent));
    let arrayNext = arraysLeft.slice(1,arraysLeft.length);
   
 
    arrayCurrent[0].map.forEach(element =>{
        let strcurrent = str;
        strcurrent += element;
        console.log("strcurrent: " + strcurrent);

        if(arrayNext.length >0){
            arrayNext.forEach(subElement =>{
                combineArray(strcurrent, arrayNext);
            });
        }else{
            output.push(strcurrent);
            return;
        }
    });
};


 
