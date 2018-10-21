// https://www.interviewbit.com/problems/longest-increasing-subsequence/

function longestIncreasingSubsequence(A) {
    var partial = [];
    var max = 0;
    for (var i = 0; i < A.length; i++) {
        var imax = 1;
        for (var j = 0; j < i; j++) {
            if (A[i] > A[j]) {
                imax = Math.max(partial[j] + 1, imax);
            }
        }
        partial[i] = imax;
        if (imax > max) {
            max = Math.max(imax, max);
        }
    }
    return max;
}

console.log(longestIncreasingSubsequence([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]));
