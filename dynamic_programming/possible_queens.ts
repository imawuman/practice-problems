// Exercise 8.12

type BoardSpot = "QUEEN" | "UNAVAILABLE" | "AVAILABLE";
type BoardPosition = [number, number];

const NUM_QUEENS = 8;

function allPossibleQueens(numQueens: number): BoardPosition[][] {
    const solutions: BoardPosition[][] = [];
    const board = Array(numQueens).fill([]).map((r, index) => Array(numQueens).fill("AVAILABLE"));
    placePossibleQueen(board, 0, solutions);
    return solutions;
}

function placePossibleQueen(board: BoardSpot[][], rowIndex: number, solutions: BoardPosition[][]) {
    if (rowIndex === board.length) {
        // finished placing all queens
        solutions.push(getQueenPositions(board));
    } else {
        // attempt to place queen for rowIndex
        for (let c = 0; c < board.length; c++) {
            if (board[rowIndex][c] === "AVAILABLE") {
                const nextBoard = placeQueen(board, [rowIndex, c]);
                placePossibleQueen(nextBoard, rowIndex + 1, solutions);
            }
        }
    }
}

function placeQueen(board: BoardSpot[][], position: BoardPosition): BoardSpot[][] {
    // copy existing board
    const nextBoard = Array(board.length).fill([]).map((r, index) => Array.from(board[index]));
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
            nextBoard[r][c] = board[r][c];
        }
    }
    // place queen
    nextBoard[position[0]][position[1]] = "QUEEN";
    // mark unavailable positions
    getUnavailablePositions(position, board.length).forEach((p) => {
        if (nextBoard[p[0]][p[1]] === "AVAILABLE") {
            nextBoard[p[0]][p[1]] = "UNAVAILABLE";
        }
    });
    return nextBoard;
}

function getUnavailablePositions(queen: BoardPosition, boardSize: number): BoardPosition[] {
    const unavailable: BoardPosition[] = [];
    // add row positions
    for (let c = 0; c < boardSize; c++) {
        unavailable.push([queen[0], c]);
    }
    // add column positions
    for (let r = 0; r < boardSize; r++) {
        unavailable.push([r, queen[1]]);
    }
    // compute all diagonal positions
    const diagonals = [];
    for (let offset = -boardSize + 1; offset < boardSize; offset++) {
        diagonals.push([queen[0] + offset, queen[1] + offset]);
        diagonals.push([queen[0] - offset, queen[1] + offset]);
    }
    diagonals.forEach((d) => {
        const row = d[0];
        const col = d[1];
        if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
            // add valid diagonal positions
            unavailable.push([row, col]);
        }
    });
    return unavailable;
}

function getQueenPositions(board: BoardSpot[][]): BoardPosition[] {
    const queens: BoardPosition[] = [];
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
            if (board[r][c] === "QUEEN") {
                queens.push([r, c]);
            }
        }
    }
    return queens;
}

// Test case

const allPossible = allPossibleQueens(NUM_QUEENS);
console.log(`Total num solutions: ${allPossible.length}`);
allPossible.forEach((solution) => {
    console.log(solution);
});

export default {};
