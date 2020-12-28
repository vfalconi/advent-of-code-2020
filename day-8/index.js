const input = require('./input');
const { deepCopy } = require('../helpers');

const runInstructions = (input) => {
	const instructions = deepCopy(input);
	let accumulator = 0;
	let i = 0;
	let infiniteLoop = false;

	while (true) {
		const step = instructions[i];

		if (i === instructions.length) {
			return {
				accumulator,
				infiniteLoop: false,
			}
		}

		if (step.executed === true) {
			return {
				accumulator,
				infiniteLoop: true,
			}
		}

		step.executed = true;

		if (step.operation === 'acc') {
			accumulator += step.argument;
		}

		if (step.operation === 'jmp') {
			i += step.argument;
		} else {
			i++;
		}
	}

}

const a = (input) => {
	const walk = runInstructions(input);
	return walk.accumulator;
};

const b = (input) => {
	const toggleOperation = (operation) => {
		if (operation === 'nop') return 'jmp';
		if (operation === 'jmp') return 'nop';
	};
	const instructions = deepCopy(input);

	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i].operation === 'nop' || instructions[i].operation === 'jmp') {
			const testInstructions = deepCopy(instructions);
			testInstructions[i].operation = toggleOperation(testInstructions[i].operation);
			const walk = runInstructions(testInstructions);
			if (walk.infiniteLoop === false) return walk.accumulator;
		}
	}
};

console.log(a(input), b(input));
