// https://leetcode.com/problems/maximum-frequency-stack/description/

interface IHeapNode {
    val: number;
    count: number;
}

// Better solution is to keep track of the current max count and
// a map of count to value stack (Map<number, Array<number>>)
// where the stack represents the values that have that count
class MaxHeap {
    private heap: IHeapNode[] = [];

    public insert = (node: IHeapNode) => {
        this.heap.push(node);
        this.heapify(this.heap.length - 1);
    }

    public peek = () => {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    public removeMax = () => {
        this.swap(0, this.heap.length - 1);
        const max = this.heap.pop();
        this.heapify(0);
        return max;
    }

    public updateNode = (node: IHeapNode) => {
        const index = this.heap.indexOf(node);
        this.heapify(index);
    }

    private heapify = (index: number) => {
        if (this.heap.length === 0) {
            return;
        }
        const key = this.heap[index].count;
        const parentIndex = this.getParentIndex(index);
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        const parent = this.heap[parentIndex];
        const left = this.heap[leftIndex];
        const right = this.heap[rightIndex];
        if (parent != null && parent.count < key) {
            this.swap(index, parentIndex);
            this.heapify(parentIndex);
        } else if (left != null && left.count > key) {
            let swapIndex = leftIndex;
            if (right != null && right.count > left.count) {
                swapIndex = rightIndex;
            }
            this.swap(index, swapIndex);
            this.heapify(swapIndex);
        } else if (right != null && right.count > key) {
            this.swap(index, rightIndex);
            this.heapify(rightIndex);
        }
    }

    private swap = (a: number, b: number) => {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    private getParentIndex = (index: number) => {
        return Math.ceil(index / 2) - 1;
    }

    private getLeftIndex = (index: number) => {
        return index * 2 + 1;
    }

    private getRightIndex = (index: number) => {
        return index * 2 + 2;
    }
}

class FreqStack {
    private stack: number[] = [];
    private maxHeap = new MaxHeap();
    private nodes = new Map<number, IHeapNode>();

    public push(x: number) {
        this.stack.push(x);
        if (this.nodes.has(x)) {
            const node = this.nodes.get(x)!;
            node.count++;
            this.maxHeap.updateNode(node);
        } else {
            const node = {
                count: 1,
                val: x,
            };
            this.nodes.set(x, node);
            this.maxHeap.insert(node);
        }
    }

    public pop() {
        if (this.stack.length === 0) {
            return null;
        }
        const maxCount = this.maxHeap.peek()!.count;
        const popped: IHeapNode[] = [];
        let peek = this.maxHeap.peek();
        while (peek != null && peek.count === maxCount) {
            popped.push(this.maxHeap.removeMax()!);
            peek = this.maxHeap.peek();
        }
        const popIndex = this.nextIndexWithCount(maxCount);
        const popValue = this.stack[popIndex];
        for (const poppedNode of popped) {
            if (poppedNode.val === popValue) {
                this.stack.splice(popIndex, 1);
                poppedNode.count--;
                if (poppedNode.count > 0) {
                    this.maxHeap.insert(poppedNode);
                } else {
                    this.nodes.delete(poppedNode.val);
                }
            } else {
                this.maxHeap.insert(poppedNode);
            }
        }
        return popValue;
    }

    private nextIndexWithCount(count: number) {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            const val = this.stack[i];
            const node = this.nodes.get(val)!;
            if (node.count === count) {
                return i;
            }
        }
        return -1;
    }
}

// Test cases

const fstack = new FreqStack();
fstack.push(5);
fstack.push(7);
fstack.push(5);
fstack.push(7);
fstack.push(4);
fstack.push(5);
console.log(fstack.pop());
console.log(fstack.pop());
console.log(fstack.pop());
console.log(fstack.pop());

export default {};
