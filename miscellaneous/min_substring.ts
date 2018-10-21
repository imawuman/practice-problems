// https://leetcode.com/problems/minimum-window-substring/description/
export function minWindow(s: string, t: string) {
    const origFreq = computeFreq(t);
    const freq = new Map<string, number>(origFreq);
    const currFreq = new Map<string, number>();
    let start = 0;
    let end = 0;
    while (freq.size > 0 && end < s.length) {
        const currChar = s.charAt(end);
        if (origFreq.has(currChar)) {
            decrementFreq(currChar, freq);
            incrementFreq(currChar, currFreq);
        }
        end++;
    }
    if (freq.size > 0) {
        // no such window in t that covers all characters in t
        return "";
    }
    let currMin = null;
    let nextChar = null;
    while (start < s.length || end < s.length) {
        while (nextChar == null) {
            const currChar = s.charAt(start);
            if (currMin == null || end - start < currMin.length) {
                currMin = s.substring(start, end);
            }
            if (origFreq.has(currChar)) {
                const count = decrementFreq(currChar, currFreq);
                if (count < origFreq.get(currChar)) {
                    nextChar = currChar;
                }
            }
            start++;
        }
        while (nextChar != null && end < s.length) {
            const currChar = s.charAt(end);
            incrementFreq(currChar, currFreq);
            if (currChar === nextChar) {
                nextChar = null;
            }
            end++;
        }
        if (nextChar != null) {
            // no more possible solutions
            break;
        }
    }
    return currMin;
}

function computeFreq(str: string) {
    const freqMap = new Map();
    for (const c of str) {
        incrementFreq(c, freqMap);
    }
    return freqMap;
}

function incrementFreq(key: string, freqMap: Map<string, number>) {
    if (freqMap.has(key)) {
        freqMap.set(key, freqMap.get(key)! + 1);
    } else {
        freqMap.set(key, 1);
    }
}

function decrementFreq(key: string, freq: Map<string, number>) {
    if (freq.has(key)) {
        const count = freq.get(key)!;
        if (count === 1) {
            freq.delete(key);
        } else {
            freq.set(key, count - 1);
        }
        return count - 1;
    } else {
        return 0;
    }
}
