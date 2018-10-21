// https://en.wikipedia.org/wiki/Quicksort

type Comparator<T> = (a: T, b: T) => number;

export const DEFAULT_COMPARATOR = (a: any, b: any) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
};

export function quickSort<T>(arr: T[], compareFn: Comparator<T> = DEFAULT_COMPARATOR): T[] {
    return quickSortRecursive(arr, 0, arr.length - 1, compareFn);
}

function quickSortRecursive<T>(arr: T[], start: number, end: number, compareFn: Comparator<T>) {
    if (start < end) {
        const pivot = partition(arr, start, end, compareFn);
        quickSortRecursive(arr, start, pivot - 1, compareFn);
        quickSortRecursive(arr, pivot + 1, end, compareFn);
    }
    return arr;
}

function partition<T>(arr: T[], start: number, end: number, compareFn: Comparator<T>): number {
    const pivot = start;
    let i = start + 1;
    let j = end;
    while (i <= j) {
        while (i <= end && compareFn(arr[i], arr[pivot]) <= 0) {
            i++;
        }
        while (j >= start && compareFn(arr[j], arr[pivot]) >= 0) {
            j--;
        }
        if (i < j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    const mid = i - 1;
    if (compareFn(arr[pivot], arr[mid]) > 0) {
        swap(arr, pivot, mid);
        return mid;
    } else {
        return pivot;
    }
}

function swap(arr: any[], a: number, b: number) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// Test cases

// increasing sort
console.log("Increasing:");
console.log(quickSort([1]));
console.log(quickSort([1, 2]));
console.log(quickSort([2, 1]));
console.log(quickSort([4, 7, 5, 1, 6, 2, 3, 8, 1, 9]));
console.log(quickSort([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(quickSort([9, 8, 7, 6, 5, 4, 3, 2, 1]));

// decreasing sort
const reverseComparator = (a: number, b: number) => b - a;
console.log("Decreasing:");
console.log(quickSort([1], reverseComparator));
console.log(quickSort([1, 2], reverseComparator));
console.log(quickSort([2, 1], reverseComparator));
console.log(quickSort([4, 7, 5, 1, 6, 2, 3, 8, 1, 9], reverseComparator));
console.log(quickSort([1, 2, 3, 4, 5, 6, 7, 8, 9], reverseComparator));
console.log(quickSort([9, 8, 7, 6, 5, 4, 3, 2, 1], reverseComparator));
