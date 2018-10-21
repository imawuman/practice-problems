// Exercise 16.1

function swapNumbers(a: number, b: number) {
    console.log(`Swap: ${a}, ${b}`);
    a = a ^ b; // a contains unique 1s
    b = a ^ b; // b is now a: a = (a ^ b) ^ b
    a = a ^ b; // a is now b: b = a ^ (a ^ b)
    console.log(`Result: ${a}, ${b}`);
}

swapNumbers(99, 302);
