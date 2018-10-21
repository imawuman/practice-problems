// Return index of a value in a sorted rotated array

export function search(nums: number[], value: number): number {
    return binarySearch(nums, value, 0, nums.length - 1);
}

function binarySearch(nums: number[], value: number, start: number, end: number): number {
    if (start > end) {
        return -1;
    }
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] === value) {
        return mid;
    } else if (mid === start) {
        // target is not in [start, mid] since mid === start
        return binarySearch(nums, value, mid + 1, end);
    } else if (nums[start] < nums[mid]) {
        // [start, mid] is sorted
        if (nums[start] <= value && value < nums[mid]) {
            // value is in [start, mid]
            return binarySearch(nums, value, start, mid - 1);
        } else {
            // value is not in [start, mid]
            return binarySearch(nums, value, mid + 1, end);
        }
    } else if (nums[mid] < value && value <= nums[end]) {
        // [mid, end] is sorted and value is in [min, end]
        return binarySearch(nums, value, mid + 1, end);
    } else {
        // [mid, end] is sorted and value is not in [mid, end]
        return binarySearch(nums, value, start, mid - 1);
    }
}

// Test cases

console.log(search([1, 2, 3, 4, 5, 6, 7], 0));
console.log(search([1, 2, 3, 4, 5, 6, 7], 1));
console.log(search([7, 1, 2, 3, 4, 5, 6], 1));
console.log(search([6, 7, 1, 2, 3, 4, 5], 1));
console.log(search([5, 6, 7, 1, 2, 3, 4], 1));
console.log(search([4, 5, 6, 7, 1, 2, 3], 1));
console.log(search([3, 4, 5, 6, 7, 1, 2], 1));
console.log(search([2, 3, 4, 5, 4, 7, 1], 1));

// test even length edge cases
console.log(search([2, 1], 1) === 1);
console.log(search([6, 7, 1, 2, 3, 4], 1) === 2);
