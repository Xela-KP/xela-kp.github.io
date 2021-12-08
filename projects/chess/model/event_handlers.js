import { game } from "./game.js";
import { renderPieces, renderPromotion } from "../view/render.js";
import { attemptMove } from "./movement/movement.js";
import { getLogicPosition } from "./conversions.js";
var clicks = [];

export function handleClick(position) {
    clicks.push(position);
    if (clicks.length === 2) {
        attemptMove(clicks[0], clicks[1]);
        renderPieces(game.chessBoard);
        clicks = [];
    }
}

export function handleUndo() {
    game.undo();
    renderPieces(game.chessBoard);
}

export function handlePromotion(id) {
    game.promote(id);
    renderPieces(game.chessBoard);
}