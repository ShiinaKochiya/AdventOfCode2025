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

total = 0
maxDigi = []

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
    numList = numArr
    operations = operationList.filter(i => i !== " ")
    //console.log(tempList)
    //recycling this part later
    for(let i = 0; i < numList.length; i++) {
        tempTotal = parseInt(numList[i][0])
        for(let j = 1; j < numList[i].length; j++) {
            if(operationList[i] === "+") {
                console.log("doing " + tempTotal + " + " + parseInt(numList[i][j]))
                tempTotal += parseInt(numList[i][j])
            } else {
                console.log("doing " + tempTotal + " * " + parseInt(numList[i][j]))
                tempTotal = tempTotal * parseInt(numList[i][j])
            }
        }
        total += tempTotal
        console.log(tempTotal)
    }
    console.log(total)

})