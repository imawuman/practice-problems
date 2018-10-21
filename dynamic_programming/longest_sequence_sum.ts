// Exercise 16.17

function largestSequenceSum(elements: number[]): number {
    if (elements.length === 0) {
        throw new Error("Minimum 1 element required!");
    }
    let max = elements[0];
    let prevResult = elements[0];
    for (let i = 1; i < elements.length; i++) {
        prevResult = Math.max(elements[i], prevResult + elements[i]);
        max = Math.max(max, prevResult);
    }
    return max;
}

// Test cases

console.log(largestSequenceSum([2, -8, 3, -2, 4, -10]));

export default {};
