// Exercise 7.9

export type Direction = "LEFT" | "RIGHT";

export class CircularArray<T> {
    private startIndex: number = 0;
    private size: number = 0;
    private items: T[];

    public constructor(private capacity: number) {
        this.items = Array(capacity);
    }

    public get(index: number): T | undefined {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Index out of bounds!");
        }
        const adjustedIndex = (this.startIndex + index) % this.items.length;
        return this.items[adjustedIndex];
    }

    public push(item: T) {
        if (this.size === this.capacity) {
            throw new Error("No space available.");
        }
        const insertIndex = this.getInsertIndex();
        this.items[insertIndex] = item;
        this.size++;
    }

    public pop(): T {
        if (this.size === 0) {
            throw new Error("No items in array.");
        }
        const lastIndex = this.getLastIndex();
        const item = this.items[lastIndex];
        delete this.items[lastIndex];
        this.size--;
        return item;
    }

    public rotate(direction: Direction, num: number) {
        let nextIndex = direction === "LEFT" ? this.startIndex + num : this.startIndex - num;
        nextIndex %= this.items.length;
        if (nextIndex < 0) {
            // make index positive
            nextIndex += this.items.length;
        }
        this.startIndex = nextIndex;
    }

    private getInsertIndex(): number {
        return (this.startIndex + this.size) % this.items.length;
    }

    private getLastIndex(): number {
        return (this.startIndex + this.size - 1) % this.items.length;
    }

    private [Symbol.iterator](): Iterator<T> {
        // TODO: fix this
        let currIndex = this.startIndex;
        return {
            next: () => {
                const insertIndex = this.getInsertIndex();
                if (currIndex === insertIndex) {
                    return { done: true } as IteratorResult<T>;
                } else {
                    return {
                        done: false,
                        value: this.items[currIndex++],
                    };
                }
            },
        };
    }
}

const arr = new CircularArray(5);
arr.push(1);
arr.push(2);
arr.push(3);
arr.push(4);
arr.push(5);
arr.rotate("LEFT", 2);
console.log(arr);
console.log(arr.get(0));
console.log(arr.get(1));
console.log(arr.get(2));
console.log(arr.get(3));
console.log(arr.get(4));
