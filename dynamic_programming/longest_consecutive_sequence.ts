// Not quite the same problem but similar:
// https://www.geeksforgeeks.org/longest-consecutive-subsequence/

function longestConsecutiveSubsequence(nums: number[]) {
    if (nums.length === 0) {
        return 0;
    }
    let start = 0;
    let max = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            max = Math.max(max, i - start + 1);
        } else {
            start = i;
        }
    }
    return max;
}

// should print 5
console.log(longestConsecutiveSubsequence([10, 1, 2, 3, 4, 5, 5, 6, 7, 8]));
