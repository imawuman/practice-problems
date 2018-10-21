// Exercise 10.11

// Peak is element >= both adjacent elements
// Valley is element <= both adjacent elements
function sortPeaksValleys(elements: number[]) {
    if (elements.length > 1) {
        let isCurrentPeak = elements[0] >= elements[1];
        for (let i = 0; i < elements.length - 1; i++) {
            if (isCurrentPeak && !isPeak(elements, i)) {
                swap(i, i + 1, elements);
            } else if (!isCurrentPeak && !isValley(elements, i)) {
                swap(i, i + 1, elements);
            }
            isCurrentPeak = !isCurrentPeak;
        }
    }
}

function swap(x: number, y: number, elements: number[]) {
    const temp = elements[x];
    elements[x] = elements[y];
    elements[y] = temp;
}

function isPeak(elements: number[], index: number): boolean {
    if (elements.length < 2) {
        throw new Error("Minimum 2 elements required.");
    }
    if (index === 0) {
        return elements[index] >= elements[index + 1];
    } else if (index === elements.length - 1) {
        return elements[index] >= elements[index - 1];
    } else {
        return elements[index] >= elements[index - 1] && elements[index] >= elements[index + 1];
    }
}

function isValley(elements: number[], index: number): boolean {
    if (elements.length < 2) {
        throw new Error("Minimum 2 elements required.");
    }
    if (index === 0) {
        return elements[index] <= elements[index + 1];
    } else if (index === elements.length - 1) {
        return elements[index] <= elements[index - 1];
    } else {
        return elements[index] <= elements[index - 1] && elements[index] <= elements[index + 1];
    }
}

// Test cases

function validateSorted(elements: number[]): boolean {
    if (elements.length > 1) {
        let isPrevPeak = isPeak(elements, 0);
        for (let i = 1; i < elements.length; i++) {
            if (isPrevPeak && !isValley(elements, i)) {
                return false;
            } else if (!isPrevPeak && !isPeak(elements, i)) {
                return false;
            } else {
                isPrevPeak = !isPrevPeak;
            }
        }
    }
    return true;
}

const increasing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const decreasing = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const alreadySorted = [1, 10, 2, 9, 3, 8, 4, 6, 5, 5, 5];
const mixed = [3, 5, 8, 1, 4, 4, 7, 10, 6];

const testCases = [increasing, decreasing, alreadySorted, mixed];
for (const testCase of testCases) {
    sortPeaksValleys(testCase);
    console.log(testCase);
    console.log(validateSorted(testCase));
}

export default {};
