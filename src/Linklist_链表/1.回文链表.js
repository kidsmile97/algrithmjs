// 判断一个链表节点结构是否构成回文链表

/**
 * example   1 20 3 40 3 20 1
 * example   3 20 3 3 20 3
 */

// 笔试，直接速度优先考虑，用最简单的方式实现解决问题
const isPalindromic = (linkedList) => {
  let node = linkedList.next;
  const stack = [];
  while(node !== null) {
    stack.push(node.value);
    node = node.next;
  }
  node = linkedList.next;
  for (let i = stack.length - 1; i >= 0; i--) {
    if (node.value !== stack[i]) {
      return false;
    }
  }
  return true;
}

// 优化内存占用
const isPalindromic2 = (head) => {
  if (head.next == null || head.next.next == null) return true;
  let node = head.next;
  let rightNode = head.next.next;
  if ()
}


// 面试，速度优先考虑，同时考虑内存资源占用的问题
