import Bishop from "./classes/Bishop.js";
import Rook from "./classes/Rook.js";
import Knight from "./classes/Knight.js";
import Queen from "./classes/Queen.js";
import King from "./classes/King.js";
import Pawn from "./classes/Pawn.js";
import Tile from "./classes/Tile.js";

export const DIMENSION = 8;
// TODO: Fix Castle doesn't work in certain situations??
// Undoing Castle or En Passant only undo 1 turn.
export var game = {
    saves: new Array(),
    whiteToMove: true,
    colorInCheck: null, // true -> white in check. false -> black in check. null -> neither in check.
    chessBoard: [
        _createBackline(false),
        _createFrontline(false),
        _createEmptyRow(),
        _createEmptyRow(),
        _createEmptyRow(),
        _createEmptyRow(),
        _createFrontline(true),
        _createBackline(true)
    ],
    promotion: { color: null, position: null },
    changeTurn: () => {
        game.whiteToMove = !game.whiteToMove;
    },
    saveGame: () => {
        console.groupCollapsed('Saving Game')
        let save = {...game };
        let boardSave = [];
        let printSave = [];
        for (let y = 0; y < DIMENSION; y++) {
            boardSave.push([]);
            printSave.push([]);
            for (let x = 0; x < DIMENSION; x++) {
                const tile = game.chessBoard[y][x];
                boardSave[y].push(tile.copy());
                printSave[y].push(tile.copy());
            }
        }
        save.chessBoard = boardSave;
        game.saves.push(save);
        console.log('saved game', printSave);
        console.groupEnd();
    },
    logCurrentBoard: () => {
        let logBoard = [];
        for (let y = 0; y < DIMENSION; y++) {
            logBoard.push([]);
            for (let x = 0; x < DIMENSION; x++) {
                const tile = game.chessBoard[y][x];
                logBoard[y].push(tile.copy());
            }
        }
        console.log('current board:', logBoard);
    },
    undo: () => {
        console.groupCollapsed('Reverting Game');
        const save = game.saves.pop();
        if (save !== undefined) {
            game = save;
            game.logCurrentBoard();
        } else {
            console.log('CANNOT UNDO');
        }
        console.groupEnd();
    },
    getPrevious: () => {
        const previous = game.saves.pop();
        game.saves.push(previous);
        return previous;
    },
    move: (fromTile, toTile) => {
        console.groupCollapsed('moving', fromTile, toTile);
        game.saveGame();
        fromTile.heldPiece.hasMoved = true;
        toTile.heldPiece = fromTile.heldPiece;
        fromTile.heldPiece = null;
        game.logCurrentBoard();
        console.groupEnd();
    },
    enPassant: (fromPos, toPos) => {
        game.saveGame();
        console.groupCollapsed('attempting EnPassant');
        game.chessBoard[toPos.y][toPos.x].heldPiece = game.chessBoard[fromPos.y][fromPos.x].heldPiece;
        game.chessBoard[fromPos.y][fromPos.x].heldPiece = null;
        game.chessBoard[fromPos.y][toPos.x].heldPiece = null;
        console.groupEnd();
    },
    castle: (fromPos, toPos) => {
        game.saveGame();
        console.groupCollapsed('attempting Castle');
        game.chessBoard[toPos.y][toPos.x].heldPiece = game.chessBoard[fromPos.y][fromPos.x].heldPiece;
        game.chessBoard[fromPos.y][fromPos.x].heldPiece = null;
        if (toPos.x - fromPos.x < 0) {
            game.chessBoard[fromPos.y][3].heldPiece = game.chessBoard[fromPos.y][0].heldPiece;
            game.chessBoard[fromPos.y][0].heldPiece = null;
        } else {
            game.chessBoard[fromPos.y][5].heldPiece = game.chessBoard[fromPos.y][7].heldPiece;
            game.chessBoard[fromPos.y][7].heldPiece = null;
        }
        console.groupEnd();
    },
    promote: (id) => {
        console.groupCollapsed('Attempting promotion', game.promotion, id);
        const tile = game.chessBoard[game.promotion.position.y][game.promotion.position.x];
        let name;
        if (game.promotion.color) {
            name = 'w' + id;
        } else {
            name = 'b' + id;
        }
        switch (id) {
            case 'Q':
                tile.heldPiece = new Queen(name, game.promotion.color);
                break;
            case 'R':
                tile.heldPiece = new Rook(name, game.promotion.color);
                break;
            case 'B':
                tile.heldPiece = new Bishop(name, game.promotion.color);
                break;
            case 'N':
                tile.heldPiece = new Knight(name, game.promotion.color);
                break;
            default:
                console.log('Promotion error');
                break;
        }
        game.promotion = { color: null, position: null };
        console.groupEnd();
    },
    getCheck: (color) => {
        // Return true if King <color> is in check
        console.groupCollapsed('Getting Check on King', color);

        function _getKingTile() {
            for (let y = 0; y < DIMENSION; y++) {
                for (let x = 0; x < DIMENSION; x++) {
                    const tile = game.chessBoard[y][x];
                    const heldPiece = tile.heldPiece;
                    if (heldPiece !== null &&
                        heldPiece.color === color &&
                        heldPiece instanceof King) return { x: x, y: y, tile: tile };
                }
            }
        }
        const kingTile = _getKingTile();
        const kingPosition = { x: kingTile.x, y: kingTile.y };
        const pawnMoveSet = new Pawn('tempP', color).getMoveSet(kingPosition);
        const knightMoveSet = new Knight('tempN', color).getMoveSet(kingPosition);

        const rookMoveSet = new Rook('tempR', color).getMoveSet(kingPosition);
        const bishopMoveSet = new Bishop('tempB', color).getMoveSet(kingPosition);
        const queenMoveSet = new Queen('tempQ', color).getMoveSet(kingPosition);

        const tempKing = new King('tempK', color);
        tempKing.hasMoved = true;
        const kingMoveSet = tempKing.getMoveSet(kingPosition);
        // const kingMoveSet = kingTile.tile.heldPiece.getMoveSet(kingPosition);
        const moveSets = [
            { set: pawnMoveSet, class: Pawn },
            { set: knightMoveSet, class: Knight },
            { set: queenMoveSet, class: Queen },
            { set: rookMoveSet, class: Rook },
            { set: bishopMoveSet, class: Bishop },
            { set: kingMoveSet, class: King }
        ];

        for (let i = 0; i < moveSets.length; i++) {
            const moveSet = moveSets[i];
            for (let j = 0; j < moveSet.set.length; j++) {
                const position = moveSet.set[j];
                const posTile = game.chessBoard[position.y][position.x];
                if (!posTile.isEmpty() &&
                    posTile.heldPiece.color !== color &&
                    position.isThreat &&
                    posTile.heldPiece instanceof moveSet.class
                ) {
                    console.groupEnd();
                    return true;
                };
            }
        }
        console.groupEnd();
        return false;
    },
    getEscape: (color) => {
        console.groupCollapsed('Checking if King Can Escape', color);
        for (let y = 0; y < DIMENSION; y++) {
            for (let x = 0; x < DIMENSION; x++) {
                if (!game.chessBoard[y][x].isEmpty() && game.chessBoard[y][x].heldPiece.color === color) {
                    const moveSet = game.chessBoard[y][x].heldPiece.getMoveSet({ y: y, x: x });
                    for (let i = 0; i < moveSet.length; i++) {
                        const move = moveSet[i];
                        if (game.moveInSet({ x: x, y: y }, { x: move.x, y: move.y })) {
                            game.move(game.chessBoard[y][x], game.chessBoard[move.y][move.x]);
                            const canEscape = !game.getCheck(color);
                            game.undo();
                            console.log('CAN ESCAPE:', canEscape);
                            if (canEscape) {
                                console.log(moveSet);
                                console.groupEnd();
                                return false
                            };
                        }
                    }
                }
            }
        }
        console.log('CHECKMATE');
        console.groupEnd();
        return true;
    },
    getDraw: (color) => {

    },
    moveInSet: (fromPos, toPos) => {
        const moveSet = game.chessBoard[fromPos.y][fromPos.x].heldPiece.getMoveSet(fromPos);
        for (let i = 0; i < moveSet.length; i++) {
            const move = moveSet[i];
            if (move.x === toPos.x && move.y === toPos.y) {
                return true;
            }
        }
        return false;
    }
}



function _createBackline(color) {
    let prefix;
    if (color) {
        prefix = 'w'
    } else {
        prefix = 'b'
    }
    return [new Tile(new Rook(prefix + 'R', color)),
        // new Tile(null),
        // new Tile(null),
        // new Tile(null),
        new Tile(new Knight(prefix + 'N', color)),
        new Tile(new Bishop(prefix + 'B', color)),
        new Tile(new Queen(prefix + 'Q', color)),
        new Tile(new King(prefix + 'K', color)),
        new Tile(new Bishop(prefix + 'B', color)),
        new Tile(new Knight(prefix + 'N', color)),
        // new Tile(null),
        // new Tile(null),
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