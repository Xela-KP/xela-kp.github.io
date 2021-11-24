import Algorithm from "./Algorithm.js"
import sleep from "../Async.js";

export default class SelectionSort extends Algorithm {
    constructor(array, sortSpeed) {
        super(array, sortSpeed);
    }
    async sort() {
        for (var i = 0; i < this.n; i++) {
            for (var j = i + 1; j < this.n; j++) {
                if (this.array[j] < this.array[i]) {
                    this.swap(j, i);
                    await this.update(j, i);
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