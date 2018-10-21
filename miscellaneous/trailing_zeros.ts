// Exercise 16.5

// TODO: can memoize for repeated function calls
// Count number of trailing zeroes in n!
function trailingZeros(n: number): number {
    const product = nFactorial(n);
    return numTrailingZeroes(product);
}

function nFactorial(n: number): number {
    if (n < 2) {
        // no trailing zeroes for 0! and 1!
        return 0;
    }
    let num = n;
    let product = 1;
    while (num > 1) {
        product *= num;
        num--;
    }
    return product;
}

function numTrailingZeroes(num: number): number {
    let numZeroes = 0;
    let powerTen = 10;
    while (num > powerTen && num % powerTen === 0) {
        numZeroes++;
        powerTen *= 10;
    }
    return numZeroes;
}

// Test cases

for (let i = 1; i < 20; i++) {
    const nFact = nFactorial(i);
    const zeroes = numTrailingZeroes(nFact);
    console.log(`n: ${i}, n!: ${nFact}, zeroes: ${zeroes}`);
}
