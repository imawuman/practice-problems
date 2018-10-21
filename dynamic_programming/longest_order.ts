// Exercise 17.8

interface IPerson {
    height: number;
    weight: number;
}

// O(k^n) where n is the number of people and k is the longest length of people
function longestOrderV1(persons: IPerson[]): number {
    let longest = 0;
    persons.forEach(person => {
        const length = longestOrderRecursive(person, persons) + 1;
        longest = Math.max(longest, length);
    });
    return longest;
}

function longestOrderRecursive(bottom: IPerson, persons: IPerson[]): number {
    let longest = 0;
    persons.forEach(person => {
        if (canGoOntop(person, bottom)) {
            const length = longestOrderRecursive(person, persons) + 1;
            longest = Math.max(longest, length);
        }
    });
    return longest;
}

// O(n*log(n) + n^2) where n is number of people
function longestOrderV2(persons: IPerson[]): number {
    const sorted = sortPersons(persons.slice());
    let longest = 0;
    for (const person of sorted) {
        const current = findLongestOrder(person, sorted);
        longest = Math.max(longest, current);
    }
    return longest;
}

function findLongestOrder(bottom: IPerson, persons: IPerson[]): number {
    let length = 1;
    let prev = bottom;
    for (const person of persons) {
        if (canGoOntop(prev, person)) {
            prev = person;
            length++;
        }
    }
    return length;
}

// Sort by decreasing height then weight
function sortPersons(persons: IPerson[]): IPerson[] {
    return persons.sort((a: IPerson, b: IPerson) => {
        if (a.height === b.height) {
            return b.weight - a.weight;
        } else {
            return b.height - a.height;
        }
    });
}

function canGoOntop(top: IPerson, bottom: IPerson): boolean {
    return top.height > bottom.height && top.weight > bottom.weight;
}

// Test cases

const people: IPerson[] = [
    { height: 1, weight: 5 },
    { height: 2, weight: 4 },
    { height: 3, weight: 3 },
    { height: 4, weight: 2 },
    { height: 6, weight: 6 },
    { height: 5, weight: 4 },
    { height: 3, weight: 1 },
];

// Answer should be 4: (6, 6), (5, 4), (4, 2), (3, 1)
console.log(longestOrderV1(people));
console.log(longestOrderV2(people));

export default {};
