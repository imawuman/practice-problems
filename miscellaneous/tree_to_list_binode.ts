// Exericse 17.12

interface IBiNode {
    data: number;
    /**
     * left node in a binary search tree
     * prev node in a doubly linked list
     */
    node1?: IBiNode;
    /**
     * right node in a binary search tree
     * next node in a doubly linked list
     */
    node2?: IBiNode;
}

function convertBstToLlist(root: IBiNode): IBiNode {
    const listEnd = convertBstInOrder(root);
    let listStart = listEnd;
    while (listStart.node1 != null) {
        listStart = listStart.node1;
    }
    return listStart;
}

function convertBstInOrder(node: IBiNode, prevEnd?: IBiNode): IBiNode {
    let end: IBiNode | undefined = prevEnd;
    if (node.node1 != null) {
        // Add left nodes to list
        end = convertBstInOrder(node.node1, prevEnd);
    }
    if (end != null) {
        // Add current node to end of list
        end.node2 = node;
        node.node1 = end;
    }
    // Current node is now end of list
    end = node;
    if (node.node2 != null) {
        // Add right nodes to list
        return convertBstInOrder(node.node2, end);
    } else {
        // Current node is end of the list
        return end;
    }
}

// Helper functions for testing

function insertBstNode(root: IBiNode, data: number) {
    let prev: IBiNode = root;
    let curr: IBiNode | undefined = root;
    while (curr != null) {
        prev = curr;
        if (data >= curr.data) {
            curr = curr.node2;
        } else {
            curr = curr.node1;
        }
    }
    if (data >= prev.data) {
        prev.node2 = { data };
    } else {
        prev.node1 = { data };
    }
}

function printBst(node: IBiNode) {
    if (node.node1 != null) {
        printBst(node.node1);
    }
    console.log(node.data);
    if (node.node2 != null) {
        printBst(node.node2);
    }
}

function printLlist(start: IBiNode) {
    let curr: IBiNode | undefined = start;
    const items: number[] = [];
    while (curr != null) {
        items.push(curr.data);
        curr = curr.node2;
    }
    console.log(items.join(", "));
}

// Test cases

const numbers = [5, 7, 6, 3, 8, 2, 9, 1];
const rootNode = { data: 10 };
for (const num of numbers) {
    insertBstNode(rootNode, num);
}

console.log("Printing tree in order:");
printBst(rootNode);
console.log("Converting tree into list...");
const startNode = convertBstToLlist(rootNode);
console.log("Printing list in order:");
printLlist(startNode);

export default {};
