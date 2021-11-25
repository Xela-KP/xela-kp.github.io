import Bishop from "./pieces/Bishop.js";
import Rook from "./pieces/Rook.js";
import Knight from "./pieces/Knight.js";
import Queen from "./pieces/Queen.js";
import King from "./pieces/King.js";
import Pawn from "./pieces/Pawn.js";
import Tile from "./tile.js";

export var game = {
    chessBoard: [
        _createBackline(false),
        _createFrontline(false),
        _createEmptyRow(),
        _createEmptyRow(),
        _createEmptyRow(),
        _createEmptyRow(),
        _createFrontline(true),
        _createBackline(true)
    ]
}

function _createBackline(color) {
    let prefix;
    if (color) {
        prefix = 'w'
    } else {
        prefix = 'b'
    }
    return [new Tile(new Rook(prefix + 'R', color)),
        new Tile(new Knight(prefix + 'N', color)),
        new Tile(new Bishop(prefix + 'B', color)),
        new Tile(new Queen(prefix + 'Q', color)),
        new Tile(new King(prefix + 'K', color)),
        new Tile(new Bishop(prefix + 'B', color)),
        new Tile(new Knight(prefix + 'N', color)),
        new Tile(new Rook(prefix + 'R', color))
    ]
}

function _createFrontline(color) {
    let prefix;
    if (color) {
        prefix = 'w'
    } else {
        prefix = 'b'
    }

    return [
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
        new Tile(new Pawn(prefix + 'P', color)),
    ]
}

function _createEmptyRow() {
    return [
        new Tile(null),
        new Tile(null),
        new Tile(null),
        new Tile(null),
        new Tile(null),
        new Tile(null),
        new Tile(null),
        new Tile(null),
    ]
}