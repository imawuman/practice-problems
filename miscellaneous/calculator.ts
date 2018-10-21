// Exercise 16.26

// Evaluate expression containing *, /, +, and - (no parentheses)
function calculator(expression: string): number {
    const numbers: number[] = [];
    const operators: string[] = [];
    let index = 0;
    let start = 0;
    while (index < expression.length) {
        const nextOp = findNextOperator(expression, index);
        if (nextOp === -1) {
            const subExpr = expression.slice(start, expression.length);
            numbers.push(multiplyDivide(subExpr));
            break;
        } else {
            index = nextOp + 1;
            const op = expression.charAt(nextOp);
            if (op === "+" || op === "-") {
                const subExpr = expression.slice(start, nextOp);
                numbers.push(multiplyDivide(subExpr));
                operators.push(op);
                start = index;
            }
        }
    }
    // operators only contain + and -
    return applyOperators(numbers.reverse(), operators.reverse());
}

function multiplyDivide(expression: string): number {
    const numbers: number[] = [];
    const operators: string[] = [];
    let index = 0;
    let start = 0;
    while (index < expression.length) {
        const nextOp = findNextOperator(expression, index);
        if (nextOp === -1) {
            const num = Number.parseInt(expression.slice(start, expression.length), 10);
            numbers.push(num);
            break;
        } else {
            index = nextOp + 1;
            if (start < nextOp) {
                const num = Number.parseInt(expression.slice(start, nextOp), 10);
                numbers.push(num);
            }
            operators.push(expression.charAt(nextOp));
            start = index;
        }
    }
    // operators only contain * and /
    return applyOperators(numbers.reverse(), operators.reverse());
}

function applyOperators(numbers: number[], operators: string[]): number {
    while (numbers.length > 1 && operators.length > 0) {
        const arg1 = numbers.pop()!;
        const arg2 = numbers.pop()!;
        const op = operators.pop()!;
        if (op === "*") {
            numbers.push(arg1 * arg2);
        } else if (op === "/") {
            numbers.push(arg1 / arg2);
        } else if (op === "+") {
            numbers.push(arg1 + arg2);
        } else if (op === "-") {
            numbers.push(arg1 - arg2);
        } else {
            throw new Error("Unexpected operator: " + op);
        }
    }
    if (numbers.length === 1) {
        return numbers.pop()!;
    } else {
        throw new Error("Too many numbers: " + numbers);
    }
}

function findNextOperator(expression: string, start: number): number {
    let index = start;
    while (index < expression.length) {
        const currChar = expression.charAt(index);
        switch (currChar) {
            case "+":
            case "-":
            case "*":
            case "/":
                return index;
            default:
                index++;
        }
    }
    return -1;
}

// Test cases

console.log(calculator("2*3+5/6*3+15-10-4*2/2"));

export default {};
