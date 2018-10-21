// Exercise 16.6

interface INode {
    num: number;
    left?: INode;
    right?: INode;
}

// runs in O(n * log(n)) where n is the size of the larger array
function smallestDifference(a1: number[], a2: number[]): number {
    if (a1.length === 0 || a2.length === 0) {
        return -1;
    }
    let tree: INode;
    let arr: number[];
    if (a1.length > a2.length) {
        tree = buildBst(a1);
        arr = a2;
    } else {
        tree = buildBst(a2);
        arr = a1;
    }
    let minDiff = Number.MAX_VALUE;
    arr.forEach(n => {
        const diff = findMinDiff(tree, n);
        minDiff = Math.min(minDiff, diff);
    });
    return minDiff;
}

function findMinDiff(root: INode, num: number): number {
    let curr: INode | undefined = root;
    let minDiff = Number.MAX_VALUE;
    while (curr != null) {
        const diff = Math.abs(num - curr.num);
        minDiff = Math.min(minDiff, diff);
        if (num > curr.num) {
            curr = curr.right;
        } else if (num < curr.num) {
            curr = curr.left;
        } else {
            // same number
            return 0;
        }
    }
    return minDiff;
}

function buildBst(numbers: number[]): INode {
    const root: INode = { num: numbers[0] };
    numbers.slice(1).forEach(n => insertNode(root, n));
    return root;
}

function insertNode(root: INode, num: number) {
    let current = root;
    while (true) {
        if (num > current.num) {
            if (current.right != null) {
                current = current.right;
            } else {
                current.right = { num };
                return;
            }
        } else {
            if (current.left != null) {
                current = current.left;
            } else {
                current.left = { num };
                return;
            }
        }
    }
}

// Test cases

const arr1 = [1, 3, 15, 11, 2];
const arr2 = [23, 127, 235, 19, 8];
// should print 3
console.log(smallestDifference(arr1, arr2));

export default {};
