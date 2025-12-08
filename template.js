
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    temp = line.split("")

});


rl.on('close', () => {

})