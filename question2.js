function sumArray(numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
}

// Example usage:
console.log(sumArray([1, 2, 3, 4, 8])); // Output: 15
