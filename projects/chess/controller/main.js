import { game } from "../model/game.js";
import { handleClick, handleUndo, handlePromotion } from "../model/event_handlers.js"
import { renderBoard } from "../view/render.js";
$(function() {
    renderBoard(game.chessBoard);
    $('td').on('click', function() {
        if (!$('#promotion-panel').hasClass('active') &&
            !$('#end-screen').hasClass('active')) handleClick($(this).prop('id'));
    });
    $('#undo-button').on('click', function() {
        if (!$('#promotion-panel').hasClass('active') &&
            !$('#end-screen').hasClass('active')) handleUndo();
    });
    $('.promotion-option').on('click', function() {
        handlePromotion($(this).attr('id'));
        $('#promotion-panel').removeClass('active');
    });
    $('#end-screen a').on('click', function() {
        console.log('new game');
        $('#end-screen').removeClass('active');
    });
});