const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day9_input.txt'),
    crlfDelay: Infinity
});

loc = []

rl.on('line', (line) => {
    loc.push(line.split(","))
});

rl.on('close', () => {
    distance = makeArray(loc.length);
    for(let i = 0; i < loc.length; i++) {
        for(let j = i + 1; j < loc.length; j++) {
            distance[i][j] = areaCalc(loc[i], loc[j])
            distance[j][i] = distance[i][j]
        }
    }
    // Source - https://stackoverflow.com/a/39342975
    // Posted by Pani, modified by community. See post 'Timeline' for change history
    // Retrieved 2025-12-10, License - CC BY-SA 4.0

    var maxRow = distance.map(function(row){ return Math.max.apply(Math, row); });
    var max = Math.max.apply(null, maxRow);
    console.log(max)
    console.log(distance)

})

// Source - https://stackoverflow.com/a/13808461
// Posted by Kyle, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-08, License - CC BY-SA 4.0
// oh and I modified it again xd

function makeArray(size) {
    let arr = [];
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

//tôi yêu toán cấp 1
function areaCalc(a, b) {
    return (Math.abs(a[0] - b[0] + 1) * Math.abs(a[1] - b[1] + 1))
}