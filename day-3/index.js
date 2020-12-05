const input = require('./input');
const countTrees = (treeMap, slope) => {
	const calcX = (xLimit, currentPos, inc) => {
		const newPos = currentPos + inc;
		if (newPos >= xLimit) return newPos - xLimit;
		return newPos;
	}
	const patternWidth = treeMap[0].length;
	const finishY = treeMap.length + 1;
	const position = {
		x: 0,
		y: 0,
	}
	let treeCount = 0;

	while (position.y < finishY) {
		position.x = calcX(patternWidth, position.x, slope.right);
		position.y += slope.down;
		if (position.y < treeMap.length) {
			let space = treeMap[position.y][position.x];
			if (space === '#') treeCount++;
		}
	}

	return treeCount;
}

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
