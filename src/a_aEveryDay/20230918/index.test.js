const { getRandArr, arrayify } = require('../../utils/array.js');
const { reverse } = require('./index.js');

test('2023-09-18 test', () => {
  for (let i = 0; i < 100; i++) {
    const head = { value: null, next: null };
    let temp = head;
    let _arr = getRandArr(1000);
    _arr.forEach(value => {
      temp.next = {
        value,
        next: null,
      }
      temp = temp.next;
    })
    expect(arrayify(reverse(head))).toStrictEqual(_arr.reverse());
  }
});