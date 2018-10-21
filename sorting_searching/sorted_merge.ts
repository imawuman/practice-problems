// Exercise 10.1
// https://leetcode.com/problems/merge-sorted-array/description/

// Assume a1 has enough space to fit 22
function sortedMerge(a1: number[], a2: number[]) {
    let tail1 = a1.length - a2.length - 1;
    let tail2 = a2.length - 1;
    let index = a1.length - 1;
    while (tail2 >= 0 && index >= 0) {
        if (tail1 < 0 || a2[tail2] >= a1[tail1]) {
            a1[index] = a2[tail2];
            tail2--;
        } else {
            a1[index] = a1[tail1];
            tail1--;
        }
        index--;
    }
}
// use empty buffer at end of a1 as temp storage for a1

function resize(a1: number[], a2: number[]): number[] {
    const empty = Array(a2.length);
    return [...a1, ...empty];
}

// Test cases
const odds = [1, 3, 5, 7, 9, 11];
const evens = [2, 4, 6, 8, 10, 12];
const merged = resize(odds, evens);
console.log(merged);
console.log(evens);
console.log("======== MERGED =======");
sortedMerge(merged, evens);
console.log(merged);

export default {};
