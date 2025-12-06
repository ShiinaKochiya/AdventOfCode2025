const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day6_input.txt'),
    crlfDelay: Infinity
});

numList = []
operationList = []

rl.on('line', (line) => {
    temp = line.split("")
    //temp = temp.filter(i => i)

    if(isNaN(temp[0])) {
        operationList = line.split(" ").filter(i => i)
    } else {
        numList.push(temp)
    }
});

rl.on('close', () => {

    max = 0
    for (let i = 0; i < numList.length; i++) {
        if(numList[i].length > max) max = numList[i].length
    }
    for(let i = 0; i < numList.length; i++) {
        while(numList[i].length < max + 1) numList[i].push(" ")
    }
    console.log(numList)

    numArr = []
    tempArr = []
    for(let i = 0; i < numList[0].length; i++) {
        newCol = true
        tempString = ""

        for(let j =  0; j < numList.length; j++) {
            console.log("reading" + numList[j][i])
            if(numList[j][i] === " ") {
                tempString += ""
            } else {
                tempString += numList[j][i]
                newCol = false
            }
        }

        if(!newCol) {
            tempArr.push(tempString)
        } else {
            numArr.push(tempArr)
            tempArr = []
        }

    }
    operations = operationList.filter(i => i != " ")
    console.log(numArr)
    console.log(operationList)
})