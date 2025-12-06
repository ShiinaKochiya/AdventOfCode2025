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
    //temp = temp.filter(i => i)

    if(isNaN(temp[0])) {
        operationList = temp
    } else {
        numList.push(temp)
    }
});

total = 0
maxDigi = []
rl.on('close', () => {

    console.log(numList)
    for(let i = 0; i < numList.length; i++) {
        for(let j = 0; j < numList[i].length; j++) {
            if(numList[i][j] === "") {console.log("empty string")} else {console.log(numList[i][j])}
        }
    }
/*
    //checking what is the max digit for each col
    for(let i = 0; i < numList[0].length; i++) {
        maxLength = 0
        for(let j = 0; j < numList.length; j++) {
            if(numList[j][i].length > maxLength) maxLength = numList[j][i].length
        }
        maxDigi.push(maxLength)
    }
    //note to self: i ->; j go down
    //standardizing by adding 0s to make strings length the same
    for(let i = 0; i < numList[0].length; i++) {
        for(let j = 0; j < numList.length; j++) {
            numList[j][i] = numList[j][i].padEnd(maxDigi[i], "0")
        }
    }
    //

    //copy and rewrite the numbers

    tempList = []
    for(let i = 0; i < numList[0].length; i++) {
        tempArr = []
        for(let x = numList[0][i].length - 1; x >= 0; x--) {
        tempString = ""
            for(let j = 0; j < numList.length; j++) {
                tempString += numList[j][i].charAt(x)
            }
            tempArr.push(tempString)
        }
        tempList.push(tempArr)
    }
*/
    //console.log(tempList)
    //recycling this part later
    /*for(let i = 0; i < numList[0].length; i++) {
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
    console.log(total)*/

})