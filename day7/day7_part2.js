const fs = require('fs');
const readline = require('readline');
const startTime = performance.now();
const rl = readline.createInterface({
    input: fs.createReadStream('day7_input.txt'),
    crlfDelay: Infinity
});

serverMap = []

rl.on('line', (line) => {
    rack = line.split(" ")
    serverMap.push(rack)
});

rl.on('close', () => {
    let endReached = 0;
    const graph = {};

    for (const arr of serverMap) {
        const key = arr[0];
        graph[key] = arr.slice(1);
    }

    function dfs(node) {
        for (const next of graph[node]) {
            if (next === "out") {
                endReached++;
            } else {
                dfs(next + ":");
            }
        }
    }

    const start = serverMap.find(x => x[0] === "you:");

    for (let i = 1; i < start.length; i++) {
        dfs(start[i] + ":");
    }

    console.log(endReached);
});
