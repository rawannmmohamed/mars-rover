/**
 * Path planning for Rover
 * Finds a command string to reach target while avoiding obstacles.
 */

const { DIRECTIONS, VECTORS } = require('./rover');

function planPath(rover, targetX, targetY) {
    const start = { x: rover.x, y: rover.y, heading: rover.heading, path: '' };
    const visited = new Set([`${start.x},${start.y},${start.heading}`]);
    const queue = [start];
    const commands = ['F', 'B', 'L', 'R'];

    while (queue.length > 0) {
        const { x, y, heading, path } = queue.shift();

        if (x === targetX && y === targetY) return path;

        for (const cmd of commands) {
            const next = simulate(x, y, heading, cmd, rover);
            if (!next) continue;

            const key = `${next.x},${next.y},${next.heading}`;
            if (visited.has(key)) continue;

            visited.add(key);
            queue.push({ ...next, path: path + cmd });
        }
    }
    return null;
}

function simulate(x, y, heading, cmd, rover) {
    if (cmd === 'L' || cmd === 'R') {
        const idx = DIRECTIONS.indexOf(heading);
        const step = cmd === 'R' ? 1 : -1;
        const newHeading = DIRECTIONS[(idx + step + DIRECTIONS.length) % DIRECTIONS.length];
        return { x, y, heading: newHeading };
    }

    const [dx, dy] = VECTORS[heading];
    const step = cmd === 'F' ? 1 : -1;
    const nextX = x + dx * step;
    const nextY = y + dy * step;

    if (rover.hasObstacle(nextX, nextY)) return null;
    return { x: nextX, y: nextY, heading };
}

module.exports = { planPath };
