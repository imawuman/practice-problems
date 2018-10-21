// Exercies 10.4

interface IListy {
    elementAt(index: number): number;
}

class Listy implements IListy {
    public constructor(private list: number[] = []) {}

    public elementAt(index: number) {
        const elem = this.list[index];
        return elem != null ? elem : -1;
    }
}

function indexOf(target: number, list: IListy) {
    let index = 0;
    while (list.elementAt(index) !== target) {
        if (list.elementAt(index) === -1) {
            // incrementally search for target from index / 2
            index = incrementSearch(target, Math.floor(index / 2), list);
        } else if (list.elementAt(index) > target) {
            // binary search for target between index / 2 and index
            index = binarySearch(target, Math.floor(index / 2), index, list);
        } else if (index === 0) {
            index = 1;
        } else {
            index *= 2;
        }
    }
    return index;
}

function incrementSearch(target: number, start: number, list: IListy): number {
    let index = start;
    while (list.elementAt(index) !== -1 && list.elementAt(index) !== target) {
        index++;
    }
    return index;
}

function binarySearch(target: number, start: number, end: number, list: IListy): number {
    if (start === end) {
        return list.elementAt(start) === target ? start : -1;
    } else if (start === end - 1) {
        const maybeStart = list.elementAt(start) !== -1 ? start : -1;
        const maybeEnd = list.elementAt(end) !== -1 ? end : -1;
        return maybeStart !== -1 ? maybeStart : maybeEnd;
    } else {
        const mid = start + Math.floor((end - start) / 2);
        const item = list.elementAt(mid);
        if (target < item) {
            return binarySearch(target, start, mid, list);
        } else if (target > item) {
            return binarySearch(target, mid, end, list);
        } else {
            // item === target
            return mid;
        }
    }
}

// Test cases
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const listy = new Listy(arr);

for (const a of arr) {
    console.log("Target: ", a);
    console.log("Index: ", indexOf(a, listy));
    console.log("=======");
}

export default {};
