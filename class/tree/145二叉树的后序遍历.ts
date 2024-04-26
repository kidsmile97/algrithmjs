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
				/**
				 * 由于后序遍历是 左右根 的顺序，所以直接记录当前处理节点
				 * 然后下一次出栈的就是该节点的父节点，然后就会出现在父节点的判断上面
				 * 如果该节点是父节点的右子树，则说明父节点左右子树都遍历完毕了
				 */
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
