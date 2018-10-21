// https://leetcode.com/problems/insert-interval/description/

type Interval = [number, number];

// intervals argument is sorted by interval start and is not overlapping
export function insertInterval(intervals: Interval[], newInterval: Interval): Interval[] {
    let i = 0;
    let merged = null;
    let inserted = false;
    while (i < intervals.length) {
        const curr = intervals[i];
        if (!inserted) {
            if (isOverlap(curr, newInterval)) {
                // merge with existing interval
                merged = merge(curr, newInterval);
                intervals.splice(i, 1, merged);
                inserted = true;
            } else if (newInterval[0] < curr[0]) {
                // insert interval without merging
                intervals.splice(i, 0, newInterval);
                inserted = true;
                break;
            }
            i++;
        } else if (merged != null && isOverlap(curr, merged)) {
            // update previously merged and remove current interval
            merged[1] = Math.max(curr[1], merged[1]);
            intervals.splice(i, 1);
        } else if (merged != null && merged[0] < curr[0]) {
            // no more merging to be done
            break;
        } else {
            // shouldn't happen
            i++;
        }
    }
    if (!inserted) {
        // insert interval at the end if not already inserted
        intervals.push(newInterval);
    }
    return intervals;
}

function isOverlap(a: Interval, b: Interval): boolean {
    const maxStart = Math.max(a[0], b[0]);
    const minEnd = Math.min(a[1], b[1]);
    return maxStart <= minEnd;
}

function merge(a: Interval, b: Interval): Interval {
    const minStart = Math.min(a[0], b[0]);
    const maxEnd = Math.max(a[1], b[1]);
    return [minStart, maxEnd];
}

// Test cases

console.log(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]));
console.log(insertInterval([[1, 3], [6, 9]], [2, 5]));
console.log(insertInterval([[3, 5], [6, 9]], [1, 2]));
console.log(insertInterval([[1, 3], [4, 6]], [7, 8]));
