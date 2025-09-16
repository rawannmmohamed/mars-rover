/**
 * Handles rover movement, direction changes and obstacles
 */

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

const VECTORS = {
    NORTH: [0, 1],
    EAST: [1, 0],
    SOUTH: [0, -1],
    WEST: [-1, 0],
};

class Rover {
    constructor(x = 0, y = 0, heading = 'NORTH', obstacles = []) {
        this.x = x;
        this.y = y;
        this.heading = heading.toUpperCase();

        this.obstacles = new Set(obstacles.map(([ox, oy]) => `${ox},${oy}`));
        this.stopped = false;

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

        for (const command of commands.toUpperCase()) {
            const handler = handlers[command];
            if (!handler) throw new Error(`Invalid command: ${command}`);
            handler();
            if (this.stopped) return this.report();
        }

        return this.report();
    }

    _move(step) {
        const [dx, dy] = VECTORS[this.heading];
        const nextX = this.x + dx * step;
        const nextY = this.y + dy * step;

        if (this.hasObstacle(nextX, nextY)) {
            this.stopped = true;
            return;
        }

        this.x = nextX;
        this.y = nextY;
    }

    _turn(step) {
        this.dirIndex = (this.dirIndex + step + DIRECTIONS.length) % DIRECTIONS.length;
        this.heading = DIRECTIONS[this.dirIndex];
    }

    hasObstacle(x, y) {
        return this.obstacles.has(`${x},${y}`);
    }

    report() {
        const result = `(${this.x}, ${this.y}) ${this.heading}`;
        return this.stopped ? `${result} STOPPED` : result;
    }
}

module.exports = { Rover, DIRECTIONS, VECTORS };
