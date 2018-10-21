// https://lodash.com/docs/4.17.10#debounce
export function debounce(func: (...params: any[]) => void, timeoutMs: number) {
    let timeoutId: NodeJS.Timer;
    return function(this: any, ...args: any[]) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, timeoutMs);
    };
}

// Test cases

class Test {
    private test = "ping";

    public ping = () => {
        console.log(this.test);
    }
}

function greet(this: any, name: string) {
    console.log(`${this.greeting} ${name}`) ;
}

const obj = {
    debouncedGreet: debounce(greet, 1000),
    greeting: "hello",
};

function count(num: number) {
    console.log(`count: ${num}`);
}

const test = new Test();
const debouncedPing = debounce(test.ping, 1000);
const debouncedCount = debounce(count, 1000);
// // should print just 'ping'
debouncedPing();
debouncedPing();
debouncedPing();
debouncedPing();
// // should print '4'
debouncedCount(1);
debouncedCount(2);
debouncedCount(3);
debouncedCount(4);
// should print 'hello f'
obj.debouncedGreet("a");
obj.debouncedGreet("b");
obj.debouncedGreet("c");
obj.debouncedGreet("d");
