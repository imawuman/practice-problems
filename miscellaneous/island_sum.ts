/**
 * Given a boolean 2D matrix, find the number of islands.
 * A group of connected 1s forms an island.
 *
 * For example, the below matrix contains 5 islands:
 * const matrix: boolean[][] = [
 *     [true, true, false, false, false],
 *     [false, true, false, false, true],
 *     [true, false, false, true, true],
 *     [false, false, false, false, false],
 *     [true, false, true, false, true],
 * ];
 */

function getNumIslands(islands: boolean[][]): number {
    let numIslands = 0;
    const visited = initializeVisited(islands);
    for (let i = 0; i < islands.length; i++) {
        const row = islands[i];
        for (let j = 0; j < row.length; j++) {
            const isIsland = row[j];
            if (isIsland && !visited[i][j]) {
                visitDfs(i, j, islands, visited);
                numIslands++;
            }
        }
    }
    return numIslands;
}

function initializeVisited(islands: boolean[][]): boolean[][] {
    const visited = [];
    for (const island of islands) {
        const row: boolean[] = Array<boolean>(island.length).fill(false);
        visited.push(row);
    }
    return visited;
}

function visitDfs(row: number, column: number, islands: boolean[][], visited: boolean[][]) {
    visited[row][column] = true;
    for (let i = row - 1; i < row + 2; i++) {
        for (let j = column - 1; j < column + 2; j++) {
            if (i >= 0 && i < islands.length) {
                const currRow = islands[i];
                if (j >= 0 && j < currRow.length && islands[i][j] && !visited[i][j]) {
                    visited[i][j] = true;
                    visitDfs(i, j, islands, visited);
                }
            }
        }
    }
}

// Test cases

const matrix: boolean[][] = [
    [true, true, false, false, false],
    [false, true, false, false, true],
    [true, false, false, true, true],
    [false, false, false, false, false],
    [true, false, true, false, true],
];

// Should print out 5
console.log("Num islands: ", getNumIslands(matrix));
