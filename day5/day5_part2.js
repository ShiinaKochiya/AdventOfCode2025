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
            console.log("added number set:" + startNum + "-" + endNum)
        }
    } else {
        //append ids
        if(line !== "") {
            idNum.push(BigInt(line))
            console.log("added id: " + line + "")
        }
    }
});

    totalValid = 0

rl.on('close', () => {

    //cycles through fresh IDs to group remaining ranges that get through the first one
    cycleMerge = true
    while(cycleMerge){
        cycleMerge = false
        for (let i = 0; i < numRangeBot.length; i++) {
            for (let j = 0; j <= numRangeTop.length; j++) {
                //checking all overlap cases
                //type 1: end is before end range
                if (numRangeBot[i] < numRangeBot[j]) {
                    //end in range, start is before start range
                    //replace start with new start
                    if (numRangeTop[i] < numRangeTop[j] && numRangeBot[i] > numRangeTop[i]) {
                        cycleMerge = true
                        numRangeTop[j] = numRangeTop[i]
                        numRangeTop.splice(i, 1)
                        numRangeBot.splice(i, 1)
                    }
                    //end in range, start is also in range
                    else if (numRangeTop[i] > numRangeTop[j] && numRangeBot[i] > numRangeTop[j]) {
                        cycleMerge = true
                        numRangeTop.splice(i, 1)
                        numRangeBot.splice(i, 1)
                    }
                    //end out of range
                    else if (endNum < numRangeTop[i]) {
                        //what, what do you expect
                    }
                }

                //type 2: start is after start range
                if (numRangeTop[i] > numRangeTop[j]) {
                    //start in range, end is after end range
                    //replace end with new end
                    if (numRangeBot[i] > numRangeBot[j] && numRangeTop[i] < numRangeBot[j]) {
                        cycleMerge = true
                        numRangeBot[j] = numRangeBot[i]
                        numRangeTop.splice(i, 1)
                        numRangeBot.splice(i, 1)
                    }
                    //end in range, start is also in range
                    else if (numRangeBot[i] < numRangeBot[j] && numRangeTop[i] < numRangeBot[j]) {
                        cycleMerge = true
                        numRangeTop.splice(i, 1)
                        numRangeBot.splice(i, 1)
                    }
                    //start out of range
                    else if (endNum > numRangeBot[i] && startNum > numRangeBot[i]) {
                        //what, what do you expect pt2
                    }
                }

                //type 3: total overlap
                if (startNum <= numRangeTop[i] && endNum >= numRangeBot[i]) {
                    cycleMerge = true
                    numRangeBot[j] = numRangeBot[i]
                    numRangeTop[j] = numRangeTop[i]
                    numRangeTop.splice(i, 1)
                    numRangeBot.splice(i, 1)
                }
            }
        }
    }

    console.log(numRangeBot)
    console.log(numRangeTop)
    //spoiled IDs are irrelevant now, but im keeping this here, idk why dont ask

    /*
    for(let i = 0; i < idNum.length; i++) {
        for(let j = 0; j < numRangeBot.length; j++) {
            if(idNum[i] <= numRangeBot[j] && idNum[i] >= numRangeTop[j]) {
                totalValid++
                console.log("valid id: " + idNum[i])
                break
            }
        }
    }

    console.log(totalValid)*/
})