// https://www.interviewbit.com/problems/best-time-to-buy-and-sell-stocks-iii/
function maxProfit(arr) {
    if (arr.length === 0) {
        return 0;
    }
    var firstProfit = [0];
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        min = Math.min(min, arr[i]);
        var currProfit = arr[i] - min;
        firstProfit[i] = Math.max(firstProfit[i - 1], currProfit);
    }
    var secondProfit = [];
    secondProfit[arr.length - 1] = 0;
    var max = arr[arr.length - 1];
    for (var i = arr.length - 2; i >= 0; i--) {
        max = Math.max(max, arr[i]);
        var currProfit = max - arr[i];
        secondProfit[i] = Math.max(secondProfit[i + 1], currProfit);
    }
    var maxTotal = 0;
    for (var i = 0; i < arr.length; i++) {
        var maxFirst = firstProfit[i];
        var maxSecond = i < (arr.length - 1) ? secondProfit[i + 1] : 0;
        var currTotal = maxFirst + maxSecond;
        maxTotal = Math.max(maxTotal, currTotal);
    }
    return maxTotal;
}

console.log(maxProfit([1, 2, 1, 2]));
