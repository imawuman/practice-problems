export interface IMaxHeap {
    getMax(): number;
    size(): number;
    contains(num: number): boolean;
    insert(num: number): void;
    remove(num: number): boolean;
    removeMax(): number;
}

export class MaxHeap implements IMaxHeap {
    private heap: number[] = [];

    public getMax() {
        if (this.heap.length > 0) {
            return this.heap[0];
        } else {
            throw new Error("Heap contains no elements.");
        }
    }

    public size() {
        return this.heap.length;
    }

    public contains(num: number) {
        return this.heap.filter((n) => num === n).length > 0;
    }

    public insert(num: number) {
        this.heap.push(num);
        this.heapify(this.heap.length - 1);
    }

    public remove(num: number): boolean {
        const index = this.heap.findIndex((n) => num === n);
        const containsNum = index >= 0;
        if (containsNum) {
            this.removeIndex(index);
        }
        return containsNum;
    }

    public removeMax(): number {
        if (this.heap.length > 0) {
            const max = this.heap[0];
            this.removeIndex(0);
            return max;
        } else {
            throw new Error("Heap contains no elements.");
        }
    }

    private removeIndex(index: number) {
        const last = this.heap.pop()!;
        if (index < this.size()) {
            this.heap[index] = last;
            this.heapify(index);
        }
    }

    private heapify(index: number) {
        const curr = this.heap[index];
        const parentIndex = this.getParentIndex(index);
        const childrenIndices = this.getSortedChildrenIndices(index);
        const parent = this.heap[parentIndex];
        if (curr > parent) {
            this.swap(index, parentIndex);
            this.heapify(parentIndex);
        } else if (childrenIndices.length > 0) {
            const childIndex = childrenIndices[0];
            if (curr < this.heap[childIndex]) {
                this.swap(index, childIndex);
                this.heapify(childIndex);
            }
        }
    }

    private swap(index1: number, index2: number) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private getSortedChildrenIndices(index: number): number[] {
        const indices = [2 * index + 1, 2 * index + 2];
        const filteredIndices = indices.filter((i) => i < this.heap.length);
        if (filteredIndices.length > 1) {
            const child1 = this.heap[filteredIndices[0]];
            const child2 = this.heap[filteredIndices[1]];
            return child1 > child2 ? filteredIndices : filteredIndices.reverse();
        } else {
            return filteredIndices;
        }
    }

    private getParentIndex(index: number): number {
        return Math.ceil(index / 2) - 1;
    }
}

// Test cases
const input = [7, 50, 33, 10, 25, 14, 2, 9, 45];
const heap = new MaxHeap();
input.forEach((v) => {
    heap.insert(v);
});

console.log(heap);
while (heap.size() > 0) {
    const max = heap.removeMax();
    console.log("Max: ", max);
}
