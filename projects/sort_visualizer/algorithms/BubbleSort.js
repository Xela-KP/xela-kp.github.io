import Algorithm from "./Algorithm.js"
import sleep from "../Async.js";

export default class BubbleSort extends Algorithm {
    constructor(array, sortSpeed) {
        super(array, sortSpeed);
    }
    async sort() {
        for (var i = 0; i < this.n - 1; i++) {
            for (var j = 0; j < this.n - 1 - i; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1);
                    await this.update(j, j + 1), 500
                }
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