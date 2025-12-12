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
    let total = 0;

    for (let i = 0; i < voltage.length; i++) {
        const res = solveLine(buttons[i], voltage[i]);
        if (res === Infinity) {
            console.log(`Line ${i+1}: impossible`);
        } else {
            console.log(`Line ${i+1}: ${res}`);
            total += res;
        }
    }

    console.log("TOTAL:", total);

    const endTime = performance.now();
    console.log(`Execution time: ${endTime - startTime} ms`);
});


function solveLine(buttons, target) {
    const C = target.length;
    const B = buttons.length;

    const maskCount = 1 << B;
    const parityMap = new Map();

    for (let mask = 0; mask < maskCount; mask++) {
        const effect = new Array(C).fill(0);
        let bitcount = 0;

        for (let b = 0; b < B; b++) {
            if ((mask >> b) & 1) {
                bitcount++;
                for (const idx of buttons[b]) effect[idx] ^= 1;
            }
        }

        const key = effect.join(",");
        if (!parityMap.has(key)) parityMap.set(key, []);
        parityMap.get(key).push({ mask, bitcount });
    }

    const memo = new Map();
    const keyOf = v => v.join(",");

    function f(v) {
        const k = keyOf(v);
        if (memo.has(k)) return memo.get(k);

        if (v.every(x => x === 0)) {
            memo.set(k, 0);
            return 0;
        }

        const pv = v.map(x => x & 1).join(",");
        const group = parityMap.get(pv) || [];

        if (group.length === 0) {
            memo.set(k, Infinity);
            return Infinity;
        }

        let best = Infinity;

        for (const { mask, bitcount } of group) {
            const newV = v.slice();
            let ok = true;

            // apply each pressed button once
            for (let b = 0; b < B; b++) {
                if ((mask >> b) & 1) {
                    for (const idx of buttons[b]) {
                        newV[idx]--;
                        if (newV[idx] < 0) {
                            ok = false;
                            break;
                        }
                    }
                }
                if (!ok) break;
            }
            if (!ok) continue;

            if (newV.some(x => x & 1)) continue;

            const half = newV.map(x => x >> 1);
            const sub = f(half);
            if (sub === Infinity) continue;

            best = Math.min(best, bitcount + 2 * sub);
        }

        memo.set(k, best);
        return best;
    }

    return f(target);
}
