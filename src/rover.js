/**
 * Handles movement and directions
 */

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

const VECTORS = {
    NORTH: [0, 1],
    EAST: [1, 0],
    SOUTH: [0, -1],
    WEST: [-1, 0],
};

class Rover {
    constructor(x = 0, y = 0, heading = 'NORTH') {
        this.x = x;
        this.y = y;
        this.heading = heading.toUpperCase();

        this.dirIndex = DIRECTIONS.indexOf(this.heading);
        if (this.dirIndex === -1) {
            throw new Error(`Invalid heading: ${heading}`);
        }
    }

    executeCommands(commands = '') {
        const handlers = {
            F: () => this._move(1),
            B: () => this._move(-1),
            L: () => this._turn(-1),
            R: () => this._turn(1),
        };

        for (const ch of commands.toUpperCase()) {
            const handler = handlers[ch];
            if (!handler) {
                throw new Error(`Invalid command: ${ch}`);
            }
            handler();
        }

        return this.report();
    }

    _move(mult) {
        const [dx, dy] = VECTORS[this.heading];
        this.x += dx * mult;
        this.y += dy * mult;
    }

    _turn(step) {
        this.dirIndex = (this.dirIndex + step + DIRECTIONS.length) % DIRECTIONS.length;
        this.heading = DIRECTIONS[this.dirIndex];
    }

    report() {
        return `(${this.x}, ${this.y}) ${this.heading}`;
    }
}

module.exports = { Rover, DIRECTIONS, VECTORS };
