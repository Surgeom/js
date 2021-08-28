const script = require('../test.js');
const pow = script.pow;

describe('Функция pow()', () => {
    it('должна возвращать 9 при аргументах (3, 2)', () => {
        expect(pow(3, 2)).toBe(9);
    })
});