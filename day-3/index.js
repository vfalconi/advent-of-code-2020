const input = require('./input');
const countTrees = require('./countTrees');

const a = (mapInput) => {
	const slope = {
		right: 3,
		down: 1,
	}
	return countTrees(mapInput, slope);
};

const b = (mapInput) => {
	const slopes = [
		{ right: 1, down: 1 },
		{ right: 3, down: 1 },
		{ right: 5, down: 1 },
		{ right: 7, down: 1 },
		{ right: 1, down: 2 },
	];
	const counts = slopes.map(slope => countTrees(mapInput, slope));
	return counts.reduce((acc, curr) => acc * curr);
}

console.log(a(input), b(input));
