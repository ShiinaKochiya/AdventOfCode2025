const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day4_input.txt'),
    crlfDelay: Infinity
});

inp = [[]]

rl.on('line', (line) => {
    let temp = []
    for(let i = 0; i < line.length; i++) {
        temp.push(line.charAt(i))
    }
    inp.push(temp)
});


rl.on('close', () => {

    // Create output grid (deep copy)
    let out = inp.map(row => [...row]);

    for (let i = 0; i < inp.length; i++) {
        for (let j = 0; j < inp[i].length; j++) {

            if (inp[i][j] === '@') {
                let count = 0;

                for (let k = i - 1; k <= i + 1; k++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if (k === i && l === j) continue;

                        if (isNotOutOfBound(k, inp.length) &&
                            isNotOutOfBound(l, inp[i].length)) {

                            if (inp[k][l] === '@') {
                                count++;
                            }
                        }
                    }
                }

                if (count < 4) {
                    out[i][j] = 'x';
                }
            }
        }
    }

    inp = out;

    let roll = 0;
    for (let i = 0; i < inp.length; i++) {
        for (let j = 0; j < inp[i].length; j++) {
            if (inp[i][j] === 'x') roll++;
        }
    }
    console.log(roll);

    //end of func
});


function isNotOutOfBound(i, bound) {
    return i >= 0 && i < bound;
}
