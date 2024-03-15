const { getRandArr } = require('../utils/array.js');
const { reverse, arrayify } = require('./linkedList.js');
const { LinkedList } = require('./linkedList.js');
const { DuLinkedList } = require('./双向链表.js');

// success!
// test('linked list reverse', () => {
//   for (let i = 0; i < 100; i++) {
//     const head = {
//       value: null,
//       next: null,
//     }
//     let temp = head;
//     let _arr = getRandArr(2); // 制造数据状况，数据永远处于 0 - 100
//     _arr.forEach(value => {
//       temp.next = {
//         value: value,
//         next: null,
//       }
//       temp = temp.next;
//     })
//     expect(arrayify(reverse(head))).toStrictEqual(_arr.reverse());
//   }
// });

// success!
// test('linkedList class', () => {
//   for (let i = 0; i < 100; i++) {
//     const linkedList = new LinkedList();
//     let _arr = getRandArr(100); // 制造数据状况，数据永远处于 0 - 100
//     _arr.forEach(value => {
//       linkedList.put(value);
//     })
//     expect(arrayify(linkedList.reverse())).toStrictEqual(_arr.reverse());
//   }
// });

// success!
test('double linked list reverse', () => {
  for (let i = 0; i < 100; i++) {
    const linkedList = new DuLinkedList();
    let _arr = getRandArr(1000); // 制造数据状况，数据永远处于 0 - 100
    _arr.forEach(value => {
      linkedList.put(value);
    })
    expect(arrayify(linkedList.reverse())).toStrictEqual(_arr.reverse());
  }
});

