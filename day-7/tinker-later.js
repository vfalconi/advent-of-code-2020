// unnecessary loops, but faster?

const a = (input) => {
	const containerOptions = {};
	const hrstart = process.hrtime()
	let possibilityCount = 0;

	console.log(`starting a() - aka A LOT of loops`);

	const buildTypeList = (needles, collection = []) => {
		needles.forEach(needle => {
			collection.push(needle.bagType);
			collection.concat(buildTypeList(input[needle.bagType], collection));
		});
		return collection;
	}

	Object.keys(input).forEach(key => {
		const options = buildTypeList(input[key]);
		containerOptions[key] = new Set();

		options.forEach(option => containerOptions[key].add(option));
	});

	Object.keys(containerOptions).forEach(container => {
		if (containerOptions[container].has(myBag)) possibilityCount++;
	});

	const hrend = process.hrtime(hrstart);

  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

	return possibilityCount;
};
