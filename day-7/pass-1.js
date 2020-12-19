const parseInput = (input) => {
	const ruleLines = input.trim().replace(/\t/g, '').replace(/\./g, '').split("\n");
	const parsedInput = {};

	ruleLines.forEach(line => {
		const rule = line.split('bags contain ');
		const ruleName = rule[0].trim();
		const ruleContains = rule[1].split(',').map(piece => {
			const bags = piece.trim();
			if (piece !== 'no other bags') return bagCount(bags);
		});

		parsedInput[ruleName] = ruleContains.filter(piece => piece !== undefined);
	});
	return parsedInput;
};

const bagCount = (bags) => {
	const matches = [...bags.matchAll(/^(\d)\s([a-z\s]+)\sbag|bags$/g)];

	return {
		bagType: matches[0][2],
		count: matches[0][1]
	};
};

const input = `
	light red bags contain 1 bright white bag, 2 muted yellow bags.
	dark orange bags contain 3 bright white bags, 4 muted yellow bags.
	bright white bags contain 1 shiny gold bag.
	muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
	shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
	dark olive bags contain 3 faded blue bags, 4 dotted black bags.
	vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
	faded blue bags contain no other bags.
	dotted black bags contain no other bags.
`;

module.exports = parseInput(input);
