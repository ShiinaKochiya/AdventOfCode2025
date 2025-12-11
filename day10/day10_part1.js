const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day10_input.txt'),
    crlfDelay: Infinity
});

let lamps = [];
let buttons = [];
let voltage = [];

rl.on('line', (line) => {
    // Extract string inside [...]
    const lamp = (line.match(/\[(.*?)]/)?.[1]) ?? "";
    lamps.push(lamp);

    // Extract all ( ... ) into 2D number arrays
    const parenMatches = [...line.matchAll(/\((.*?)\)/g)];
    const buttonSets = parenMatches.map(m =>
        m[1].split(',').map(x => Number(x.trim()))
    );
    buttons.push(buttonSets);

    // Extract { ... } into array of numbers
    const braceContent = (line.match(/\{(.*?)\}/)?.[1]) ?? "";
    const volt = braceContent
        ? braceContent.split(',').map(x => Number(x.trim()))
        : [];
    voltage.push(volt);
});

rl.on('close', () => {
    console.log("Lamps:", lamps);
    console.log("Buttons:", buttons);
    console.log("Voltage:", voltage);
});
