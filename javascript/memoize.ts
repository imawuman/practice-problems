interface IResultNode {
    isValid: boolean;
    result?: any;
    nextArgs?: Map<any, IResultNode>;
}

interface IResult {
    args: any[];
    result: any;
}

export function memoize(func: (...args: any[]) => void): (...args: any[]) => any {
    let results: IResultNode | null = null;
    return function(this: any, ...args: any[]) {
        const context = this;
        const maybeResult = getResultNode(results, args);
        if (maybeResult != null && maybeResult.isValid) {
            return maybeResult.result;
        } else {
            const result = func.apply(context, args);
            results = cacheResult(results, { args, result });
            return result;
        }
    };
}

function getResultNode(results: IResultNode | null, args: any[]): IResultNode | null {
    if (results == null) {
        return null;
    } else {
        let i = 0;
        let node: IResultNode | undefined = results;
        while (node != null && i < args.length) {
            const arg = args[i];
            node = node.nextArgs != null ? node.nextArgs.get(arg) : undefined;
            i++;
        }
        return node != null && node.isValid ? node : null;
    }
}

function cacheResult(results: IResultNode | null, fnResult: IResult): IResultNode {
    const { args, result } = fnResult;
    const root: IResultNode = results != null ? results : {
        isValid: false,
        nextArgs: new Map(),
    };
    let i = 0;
    let node = root;
    while (i < args.length) {
        const arg = args[i];
        if (node.nextArgs != null && node.nextArgs.has(arg)) {
            node = node.nextArgs.get(arg)!;
        } else {
            if (node.nextArgs == null) {
                node.nextArgs = new Map();
            }
            const newNode: IResultNode = { isValid: false };
            node.nextArgs.set(arg, newNode);
            node = newNode;
        }
        i++;
    }
    if (node.isValid) {
        throw new Error("Cached result conflict!");
    } else {
        node.result = result;
        node.isValid = true;
        return root;
    }
}

// Test cases

function add(this: any, ...numbers: number[]) {
    this.count++;
    return numbers.reduce((sum, num) => sum + num, 0);
}

const addCounter = {
    add: memoize(add),
    count: 0,
};

function print(...args: any[]) {
    console.log("Invoking print with: ", args);
}

const memoizedPrint = memoize(print);

console.log(addCounter.add() === 0);
console.log(addCounter.add(1) === 1);
console.log(addCounter.add(1, 2) === 3);
console.log(addCounter.add(2, 1) === 3);
console.log(addCounter.add(1, 2, 3) === 6);
console.log(addCounter.add(1, 1) === 2);
console.log(addCounter.add(1, 2) === 3);
console.log(addCounter.add(1) === 1);
console.log(addCounter.add(1, 1) === 2);

// should output 6
console.log(`Total add count (expected 6): ${addCounter.count}`);

const existingObj = { 1: 2 };
const existingArray = [0];
memoizedPrint(existingObj);
memoizedPrint(existingObj);
memoizedPrint(existingObj);
memoizedPrint(existingArray);
memoizedPrint(existingArray);
memoizedPrint(existingArray);
