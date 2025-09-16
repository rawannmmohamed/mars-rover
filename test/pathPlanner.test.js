const { Rover } = require('../src/rover');
const { planPath } = require('../src/pathPlanner');

describe('Path planning', () => {
    test('simple straight path', () => {
        const r = new Rover(0, 0, 'NORTH', []);
        expect(planPath(r, 0, 2)).toBe('FF');
    });

    test('requires turning east', () => {
        const r = new Rover(0, 0, 'NORTH', []);
        const path = planPath(r, 2, 0);
        expect(path).not.toBeNull();

        const r2 = new Rover(0, 0, 'NORTH', []);
        r2.executeCommands(path);
        expect([r2.x, r2.y]).toEqual([2, 0]);
    });


    test('avoids obstacle', () => {
        const r = new Rover(0, 0, 'NORTH', [[1, 0]]);
        const path = planPath(r, 2, 0);
        expect(path).not.toBeNull();
    });
});
