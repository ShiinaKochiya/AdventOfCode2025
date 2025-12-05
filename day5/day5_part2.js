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

    let ranges = [];
    //2d array
    for (let k = 0; k < numRangeTop.length; k++) {
        ranges.push({
            start: numRangeTop[k],
            end: numRangeBot[k]
        });
    }

// Sort by start
    ranges.sort((a, b) => a.start < b.start ? -1 : 1);

// Merge
    let merged = [];
    for (const r of ranges) {
        if (merged.length === 0 || r.start > merged[merged.length - 1].end) {
            merged.push({ ...r });
        } else {
            const last = merged[merged.length - 1];
            if (r.end > last.end) {
                last.end = r.end;
            }
        }
    }
    totalValid = 0n;
    for (let i = 0; i < merged.length; i++) {
        const start = merged[i].start;
        const end = merged[i].end;
        const sh = end - start + 1n;
        totalValid += sh;
    }


    console.log(totalValid)

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