const input = require('./input');
const { findAddends } = require('./findAddends');
const sum = 2020;

const a = (numbers) => {
	const entries = findAddends(numbers, sum);
	return entries.reduce((acc, curr) => acc * curr);
}

const b = (numbers) => {
	const entries = [];
	numbers.forEach(num => {
		const newSum = sum - num;
		const addends = findAddends(numbers, newSum);
		if (addends.length > 0) {
			entries.concat(addends);
			entries.push(num);
		}
	});
	return entries.reduce((acc, curr) => acc * curr);
}

console.log(a(input), b(input));
