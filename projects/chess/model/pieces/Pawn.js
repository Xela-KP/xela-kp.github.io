import ChessPiece from "./ChessPiece.js"
export default class Pawn extends ChessPiece {
    constructor(name, color) {
        super(name, color, false);
    }
    getMoveSet(position) {
        let x = position.x;
        let y = position.y;
        const forward = { x: x, y: y + this.yDirection }
        const doubleForward = { x: x, y: y + this.yDirection * 2 }
        const takeRight = { x: x + this.xDirection, y: y + this.yDirection }
        const takeLeft = { x: x - this.xDirection, y: y + this.yDirection }
        return [forward, doubleForward, takeLeft, takeRight];
    }
}