// Exercise 8.2

type Direction = "RIGHT" | "DOWN";
type GridPosition = [number, number];

// Version 1: O(2^(r + c)) where r = num rows and c = num cols

// true means a cell is valid to step on
// assume that all rows are same length
function findPathV1(grid: boolean[][]): Direction[] {
    if (grid.length === 0 || grid[0].length === 0) {
        // empty grid
        throw new Error("Invalid grid!");
    }
    const path: Direction[] = [];
    const result = findPathRecursive([0, 0], grid, path);
    if (result) {
        return path;
    } else {
        throw new Error("No path available!");
    }
}

// returns true if reached destination
function findPathRecursive(position: GridPosition, grid: boolean[][], path: Direction[]): boolean {
    const currRow = grid[position[0]];
    const lastRow = grid.length - 1;
    const lastCol = currRow.length - 1;
    if (position[0] === lastRow && position[1] === lastCol) {
        // reached destination
        return true;
    }
    if (position[0] < lastRow && grid[position[0] + 1][position[1]]) {
        // go down if possible
        const nextPosition: GridPosition = [position[0] + 1, position[1]];
        const reached = findPathRecursive(nextPosition, grid, path);
        if (reached) {
            path.unshift("DOWN");
            return reached;
        }
    }
    if (position[1] < lastCol && grid[position[0]][position[1] + 1]) {
        // go right if possible
        const nextPosition: GridPosition = [position[0], position[1] + 1];
        const reached = findPathRecursive(nextPosition, grid, path);
        if (reached) {
            path.unshift("RIGHT");
            return reached;
        }
    }
    // nowhere left to go
    return false;
}

// Version 2: O(rc) where r = num rows and c = num cols

function findPathV2(grid: boolean[][]): Direction[] {
    if (grid.length === 0 || grid[0].length === 0) {
        // empty grid
        throw new Error("Invalid grid!");
    }
    invalidatePositions(grid);
    // navigate path directly to the end
    let foundDeadEnd = false;
    let current: GridPosition = [0, 0];
    const path: Direction[] = [];
    const lastRow = grid.length - 1;
    const lastCol = grid[0].length - 1;
    while (!foundDeadEnd && (current[0] !== lastRow || current[1] !== lastCol)) {
        if (current[0] < lastRow && grid[current[0] + 1][current[1]]) {
            // go down if possible
            path.push("DOWN");
            current = [current[0] + 1, current[1]];
        } else if (current[1] < lastCol && grid[current[0]][current[1] + 1]) {
            // go right if possible
            path.push("RIGHT");
            current = [current[0], current[1] + 1];
        } else {
            foundDeadEnd = true;
        }
    }
    if (foundDeadEnd) {
        throw new Error("No path available!");
    }
    return path;
}

function invalidatePositions(grid: boolean[][]) {
    const lastRow = grid.length - 1;
    const lastCol = grid[0].length - 1;
    for (let c = lastCol; c >= 0; c--) {
        for (let r = lastRow; r >= 0; r--) {
            const isDestination = r === lastRow && c === lastCol;
            const isRightInvalid = r === lastRow || !grid[r + 1][c];
            const isDownInvalid = c === lastCol || !grid[r][c + 1];
            if (!isDestination && isRightInvalid && isDownInvalid) {
                // current cell doesn't lead to destination
                grid[r][c] = false;
            }
        }
    }

}

// Test case 1
const grid1 = [
    [true, true, true, false, true],
    [true, false, true, true, true],
    [true, true, true, false, true],
    [false, true, false, true, false],
    [true, true, true, true, true],
];

// Result should be:
// ["DOWN", "DOWN", "RIGHT", "DOWN", "DOWN", "RIGHT", "RIGHT", "RIGHT"]
console.log("==== Test case 1 ====");
console.log("Version 1: ", findPathV1(grid1));
console.log("Version 2: ", findPathV2(grid1));

// Test case 2
const grid2 = [
    [true, true, true, false, true],
    [true, false, true, true, true],
    [true, true, true, false, true],
    [false, true, false, true, true],
    [true, true, true, false, true],
];

// Result should be:
// ["RIGHT", "RIGHT", "DOWN", "RIGHT", "RIGHT", "DOWN", "DOWN", "DOWN"]
console.log("==== Test case 2 ====");
console.log("Version 1: ", findPathV1(grid2));
console.log("Version 2: ", findPathV2(grid2));

export default {};
