import { DIMENSION } from "../game.js";

export default class ChessPiece {
    constructor(name, color, LRP) {
        this.name = name;
        this.color = color; // Boolean: White=true, Black=false

        if (color) {
            this.xDirection = 1;
            this.yDirection = -1;
        } else {
            this.xDirection = -1;
            this.yDirection = 1;
        }

        this.LRP = LRP
    }
    getMoveSet(position, directions) {
        console.log('getting long range moveset');
        console.log(position, directions);
        let moveset = [];

        directions.forEach(direction => {
            const xDirection = direction[0];
            const yDirection = direction[1];
            let x = position.x + xDirection;
            let y = position.y + yDirection;
            while (x < DIMENSION && y < DIMENSION && 0 <= x && 0 <= y) {
                moveset.push({ x: x, y: y });
                x += xDirection;
                y += yDirection;
            }
        });
        return moveset;
    }
}