import { game } from "../model/game.js";
import { handleClick, handleUndo, handlePromotion } from "../model/event_handlers.js"
import { renderBoard } from "../view/render.js";
$(function() {
    renderBoard(game.chessBoard);
    $('td').on('click', function() {
        handleClick($(this).prop('id'));
    });
    $('#undo-button').on('click', function() {
        handleUndo();
    });
    $('.promotion-option').on('click', function() {
        handlePromotion($(this).attr('id'));
    });
});