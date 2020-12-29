const parseInput = (input) => {
	const notes = input.trim().replace(/\t/g, '').split("\n");
	const timestamp = parseInt(notes[0], 10);
	const buses = notes[1].split(',').map(id => (id === 'x' ? 0 : id)).map(id => parseInt(id, 10));

	return { timestamp, buses };
}

const input = `
	1000390
	23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,383,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,503,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37
`;

module.exports = parseInput(input);
