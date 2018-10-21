// https://www.geeksforgeeks.org/subset-sum-problem-dp-25/

export function hasSubsetSum(nums: number[], sum: number): boolean {
    let subsetSums = new Set<number>();
    for (const num of nums) {
        if (num === sum) {
            return true;
        } else {
            const nextSums = new Set<number>(subsetSums).add(num);
            for (const s of subsetSums) {
                const subsetSum = s + num;
                if (subsetSum === sum) {
                    return true;
                } else {
                    nextSums.add(subsetSum);
                }
            }
            subsetSums = nextSums;
        }
    }
    return false;
}

export function hasSubsetSumOfSize(nums: number[], sum: number, size: number): boolean {
    return hasSubsetSumHelper(nums, 0, sum, size, {});
}

function hasSubsetSumHelper(
    nums: number[],
    index: number,
    sum: number,
    size: number,
    memo: { [key: string]: boolean },
): boolean {
    let result = false;
    const key = `${index}:${sum}:${size}`;
    if (index >= nums.length || size < 1) {
        return false;
    } else if (memo[key] != null) {
        return memo[key];
    } else if (sum === nums[index] && size === 1) {
        result = true;
    } else if (hasSubsetSumHelper(nums, index + 1, sum - nums[index], size - 1, memo)) {
        result = true;
    } else if (hasSubsetSumHelper(nums, index + 1, sum, size, memo)) {
        result = true;
    }
    memo[key] = result;
    return result;
}

// Test cases

console.log("True: ", hasSubsetSum([3, 34, 4, 12, 5, 2], 9));
console.log("False: ", hasSubsetSumOfSize([3, 34, 4, 12, 5, 2], 9, 4));
console.log("True: ", hasSubsetSumOfSize([3, 34, 4, 12, 5, 2], 9, 2));
