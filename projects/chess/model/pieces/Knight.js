import ChessPiece from "./ChessPiece.js";

export default class Knight extends ChessPiece {
    constructor(name, color) {
        super(name, color, false);
    }
    getMoveSet(position) {
        const x = position.x;
        const y = position.y;

        const forward = y + this.yDirection;
        const doubleForward = y + this.yDirection * 2;
        const backward = y - this.yDirection;
        const doubleBackward = y - this.yDirection * 2;
        const right = x + this.xDirection;
        const doubleRight = x + this.xDirection * 2;
        const left = x - this.xDirection;
        const doubleLeft = x - this.xDirection * 2;

        const FL = { x: left, y: doubleForward };
        const FR = { x: right, y: doubleForward };
        const RF = { x: doubleRight, y: forward };
        const RB = { x: doubleRight, y: backward };
        const LF = { x: doubleLeft, y: forward };
        const LB = { x: doubleLeft, y: backward };
        const BL = { x: left, y: doubleBackward };
        const BR = { x: right, y: doubleBackward };
        return [FL, FR, RF, RB, LF, LB, BL, BR];
    }
}