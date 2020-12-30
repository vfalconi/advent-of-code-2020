module.exports.deepCopy = (arr) => {
	return arr.map(item => {
		return [...item];
	});
};

module.exports.dec2bin = (dec) => {
	return (dec >>> 0).toString(2);
};

module.exports.pad = (num, len) => {
	const remLen = len - String(num).length;
	let value = String(num);
	for (let i=0; i<remLen; i++) {
		value = `0${value}`;
	}
	return value;
};
