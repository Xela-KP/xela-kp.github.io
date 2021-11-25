import { game } from "../model/game.js";
import { renderBoard, renderPieces } from "../view/render.js";

export const DIMENSION = 8;
$(function() {
    console.log(game.chessBoard);
    renderBoard();
    renderPieces(game.chessBoard);
    $('td').on('click', function() {
        console.log($(this).prop('id'));
    })
});