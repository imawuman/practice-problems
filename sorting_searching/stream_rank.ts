// Exercise 10.10

interface ITrackingNum {
    num: number;
    count: number;
}

class RankTracker {
    private numbers: ITrackingNum[] = [];

    public track(num: number) {
        let index = 0;
        while (index <= this.numbers.length) {
            if (index === this.numbers.length) {
                this.numbers.push({ num, count: 1 });
                return;
            }
            const currNum = this.numbers[index];
            if (num < currNum.num) {
                this.numbers.splice(index, 0, { num, count: 1 });
                return;
            } else if (num === currNum.num) {
                this.numbers[index].count++;
                return;
            } else {
                index++;
            }
        }
    }

    // Returns the number of values less than num (excluding itself)
    public getRank(num: number): number {
        let rank = 0;
        let index = 0;
        while (index < this.numbers.length && this.numbers[index].num <= num) {
            if (this.numbers[index].num === num) {
                return rank;
            } else {
                rank += this.numbers[index].count;
                index++;
            }
        }
        // num didn't appear in stream
        return -1;
    }
}

// Test cases

const stream = [5, 1, 4, 4, 5, 9, 7, 13, 3];
const tracker = new RankTracker();
stream.forEach((n) => tracker.track(n));
console.log(tracker.getRank(1)); // 0
console.log(tracker.getRank(3)); // 1
console.log(tracker.getRank(4)); // 2
console.log(tracker.getRank(5)); // 4
console.log(tracker.getRank(7)); // 6
console.log(tracker.getRank(9)); // 7
console.log(tracker.getRank(13)); // 8

export default {};
