// Exercise 17.5

type LetterOrNumber = string | number;

// Returns longest subarray with equal number of letters and numbers
// O(n^2) where n = length of array
function longestSubarray(arr: LetterOrNumber[]): LetterOrNumber[] {
    if (arr.length === 0) {
        return [];
    }
    // Compute letter and number counts up to each index
    const letterCounts: number[] = Array(arr.length).fill(0);
    const numberCounts: number[] = Array(arr.length).fill(0);
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        const prevNumCount = i > 0 ? numberCounts[i - 1] : 0;
        const prevLetterCount = i > 0 ? letterCounts[i - 1] : 0;
        if (typeof val === "number") {
            numberCounts[i] = prevNumCount + 1;
            letterCounts[i] = prevLetterCount;
        } else {
            numberCounts[i] = prevNumCount;
            letterCounts[i] = prevLetterCount + 1;
        }
    }
    // Find largest subarray where num count === letter count
    let currMaxLength = 0;
    let start = 0;
    let end = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const prevNumberCount = i > 0 ? numberCounts[i - 1] : 0;
            const prevLetterCount = i > 0 ? letterCounts[i - 1] : 0;
            const numberCount = numberCounts[j] - prevNumberCount;
            const letterCount = letterCounts[j] - prevLetterCount;
            const subArrayLength = j - i + 1;
            if (numberCount === letterCount && subArrayLength > currMaxLength) {
                start = i;
                end = j;
                currMaxLength = subArrayLength;
            }
        }
    }
    return arr.slice(start, end + 1);
}

/**
 * Brute force method: O(n^3) where n is length of array
 * for i from 0 to length arr:
 *     for j from i to length arr:
 *         for k from i to j:
 *             count number of numbers and letters of k between i - j
 *             compare and update longest subarray if larger than current seen
 * return largest seen
 */

// Test cases

const sample1 = [1, "a", "b", 2, "c", 3, 4, 5, "d", 6, "f"];
const sample2 = [1, "a", "b", 2, "c", "d", "e", 3];
// should return subarray from index [1, 10]
console.log(longestSubarray(sample1));
// should return subarray from index [2, 7]
console.log(longestSubarray(sample2));

export default {};
