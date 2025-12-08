const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day8_input.txt'),
    crlfDelay: Infinity
});

loc = []

rl.on('line', (line) => {
    loc.push(line.split(","))
});

//loc[i][0] is x cord, loc[i][1] is y cord and last one [2] is z cord

rl.on('close', () => {
    let distArr = makeArray(loc.length)
    for (let i = 0; i < loc.length; i++) {
        for (let j = 0; j < loc.length; j++) {
            if(distArr[i][j] != -1 && distArr[i][j] == 0) {
                distance = dist(loc[i], loc[j])
                distArr[i][j] = distance
                distArr[j][i] = distance
            }

        }
    }
    //im gonna assume that the "far" value is 500

    for (let i = 0; i < loc.length; i++) {
        console.log(distArr[i].toLocaleString())
    }
})

// Source - https://stackoverflow.com/a/13808461
// Posted by Kyle, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-08, License - CC BY-SA 4.0
//oh and I modified it again

function makeArray(size) {
    var arr = [];
    for(let i = 0; i < size; i++) {
        arr[i] = [];
        for(let j = 0; j < size; j++) {
            if(i!=j) {
                arr[i][j] = 0
            } else {
                arr[i][j] = -1
            }
        }
    }
    return arr;
}

//tôi yêu toán cấp 3
function dist(a, b) {
    return Math.sqrt( Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2))
}