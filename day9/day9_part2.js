// save as part2_compressed.js
const fs = require('fs');
const readline = require('readline');
const { performance } = require('perf_hooks');

const start = performance.now();
const INFILE = 'day9_input.txt'; // change if you want "input.txt"

const raw = fs.readFileSync(INFILE, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

if (raw.length === 0) {
    console.log(0);
    console.log(`Time: ${Math.round(performance.now() - start)} ms`);
    process.exit(0);
}

// parse reds in given order
const reds = raw.map(line => {
    const [xs, ys] = line.split(',').map(s => Number(s));
    return { x: xs, y: ys };
});

const n = reds.length;
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const p of reds) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
}

const pad = 1;

const XvalsSet = new Set();
const YvalsSet = new Set();

XvalsSet.add(minX - pad);
XvalsSet.add(maxX + pad + 1);
YvalsSet.add(minY - pad);
YvalsSet.add(maxY + pad + 1);

for (const p of reds) {
    XvalsSet.add(p.x);
    XvalsSet.add(p.x + 1);
    YvalsSet.add(p.y);
    YvalsSet.add(p.y + 1);
}

const Xs = Array.from(XvalsSet).map(Number).sort((a, b) => a - b);
const Ys = Array.from(YvalsSet).map(Number).sort((a, b) => a - b);

const W = Xs.length - 1;
const H = Ys.length - 1;
if (W <= 0 || H <= 0) {
    console.log(0);
    console.log(`Time: ${Math.round(performance.now() - start)} ms`);
    process.exit(0);
}

const xIndex = x => {
    const idx = Xs.indexOf(x);
    if (idx === -1) throw new Error('x coord not found in compressed Xs: ' + x);
    return idx;
};
const yIndex = y => {
    const idx = Ys.indexOf(y);
    if (idx === -1) throw new Error('y coord not found in compressed Ys: ' + y);
    return idx;
};

const border = Array.from({ length: W }, () => Array(H).fill(false));
const isRed = Array.from({ length: W }, () => Array(H).fill(false));

for (let i = 0; i < n; i++) {
    const a = reds[i];
    const b = reds[(i + 1) % n];

    const ax = xIndex(a.x), ay = yIndex(a.y);
    const bx = xIndex(b.x), by = yIndex(b.y);

    isRed[ax][ay] = true;
    border[ax][ay] = true;

    if (a.x === b.x) {
        const xi = ax;
        const y0 = Math.min(ay, by);
        const y1 = Math.max(ay, by);
        for (let y = y0; y <= y1; y++) border[xi][y] = true;
    } else if (a.y === b.y) {
        const yi = ay;
        const x0 = Math.min(ax, bx);
        const x1 = Math.max(ax, bx);
        for (let x = x0; x <= x1; x++) border[x][yi] = true;
    }
}

const visited = Array.from({ length: W }, () => Array(H).fill(false));
const q = [];
q.push([0, 0]);
visited[0][0] = true;
const DIRS = [[1,0],[-1,0],[0,1],[0,-1]];
while (q.length) {
    const [x,y] = q.shift();
    for (const [dx,dy] of DIRS) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
        if (visited[nx][ny]) continue;
        if (border[nx][ny]) continue;
        visited[nx][ny] = true;
        q.push([nx, ny]);
    }
}

const allowedVal = Array.from({ length: W }, () => Array(H).fill(0));
for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
        const width = Xs[i+1] - Xs[i];
        const height = Ys[j+1] - Ys[j];
        if (border[i][j] || !visited[i][j]) {
            allowedVal[i][j] = width * height;
        } else {
            allowedVal[i][j] = 0;
        }
    }
}

const pref = Array.from({ length: W + 1 }, () => Array(H + 1).fill(0));
for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
        pref[i+1][j+1] = pref[i][j+1] + pref[i+1][j] - pref[i][j] + allowedVal[i][j];
    }
}
function rectSum(x0i, y0i, x1i, y1i) {
    return pref[x1i+1][y1i+1] - pref[x0i][y1i+1] - pref[x1i+1][y0i] + pref[x0i][y0i];
}

const redGrid = reds.map(p => ({ xi: xIndex(p.x), yi: yIndex(p.y), x: p.x, y: p.y }));

let best = 0;

for (let i = 0; i < redGrid.length; i++) {
    for (let j = i + 1; j < redGrid.length; j++) {
        const a = redGrid[i];
        const b = redGrid[j];
        if (a.x === b.x || a.y === b.y) continue; // zero-area line

        if (a.x >= b.x) continue;

        const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);

        const x0i = Math.min(a.xi, b.xi), x1i = Math.max(a.xi, b.xi);
        const y0i = Math.min(a.yi, b.yi), y1i = Math.max(a.yi, b.yi);

        const sum = rectSum(x0i, y0i, x1i, y1i);
        if (sum === area && area > best) best = area;
    }
}

const elapsed = Math.round(performance.now() - start);
console.log(best);
console.log(`Time: ${elapsed} ms`);
