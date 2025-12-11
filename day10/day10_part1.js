const fs = require('fs');
const readline = require('readline');
const startTime = performance.now();
const rl = readline.createInterface({
    input: fs.createReadStream('day10_input.txt'),
    crlfDelay: Infinity
});

let lamps = [];
let buttons = [];
let voltage = [];

rl.on('line', (line) => {
    const lamp = (line.match(/\[(.*?)]/)?.[1]) ?? "";
    lamps.push(lamp);

    const parenMatches = [...line.matchAll(/\((.*?)\)/g)];
    const buttonSets = parenMatches.map(m =>
        m[1].split(',').map(x => Number(x.trim()))
    );
    buttons.push(buttonSets);

    const braceContent = (line.match(/\{(.*?)\}/)?.[1]) ?? "";
    const volt = braceContent
        ? braceContent.split(',').map(x => Number(x.trim()))
        : [];
    voltage.push(volt);
});

rl.on('close', () => {
    totalCount = 0
/*
* ok brainstorm time again:
* for each lamp, create a binary string, length equal to buttons[i].length
* then convert binary to decimal, running from that number and decreasing until 0.
* each cycle, click the buttons according to the binary locations
* if fit the requirement, save the number of 1s
* */
    for(let i = 0; i < lamps.length; i++) {
        let bin = ""
        for(let j = 0; j < buttons[i].length; j++) {
            bin += "1"
        }
        count = 727;
        let dec = parseInt(bin, 2)
        while(dec > 0) {
            testLamptemp = ""
            for(let j = 0; j < lamps[i].length; j++) {
                testLamptemp += "."
            }
            testLamp = testLamptemp.split("")
            let bits = dec.toString(2).padStart(buttons[i].length, "0").split("").map(Number);

            //take each buttons and click it
            bits.forEach((bit, index) => {
                if(bit === 1) {
                    buttons[i][index].forEach(button => {
                        if(testLamp[button] === "."){
                            testLamp[button] = "#"
                        } else {
                            testLamp[button] = "."
                        }
                    })
                }
            })
            const countTemp = bits.filter(x => x === 1).length

            //merge testLamp into a string, then check if it its the same with lamp[i]
            //if the same, save the count. If the current count is higher than the saved count, discard it
            testLamp = testLamp.join("")
            if(testLamp === lamps[i]) {
                if(countTemp < count) count = countTemp
            }
            dec--
        }
        totalCount += count
    }
    console.log(totalCount)
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Execution time: ${duration} milliseconds`);
});
