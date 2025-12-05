const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day5_input.txt'),
    crlfDelay: Infinity
});

    numRangeBot = []
    numRangeTop = []
    idNum = []
    checkCycle = true
rl.on('line', (line) => {

    if(line === "") checkCycle = false

    if (checkCycle){
        let temp = line.split("-")
        startNum = BigInt(temp[0])
        endNum = BigInt(temp[1])

        let check = true;

        for (let i = 0; i <= numRangeTop.length; i++) {
            //checking all overlap cases
            //type 1: end is before end range
            if (endNum < numRangeBot[i]) {
                //end in range, start is before start range
                //replace start with new start
                if (startNum < numRangeTop[i] && endNum > numRangeTop[i]) {
                    check = false
                    numRangeTop[i] = startNum
                }
                //end in range, start is also in range
                else if (startNum > numRangeTop[i] && endNum > numRangeTop[i]) {
                    check = false
                }
                //end out of range
                else if (endNum < numRangeTop[i]) {
                    //what, what do you expect
                }
            }

            //type 2: start is after start range
            if (startNum > numRangeTop[i]) {
                //start in range, end is after end range
                //replace end with new end
                if (endNum > numRangeBot[i] && startNum < numRangeBot[i]) {
                    check = false
                    numRangeBot[i] = endNum
                }
                //end in range, start is also in range
                else if (endNum < numRangeBot[i] && startNum < numRangeBot[i]) {
                    check = false
                }
                //start out of range
                else if (endNum > numRangeBot[i] && startNum > numRangeBot[i]) {
                    //what, what do you expect pt2
                }
            }

            //type 3: total overlap
            if (startNum <= numRangeTop[i] && endNum >= numRangeBot[i]) {
                check = false
                numRangeBot[i] = endNum
                numRangeTop[i] = startNum
            }
        }

        //append if new
        if (check) {
            numRangeBot.push(endNum)
            numRangeTop.push(startNum)
        }
    } else {
        //append ids
        if(line !== "") idNum.push(BigInt(line))
    }
});



rl.on('close', () => {

})