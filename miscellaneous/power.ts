// Compute n^exp

export function power(base: number, exp: number): number {
    if (exp < 0) {
        return 1 / power(base, -exp);
    } else if (base === 1 || exp === 0) {
        return 1;
    } else {
        const memo = new Map();
        memo.set(1, base);
        let result = base;
        let currExp = 1;
        while (currExp < exp) {
            result *= result;
            currExp <<= 1;
            memo.set(currExp, result);
        }
        let remainder = currExp - exp;
        while (remainder > 0) {
            if (currExp <= remainder) {
                const subResult = memo.get(currExp);
                result /= subResult;
                remainder -= currExp;
            }
            currExp >>= 1;
        }
        return result;
    }
}

// Test cases

const n = 2;
for (let i = -3; i < 9; i++) {
    console.log(`${n}^${i}: ${power(n, i)}`);
}
