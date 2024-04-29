/**
102. 二叉树的层序遍历

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

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

function levelOrder(root: TreeNode | null): number[][] {
	if (root == null) return [];
	let curLevel: TreeNode[] = [root];
	let nextLevel: TreeNode[] = [];
	let res: number[][] = [];
	while (curLevel.length > 0) {
		// 关于内存优化，可以通过记录 i j 下标当前需要遍历的节点下标，这样可以只使用一个队列，而不用两个
		const levelRes: number[] = [];
		curLevel.forEach((item) => {
			levelRes.push(item.val);
			if (item.left) {
				nextLevel.push(item.left);
			}
			if (item.right) {
				nextLevel.push(item.right);
			}
		});
		curLevel = nextLevel;
		nextLevel = [];
		res.push(levelRes);
	}
	return res;
}

export default levelOrder;
