// Exercise 16.11

// O(n^2) where n = numBoards
function allPossibleLengths(numBoards: number, shorter: number, longer: number): Set<number> {
    if (numBoards < 1) {
        return new Set();
    } else if (numBoards === 1) {
        return new Set([shorter, longer]);
    } else {
        const allSubLengths = allPossibleLengths(numBoards - 1, shorter, longer);
        const allLengths = new Set();
        allSubLengths.forEach(l => {
            allLengths.add(l + shorter);
            allLengths.add(l + longer);
        });
        return allLengths;
    }
}

// Test cases

console.log(allPossibleLengths(7, 1, 5));

export default {};
