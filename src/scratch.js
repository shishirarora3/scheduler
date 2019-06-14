console.clear();
const arr = ["a", "b", "c"];


const  printPnCs = (arr) =>{
    let result = [];
    const collectResult = (_result) =>{
        if(_result.length!==0){
            result.push(_result);
        }
    }
    const rec=(_result=[])=>{
        collectResult(_result);
        if(_result.length===arr.length){
            return;
        }
        arr.forEach(e=>{
            if(!_result.includes(e)){
                rec([..._result, e]);
            }
        });
    }
    rec();
    return result;
}

//rendering results on screen
console.log(arr);
console.log(printPnCs(arr));
