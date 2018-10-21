// Exercise 16.22

// Represents the top right corner of a square in a 2D graph
type GridPosition = [number, number];

enum Direction {
    UP, DOWN, LEFT, RIGHT,
}

interface IPosition {
    gridPosition: GridPosition;
    direction: Direction;
}

interface IGrid {
    black: Set<string>; // String version of GridPosition
}

function simulateMoves(grid: IGrid, position: IPosition, numMoves: number): IGrid {
    let current = position;
    while (numMoves > 0) {
        const isWhite = !grid.black.has(current.gridPosition.toString());
        if (isWhite) {
            grid.black.add(current.gridPosition.toString());
        } else {
            grid.black.delete(current.gridPosition.toString());
        }
        current = getNextPosition(current, isWhite);
        numMoves--;
    }
    return grid;
}

function getNextPosition(position: IPosition, isWhite: boolean): IPosition {
    let nextDirection: Direction;
    switch (position.direction) {
        case Direction.UP:
            nextDirection = isWhite ? Direction.RIGHT : Direction.LEFT;
            break;
        case Direction.DOWN:
            nextDirection = isWhite ? Direction.LEFT : Direction.RIGHT;
            break;
        case Direction.LEFT:
            nextDirection = isWhite ? Direction.UP : Direction.DOWN;
            break;
        case Direction.RIGHT:
            nextDirection = isWhite ? Direction.DOWN : Direction.UP;
            break;
    }
    return {
        direction: nextDirection!,
        gridPosition: getNextGridPosition(position.gridPosition, nextDirection!),
    };
}

function getNextGridPosition(gridPosition: GridPosition, direction: Direction): GridPosition {
    const [x, y] = gridPosition;
    switch (direction) {
        case Direction.UP:
            return [x, y + 1];
        case Direction.DOWN:
            return [x, y - 1];
        case Direction.LEFT:
            return [x - 1, y];
        case Direction.RIGHT:
            return [x + 1, y];
    }
}

// Test cases

const initialPos: IPosition = {
    direction: Direction.RIGHT,
    gridPosition: [1, 1],
};
for (let k = 1; k <= 10; k++) {
    const initialGrid: IGrid = {
        black: new Set(),
    };
    console.log(simulateMoves(initialGrid, initialPos, k));
}

export default {};
