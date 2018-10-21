// Exercise 8.9

function allParensPairs(numPairs: number): Set<string> {
    const allPairs = new Set();
    getParens("", numPairs, 0, allPairs);
    return allPairs;
}

function getParens(current: string, left: number, right: number, pairs: Set<string>) {
    if (left > 0) {
        getParens(current + "(", left - 1, right + 1, pairs);
    }
    if (right > 0) {
        getParens(current + ")", left, right - 1, pairs);
    }
    if (left === 0 && right === 0) {
        pairs.add(current);
    }
}

console.log(allParensPairs(3));

export default {};
