export interface ITrie<T> {
    size(): number;
    put(key: string, value?: T): void;
    get(key: string): T | undefined;
    delete(key: string): boolean;
    has(str: string): boolean;
    search(str: string): Array<IEntry<T>>;
}

export interface IEntry<T> {
    key: string;
    value?: T;
}

interface ITrieNode<T> {
    children: {
        [next: string]: ITrieNode<T>;
    };
    value?: T;
    isEnd: boolean;
}

export class Trie<T> implements ITrie<T> {
    private count: number = 0;
    private root: ITrieNode<T> = {
        children: {},
        isEnd: false,
    };

    public size() {
        return this.count;
    }

    public put(key: string, value?: T) {
        let i = 0;
        let currNode: ITrieNode<T> = this.root;
        while (i < key.length) {
            const currChar = key.charAt(i);
            if (currNode.children[currChar] != null) {
                currNode = currNode.children[currChar];
            } else {
                const node = {
                    children: {},
                    isEnd: false,
                };
                currNode.children[currChar] = node;
                currNode = node;
            }
            i++;
        }
        currNode.value = value;
        if (!currNode.isEnd) {
            currNode.isEnd = true;
            this.count++;
        }
    }

    public get(key: string): T | undefined {
        const maybeNode = this.findNode(key);
        return maybeNode != null && maybeNode.isEnd ? maybeNode.value : undefined;
    }

    public has(key: string): boolean {
        const maybeNode = this.findNode(key);
        return maybeNode != null && maybeNode.isEnd;
    }

    public delete(key: string): boolean {
        let i = 0;
        let currNode = this.root;
        let deleteChar: string | null = null;
        let deleteNode: ITrieNode<T> = this.root;
        while (i < key.length) {
            const currChar = key.charAt(i);
            if (currNode.children[currChar] != null) {
                if (
                    deleteChar == null ||
                    currNode.isEnd ||
                    Object.keys(currNode.children).length > 1
                ) {
                    // Reset delete node every time a node forks or is an end node
                    deleteChar = currChar;
                    deleteNode = currNode;
                }
                currNode = currNode.children[currChar];
                i++;
            } else {
                return false;
            }
        }
        if (currNode.isEnd) {
            currNode.value = undefined;
            currNode.isEnd = false;
            this.count--;
            if (deleteChar != null && Object.keys(currNode.children).length === 0) {
                delete deleteNode.children[deleteChar];
            }
            return true;
        } else {
            return false;
        }
    }

    public search(query: string): Array<IEntry<T>> {
        const maybeNode = this.findNode(query);
        if (maybeNode != null) {
            return this.findEntries(query, maybeNode);
        } else {
            return [];
        }
    }

    private findNode(key: string): ITrieNode<T> | null {
        let i = 0;
        let currNode = this.root;
        while (i < key.length) {
            const currChar = key.charAt(i);
            if (currNode.children[currChar] != null) {
                currNode = currNode.children[currChar];
                i++;
            } else {
                return null;
            }
        }
        return currNode;
    }

    private findEntries(prefix: string, node: ITrieNode<T>): Array<IEntry<T>> {
        const entries: Array<IEntry<T>> = [];
        this.dfs(node, prefix, entries);
        return entries;
    }

    private dfs(node: ITrieNode<T>, prefix: string, entries: Array<IEntry<T>>) {
        if (node.isEnd) {
            entries.push({
                key: prefix,
                value: node.value,
            });
        }
        for (const c of Object.keys(node.children)) {
            if (node.children[c] != null) {
                this.dfs(node.children[c], prefix + c, entries);
            }
        }
    }
}

// Test cases

const trie = new Trie<number>();
console.log("Inserting...");
console.log(trie.get("") == null);
trie.put("", 0);
console.log(trie.get("") === 0);
console.log(trie.search("").length === 1);
trie.put("a");
console.log(trie.has("a"));
trie.put("ab");
console.log(trie.has("ab"));
trie.put("abc");
console.log(trie.has("abc"));
trie.put("abg");
console.log(trie.has("abg"));
trie.put("abcd");
console.log(trie.has("abcd"));
trie.put("abc123");
console.log(trie.has("abc123"));
trie.put("xyz");
console.log(trie.has("xyz"));
trie.put("xxx");
console.log(trie.has("xxx"));
trie.put("abc", 123);
console.log(trie.get("abc") === 123);
console.log(trie.size() === 9);

console.log("Deleting...");
trie.delete("xxx");
console.log(trie.search("x").length === 1);
trie.delete("abc123");
console.log(trie.size() === 7);
console.log(!trie.has("abc123"));
console.log(trie.search("ab").length === 4);
console.log(!trie.delete("abc123"));
trie.delete("");
console.log(!trie.delete(""));
trie.delete("abcde");
console.log(trie.size() === 6);
console.log(trie.has("abcd"));
trie.delete("abcd");
console.log(trie.size() === 5);
trie.delete("a");
console.log(trie.size() === 4);
trie.delete("ab");
console.log(trie.size() === 3);
trie.delete("abc");
console.log(trie.size() === 2);
trie.delete("abg");
console.log(trie.size() === 1);
trie.delete("xyz");
console.log(trie.size() === 0);
console.log(trie.search("").length === 0);
