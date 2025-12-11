const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: fs.createReadStream("day11_input.txt"),
    crlfDelay: Infinity
});

const serverMap = [];

rl.on("line", line => {
    serverMap.push(line);
});

rl.on("close", () => {
    const graph = Object.create(null);

    for (const raw of serverMap) {
        const line = raw.trim();
        if (!line) continue;
        const colon = line.indexOf(":");
        if (colon < 0) continue;

        const key = line.substring(0, colon).trim();
        const rest = line.substring(colon + 1).trim();

        if (!graph[key]) graph[key] = [];
        if (!rest) continue;

        const outs = rest.split(/[\s,]+/).filter(x => x.length > 0);
        for (const o of outs) {
            const child = o.trim();
            if (!graph[child]) graph[child] = [];
            graph[key].push(child);
        }
    }

    if (!graph["svr"]) graph["svr"] = [];
    if (!graph["out"]) graph["out"] = [];
    if (!graph["dac"]) graph["dac"] = [];
    if (!graph["fft"]) graph["fft"] = [];

    const DAC_BIT = 1 << 0;
    const FFT_BIT = 1 << 1;
    const FULL_MASK = DAC_BIT | FFT_BIT;

    const memo = new Map();
    const visiting = new Set();

    function countPaths(node, mask) {
        let newMask = mask;
        if (node === "dac") newMask |= DAC_BIT;
        if (node === "fft") newMask |= FFT_BIT;

        const key = node + "|" + newMask;
        if (memo.has(key)) return memo.get(key);

        if (visiting.has(key)) {
            throw new Error(`Cycle detected at ${node} mask=${newMask}`);
        }

        if (node === "out") {
            const v = (newMask === FULL_MASK) ? 1n : 0n;
            memo.set(key, v);
            return v;
        }

        visiting.add(key);
        let sum = 0n;
        for (const nxt of graph[node] || []) {
            sum += countPaths(nxt, newMask);
        }
        visiting.delete(key);

        memo.set(key, sum);
        return sum;
    }

    try {
        const result = countPaths("svr", 0);
        console.log(result.toString());
        console.log("done");
    } catch (e) {
        console.error("Error:", e.message);
    }
});
