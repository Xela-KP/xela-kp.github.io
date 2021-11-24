export default class Algorithm {
    constructor(array, sortSpeed) {
        this.array = array;
        this.n = array.length;
        this.sortSpeed = sortSpeed;
    }

    sort() {
        throw new Error('sort not implemented');
    }

    update() {
        throw new Error('update not implemented');
    }

    swap(a, b) {
        let temp = this.array[b];
        this.array[b] = this.array[a];
        this.array[a] = temp;
    }
}