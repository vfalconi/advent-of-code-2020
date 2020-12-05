const findAddends = (numbers, sum) => {
	const addends = [];
	let matchFound = false;
	let i = 0;

	while (matchFound === false) {
		let current = numbers[i];
		let diff = sum - current;

		if (numbers.includes(diff)) {
			addends.push(diff);
			addends.push(current);
			matchFound = true;
		}

		if (i + 1 > numbers.length) {
			matchFound = true;
		}

		i++;
	}

	return addends;
}

module.exports = { findAddends }
