/**

双向链表

带头节点的双向链表

 */

class DuLinkedList {
	constructor() {
		this.prev = null;
		this.value = null;
		this.next = null;
	}

	put(value) {
		let node = this;
		while (node.next !== null) {
			node = node.next;
		}
		node.next = {
			prev: node,
			value: value,
			next: null,
		};
	}

	head_put(value) {
		this.next = {
			prev: this,
			value,
			next: this.next,
		};
	}

	reverse() {
		if (this.next == null) return this;
		let node = this;
		let curNode = this;
		while (node !== null) {
			curNode = node;
			const temp = node.prev;
			node.prev = node.next;
			node.next = temp;
			node = node.prev;
		}
		const start = this.prev;
		this.prev = null;
		this.next = curNode;
		start.next = null;
		return this;
	}
}

const reverse = (head) => {
	if (head.next == null || head.next.next == null) return head;
	let beg = head;
	let mid = head.next;
	let end = head.next;
	while (mid !== null) {
		let temp = mid.next;
		mid.next = beg;
		beg.prev = mid;
		beg = mid;
		mid = temp;
	}
	end.next = null;
	beg.prev = head;
	head.next = beg;
	head.prev = null;
	return head;
};

module.exports = {
	reverse,
	DuLinkedList,
};
