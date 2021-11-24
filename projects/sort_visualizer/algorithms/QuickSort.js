import Algorithm from "./Algorithm.js"
import sleep from "../Async.js";

export default class QuickSort extends Algorithm {
    constructor(array, sortSpeed) {
        super(array, sortSpeed);
    }
    async sort() {
        await this._inPlaceQuickSort(this.array, 0, this.n);
    }


    async _inPlaceQuickSort(array, start, end) {
        if (end - start < 2) {
            return;
        } else {
            let pivotIndex = await this._inPlacePartition(array, start, end);
            await this._inPlaceQuickSort(array, start, pivotIndex);
            await this._inPlaceQuickSort(array, pivotIndex + 1, end);
        }
    }

    async _inPlacePartition(array, start, end) {
        var pivot = array[start];
        var smallIndex = start + 1;
        var bigIndex = end;
        while (smallIndex < bigIndex) {
            if (array[smallIndex] <= pivot) {
                smallIndex += 1;
            } else {
                this.swap(smallIndex, bigIndex - 1);
                await this.update(smallIndex, bigIndex - 1)
                bigIndex -= 1;
            }
        }
        this.swap(start, smallIndex - 1);
        await this.update(start, smallIndex - 1)
        return smallIndex - 1;
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