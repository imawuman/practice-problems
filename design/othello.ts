// Exercise 7.8

type Color = "BLACK" | "WHITE";

export interface IPiece {
    color: Color;
    flip(): void;
}

export interface ISpot {
    row: number;
    col: number;
}

export interface IGame {
    players: IPlayer[];
    score(player: IPlayer): number;
    validMoves(player: IPlayer): ISpot[];
    gameOver(): boolean;
}

export interface IBoard {
    getPiece(spot: ISpot): IPiece | null;
    place(piece: IPiece, spot: ISpot): void;
    flip(spot: ISpot[]): void;
}

export interface IPlayer {
    color: Color;
    score(): number;
}
