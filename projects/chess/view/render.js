import { DIMENSION } from '../controller/main.js'
import { assets } from './assets_path.js';
import { numToAlpha } from './position_mapping.js';

export function renderBoard() {
    console.log('rendering board');
    let table = $('table');
    let colors = ['hsl(30, 50%, 90%)', 'hsl(30, 50%, 30%)'];

    for (let y = DIMENSION; y > 0; y--) {
        let row = $('<tr/>').prop('id', y);
        for (let x = 0; x < DIMENSION; x++) {
            let tile = $('<td/>')
                .prop('id', numToAlpha[y] + (x + 1))
                .css('background-color', colors[(x + y) % 2]);
            row.append(tile);
        }
        table.append(row);
    }
}

export function renderPieces(chessBoard) {
    for (let y = DIMENSION; y > 0; y--) {
        for (let x = 0; x < DIMENSION; x++) {
            let domTile = $('td#' + numToAlpha[y] + (x + 1));
            let logicTile = chessBoard[DIMENSION - y][x];
            if (logicTile.heldPiece !== null) {
                domTile.css('background-image', `url(${assets[logicTile.heldPiece.name]})`)
            }
        }
    }
}