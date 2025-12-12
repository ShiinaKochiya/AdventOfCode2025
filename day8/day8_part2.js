const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: fs.createReadStream("day8_input.txt"),
    crlfDelay: Infinity
});

const loc = [];

rl.on("line", (line) => {
    loc.push(line.split(",").map(Number));
});

rl.on("close", () => {
    function dist(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        const dz = a[2] - b[2];
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

    class UnionFind {
        constructor(n) {
            this.parent = Array(n).fill(0).map((_, i) => i);
            this.rank = Array(n).fill(0);
        }
        find(x) {
            while (this.parent[x] !== x) {
                this.parent[x] = this.parent[this.parent[x]];
                x = this.parent[x];
            }
            return x;
        }
        union(a, b) {
            const ra = this.find(a);
            const rb = this.find(b);
            if (ra === rb) return false;
            if (this.rank[ra] < this.rank[rb]) this.parent[ra] = rb;
            else if (this.rank[ra] > this.rank[rb]) this.parent[rb] = ra;
            else { this.parent[rb] = ra; this.rank[ra]++; }
            return true;
        }
    }

    const n = loc.length;
    const edges = [];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            edges.push({ d: dist(loc[i], loc[j]), i, j });
        }
    }

    edges.sort((a, b) => a.d - b.d);

    const uf = new UnionFind(n);
    let compCount = n;
    let lastPair = null;

    for (let k = 0; k < edges.length; k++) {
        const { i, j } = edges[k];
        if (uf.union(i, j)) {
            compCount--;
            if (compCount === 1) {
                lastPair = [i, j];
                break;
            }
        }
    }

    console.log(loc[lastPair[0]][0] * loc[lastPair[1]][0]);
});
