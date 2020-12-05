const input = require('./input');
const validCount = (entries, validator) => {
	return entries.map(item => validator(item)).filter(result => result === true).length;
}

const a = (entries) => {
	const countChars = (needle, haystack) => {
		const test = new RegExp(needle, 'g');
		const matches = haystack.matchAll(test);
		return [...matches];
	}
	const checkPassword = (entry) => {
		const occurances = countChars(entry.policy.char, entry.password);
		if (occurances.length >= entry.policy.range.min && occurances.length <= entry.policy.range.max) return true;
		return false;
	}
	return validCount(entries, checkPassword);
}

const b = (entries) => {
	const checkPassword = (entry) => {
		const posA = entry.policy.range.min - 1;
		const posB = entry.policy.range.max - 1;
		const reqChar = entry.policy.char;
		const char1 = entry.password.charAt(posA);
		const char2 = entry.password.charAt(posB);

		if (char1 === reqChar && char2 === reqChar) return false;
		if (entry.password.indexOf(reqChar) < 0) return false;
		if (char1 === reqChar || char2 === reqChar) return true;
		return null;
	}
	return validCount(entries, checkPassword);
}

console.log(a(input), b(input));
