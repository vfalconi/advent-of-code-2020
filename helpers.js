module.exports.deepCopy = (arr) => {
	return arr.map(item => {
		return [...item];
	});
};
