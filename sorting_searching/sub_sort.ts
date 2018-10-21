// Exercise 16.16

// O(n*log(n)) where n = length of elements (due to sorting step)
function findSubSortIndicesV1(elements: number[]): [number, number] {
    if (elements.length === 0) {
        throw new Error("Mininum array length of 1 required!");
    }
    if (elements.length === 1) {
        // Array of length 1 is always sorted
        return [0, 0];
    }
    const sorted = elements.slice().sort((a, b) => a - b);
    let start = 0;
    let end = elements.length - 1;
    while (start < end && (elements[start] === sorted[start] || elements[end] === sorted[end])) {
        if (elements[start] === sorted[start]) {
            start++;
        }
        if (elements[end] === sorted[end]) {
            end--;
        }
    }
    if (start >= end) {
        // Entire array already sorted
        return [0, 0];
    }
    return [start, end];
}

// O(n) where n = length of elements
function findSubSortIndicesV2(elements: number[]): [number, number] {
    if (elements.length === 0) {
        throw new Error("Mininum array length of 1 required!");
    }
    if (elements.length === 1) {
        // Array of length 1 is always sorted
        return [0, 0];
    }
    // Advance from start until no longer increasing
    let start = 0;
    while (start === 0 || elements[start - 1] <= elements[start]) {
        start++;
    }
    if (start >= elements.length) {
        // already sorted
        return [0, 0];
    }
    // Advance from end of array until no longer decreasing
    let end = elements.length - 1;
    while (end === elements.length - 1 || elements[end] <= elements[end + 1]) {
        end--;
    }
    // Compute the min and max of elements between start and end
    const min = findMin(elements, start, elements.length - 1);
    const max = findMax(elements, 0, end);
    // Adjust start based on min
    let adjustedStart = start;
    while (adjustedStart > 0 && min < elements[adjustedStart - 1]) {
        adjustedStart--;
    }
    // Adjust end based on max
    let adjustedEnd = end;
    while (adjustedEnd < elements.length - 1 && max > elements[adjustedEnd + 1]) {
        adjustedEnd++;
    }
    return [adjustedStart, adjustedEnd];
}

function findMin(elements: number[], start: number, end: number): number {
    let min = elements[start];
    for (let i = start; i <= end; i++) {
        if (elements[i] < min) {
            min = elements[i];
        }
    }
    return min;
}

function findMax(elements: number[], start: number, end: number): number {
    let max = elements[start];
    for (let i = start; i <= end; i++) {
        if (elements[i] > max) {
            max = elements[i];
        }
    }
    return max;
}

// Test cases

console.log(findSubSortIndicesV1([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]));
console.log(findSubSortIndicesV2([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]));
console.log(findSubSortIndicesV1([1, 10, 5, 9, 6, 10]));
console.log(findSubSortIndicesV2([1, 10, 5, 9, 6, 10]));
console.log(findSubSortIndicesV1([10, 5, 10]));
console.log(findSubSortIndicesV2([10, 5, 10]));
console.log(findSubSortIndicesV1([5, 5, 10]));
console.log(findSubSortIndicesV2([5, 5, 10]));

export default {};
