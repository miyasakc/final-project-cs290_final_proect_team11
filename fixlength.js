//used to appned 0s to a number until a target number of digits is reached and return as a string

function fixLenNum(inputNum, targetDigits){
    var strOfNum = inputNum.toString(); //convert base 10 num to string
    while(strOfNum.length+1 < targetDigits){ //adding one to account for the decimal in pi
        strOfNum+="0"; //append 0s to fix length
    }
    return strOfNum;
}

module.exports = fixLenNum;