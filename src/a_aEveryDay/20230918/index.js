
// 带头节点的链表原地反转
const reverse = (head) => {
  if (head.next === null || head.next.next === null) {
    return head;
  }

  let lastNode = head.next;

  while(lastNode.next !== null) {
    const secondNode = head.next;
    const firstNode = lastNode.next;
    head.next = firstNode;
    lastNode.next = firstNode.next;
    firstNode.next = secondNode;
  }
  
  return head;
}

module.exports = {
  reverse,
}
