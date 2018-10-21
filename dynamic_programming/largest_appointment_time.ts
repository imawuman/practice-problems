// Exercise 17.16

// O(2^n) where n is the number of bookings
function largestAppointmentTimeV1(bookings: number[]): number {
    return largestAppointmentRecursiveV1(0, bookings, 0);
}

function largestAppointmentRecursiveV1(index: number, bookings: number[], currentTotal: number): number {
    if (index >= bookings.length) {
        // no more bookings, return total booked time
        return currentTotal;
    } else {
        const currentAppt = bookings[index];
        const withCurr = largestAppointmentRecursiveV1(index + 2, bookings, currentTotal + currentAppt);
        const withoutCurr = largestAppointmentRecursiveV1(index + 1, bookings, currentTotal);
        return Math.max(withCurr, withoutCurr);
    }
}

// O(n) where n is the number of bookings
function largestAppointmentTimeV2(bookings: number[]): number {
    const totals = Array(bookings.length).fill(0);
    for (let i = 0; i < bookings.length; i++) {
        const currAppt = bookings[i];
        const prevBookedTotal = i > 0 ? totals[i - 1] : 0;
        const prevSkippedTotal = i > 1 ? totals[i - 2] : 0;
        const currTotal = Math.max(prevBookedTotal, prevSkippedTotal + currAppt);
        totals[i] = currTotal;
    }
    return Math.max(...totals);
}

// Test cases

const appts = [30, 15, 60, 75, 45, 15, 15, 45];

console.log(largestAppointmentTimeV1(appts));
console.log(largestAppointmentTimeV2(appts));

export default {};
