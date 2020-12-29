const input = require('./input');

class Position {
	constructor(x, y, orientation) {
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.orientation = orientation ?? false;
	}

	newOrientation(direction, turns) {
		const cardinals = 'NESW'.split('');
		const compass = [...(direction === 'R' ? cardinals : cardinals.reverse())];
		const steps = turns % compass.length;
		let pointer = compass.indexOf(this.orientation);

		for (let i = 0; i < steps; i++) {
			if (pointer < (compass.length - 1)) {
				pointer++;
			} else {
				pointer = 0;
			}
		}

		return compass[pointer];
	}

	orbit({ ...center }, { ...orbiter }, degrees, direction) {
		const angle = (direction === 'R' ? degrees : degrees * -1);
		const rads = (Math.PI / 180) * angle;
		const cos = Math.cos(rads);
		const sin = Math.sin(rads);

		this.x = parseInt((cos * (orbiter.x - center.x)) + (sin * (orbiter.y - center.y)) + center.x, 10);
		this.y = parseInt((cos * (orbiter.y - center.y)) - (sin * (orbiter.x - center.x)) + center.y, 10);
	}

	rotate(direction, degrees) {
		const turns = (degrees / 90);
		this.orientation = this.newOrientation(direction, turns);
	}

	move(orientation, distance) {
		switch (orientation) {
			case 'N':
				this.y += distance;
				break;
			case 'E':
				this.x += distance;
				break;
			case 'S':
				this.y -= distance;
				break;
			case 'W':
				this.x -= distance;
				break;
		}
	}
}

const a = (input) => {
	const ship = new Position(0, 0, 'E');

	input.forEach(instruction => {
		if (instruction.action === 'L' || instruction.action === 'R') {
			ship.rotate(instruction.action, instruction.value);
		} else if (instruction.action === 'F') {
			ship.move(ship.orientation, instruction.value);
		} else {
			ship.move(instruction.action, instruction.value);
		}
	});

	return Math.abs(ship.x) + Math.abs(ship.y);
};

const b = (input) => {
	const ship = new Position();
	const waypoint = new Position(10, 1);

	input.forEach(instruction => {
		if (instruction.action === 'L' || instruction.action === 'R') {
			waypoint.orbit(ship, waypoint, instruction.value, instruction.action);
		} else if (instruction.action === 'F') {
			const slope = {
				rise: waypoint.y - ship.y,
				run: waypoint.x - ship.x,
			}

			// the ship moves toward the waypoint [value] times
			ship.x += slope.run * instruction.value;
			ship.y += slope.rise * instruction.value;

			// and the waypoint remains x units east/west and y units north/south of the ship
			waypoint.x = ship.x + slope.run;
			waypoint.y = ship.y + slope.rise;
		} else {
			waypoint.move(instruction.action, instruction.value);
		}
	});

	return Math.abs(ship.x) + Math.abs(ship.y);
};

console.log(a(input), b(input));
