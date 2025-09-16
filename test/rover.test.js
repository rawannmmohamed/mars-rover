const { Rover } = require('../src/rover');

describe('Mars Rover', () => {
    test('moves forward facing NORTH', () => {
        const r = new Rover(0, 0, 'NORTH');
        expect(r.executeCommands('F')).toBe('(0, 1) NORTH');
    });

    test('moves backward facing EAST', () => {
        const r = new Rover(0, 0, 'EAST');
        expect(r.executeCommands('B')).toBe('(-1, 0) EAST');
    });

    test('rotates left and right correctly', () => {
        const r1 = new Rover(0, 0, 'NORTH');
        expect(r1.executeCommands('L')).toBe('(0, 0) WEST');

        const r2 = new Rover(0, 0, 'NORTH');
        expect(r2.executeCommands('R')).toBe('(0, 0) EAST');
    });

    test('complex sequence matches example (4,2,EAST, "FLFFFRFLB") -> (6, 4) NORTH', () => {
        const r = new Rover(4, 2, 'EAST');
        expect(r.executeCommands('FLFFFRFLB')).toBe('(6, 4) NORTH');
    });

    test('throws error for invalid heading', () => {
        expect(() => new Rover(0, 0, 'INVALID')).toThrow(/Invalid heading/);
    });

    test('throws error for invalid command', () => {
        const r = new Rover(0, 0, 'NORTH');
        expect(() => r.executeCommands('FX')).toThrow(/Invalid command/);
    });
    test('stops before obstacle and returns STOPPED', () => {
        const r = new Rover(0, 0, 'EAST', [[2, 0]]);
        expect(r.executeCommands('FFF')).toBe('(1, 0) EAST STOPPED');
    });

    test('immediate obstacle: stops at start and reports STOPPED', () => {
        const r = new Rover(0, 0, 'EAST', [[1, 0]]);
        expect(r.executeCommands('F')).toBe('(0, 0) EAST STOPPED');
    });

});
