import { DIMENSION, game } from "../game.js";

export default class ChessPiece {
    constructor(name, color, LRP) {
        this.name = name;
        this.color = color; // Boolean: White=true, Black=false
        this.collides = true;
        this.hasMoved = false;
        if (this.color) {
            this.xDirection = 1;
            this.yDirection = -1;
        } else {
            this.xDirection = -1;
            this.yDirection = 1;
        }
        this.LRP = LRP
    }
    getMoveSet(position, directions) {
        console.groupCollapsed('Getting', this.name, 'move set');
        let moveset = [];
        directions.forEach(direction => {
            const xDirection = direction[0];
            const yDirection = direction[1];
            let x = position.x + xDirection;
            let y = position.y + yDirection;
            while (x < DIMENSION && y < DIMENSION && 0 <= x && 0 <= y) {
                const tile = game.chessBoard[y][x];
                if (tile.isEmpty() || tile.heldPiece.color !== this.color) {
                    moveset.push({ x: x, y: y, isThreat: true, requiresPiece: false });
                } else break;
                x += xDirection;
                y += yDirection;
            }
        });
        console.log('move set:', moveset);
        console.groupEnd();
        return moveset;
    }

    filterMoveSet(position, moveSet) {
        console.groupCollapsed('Getting', this.name, 'Filtered Moveset');
        let filteredMoveSet = [];
        for (let i = 0; i < moveSet.length; i++) {
            const move = moveSet[i];
            if (move.x < DIMENSION &&
                move.y < DIMENSION &&
                0 <= move.x &&
                0 <= move.y &&
                (
                    game.chessBoard[move.y][move.x].isEmpty() ||
                    game.chessBoard[move.y][move.x].heldPiece.color !== this.color &&
                    move.isThreat
                )
            ) {
                if (game.chessBoard[move.y][move.x].isEmpty() && move.requiresPiece) continue;
                if (this.collides && !this.collision(position, move)) filteredMoveSet.push(move);
                else if (!this.collides) filteredMoveSet.push(move);

            }
        }
        console.log('move set:', filteredMoveSet);
        console.groupEnd();
        return filteredMoveSet;
    }

    collision(fromPos, toPos) {
        let xDirection = toPos.x - fromPos.x;
        let yDirection = toPos.y - fromPos.y;
        if (xDirection !== 0) xDirection = parseInt(xDirection / Math.abs(xDirection));
        if (yDirection !== 0) yDirection = parseInt(yDirection / Math.abs(yDirection));
        let x = fromPos.x + xDirection;
        let y = fromPos.y + yDirection;
        while (!(x === toPos.x) || !(y === toPos.y)) {
            if (!game.chessBoard[y][x].isEmpty()) return true;
            x += xDirection;
            y += yDirection;
        }
        return false
    }
}