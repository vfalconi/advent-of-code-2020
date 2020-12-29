const input = require('./input');

const absMod = (a, b) => ((a % b) + b) % b;

const invert = (a, mod) => {
	const b = a % mod;
	for (let i=1; i<mod; i++) {
		if ((b*i) % mod === 1) return i;
	}
	return 1;
}

const crt = (buses) => {
	const N = buses.reduce((acc, curr) => {
		if (curr === 0) return acc;

		return acc === null ? curr : acc * curr;
	}, null);

	const sum = buses.reduce((acc, curr, i) => {
		if (curr === 0) return acc;
		const a = absMod(curr - i, curr);
		const nU = N / curr;
		const inverse = invert(nU, curr);
		return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
	}, 0n);

	return sum % BigInt(N);
};

const a = (input) => {
	const notes = {...input};

	const results = notes.buses.filter(id => {
		// we're choosing to ignore all x/0 ids
		return id !== 0;
	}).map(id => {
		// find the multiple of each busID that is sure to be greater than timestamp
		// and then return the difference between that number and timestamp
		return { bus: id, wait: (Math.ceil(notes.timestamp / id) * id) - notes.timestamp };
	}).reduce((acc, curr) => (acc.wait > curr.wait ? curr : acc));

	// return the sum of timestamp and the smallest difference
	return results.bus * results.wait;
};

const b = (input) => {
	const buses = [...input.buses];
	return crt(buses);
}

console.log(a(input), b(input));
