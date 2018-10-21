// Exercise 10.2
// https://leetcode.com/problems/group-anagrams/description/

export function groupAnagrams(strings: string[]): string[][] {
    const anagrams = new Map<string, string[]>();
    strings.forEach((s) => {
        const key = s.split("").sort().join("");
        if (anagrams.has(key)) {
            anagrams.get(key)!.push(s);
        } else {
            anagrams.set(key, [s]);
        }
    });
    const sorted: string[][] = [];
    anagrams.forEach((values) => {
        sorted.push([...values]);
    });
    return sorted;
}

// Test cases

const args = ["abc", "123", "def", "321", "test", "fed", "feds"];
console.log(groupAnagrams(args));
