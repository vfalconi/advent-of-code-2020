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

module.exports = countTrees;
