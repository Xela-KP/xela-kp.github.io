import { game } from "./game.js";
import { getLogicPosition } from "./conversions.js";
import { renderPieces } from "../view/render.js";
var clicks = [];
var fromTile;
var toTile;
export function handleClick(position) {
    clicks.push(getLogicPosition(position));
    if (clicks.length === 2) {
        fromTile = game.chessBoard[clicks[0].y][clicks[0].x]
        toTile = game.chessBoard[clicks[1].y][clicks[1].x];
        _attemptMove();
        renderPieces(game.chessBoard);
        _resetVariables();
    }
}

function _attemptMove() {
    if (_moveConditions()) {
        toTile.heldPiece = fromTile.heldPiece;
        fromTile.heldPiece = null;
        game.changeTurn();
    }
}

function _moveConditions() {
    if (fromTile.isEmpty()) return false;
    if (game.whiteToMove !== fromTile.heldPiece.color) return false;
    if (!toTile.isEmpty() && toTile.heldPiece.color === game.whiteToMove) return false;
    return _legalMove();
}

function _legalMove() {
    console.log("from:", clicks[0]);
    console.log("to:", clicks[1]);
    let moveset = fromTile.heldPiece.getMoveSet(clicks[0]);
    console.log(moveset);
    for (let i = 0; i < moveset.length; i++) {
        const move = moveset[i];
        if (move.x == clicks[1].x && move.y == clicks[1].y) return true;
    }
    return false;
}

function _resetVariables() {
    clicks = [];
    fromTile = undefined;
    toTile = undefined;
}