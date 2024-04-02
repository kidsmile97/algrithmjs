/**
LCR 027回文链表

判断一个链表节点结构是否构成回文链表

实际是考察链表的操作

example   1 20 3 40 3 20 1
example   3 20 3 3 20 3

 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

// 笔试，直接速度优先考虑，用最简单的方式实现解决问题
const isPalindromic = (linkedList: ListNode) => {
	let node: ListNode | null = linkedList;
	const stack = [];
	while (node !== null) {
		stack.push(node.val);
		node = node.next;
	}
	node = linkedList;
	while (node !== null) {
		if (node.val !== stack.pop()) {
			return false;
		}
		node = node.next;
	}
	return true;
};

/** 
优化内存占用

要求时间 O(n)，空间 O(1)

分析：

首先题目给出的链表定义时单向链表，即无法从链表结构得到优化帮助，只能从头遍历到尾

所以只能从回文串的特点入手，特点只有一个，正序倒序是一样的串

特点有什么性质呢？
1. s[i] = s[s.len - 1 - i]

快慢指针法
本质其实是反转链表，而且是反转半个链表，顺便把一个链表拆成了两个链表，使用头插法
abcdcba
=> 
cba d cba
=>
开始比较

！！！注意奇偶个数的链表长度边界处理

 */
function _isPalindrome(head: ListNode | null): boolean {
	if (head !== null) {
		// 慢指针
		let curNode: ListNode | null = head;
		// 快指针
		let twoStep: ListNode | null = head;
		// 反转链表的头指针
		let newHead: ListNode | null = null;
		while (twoStep!.next && twoStep!.next.next) {
			// 快指针狂飙，主要用于判断慢指针是否已经到了链表中间点
			twoStep = twoStep!.next.next;
			// 慢指针反转
			const temp = curNode;
			newHead = curNode.next as ListNode;
			curNode = newHead.next as ListNode;
			newHead.next = temp;
		}
		if (newHead == null && curNode.next && curNode.val !== curNode.next.val) return false;
		// 反转链表和原链表后半部分继续比较
		while (newHead && curNode) {
			if (curNode.val !== newHead.val) {
				return false;
			} else {
				curNode = curNode.next;
				newHead = newHead.next;
			}
		}
	}
	return true;
}

const reverseList = (head: ListNode | null) => {
	let prev = null;
	let curr = head;
	while (curr !== null) {
		let nextTemp = curr.next;
		curr.next = prev;
		prev = curr;
		curr = nextTemp;
	}
	return prev;
};

const endOfFirstHalf = (head: ListNode) => {
	let fast = head;
	let slow = head;
	while (fast.next !== null && fast.next.next !== null) {
		fast = fast.next.next;
		slow = slow.next as ListNode;
	}
	return slow;
};

const isPalindrome = function (head: ListNode | null) {
	if (head == null) return true;

	// 找到前半部分链表的尾节点并反转后半部分链表
	const firstHalfEnd = endOfFirstHalf(head);
	const secondHalfStart = reverseList(firstHalfEnd.next);

	// 判断是否回文
	let p1 = head;
	let p2 = secondHalfStart;
	let result = true;
	while (result && p2 != null) {
		if (p1.val != p2.val) result = false;
		p1 = p1.next as ListNode;
		p2 = p2.next;
	}

	// 还原链表并返回结果
	firstHalfEnd.next = reverseList(secondHalfStart);
	return result;
};

export default isPalindrome;
