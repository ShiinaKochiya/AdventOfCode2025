const fs = require('fs');
const readline = require('readline');
const startTime = performance.now();
const rl = readline.createInterface({
    input: fs.createReadStream('day7_input.txt'),
    crlfDelay: Infinity
});

matrix = []

rl.on('line', (line) => {
    temp = line.split("")
    matrix.push(temp)
});

rl.on('close', () => {
    const R = matrix.length;
    const C = matrix[0].length;

    const startCol = matrix[0].indexOf("S");

    const memo = new Map();

    function countTimelines(r, c) {
        if (c < 0 || c >= C) return 1n;

        const key = r + "," + c;
        if (memo.has(key)) return memo.get(key);

        let rr = r;
        while (rr < R) {
            const ch = matrix[rr][c];
            if (ch === '^') {
                const left = countTimelines(rr, c - 1);
                const right = countTimelines(rr, c + 1);
                const total = left + right;
                memo.set(key, total);
                return total;
            }
            rr++;
        }

        memo.set(key, 1n);
        return 1n;
    }

    const result = countTimelines(0, startCol);

    console.log("Total timelines:", result);
});
