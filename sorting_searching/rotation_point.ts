// Interview cake rotation point question

function findRotationIndex(words: string[]): number {
    if (words.length === 0) {
        return -1;
    } else if (words.length === 1) {
        return 0;
    } else {
        let start = 0;
        let end = words.length - 1;
        let index = Math.floor((end - start) / 2);
        while (!isRotationIndex(words, index)) {
            if (start === end) {
                return -1;
            } else if (index === start) {
                index = end;
                start++;
            } else if (index === end) {
                index = start;
                end--;
            } else if (words[start] === words[index]) {
                // TODO: improvement here would be to find the nearest
                // index != words[index] and continue from there
                index++;
            } else if (words[start] < words[index]) {
                start = index + 1;
                index = Math.floor((start + end) / 2);
            } else {
                end = index - 1;
                index = Math.floor((start + end) / 2);
            }
        }
        return index;
    }
}

function isRotationIndex(words: string[], index: number): boolean {
    if (index < words.length - 1 && index > 0) {
        return words[index - 1] > words[index] && words[index + 1] > words[index];
    } else if (index > 0) {
        return words[index - 1] > words[index];
    } else if (index < words.length - 1) {
        return words[index + 1] > words[index];
    } else {
        return false;
    }
}

// Test cases

// solution: -1
console.log(findRotationIndex([]));
// solution: 0
console.log(findRotationIndex(["a"]));
// solution: 0
console.log(findRotationIndex(["a", "b"]));
// solution: 1
console.log(findRotationIndex(["b", "a"]));
// solution: 1
console.log(findRotationIndex(["c", "a", "b"]));
// solution: 2
console.log(findRotationIndex(["b", "c", "a"]));
// solution: 3
console.log(findRotationIndex(["c", "c", "c", "a"]));
// solution: 4
console.log(findRotationIndex(["b", "c", "c", "c", "a"]));
// solution: 3
console.log(findRotationIndex(["f", "g", "h", "a", "b", "c", "d", "e"]));

export default {};
