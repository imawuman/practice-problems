// Print a matrix clockwise from the first element to the most inner element
export function printMatrix(matrix: number[][]) {
    if (matrix.length === 0) {
        return;
    }
    let i = 0;
    let rowStart = 0;
    let rowEnd = matrix.length;
    let colStart = 0;
    let colEnd = matrix[0].length;
    while (rowStart < rowEnd && colStart < colEnd) {
        for (i = colStart; i < colEnd; i++) {
            // print top row
            console.log(matrix[rowStart][i]);
        }
        rowStart++;
        for (i = rowStart; i < rowEnd; i++) {
            // print right column
            console.log(matrix[i][colEnd - 1]);
        }
        colEnd--;
        if (colStart < colEnd) {
            for (i = colEnd - 1; i >= colStart; i--) {
                // print bottom row
                console.log(matrix[rowEnd - 1][i]);
            }
            rowEnd--;
        }
        if (rowStart < rowEnd) {
            for (i = rowEnd - 1; i >= rowStart; i--) {
                // print left column
                console.log(matrix[i][colStart]);
            }
            colStart++;
        }
    }
}

const example = [
    [1, 2, 3, 4, 5],
    [18, 19, 20, 21, 6],
    [17, 28, 29, 22, 7],
    [16, 27, 30, 23, 8],
    [15, 26, 25, 24, 9],
    [14, 13, 12, 11, 10],
];

printMatrix(example);
