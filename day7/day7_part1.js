const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day8_input.txt'),
    crlfDelay: Infinity
});

matrix = []

rl.on('line', (line) => {
    temp = line.split("")
    matrix.push(temp)
});


rl.on('close', () => {
    loc = []
    branc = 0
    loc.push(matrix[0].indexOf("S"))
    for(let i = 1; i < matrix.length; i++) {
        //locate where agnes tachyon would be
        arcPop = []

        for(let j = 0; j < loc.length; j++) {
            if(matrix[i][loc[j]] === "^") {
                arcPop.push(loc[j])
                console.log("tachyon at " + loc[j])
                branc++
            }
        }
        loc = loc.filter(i => !arcPop.includes(i))

        for(let j = 0; j < arcPop.length; j++) {
            if(arcPop[j] - 1 > 0) loc.push(arcPop[j] - 1)

        }
        for(let j = 0; j < arcPop.length; j++) {
            if(arcPop[j] + 1 < matrix[i].length) loc.push(arcPop[j] + 1)
        }
        loc = loc.filter((item, pos) => loc.indexOf(item) == pos)
        console.log("ARC Pops location:" + arcPop)
        console.log("Locations of stream:" + loc)
    }
    console.log(loc.length)
    console.log(branc + "<---")
})