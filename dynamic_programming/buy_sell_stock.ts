// https://www.interviewbit.com/problems/best-time-to-buy-and-sell-stocks-iii/

export function maxProfit(prices: number[]) {
    if (prices.length === 0) {
        return 0;
    }
    const firstProfit = [0];
    let min = prices[0];
    for (let i = 1; i < prices.length; i++) {
        min = Math.min(min, prices[i]);
        const currProfit = prices[i] - min;
        firstProfit[i] = Math.max(firstProfit[i - 1], currProfit);
    }
    const secondProfit = [];
    secondProfit[prices.length - 1] = 0;
    let max = prices[prices.length - 1];
    for (let i = prices.length - 2; i >= 0; i--) {
        max = Math.max(max, prices[i]);
        const currProfit = max - prices[i];
        secondProfit[i] = Math.max(secondProfit[i + 1], currProfit);
    }
    let maxTotal = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        const currTotal = firstProfit[i] + secondProfit[i + 1];
        maxTotal = Math.max(maxTotal, currTotal);
    }
    return maxTotal;
}

// should return 12
console.log(maxProfit([1, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 7, 8]));
