const input = require('./input');

const a = (input) => {
	const adapters = [...input].sort((a,b) => a - b);
	const outlet = 0;
	const device = [...input].reduce((acc, cur) => (acc > cur ? acc : cur)) + 3;
	const distributions = {
		1: 0,
		2: 0,
		3: 0,
	};

	adapters.unshift(outlet);
	adapters.push(device);

	adapters.forEach((adapter, i) => {
		const nextNumber = adapters[(i+1)] ?? null;
		if (nextNumber) {
			const diff = adapters[(i+1)] - adapter;
			const diffKey = String(diff);
			distributions[diffKey]++;
		}
	});

	return distributions['1'] * distributions['3'];
};

const b = (input) => {
	const adapters = [...input].sort((a,b) => a - b);
	const outlet = 0;
	const device = [...input].reduce((acc, cur) => (acc > cur ? acc : cur)) + 3;
	const maps = {};

	adapters.unshift(outlet);
	adapters.push(device);

	const walkAdapters = (currentAdapter, availableAdapters) => {
		let total = 0;

		if (currentAdapter === device) return 1;

		for (let i = 1; i <= 3; i++) {
			const nextAdapter = currentAdapter + i;
			if (availableAdapters.includes(nextAdapter)) {
				if (maps[nextAdapter] === undefined) {
					const leftovers = availableAdapters.filter(adapter => (adapter > nextAdapter));
					maps[nextAdapter] = walkAdapters(nextAdapter, leftovers);
				}
				total += maps[nextAdapter];
			}
		}

		return total;
	}

	return walkAdapters(outlet, adapters);
};

console.log(a(input), b(input));
