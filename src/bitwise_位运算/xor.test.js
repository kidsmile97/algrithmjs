const {
  plus,
  exchange,
} = require('./xor.js');

test('plus', () => {
  for (let i = 0; i < 10000; i++) {
    const a = Math.round(Math.random() * 1000000);
    const b = Math.round(Math.random() * 1000000);
    expect(plus(a, b)).toBe(a + b);
    expect(exchange({a, b})).toStrictEqual({a: b, b: a});
  }
});
