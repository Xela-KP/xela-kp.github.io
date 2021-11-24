import Algorithm from "./Algorithm.js"
import sleep from "../Async.js";

export default class InsertionSort extends Algorithm {
    constructor(array, sortSpeed) {
        super(array, sortSpeed);
    }
    async sort() {
        for (var i = 1; i < this.n; i++) {
            var j = i - 1;
            while (j >= 0 && this.array[j] > this.array[j + 1]) {
                this.swap(j + 1, j);
                await this.update(j + 1, j);
                j -= 1;
            }
        }
    }

    async update(bigIndex, smallIndex) {
        let small = $('.bar#' + smallIndex);
        let big = $('.bar#' + bigIndex);

        await sleep(this.sortSpeed).then(() => {
            small.css('height', this.array[smallIndex]);
            big.css('height', this.array[bigIndex]);
        });
    }
}