export default class Tile {
    constructor(heldPiece) {
        this.heldPiece = heldPiece;
    }
    isEmpty() {
        return this.heldPiece === null;
    }
}