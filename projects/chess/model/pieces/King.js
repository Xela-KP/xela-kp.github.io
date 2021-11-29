import ChessPiece from "./ChessPiece.js"
export default class King extends ChessPiece {
    constructor(name, color) {
        super(name, color, false);
    }
    getMoveSet(position) {
        const x = position.x;
        const y = position.y;

        const forward = { x: x, y: y + this.yDirection };
        const backward = { x: x, y: y - this.yDirection };
        const left = { x: x - this.xDirection, y: y };
        const right = { x: x + this.xDirection, y: y };
        const FL = { x: x - this.xDirection, y: y + this.yDirection };
        const FR = { x: x + this.xDirection, y: y + this.yDirection };
        const BL = { x: x - this.xDirection, y: y - this.yDirection };
        const BR = { x: x + this.xDirection, y: y - this.yDirection };

        return [forward, backward, left, right, FL, FR, BL, BR];
    }
}