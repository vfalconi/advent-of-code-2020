const input = require('./input');
const preambleLength = 25;

const checkNumber = (number, preamble) => {
	let isValid = false;
	preamble.forEach((p, i) => {
		const testPreamble = [...preamble];
		testPreamble.forEach((tp, ti) => {
			if (ti !== i) {
				if (p + tp === number) isValid = true;
			}
		});
	});
	return isValid;
}

const findInvalidNumber = (numbers, preambleLength) => {
	let i = preambleLength;
	let found = false;

	while (found === false) {
		const preambleStart = (i - preambleLength);
		const preambleEnd = preambleStart + preambleLength;
		const preamble = [...numbers.slice(preambleStart, preambleEnd)];
		const number = numbers[preambleEnd];
		if (checkNumber(number, preamble) === false) found = number;
		i++;
	}

	return found;
}

const findSumInArray = (limit, arrayNumbers) => {
	const numbers = [...arrayNumbers];
	const list = [];
	let sum = 0;
	for (let i = 0; i < numbers.length; i++) {
		const number = numbers[i];
		sum += number;
		list.push(number)
		if (sum === limit) return list;
	}
	return false;
}

const a = (input) => {
	const numbers = [...input];
	return findInvalidNumber(numbers, preambleLength);
};

const b = (input) => {
	const numbers = [...input];
	const invalidNumber = findInvalidNumber(numbers, 25);
	const testNumbers = [...numbers].filter(n => n < invalidNumber);
	const sums = testNumbers.map((n, i) => {
		return findSumInArray(invalidNumber, [...testNumbers.slice(i)]);
	}).filter(item => item !== false);
	const vuln = sums[0].sort((a,b) => a - b);

	return vuln[0] + vuln[(vuln.length - 1)];
};

console.log(a(input), b(input));
