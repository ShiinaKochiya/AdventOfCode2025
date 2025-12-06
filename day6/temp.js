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
        operationList = temp
    } else {
        numList.push(temp)
    }
});

rl.on('close', () => {
    console.log(numList)
    console.log(operationList)
})