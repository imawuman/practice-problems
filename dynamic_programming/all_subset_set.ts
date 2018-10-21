// Exercise 8.4

function allSubsetsSet<T>(set: T[]): T[][] {
    return allSubsetsHelper(set, set.length - 1);
}

function allSubsetsHelper<T>(set: T[], index: number): T[][] {
    if (index < 0) {
        return [[]];
    } else {
        const allSubsets: T[][] = [];
        const prevSubsets = allSubsetsHelper(set, index - 1);
        prevSubsets.forEach((s) => {
            allSubsets.push(s);
            allSubsets.push([...s, set[index]]);
        });
        return allSubsets;
    }
}

// Test case

const initial = [1, 2, 3, 4];
const all = allSubsetsSet(initial);
console.log(`Total num subsets: ${all.length}`);
all.forEach((s) => console.log(s));

export default {};
