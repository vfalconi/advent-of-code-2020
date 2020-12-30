const input = require('./input');
const { dec2bin, pad } = require('../helpers');

const applyMask = (value, mask) => {
	// 0 == overwrites with an 0
	// 1 == overwrites with a 1
	// X == no change
	value = value.split('');
	mask = mask.split('');
	return value.map((bit, i) => {
		if (mask[i] === 'X') return bit;
		return mask[i];
	}).join('');
}

const applyMaskV2 = (value, mask) => {
	// 0 == no change
	// 1 == overwrites with a 1
	// X == overwrites with a floating
	//   => requires multiple results, each with a different value in this bit
	value = value.split('');
	mask = mask.split('');
	return value.map((bit, i) => {
		if (mask[i] === '0') return bit;
		return mask[i];
	}).join('');
};

const binCombos = (bits, value, combos = null) => {
	const firstFloatingBit = bits.indexOf('X');
	combos = (combos === null ? new Map() : combos);

	for (let chr=0; chr<=1; chr++) {
		let combo = [...bits];
		combo[firstFloatingBit] = chr;
		combo = combo.join('');
		if (combo.indexOf('X') > -1) {
			combos = new Map([...combos, ...binCombos(combo, value, combos)]);
		} else {
			combos.set(parseInt(combo, 2), value);
		};
	}

	return combos;
};

const a = (input) => {
	const programSteps = [...input];
	const memory = [];

	programSteps.forEach(step => {
		memory[step.address] = applyMask(step.value, step.mask);
	});

	return memory.map(entry => parseInt(entry, 2)).reduce((acc, curr) => acc + curr);
};

const b = (input) => {
	const programSteps = [...input];
	const memory = new Map();
	let total = 0;

	programSteps.forEach(step => {
		const binAddress = pad(dec2bin(step.address), 36);
		const addressBase = applyMaskV2(binAddress, step.mask);
		const addressList = binCombos(addressBase, step.decValue);
		addressList.forEach((value, key) => {
			const previousMemoryValue = memory.get(key);
			if (previousMemoryValue) total -= previousMemoryValue;
			total += value;
			memory.set(key, value);
		});
	});

	return total;
};

console.log(a(input), b(input));
