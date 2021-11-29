import ChessPiece from "./ChessPiece.js"
export default class Bishop extends ChessPiece {
    constructor(name, color) {
        super(name, color, true);
    }
    getMoveSet(position) {
        return super.getMoveSet(position, [
            [this.xDirection, this.yDirection],
            [-this.xDirection, this.yDirection],
            [this.xDirection, -this.yDirection],
            [-this.xDirection, -this.yDirection]
        ]);
    }
}