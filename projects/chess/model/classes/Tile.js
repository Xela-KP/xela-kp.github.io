export default class Tile {
    constructor(heldPiece) {
        this.heldPiece = heldPiece;
    }
    isEmpty() {
        return this.heldPiece === null;
    }
    copy() {
        let copy = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        let heldPieceCopy = null;
        if (!this.isEmpty()) {
            heldPieceCopy = Object.assign(Object.create(Object.getPrototypeOf(this.heldPiece)), this.heldPiece);
        }
        copy.heldPiece = heldPieceCopy;
        return copy;
    }
}