// http://codercareer.blogspot.com/2012/02/no-34-string-path-in-matrix.html

export function hasStringPath(path: string, matrix: string[][]): boolean {
    if (matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            const cell = matrix[r][c];
            if (cell === path.charAt(0)) {
                const visited = initializeVisited(numRows, numCols);
                const found = dfs(matrix, [r, c], path, visited);
                if (found) {
                    return true;
                }
            }
        }
    }
    return false;
}

function dfs(matrix: string[][], cell: number[], path: string, visited: boolean[][]): boolean {
    const [row, col] = cell;
    if (path.length === 0) {
        // found path
        return true;
    } else if (!isValidCell(matrix, cell)) {
        // out of bounds
        return false;
    } else if (visited[row][col] || matrix[row][col] !== path.charAt(0)) {
        // visited or current cell not in path
        visited[row][col] = true;
        return false;
    } else {
        // search for next char in path
        visited[row][col] = true;
        const subPath = path.substring(1);
        return dfs(matrix, [row + 1, col], subPath, visited) ||
            dfs(matrix, [row - 1, col], subPath, visited) ||
            dfs(matrix, [row, col + 1], subPath, visited) ||
            dfs(matrix, [row, col - 1], subPath, visited);
    }
}

function isValidCell(matrix: string[][], cell: number[]) {
    const isValidRow = cell[0] >= 0 && cell[0] < matrix.length;
    const isValidCol = cell[1] >= 0 && cell[1] < matrix[0].length;
    return isValidRow && isValidCol;
}

function initializeVisited(numRows: number, numCols: number) {
    const visited = [];
    for (let r = 0; r < numRows; r++) {
        visited[r] = Array(numCols).fill(false);
    }
    return visited;
}

// Test cases

const example = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
];

// true
console.log(hasStringPath("BCCED", example));
// false
console.log(hasStringPath("ABCB", example));
