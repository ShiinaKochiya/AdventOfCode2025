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

rl.on('close', () => {

})

// Source - https://stackoverflow.com/a/13808461
// Posted by Kyle, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-08, License - CC BY-SA 4.0
// oh and I modified it again xd

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