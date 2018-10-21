// Exercise 5.4

function nextNum(num: number) {
    let numZeros = 0;
    let numOnes = 0;
    while ((num & 1) === 0) {
        numZeros++;
        num = num >> 1;
    }
    while ((num & 1) !== 0) {
        numOnes++;
        num = num >> 1;
    }
    // flip first bit to 1
    num = num | 1;
    // undo right shifts
    num = num << (numZeros + numOnes);
    const mask = ~(-1 << (numOnes - 1));
    return num | mask;
}
