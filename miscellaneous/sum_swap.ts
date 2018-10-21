// Exercise 16.21

// Find pair of values that if swapped would give both arrays the same sum
// O(n + m) where n = length of a and m is length of b
function findSwapIndices(a: number[], b: number[]): [number, number] | null {
    const setASum = a.reduce((sum, v) => sum + v, 0);
    const setBSum = b.reduce((sum, v) => sum + v, 0);
    const sumDiff = Math.abs(setASum - setBSum);
    if (sumDiff % 2 !== 0) {
        // No possible solution
        return null;
    }
    const swapDelta = sumDiff / 2;
    const setAIndices = new Map<number, number>();
    a.forEach((v, index) => setAIndices.set(v, index));
    for (let i = 0; i < b.length; i++) {
        const val = b[i];
        const aValueNeeded = setASum > setBSum ? val + swapDelta : val - swapDelta;
        if (setAIndices.has(aValueNeeded)) {
            return [setAIndices.get(aValueNeeded)!, i];
        }
    }
    // No possible swappings
    return null;
}

// Test cases

const arrA = [4, 1, 2, 1, 1, 2, 4]; // Sum: 15
const arrB = [4, 7, 4, 4]; // Sum: 19
console.log(findSwapIndices(arrA, arrB));
console.log(findSwapIndices(arrB, arrA));

export default {};
