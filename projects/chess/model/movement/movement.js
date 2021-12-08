import { DIMENSION, game } from "../game.js";
import { getLogicPosition } from "../conversions.js";
import King from "../classes/King.js";
import Knight from "../classes/Knight.js";
import Pawn from "../classes/Pawn.js";
import Queen from "../classes/Queen.js";
import { renderPromotion } from "../../view/render.js";

export function attemptMove(from, to) {
    const fromPos = getLogicPosition(from);
    const toPos = getLogicPosition(to);
    console.group('ATTEMPTING MOVE', fromPos, toPos);

    if (moveIsLegal(fromPos, toPos)) {
        const specialMove = moveIsSpecial(fromPos, toPos);
        console.log('special move:', specialMove);
        if (specialMove.castle) {
            castle(fromPos, toPos);
        } else if (specialMove.enPassant) {
            enPassant(fromPos, toPos);
        } else if (specialMove.promote) {
            promote(toPos);
        }
        game.move(
            game.chessBoard[fromPos.y][fromPos.x],
            game.chessBoard[toPos.y][toPos.x]
        );
        if (legalCheck()) {
            game.changeTurn();
        } else {
            console.log('Not a legal Move');
            if (specialMove.castle || specialMove.enPassant || specialMove.promote) {
                game.undo();
                game.undo();
            } else {
                game.undo();
            }
        }
    }
    console.log('saves:', game.saves);
    console.groupEnd();
}

function moveIsLegal(fromPos, toPos) {
    const fromTile = game.chessBoard[fromPos.y][fromPos.x];
    if (fromTile.isEmpty() ||
        fromTile.heldPiece.color !== game.whiteToMove ||
        !_moveInSet(fromPos, toPos)) return false;
    return true;
}

function _moveInSet(fromPos, toPos) {
    const moveSet = game.chessBoard[fromPos.y][fromPos.x].heldPiece.getMoveSet(fromPos);
    for (let i = 0; i < moveSet.length; i++) {
        const move = moveSet[i];
        if (move.x === toPos.x && move.y === toPos.y) {
            return true;
        }
    }
    return false;
}

function moveIsSpecial(fromPos, toPos) {
    const piece = game.chessBoard[fromPos.y][fromPos.x].heldPiece;
    const specialMove = { castle: false, enPassant: false, promote: false };
    const move = _getMove(fromPos, toPos);
    if (piece instanceof Pawn &&
        move.isThreat &&
        !move.requiresPiece) {
        specialMove.enPassant = true;
    } else if (piece instanceof Pawn &&
        (toPos.y === 0 || toPos.y === 7)) {
        specialMove.promote = true;
    } else if (piece instanceof King && Math.abs(toPos.x - fromPos.x) > 1) {
        specialMove.castle = true;
    }
    return specialMove;

}

function _getMove(fromPos, toPos) {
    const moveSet = game.chessBoard[fromPos.y][fromPos.x].heldPiece.getMoveSet(fromPos);
    for (let i = 0; i < moveSet.length; i++) {
        const move = moveSet[i];
        if (move.x === toPos.x && move.y === toPos.y) {
            return move;
        }
    }
}

function legalCheck() {
    console.groupCollapsed('CHECK Conditions');
    if (game.getCheck(game.whiteToMove)) {
        console.log("CURRENT PLAYER IS IN CHECK");
        console.groupEnd();
        return false
    } else if (game.getCheck(!game.whiteToMove)) {
        console.log("PLAYER PUT OPPONENT IN CHECK");
        game.colorInCheck = !game.whiteToMove;
        const mate = game.getMate(game.colorInCheck);
        // console.log('mate:', mate)
    } else {
        game.colorInCheck = null;
    }
    console.groupEnd();
    return true;
}
// Special Moves
function castle(fromPos, toPos) {
    console.log('Castling');
    if (toPos.x - fromPos.x < 0) {
        game.move(game.chessBoard[fromPos.y][0],
            game.chessBoard[fromPos.y][3]);
    } else if (0 < toPos.x - fromPos.x) {
        game.move(game.chessBoard[fromPos.y][7],
            game.chessBoard[fromPos.y][5]);
    }
}

function enPassant(fromPos, toPos) {
    game.take(game.chessBoard[fromPos.y][toPos.x]);
}

function promote(toPos) {
    renderPromotion(game.whiteToMove, true);
    game.promotion.color = game.whiteToMove;
    game.promotion.position = toPos;
    // game.take(fromPos);
}