// https://lodash.com/docs/4.17.10#throttle
export function throttle(func: (...params: any[]) => void, waitMs: number) {
    let isWaiting = false;
    let waitingCount = 0;
    let params: any[] = [];
    return function(this: any, ...args: any[]) {
        const context = this;
        const finishWait = () => {
            if (waitingCount > 0) {
                func.apply(context, params);
                isWaiting = true;
                setTimeout(finishWait, waitMs);
            } else {
                isWaiting = false;
            }
            params = [];
            waitingCount = 0;
        };
        if (isWaiting) {
            waitingCount++;
            params = args;
        } else {
            func.apply(context, args);
            isWaiting = true;
            waitingCount = 0;
            setTimeout(finishWait, waitMs);
        }
    };
}

// Test cases

function incrementCount(this: any) {
    this.count++;
    console.log(this.count);
}

const obj = {
    count: 0,
    increment: throttle(incrementCount, 1000),
};

function greet(name: string) {
    console.log(`Hello ${name}`);
}

const throttledGreet = throttle(greet, 1000);

// should only increment twice
obj.increment();
obj.increment();
obj.increment();
obj.increment();
obj.increment();
// should say hello twice
throttledGreet("rich");
throttledGreet("richa");
throttledGreet("richar");
throttledGreet("richard");
