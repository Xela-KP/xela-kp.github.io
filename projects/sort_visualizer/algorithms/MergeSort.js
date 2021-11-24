import Algorithm from "./Algorithm.js"
import sleep from "../Async.js";

export default class MergeSort extends Algorithm {
    constructor(array, sortSpeed) {
        super(array, sortSpeed);
    }
    async sort() {
        console.log(this.array);
        this.array = await this.mergeSort(this.array, 0, this.n);
    }
    async mergeSort(array, start, end) {
        if (array.length < 2) return array;
        let middle = Math.floor(array.length / 2);
        let leftSorted = await this.mergeSort(array.slice(0, middle), start, start + middle);
        let rightSorted = await this.mergeSort(array.slice(middle, array.length), start + middle, end);
        let merged = await this._merge(leftSorted, rightSorted, start, end);
        await this.update(merged, start, end, start, end);
        return merged;
    }
    async _merge(leftSorted, rightSorted) {
        var index1 = 0;
        var index2 = 0;
        var merged = [];
        while (index1 < leftSorted.length && index2 < rightSorted.length) {
            if (leftSorted[index1] <= rightSorted[index2]) {
                merged.push(leftSorted[index1]);
                index1 += 1;
            } else {
                merged.push(rightSorted[index2]);
                index2 += 1;
            }
        }
        merged.push(...leftSorted.slice(index1, leftSorted.length));
        merged.push(...rightSorted.slice(index2, rightSorted.length));

        return merged;
    }
    async update(merged, start, end) {
        let j = 0;
        for (var i = start; i < end; i++) {
            await sleep(this.sortSpeed).then(async() => {
                let bar = $('#' + i);
                bar.css('height', merged[j++]);
            });
        }
    }
}