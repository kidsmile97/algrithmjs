/**
145. 二叉树的后序遍历

给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。
 */

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

interface TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
}

/**
后序遍历 - 递归实现分析
 */
const res: number[] = [];
function recurTraversal(root: TreeNode | null) {
	if (root !== null) {
		recurTraversal(root.left);
		recurTraversal(root.right);
		res.push(root.val);
	}
}

export function postOrderTraversal(root: TreeNode | null): number[] {
	const result: number[] = [];
	const stack: TreeNode[] = [];
	let curNode = root;
	let preNode = null;
	while (curNode || stack.length) {
		while (curNode) {
			stack.push(curNode);
			curNode = curNode.left;
		}
		if (stack.length) {
			curNode = stack.pop() as TreeNode;
			if (curNode.right == null || curNode.right == preNode) {
				result.push(curNode.val);
				preNode = curNode;
				curNode = null;
			} else {
				stack.push(curNode);
				curNode = curNode.right;
			}
		}
	}
	return result;
}
