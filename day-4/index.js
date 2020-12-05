const input = require('./input');

const fields = {
	'byr': (value) => {
		const birthYear = parseInt(value, 10);
		return (birthYear >= 1920 && birthYear <= 2002);
	},
	'iyr': (value) => {
		const issueYear = parseInt(value, 10);
		return (issueYear >= 2010 && issueYear <= 2020);
	},
	'eyr': (value) => {
		const expYear = parseInt(value, 10);
		return (expYear >= 2020 && expYear <= 2030);
	},
	'hgt': (value) => {
		const unit = value.slice(-2);
		const height = parseInt(value.replace(unit, ''), 10);
		if (unit === 'cm') return (height >= 150 && height <= 193);
		if (unit === 'in') return (height >= 59 && height <= 76);
	},
	'hcl': (value) => {
		const regex = /^#(?:[0-9a-fA-F]{6})$/;
		return (value.match(regex) !== null);
	},
	'ecl': (value) => {
		const options = [
			'amb',
			'blu',
			'brn',
			'gry',
			'grn',
			'hzl',
			'oth',
		];
		return options.includes(value);
	},
	'pid': (value) => {
		const regex = /^(?:\d{9})$/g;
		return (value.match(regex) !== null);
	},
};

const checkRequiredFields = (passport) => {
	return Object.keys(fields).every(field => passport[field] !== undefined);
};

const validatePassport = (passport) => {
	if (checkRequiredFields(passport)) {
		const status = Object.keys(fields).map(field => {
			return fields[field](passport[field]);
		});
		return status.every(result => result === true);
	}
	return false;
};

const countValidPassports = (passports) => {
	return passports.filter(status => status === true).length;
}

const a = (passports) => {
	return countValidPassports(passports.map(passport => checkRequiredFields(passport)));
}

const b = (passports) => {
	return countValidPassports(passports.map(passport => validatePassport(passport)));
}

console.log(a(input), b(input));
