const input = require('./input');
const { deepCopy } = require('../helpers');
const EMPTY = 'L';
const OCCUPIED = '#';
const FLOOR = '.';

const inBounds = (x, y, chart) => {
	if (chart[y] === undefined || chart[y][x] === undefined) return false;
	return true;
}

const firstVisibleSeat = (xStart, yStart, xChange, yChange, chart) => {
	let x = xStart;
	let y = yStart;
	while (true) {
		x += xChange;
		y += yChange;
		if (inBounds(x, y, chart)) {
			const seat = chart[y][x];
			if (seat !== FLOOR) return seat;
		} else {
			return false
		}
	}
};

const getVisibleSeats = (seat, chart) => {
	const x = seat[0];
	const y = seat[1];

	const visibleSeats = [
		firstVisibleSeat(x, y, -1, -1, chart), // top left
		firstVisibleSeat(x, y, 0, -1, chart), // top center
		firstVisibleSeat(x, y, +1, -1, chart), // top right
		firstVisibleSeat(x, y, -1, 0, chart), // middle left
		firstVisibleSeat(x, y, +1, 0, chart), // middle right
		firstVisibleSeat(x, y, -1, +1, chart), // bottom left
		firstVisibleSeat(x, y, 0, +1, chart), // bottom center
		firstVisibleSeat(x, y, +1, +1, chart), // bottom right
	];

	return visibleSeats;
}

const getAdjacentSeats = (seat, chart) => {
	const x = seat[0];
	const y = seat[1];

	const adjacentSeats = [
		chart?.[y-1]?.[x-1] ?? '-', // top left
		chart?.[y-1]?.[x] ?? '-', // top center
		chart?.[y-1]?.[x+1] ?? '-', // top right
		chart?.[y]?.[x-1] ?? '-', // middle left
		chart?.[y]?.[x+1] ?? '-', // middle right
		chart?.[y+1]?.[x-1] ?? '-', // bottom left
		chart?.[y+1]?.[x] ?? '-', // bottom center
		chart?.[y+1]?.[x+1] ?? '-', // bottom right
	];

	return adjacentSeats.filter(seat => seat !== '-');
};

const changeSeat = (state, adjacentSeats, threshold) => {
	const occupiedAdjacentSeats = adjacentSeats.filter(seat => seat === OCCUPIED);
	const occupiedCount = occupiedAdjacentSeats.length;

	if (state === EMPTY && occupiedCount === 0) return OCCUPIED;
	if (state === OCCUPIED && occupiedCount >= threshold) return EMPTY;

	return state;
};

const diffState = (a, b) => {
	const oldState = a.flat().join('');
	const newState = b.flat().join('');
	const changed = oldState !== newState;

	return changed;
};

const findEquilibrium = (chart, occupancyThreshold, rule) => {
	const state = deepCopy(chart);
	let changed = 1;

	while (changed) {
		const previousState = deepCopy(state);

		state.forEach((row, y) => {
			row.forEach((seat, x) => {
				const currentSeatState = seat;
				const adjacents = rule([x, y], previousState);
				const newState = changeSeat(currentSeatState, adjacents, occupancyThreshold);
				state[y][x] = newState;
			});
		});

		changed = diffState(previousState, state);
	}

	return state;
}

const countOccupiedSeats = (chart) => {
	return chart.flat().filter(seat => seat === OCCUPIED).length;
};

const a = (input) => {
	const findAdjacentEquilibrium = findEquilibrium(input, 4, getAdjacentSeats);
	return countOccupiedSeats(findAdjacentEquilibrium);
}

const b = (input) => {
	const findVisibleEquilibrium = findEquilibrium(input, 5, getVisibleSeats);
	return countOccupiedSeats(findVisibleEquilibrium);
}

console.log(a(input), b(input));
