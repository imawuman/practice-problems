// https://leetcode.com/problems/merge-intervals/description/

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
export function mergeIntervals(intervals) {
    if (intervals.length === 0) {
        return [];
    }
    return mergeIntervalsHelper(intervals, 0, intervals.length - 1);
};

function mergeIntervalsHelper(intervals, start, end) {
    const mid = Math.floor((start + end) / 2);
    if (start === end) {
        return [intervals[start]];
    }
    const mergedLeft = mergeIntervalsHelper(intervals, start, mid);
    const mergedRight = mergeIntervalsHelper(intervals, mid + 1, end);
    let merged = [];
    let curr = null;
    let l = 0;
    let r = 0;
    while (l < mergedLeft.length || r < mergedRight.length) {
        if (curr != null) {
            if (l < mergedLeft.length && canMerge(curr, mergedLeft[l])) {
                curr = merge(curr, mergedLeft[l]);
                l++;
            } else if (r < mergedRight.length && canMerge(curr, mergedRight[r])) {
                curr = merge(curr, mergedRight[r]);
                r++;
            } else {
                merged.push(curr);
                curr = null;
            }
        } else if (l === mergedLeft.length) {
            merged.push(mergedRight[r]);
            r++;
        } else if (r === mergedRight.length) {
            merged.push(mergedLeft[l]);
            l++;
        } else if (canMerge(mergedLeft[l], mergedRight[r])) {
            curr = merge(mergedLeft[l], mergedRight[r]);
            l++;
            r++;
        } else if (mergedLeft[l].start < mergedRight[r].start) {
            merged.push(mergedLeft[l]);
            l++;
        } else {
            merged.push(mergedRight[r]);
            r++;
        }
    }
    if (curr != null) {
        merged.push(curr);
    }
    return merged;
}

function canMerge(int1, int2) {
    const maxStart = Math.max(int1.start, int2.start);
    const minEnd = Math.min(int1.end, int2.end);
    return minEnd >= maxStart;
}

function merge(int1, int2) {
    const start = Math.min(int1.start, int2.start);
    const end = Math.max(int1.end, int2.end);
    return new Interval(start, end);
}
