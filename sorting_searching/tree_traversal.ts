interface INode {
    val: any;
    left?: INode;
    right?: INode;
}

export function bfs(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    const queue: INode[] = [root];
    while (queue.length > 0) {
        const node = queue.shift()!;
        order.push(node.val);
        if (node.left != null) {
            queue.push(node.left);
        }
        if (node.right != null) {
            queue.push(node.right);
        }
    }
    return order;
}

export function iterativePreorder(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    const stack: INode[] = [];
    let node: INode | undefined = root;
    while (node != null) {
        order.push(node.val);
        stack.push(node);
        node = node.left;
    }
    while (stack.length > 0) {
        node = stack.pop()!;
        if (node.right != null) {
            node = node.right;
            while (node != null) {
                order.push(node.val);
                stack.push(node);
                node = node.left;
            }
        }
    }
    return order;
}

export function recursivePreorder(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    preorderHelper(root, order);
    return order;
}

function preorderHelper(node: INode, order: any[]) {
    order.push(node.val);
    if (node.left != null) {
        preorderHelper(node.left, order);
    }
    if (node.right != null) {
        preorderHelper(node.right, order);
    }
}

export function iterativeInorder(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    const stack: INode[] = [];
    let node: INode | undefined = root;
    while (node != null) {
        stack.push(node);
        node = node.left;
    }
    while (stack.length > 0) {
        node = stack.pop()!;
        order.push(node.val);
        if (node.right != null) {
            node = node.right;
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
        }
    }
    return order;
}

export function recursiveInorder(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    inorderHelper(root, order);
    return order;
}

function inorderHelper(node: INode, order: any[]) {
    if (node.left != null) {
        inorderHelper(node.left, order);
    }
    order.push(node.val);
    if (node.right != null) {
        inorderHelper(node.right, order);
    }
}

export function iterativePostorder(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    const stack: INode[] = [root];
    while (stack.length > 0) {
        const node = stack.pop()!;
        order.push(node.val);
        if (node.left != null) {
            stack.push(node.left);
        }
        if (node.right != null) {
            stack.push(node.right);
        }
    }
    return order.reverse();
}

export function recursivePostorder(root: INode | null): any[] {
    if (root == null) {
        return [];
    }
    const order: any[] = [];
    postorderHelper(root, order);
    return order;
}

function postorderHelper(node: INode, order: any[]) {
    if (node.left != null) {
        postorderHelper(node.left, order);
    }
    if (node.right != null) {
        postorderHelper(node.right, order);
    }
    order.push(node.val);
}

export function levelOrder(root: INode | null) {
    if (root == null) {
        return [];
    }
    const levels = [];
    let level = [root];
    while (level.length > 0) {
        const nextLevel = [];
        const currLevel = [];
        for (const node of level) {
            currLevel.push(node.val);
            if (node.left != null) {
                nextLevel.push(node.left);
            }
            if (node.right != null) {
                nextLevel.push(node.right);
            }
        }
        levels.push(currLevel);
        level = nextLevel;
    }
    return levels;
}

// Test cases

function buildTree(vals: any[]): INode | null {
    let root: INode | null = null;
    for (const val of vals) {
        root = insert(root, val);
    }
    return root;
}

function insert(tree: INode | null, val: any): INode {
    if (tree === null) {
        return { val };
    } else if (val < tree.val) {
        if (tree.left != null) {
            insert(tree.left, val);
        } else {
            tree.left = { val };
        }
    } else {
        if (tree.right != null) {
            insert(tree.right, val);
        } else {
            tree.right = { val };
        }
    }
    return tree;
}

const example = buildTree([5, 3, 1, 4, 2, 8, 6, 9, 7]);
console.log("Breadth first: ");
console.log(bfs(example));
console.log("Preorder: ");
console.log(iterativePreorder(example));
console.log(recursivePreorder(example));
console.log("Inorder: ");
console.log(iterativeInorder(example));
console.log(recursiveInorder(example));
console.log("Postorder: ");
console.log(iterativePostorder(example));
console.log(recursivePostorder(example));
console.log("Level order: ");
console.log(levelOrder(example));
