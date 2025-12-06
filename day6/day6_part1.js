const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day6_input.txt'),
    crlfDelay: Infinity
});

numList = []
operationList = []

rl.on('line', (line) => {
    temp = line.split(" ")
    temp = temp.filter(i => i)

    if(isNaN(temp[0])) {
        operationList = temp
    } else {
        numList.push(temp)
    }
});

total = 0

rl.on('close', () => {
    console.log(numList)
    console.log(operationList)
    for(let i = 0; i < numList[0].length; i++) {
        tempTotal = parseInt(numList[0][i])
        for(let j = 1; j < numList.length; j++) {
            if(operationList[i] === "+") {
                console.log("doing " + tempTotal + " + " + parseInt(numList[j][i]))
                tempTotal += parseInt(numList[j][i])
            } else {
                console.log("doing " + tempTotal + " * " + parseInt(numList[j][i]))
                tempTotal = tempTotal * parseInt(numList[j][i])
            }
        }
        total += tempTotal
        console.log(tempTotal)
    }
    console.log(total)
})