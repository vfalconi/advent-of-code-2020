const input = require('./input');

const countAnswers = (group) => {
	const analysis = {
		totalPeople: group.length,
		answers: []
	};
	group.forEach(person => {
		person.forEach(answer => {
			if (analysis['answers'][answer] === undefined) {
				analysis['answers'][answer] = 1;
			} else {
				analysis['answers'][answer]++;
			}
		});
	});
	return analysis;
}

const a = (input) => {
	const discreteAnswers = input.map(group => {
		const counts = countAnswers(group);
		return Object.keys(counts.answers).length;
	});
	return discreteAnswers.reduce((acc, curr) => acc + curr);
}

const b = (input) => {
	const unanimousAnswers = input.map(group => {
		const analysis = countAnswers(group);
		const unanimous = Object.keys(analysis.answers).filter(answerCount => {
			return analysis.answers[answerCount] === analysis.totalPeople;
		});
		return unanimous;
	});
	return unanimousAnswers.map(results => results.length).reduce((acc, curr) => acc + curr);
}

console.log(a(input), b(input));
