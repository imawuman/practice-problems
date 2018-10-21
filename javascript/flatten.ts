interface IArrayItem {
    array: any[];
    index: number;
}

export function flatten(arr: any[]): any[] {
    if (arr.length === 0) {
        return arr;
    }
    const flattened: any[] = [];
    const stack: IArrayItem[] = [];
    stack.push({
        array: arr,
        index: 0,
    });
    while (stack.length > 0) {
        const { array, index } = stack.pop()!;
        if (index < array.length) {
            const nextItem: IArrayItem = {
                array,
                index: index + 1,
            };
            stack.push(nextItem);
            const item = array[index];
            if (Array.isArray(item)) {
                stack.push({
                    array: item,
                    index: 0,
                });
            } else {
                flattened.push(item);
            }
        }
    }
    return flattened;
}

// Test cases

console.log(flatten([1, 2, 3, 4]));
console.log(flatten([1, [2], [3], 4]));
console.log(flatten([1, [2, [3, 4], 5], 6]));
console.log(flatten([[], [1], [[2]], [[[3], 4]]]));
console.log(flatten([{}, 1, {a: [2, 3]}, 4, [5, {c: 6}]]));
