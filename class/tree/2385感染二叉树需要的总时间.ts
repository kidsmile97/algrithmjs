/* eslint-disable max-len */
/**
2385. 感染二叉树需要的总时间

给你一棵二叉树的根节点 root ，二叉树中节点的值 互不相同 。另给你一个整数 start 。在第 0 分钟，感染 将会从值为 start 的节点开始爆发。

每分钟，如果节点满足以下全部条件，就会被感染：

节点此前还没有感染。
节点与一个已感染节点相邻。

返回感染整棵树需要的分钟数。

入参限定：
树中节点的数目在范围 [1, 105] 内
1 <= Node.val <= 105
每个节点的值 互不相同
树中必定存在值为 start 的节点
tip：二叉树为链表二叉树

## 按题直接实现逻辑的暴力解法

1. 准备两个栈，一个存储当前分钟感染的节点，一个存储下一分钟会被感染的节点
2. 一个 set 记录已感染节点，等于二叉树节点 size 即完成所有感染
3. 出栈遍历当前分钟感染的节点，入栈下一分钟会被感染的节点
- 会感染子节点
- 会感染父节点
4. 交换两个栈，进行下一轮感染

耗时难点：
1. 遍历树找到起始感染点

 */

import { TreeNode } from './tree';

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function amountOfTime(root: TreeNode | null, start: number): number {
	let curNodes: TreeNode[] = [];
	let nextNodes: TreeNode[] = [];
	const set = new Set();
	const pNodeMap = new Map<TreeNode, TreeNode>();
	set.add(start);
	let minutes = 0;
	// 因为需要根节点，采用后序遍历查找，定位初始感染点意见第一次待感染的节点列表
	let curNode = root;
	const stack = [];
	let fNode = null;
	while (curNode || stack.length) {
		while (curNode) {
			stack.push(curNode);
			let temp = curNode;
			curNode = curNode.left;
			if (curNode) {
				pNodeMap.set(curNode, temp);
			}
		}
		if (stack.length) {
			curNode = stack.pop() as TreeNode;
			if (curNode.right == null || curNode.right == fNode) {
				if (curNode.val === start) {
					if (curNode.left) {
						curNodes.push(curNode.left);
					}
					if (curNode.right) {
						curNodes.push(curNode.right);
					}
					if (pNodeMap.has(curNode)) {
						curNodes.push(pNodeMap.get(curNode) as TreeNode);
					}
				}
				fNode = curNode;
				curNode = null;
			} else {
				stack.push(curNode);
				let temp = curNode;
				curNode = curNode.right;
				if (curNode) {
					pNodeMap.set(curNode, temp);
				}
			}
		}
	}
	// 逐次感染
	while (curNodes.length) {
		minutes += 1;
		for (const item of curNodes) {
			set.add(item.val);
			if (item.left && !set.has(item.left.val)) {
				nextNodes.push(item.left);
			}
			if (item.right && !set.has(item.right.val)) {
				nextNodes.push(item.right);
			}
			if (pNodeMap.has(item) && !set.has(pNodeMap.get(item)!.val)) {
				nextNodes.push(pNodeMap.get(item)!);
			}
		}
		curNodes = nextNodes;
		nextNodes = [];
	}
	return minutes;
}

export default amountOfTime;
