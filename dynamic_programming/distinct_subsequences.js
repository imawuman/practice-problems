// https://www.interviewbit.com/problems/distinct-subsequences/

function numDistinct(S, T) {
    var memo = [];
    for (var i = 0; i < S.length; i++) {
        var initial = [];
        for (var j = 0; j < T.length; j++) {
            initial.push(-1);
        }
        memo.push(initial);
    }
    return numDistinctHelper(S, T, 0, 0, memo);
}

function numDistinctHelper(S, T, si, ti, memo) {
    if (ti >= T.length) {
        return 1;
    } else if (si >= S.length) {
        return 0;
    } else if (memo[si][ti] >= 0) {
        return memo[si][ti];
    } else {
        var count = 0;
        for (var i = si; i < S.length; i++) {
            if (S.charAt(i) === T.charAt(ti)) {
                count += numDistinctHelper(S, T, i + 1, ti + 1, memo);
            }
        }
        memo[si][ti] = count;
        return count;
    }
}

console.log(numDistinct("aabbcc", "abc"));
