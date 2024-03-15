/**

单向链表
Node {
  value,
  next,
}
1. 有固定的头尾空节点
2. 无头尾空节点
以下实现均基于带头链表（固定头节点）
 */

class LinkedList {
  constructor() {
    this.value = null;
    this.next = null;
  }

  put(value) {
    let node = this;
    while(node.next !== null) {
      node = node.next;
    }
    node.next = {
      value: value,
      next: null,
    }
  }

  head_put(value) {
    let next = this.next;
    this.next = {
      value,
      next,
    }
  }

  reverse() {
    if(this.next == null) return this;
    let st = this;
    let md = this.next;
    while(md !== null) {
      const temp = md.next;
      md.next = st;
      st = md;
      md = temp;
    }
    const ed = this.next;
    this.next = st;
    ed.next = null;
    return this;
  }
}

// 查询
const find_node = (linkedList, value) => {
  let temp = linkedList;
  while(temp.next) {
    if (temp.value === value) {
      return temp;
    }
  }
  return null;
}

// 尾插入
const tail_put = (linkedList, value) => {
  let temp = linkedList;
  while(temp.next) {
    temp = temp.next;
  }
  temp.next = {
    value,
    next: null,
  }
  return linkedList;
}

// 头插入
const head_put = (linkedList, value) => {
  let temp = linkedList.next;
  linkedList.next = {
    value,
    next: temp,
  }
  return linkedList;
}

// 节点插入
const put = (node, value) => {
  let temp = node.next;
  node.next = {
    value,
    next: temp,
  }
}

// 删除
const del_by_value = (linkedList, value) => {
  let prev = linkedList;
  let cur = linkedList.next;
  while (cur.next) {
    if (cur.value === value) {
      prev.next = cur.next;
      break;
    }
    prev = cur;
    cur = cur.next;
  }
  return linkedList;
}

// 单向链表反转，新建一个链表
const reverse = (linkedList) => {
  if (linkedList.next == null || linkedList.next.next == null) return linkedList;
  let prevNode = linkedList;
  let curNode = prevNode.next;
  let endNode = linkedList.next;
  while (curNode !== null) {
    const temp = curNode.next;
    curNode.next = prevNode;
    prevNode = curNode;
    curNode = temp;
  }
  linkedList.next = prevNode;
  endNode.next = null;
  return linkedList;
}

const arrayify = (linkedList) => {
  let res = [];
  let temp = linkedList;
  while(temp.next) {
    temp = temp.next;
    res.push(temp.value);
  }
  return res;
}

const stringify = (linkedList) => {
  return arrayify(linkedList).join(',')
}

module.exports = {
  arrayify,
  stringify,
  reverse,
  LinkedList,
}

