const selectSort = require('./select.js');
const bubbleSort = require('./bubble.js');
const insertSort = require('./insert.js');
const mergeSort = require('./merge.js');
const mergeSortBe = require('./merge_be.js');
const quickSort = require('./quickSort.js');
const heapSort = require('./heap.js');
const { clone, getRandArr, sortFn } = require('../utils/array.js');
const countSort = require('./countSort.js');
const radixSort = require('./radixSort.js');

test('select array', () => {
	let _arr = getRandArr(10, 10);
	let _arr_copy = clone(_arr);
	expect(selectSort(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
});

// success !
test('select array', () => {
	for (let i = 0; i < 10000; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(selectSort(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
	}
});

// success!
test('bubble array', () => {
	for (let i = 0; i < 10000; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(bubbleSort(_arr)).toStrictEqual(selectSort(_arr_copy));
	}
});

// success!
test('insert array', () => {
	for (let i = 0; i < 10; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(insertSort(_arr)).toStrictEqual(selectSort(_arr_copy));
	}
});

// success!
test('merge sort', () => {
	for (let i = 0; i < 10000; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(mergeSort(_arr)).toStrictEqual(selectSort(_arr_copy));
	}
});

// success!
test('merge sort for better version', () => {
	for (let i = 0; i < 1000; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(mergeSortBe(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
	}
});

// success!
test('quick sort', () => {
	for (let i = 0; i < 10000; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(quickSort(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
	}
});

// success!
test('heap sort', () => {
	for (let i = 0; i < 1000; i++) {
		let _arr = getRandArr();
		let _arr_copy = clone(_arr);
		expect(heapSort(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
	}
});

// success!
test('count sort', () => {
	for (let i = 0; i < 1000; i++) {
		let _arr = getRandArr(1000, 100); // 制造数据状况，数据永远处于 0 - 100
		let _arr_copy = clone(_arr);
		expect(countSort(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
	}
});

// success!
test('radix sort', () => {
	for (let i = 0; i < 1000; i++) {
		let _arr = getRandArr(); // 制造数据状况，数据永远处于 0 - 100
		let _arr_copy = clone(_arr);
		expect(radixSort(_arr)).toStrictEqual(_arr_copy.sort(sortFn));
	}
});
