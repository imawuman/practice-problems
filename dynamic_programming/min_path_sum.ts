// https://leetcode.com/problems/minimum-path-sum/description/

export function minPathSum(grid: number[][]): number {
    if (grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    const numRows = grid.length;
    const numCols = grid[0].length;
    const paths = newGrid(numRows, numCols);
    for (let r = numRows - 1; r >= 0; r--) {
        for (let c = numCols - 1; c >= 0; c--) {
            const curr = grid[r][c];
            const nextMin = getNextMin([r, c], paths);
            paths[r][c] = curr + nextMin;
        }
    }
    return paths[0][0];
}

function newGrid(numRows: number, numCols: number): number[][] {
    const grid = Array(numRows);
    for (let i = 0; i < numRows; i++) {
        grid[i] = Array(numCols).fill(0);
    }
    return grid;
}

function getNextMin(position: [number, number], grid: number[][]): number {
    const bottom = [position[0] + 1, position[1]];
    const right = [position[0], position[1] + 1];
    let min = null;
    if (bottom[0] < grid.length) {
        min = grid[bottom[0]][bottom[1]];
    }
    if (right[1] < grid[0].length) {
        const rightSum = grid[right[0]][right[1]];
        min = min == null ? rightSum : Math.min(min, rightSum);
    }
    return min != null ? min : 0;
}

// Test cases

// should be 7
console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]));
