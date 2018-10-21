// Exercise 17.15

// O(nk^2) where n is length of words and k is length of largest word
function longestWord(words: string[]): string | undefined {
    const wordSet = new Set(words);
    const memo = new Map<string, boolean>();
    let longest: string | undefined;
    words.forEach(word => {
        if (longest == null || word.length > longest.length) {
            let prefix = "";
            for (let i = 0; i < word.length; i++) {
                if (wordSet.has(prefix) && isMadeOfSubWords(word.slice(i), wordSet, memo)) {
                    longest = word;
                    break;
                } else {
                    prefix += word.charAt(i);
                }
            }
        }
    });
    return longest;
}

function isMadeOfSubWords(word: string, wordSet: Set<string>, memo: Map<string, boolean>): boolean {
    if (memo.has(word)) {
        // memoized result
        return memo.get(word)!;
    } else if (wordSet.has(word)) {
        return true;
    } else {
        // recursively check if made of sub words
        let prefix = "";
        for (let i = 0; i < word.length; i++) {
            if (wordSet.has(prefix) && isMadeOfSubWords(word.slice(i), wordSet, memo)) {
                return true;
            } else {
                prefix += word.charAt(i);
            }
        }
        return false;
    }
}

// Test cases

const wordList = [
    "abc",
    "def",
    "ab",
    "zzz",
    "abcdef",
    "23abcdef",
    "abczzzzdef",
    "12",
    "3",
    "ab123",
];

// Answer should be 'abcdef'
console.log(longestWord(wordList));

export default {};
