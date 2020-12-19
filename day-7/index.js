const chalk = require('chalk');
const input = require('./input');
const myBag = 'shiny gold';
//const myBag = 'faded blue';
//const myBag = 'dark olive';

const a = (input) => {
	let possibilityCount = 0;

	const buildTypeList = (needles, collection = []) => {
		needles.forEach(needle => {
			collection.push(needle.bagType);
			collection.concat(buildTypeList(input[needle.bagType], collection));
		});
		return collection;
	}

	Object.keys(input).forEach(key => {
		const options = buildTypeList(input[key]);
		if (options.includes(myBag)) possibilityCount++;
	});

	return possibilityCount;
};

const b = (input) => {
	const countBags = (bag) => {
		const contents = input[bag];
		let total = 0;

		// looking into `bag`

		contents.forEach(item => {
			// found `item.count` `item.bagType` bags
			const multiplier = item.count;
			total += multiplier;
			if (input[item.bagType].length > 0) {
				const nextCount = countBags(item.bagType, total);
				// adding `nextCount` times `multiplier` bags
				total += nextCount * multiplier;
			};
		});

		console.groupEnd();

		return total;
	}

	return countBags(myBag);
};

console.log(a(input), b(input));
