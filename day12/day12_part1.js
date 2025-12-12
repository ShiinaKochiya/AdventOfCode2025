const fs = require('fs');
const readline = require('readline');
const startTime = performance.now();
const rl = readline.createInterface({
    input: fs.createReadStream('day11_input.txt'),
    crlfDelay: Infinity
});

serverMap = []

rl.on('line', (line) => {

});

rl.on('close', () => {

});
