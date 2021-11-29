import { game } from "../model/game.js";
import { handleClick } from "../model/event_handlers.js"
import { renderBoard } from "../view/render.js";
$(function() {
    renderBoard(game.chessBoard);
    $('td').on('click', function() {
        handleClick($(this).prop('id'));
    });

});