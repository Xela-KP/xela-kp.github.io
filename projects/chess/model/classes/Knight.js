import ChessPiece from "./ChessPiece.js";

export default class Knight extends ChessPiece {
    constructor(name, color) {
        super(name, color, false);
        this.collides = false;
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

        const FL = { x: left, y: doubleForward, isThreat: true, requiresPiece: false };
        const FR = { x: right, y: doubleForward, isThreat: true, requiresPiece: false };
        const RF = { x: doubleRight, y: forward, isThreat: true, requiresPiece: false };
        const RB = { x: doubleRight, y: backward, isThreat: true, requiresPiece: false };
        const LF = { x: doubleLeft, y: forward, isThreat: true, requiresPiece: false };
        const LB = { x: doubleLeft, y: backward, isThreat: true, requiresPiece: false };
        const BL = { x: left, y: doubleBackward, isThreat: true, requiresPiece: false };
        const BR = { x: right, y: doubleBackward, isThreat: true, requiresPiece: false };
        return super.filterMoveSet(position, [FL, FR, RF, RB, LF, LB, BL, BR]);
    }
}