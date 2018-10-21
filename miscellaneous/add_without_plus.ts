// Exercise 17.1

// This only works for positive numbers
function add(a: number, b: number): number {
    let bitRemainder = 0;
    let bitMask = 1;
    let sum = 0;
    while (a >= bitMask || b >= bitMask || bitRemainder > 0) {
        const aBit = getBit(a, bitMask);
        const bBit = getBit(b, bitMask);
        const result = aBit ^ bBit ^ bitRemainder;
        if (result > 0) {
            sum = setBit(sum, bitMask);
        }
        bitRemainder = (aBit & bBit) | (aBit & bitRemainder) | (bBit & bitRemainder);
        bitMask = bitMask << 1;
    }
    return sum;
}

function setBit(num: number, mask: number): number {
    return num | mask;
}

function getBit(num: number, mask: number): number {
    return (num & mask) === 0 ? 0 : 1;
}

// Solution from book
function addAnswer(a: number, b: number): number {
    while (b !== 0) {
        const sum = a ^ b;
        const carry = (a & b) << 1;
        a = sum;
        b = carry;
    }
    return a;
}

// Test cases

console.log(add(30, 45));
console.log("=============");
console.log(addAnswer(30, 45));
console.log(addAnswer(30, -45));

export default {};
