import ChessPiece from "./ChessPiece.js";

export default class Rook extends ChessPiece {
    constructor(name, color) {
        super(name, color, true);
    }
    getMoveSet(position) {
        return super.getMoveSet(position, [
            [0, this.yDirection],
            [0, -this.yDirection],
            [this.xDirection, 0],
            [-this.xDirection, 0]
        ]);
    }
}