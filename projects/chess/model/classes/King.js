import { DIMENSION, game } from "../game.js";
import ChessPiece from "./ChessPiece.js"
export default class King extends ChessPiece {
    constructor(name, color) {
        super(name, color, false);
    }
    getMoveSet(position) {
        console.groupCollapsed('Getting King Move Set');
        const moveSet = [];
        const x = position.x;
        const y = position.y;

        const forward = { x: x, y: y + this.yDirection, isThreat: true, requiresPiece: false };
        const backward = { x: x, y: y - this.yDirection, isThreat: true, requiresPiece: false };
        const left = { x: x - this.xDirection, y: y, isThreat: true, requiresPiece: false };
        const right = { x: x + this.xDirection, y: y, isThreat: true, requiresPiece: false };
        const FL = { x: x - this.xDirection, y: y + this.yDirection, isThreat: true, requiresPiece: false };
        const FR = { x: x + this.xDirection, y: y + this.yDirection, isThreat: true, requiresPiece: false };
        const BL = { x: x - this.xDirection, y: y - this.yDirection, isThreat: true, requiresPiece: false };
        const BR = { x: x + this.xDirection, y: y - this.yDirection, isThreat: true, requiresPiece: false };
        moveSet.push(forward, backward, left, right, FL, FR, BL, BR);
        const castle = this.castle(position);
        if (castle.left) moveSet.push({ x: x - 2, y: y, isThreat: false, requiresPiece: false });
        if (castle.right) moveSet.push({ x: x + 2, y: y, isThreat: false, requiresPiece: false });
        console.groupEnd();
        return super.filterMoveSet(position, moveSet);
    }

    castle(position) {
        console.groupCollapsed('Checking Castle');
        if (this.hasMoved || game.getCheck(this.color)) {
            console.groupEnd();
            return { left: false, right: false };
        }
        const castle = { left: true, right: true };
        if (game.chessBoard[position.y][0].isEmpty() ||
            game.chessBoard[position.y][0].heldPiece.hasMoved
        ) castle.left = false;

        if (game.chessBoard[position.y][7].isEmpty() ||
            game.chessBoard[position.y][7].heldPiece.hasMoved
        ) castle.right = false;

        // for (let x = 1; x <= 2; x++) {
        //     console.log(x);
        game.move(
            game.chessBoard[position.y][position.x],
            game.chessBoard[position.y][position.x + 1]
        );
        if (game.getCheck(this.color)) { castle.right = false };
        game.undo();
        game.move(
            game.chessBoard[position.y][position.x],
            game.chessBoard[position.y][position.x - 1]
        );
        if (game.getCheck(this.color)) castle.left = false;
        game.undo();
        // }
        console.groupEnd();
        return castle;
    }
}