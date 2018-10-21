interface IListNode<T> {
    key: string;
    value: T;
    prev?: IListNode<T>;
    next?: IListNode<T>;
}

export interface ILRUCache<T> {
    getSize(): number;
    getCacheSize(): number;
    setCacheSize(size: number): void;
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    delete(key: string): boolean;
}

const DEFAULT_CACHE_SIZE = 100;

export class LRUCache<T> implements ILRUCache<T> {
    private cacheSize = DEFAULT_CACHE_SIZE;
    private listHead?: IListNode<T>;
    private listTail?: IListNode<T>;
    private listNodes = new Map<string, IListNode<T>>();

    public constructor(size: number) {
        this.cacheSize = Math.max(size, 0);
    }

    public getSize = () => {
        return this.listNodes.size;
    }

    public getCacheSize = () => {
        return this.cacheSize;
    }

    public setCacheSize = (size: number) => {
        this.cacheSize = Math.max(size, 0);
        while (this.listNodes.size > this.cacheSize) {
            this.deleteLru();
        }
    }

    public get = (key: string) => {
        if (this.listNodes.has(key)) {
            const node = this.listNodes.get(key)!;
            this.deleteNode(node);
            this.insertNode(node);
            return node.value;
        } else {
            return undefined;
        }
    }

    public set = (key: string, value: T) => {
        if (!this.listNodes.has(key) && this.listNodes.size === this.cacheSize) {
            this.deleteLru();
        }
        this.delete(key);
        const node = {
            key,
            value,
            prev: this.listTail,
            next: undefined,
        };
        this.insertNode(node);
    }

    public delete = (key: string) => {
        if (this.listNodes.has(key)) {
            const node = this.listNodes.get(key)!;
            this.deleteNode(node);
            return true;
        } else {
            return false;
        }
    }

    private deleteLru = () => {
        if (this.listHead != null) {
            this.delete(this.listHead.key);
        }
    }

    private deleteNode = (node: IListNode<T>) => {
        this.listNodes.delete(node.key);
        if (node === this.listHead) {
            // update recent list head
            this.listHead = node.next;
        }
        if (node === this.listTail) {
            // update recent list tail
            this.listTail = node.prev;
        }
        if (node.prev != null && node.next != null) {
            // some middle entry in cache list
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.prev = undefined;
            node.next = undefined;
        } else if (node.prev != null) {
            // tail entry in cache list
            node.prev.next = undefined;
            node.prev = undefined;
        } else if (node.next != null) {
            // head entry in cache list
            node.next.prev = undefined;
            node.next = undefined;
        }
    }

    private insertNode = (node: IListNode<T>) => {
        this.listNodes.set(node.key, node);
        if (this.listHead == null) {
            this.listHead = node;
        }
        if (this.listTail != null) {
            this.listTail.next = node;
        }
        this.listTail = node;
    }
}

// Test cases

const cache = new LRUCache<number>(3);
cache.set("one", 1);
// [1]
cache.set("two", 2);
// [1, 2]
cache.set("three", 3);
// [1, 2, 3]
cache.get("one");
// [2, 3, 1]
cache.set("four", 4);
// [3, 1, 4]

// should be 3
console.log(cache.getSize());
// should be undefined
console.log(cache.get("two"));

cache.delete("three");
// [1, 4]
cache.set("five", 5);
// [1, 4, 5]
cache.set("six", 6);
cache.set("six", 6);
cache.set("six", 6);
// [4, 5, 6]

// should be 4
console.log(cache.get("four"));
// should be undefined
console.log(cache.get("one"));

cache.setCacheSize(-1);
// []

// should be 0
console.log(cache.getSize());
