export const alphaToNum = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "f": 6,
    "g": 7,
    "h": 8
}

export function getLogicPosition(position) {
    return {
        x: alphaToNum[position.slice(0, 1)] - 1,
        y: 8 - parseInt(position.slice(1, 2))
    };
    // Position returned in {x, y} format
}