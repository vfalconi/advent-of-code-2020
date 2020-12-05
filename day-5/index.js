const input = require('./input');
const rows = [...Array(128).keys()];
const columns = [...Array(8).keys()];
const binarySearch = (seats, direction) => {
	const midpoint = Math.floor(seats.length / 2);
	if (direction === 'F' || direction === 'L') return seats.slice(0, midpoint);
	if (direction === 'B' || direction === 'R') return seats.slice(midpoint);
}
const getSeatIds = (assignments) => {
	const seatIDs = [];
	assignments.forEach(assignment => {
		let colNum = columns;
		let rowNum = rows;
		assignment.rows.forEach(row => {
			rowNum = binarySearch(rowNum, row);
		});
		assignment.columns.forEach(column => {
			colNum = binarySearch(colNum, column);
		});
		seatIDs.push(rowNum[0] * 8 + colNum[0]);
	});
	return seatIDs;
}

const a = (assignments) => {
	return getSeatIds(assignments).reduce((acc, curr) => acc > curr ? acc : curr);
}

const b = (assignments) => {
	const seatIDs = getSeatIds(assignments).sort((a, b) => a - b);
	let yourSeat = 0;
	seatIDs.forEach(id => {
		const seat = id;
		const nextSeat = id + 1;
		const nextNextSeat = id + 2;
		if (!seatIDs.includes(nextSeat) && seatIDs.includes(nextNextSeat)) yourSeat = nextSeat;
	});
	return yourSeat;
}

console.log(a(input), b(input));
