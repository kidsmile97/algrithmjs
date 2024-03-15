
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// 带头节点的链表
class LinkedList {
  constructor() {
    this.head = new Node('head')
  }

  // 根据 value 查找节点
  findByValue(value) {
    let node = this.head.next;
    while(node.element !== null && node.element !== value) {
      node = node.next;
    }
    return node;
  }

  // 根据index查找节点，下标从0开始
  findByIndex(index) {
    let curIndex = 0;
    let curNode = this.head.next;
    while(curIndex !== index && curNode !== null) {
      curNode = curNode.next;
      curIndex++;
    }
    return curNode;
  }

  // 向链表末尾追加节点
  append(value) {
    let curNode = this.head;
    while(curNode.next !== null) {
      curNode = curNode.next;
    }
    curNode.next = new Node(value)
  }

  // 指定元素向后插入
  appendNode(index, value) {
    const node = this.findByIndex(index);
    const temp = node.next;
    node.next = new Node(value);
    node.next.next = temp;
  }

  // 查找前一个

  // 根据值删除

  // 遍历显示所有节点
}
