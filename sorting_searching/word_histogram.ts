// Exercise 16.2

interface INode {
    char: string | null;
    count: number;
    children: INode[];
}

class Histogram {
    private root: INode = {
        char: null,
        children: [],
        count: 0,
    };

    public readWords(words: string[]) {
        words.forEach(this.processWord);
    }

    public processWord = (word: string) => {
        if (word.length === 0) {
            // do nothing for empty string
            return;
        }
        let index = 0;
        let current = this.root;
        while (index < word.length) {
            const currChar = word.charAt(index);
            const childIndex = current.children.findIndex(n => {
                return n.char === currChar;
            });
            if (childIndex !== -1) {
                current = current.children[childIndex];
            } else {
                const newChild: INode = {
                    char: currChar,
                    children: [],
                    count: 0,
                };
                current.children.push(newChild);
                current = newChild;
            }
            index++;
        }
        current.count++;
    }

    public getCount(word: string): number {
        if (word.length === 0) {
            return -1;
        }
        let index = 0;
        let current = this.root;
        while (index < word.length) {
            const childIndex = current.children.findIndex(n => {
                return n.char === word.charAt(index);
            });
            if (childIndex !== -1) {
                current = current.children[childIndex];
                index++;
            } else {
                return 0;
            }
        }
        return current.count;
    }
}

// Test cases

const example = [
    "a",
    "ab",
    "abc",
    "derp",
    "abc",
    "test",
    "testing",
    "ab",
];

const histogram = new Histogram();
histogram.readWords(example);

console.log("Empty string: ", histogram.getCount(""));
console.log("a: ", histogram.getCount("a"));
console.log("ab: ", histogram.getCount("ab"));
console.log("abc: ", histogram.getCount("abc"));
console.log("test: ", histogram.getCount("test"));
console.log("testing: ", histogram.getCount("testing"));
console.log("missing: ", histogram.getCount("missing"));

export default {};
