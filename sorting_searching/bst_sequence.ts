// Exercise 4.9

interface IBSTNode {
    value: number;
    left?: IBSTNode;
    right?: IBSTNode;
}

// Create tree helpers

function createBSTTree(input: number[]): IBSTNode | null {
    if (input.length > 0) {
        const root = { value: input[0] };
        input.slice(1).forEach(n => insertNode(root, n));
        return root;
    } else {
        return null;
    }
}

function insertNode(root: IBSTNode, val: number) {
    let current = root;
    let inserted = false;
    while (!inserted) {
        if (val < current.value) {
            if (current.left != null) {
                current = current.left;
            } else {
                current.left = { value: val };
                inserted = true;
            }
        } else {
            if (current.right != null) {
                current = current.right;
            } else {
                current.right = { value: val };
                inserted = true;
            }
        }
    }
}

// Solution functions

function printArrays(root: IBSTNode) {
    const all: number[][] = [];
    const allLeft: number[][] = [];
    const allRight: number[][] = [];
    if (root.left != null) {
        dfs(root.left, [], allLeft);
    }
    if (root.right != null) {
        dfs(root.right, [], allRight);
    }
    if (allLeft.length > 0 && allRight.length > 0) {
        allLeft.forEach(l => {
            allRight.forEach(r => {
                all.push(...weave([root.value], l, r));
            });
        });
    } else {
        allLeft.forEach(l => {
            all.push([root.value, ...l]);
        });
        allRight.forEach(r => {
            all.push([root.value, ...r]);
        });
    }
    all.forEach(a => console.log(a));
}

function dfs(node: IBSTNode, current: number[], all: number[][]) {
    const next = [...current, node.value];
    if (node.left == null && node.right == null) {
        all.push(next);
    }
    if (node.left != null) {
        dfs(node.left, next, all);
    }
    if (node.right != null) {
        dfs(node.right, next, all);
    }
}

function weave(start: number[], arr1: number[], arr2: number[]) {
    const all: number[][] = [];
    if (arr1.length === 0 && arr2.length === 0) {
        all.push(start);
    }
    if (arr1.length > 0) {
        const res = weave([...start, arr1[0]], arr1.slice(1), arr2);
        all.push(...res);
    }
    if (arr2.length > 0) {
        const res = weave([...start, arr2[0]], arr1, arr2.slice(1));
        all.push(...res);
    }
    return all;
}

const tree = createBSTTree([10, 2, 17, 4, 3, 13]);
printArrays(tree!);

export default {};
