import { game } from "../game.js";
import ChessPiece from "./ChessPiece.js"
export default class Pawn extends ChessPiece {
    constructor(name, color) {
        super(name, color, false);
    }
    getMoveSet(position) {
        let x = position.x;
        let y = position.y;
        const forward = {
            x: x,
            y: y + this.yDirection,
            isThreat: false,
            requiresPiece: false
        };
        const enpassant = this.enpassant(position);
        const takeRight = {
            x: x + this.xDirection,
            y: y + this.yDirection,
            isThreat: true,
            requiresPiece: !enpassant.right
        };
        const takeLeft = {
            x: x - this.xDirection,
            y: y + this.yDirection,
            isThreat: true,
            requiresPiece: !enpassant.left
        };
        if (this.hasMoved) return super.filterMoveSet(position, [forward, takeLeft, takeRight]);
        const doubleForward = {
            x: x,
            y: y + this.yDirection * 2,
            isThreat: false,
            requiresPiece: false
        };
        return super.filterMoveSet(position, [forward, doubleForward, takeLeft, takeRight]);
    }

    enpassant(position) {
        console.groupCollapsed('Checking EnPassant');
        const enpassant = { left: false, right: false };
        const previousState = game.getPrevious();
        if (!previousState) {
            console.log(enpassant);
            console.groupEnd();
            return enpassant;
        }
        const y = position.y;

        if (position.x + this.xDirection > 0 && 7 > position.x + this.xDirection) {
            const x = position.x + this.xDirection;
            const rightTile = game.chessBoard[y][x];
            if (!rightTile.isEmpty() && rightTile.heldPiece instanceof Pawn) {
                if (previousState.chessBoard[y][x].isEmpty() &&
                    previousState.chessBoard[y + this.yDirection][x].isEmpty() &&
                    previousState.chessBoard[y + this.yDirection * 2][x].heldPiece instanceof Pawn
                ) enpassant.right = true;
            }
        }

        if (position.x - this.xDirection > 0 && 7 > position.x - this.xDirection) {
            const x = position.x - this.xDirection;
            const leftTile = game.chessBoard[y][x]
            if (!leftTile.isEmpty() && leftTile.heldPiece instanceof Pawn) {
                if (previousState.chessBoard[y][x].isEmpty() &&
                    previousState.chessBoard[y + this.yDirection][x].isEmpty() &&
                    previousState.chessBoard[y + this.yDirection * 2][x].heldPiece instanceof Pawn
                ) enpassant.left = true;
            }
        }
        console.log(enpassant);
        console.groupEnd();
        return enpassant;
    }
}