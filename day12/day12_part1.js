const fs = require('fs');
const readline = require('readline');
const startTime = performance.now();
const rl = readline.createInterface({
    input: fs.createReadStream('day12_input.txt'),
    crlfDelay: Infinity
});

mapPresent = []
rl.on('line', (line) => {
    mapPresent.push(line)
});

rl.on('close', () => {
    //disection line
    prizeMap = []
    areaMap = []
    for(let i = 0; i < mapPresent.length; i++) {
        if(mapPresent[i].includes(":")){
            if(!mapPresent[i].includes("x")) {
            //start disecting prize area
                let area = 0
                for(let j = 1; j < 4; j++) {
                    let temp = mapPresent[i+j].split("")
                    area += temp.filter(i => i === "#").length
                }
                prizeMap.push(area)
            } else {
                //reforming defined area and numbers of prize needed
                let area = []
                let temp = mapPresent[i].split(" ")
                temp[0] = temp[0].replaceAll(":")
                let math = temp[0].split("x")
                temp.shift()
                area[0] = parseInt(math[0]) * parseInt(math[1])
                area.push(temp)
                areaMap.push(area)
            }
        }
    }

    //check
    console.log(prizeMap)
    console.log(areaMap)
    //now we counting bricks
    validRoom = 0;
    for(let i = 0; i < areaMap.length; i++) {
        total = 0
        for(let j = 0; j < prizeMap.length; j++) {
            total += parseInt(areaMap[i][1][j]) * prizeMap[j]
        }
        if(total < areaMap[i][0]) {
            validRoom++
        }
    }
    console.log(validRoom)
});
