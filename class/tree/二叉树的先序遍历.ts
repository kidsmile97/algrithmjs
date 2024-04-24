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
先递归实现，观察出栈入栈再转变为循环实现
 * */
export function recurTraversal(root: TreeNode | null, res: number[]): number[] {
	if (root) {
		res.push(root.val);
		recurTraversal(root.left, res);
		recurTraversal(root.right, res);
	}
	return res;
}

function preOrderTraversal(root: TreeNode): number[] {
	const res: number[] = [];
	const stack = [];
	let curNode: TreeNode = root;
	while (curNode || stack.length) {
		while (curNode) {
			res.push(curNode.val);
			stack.push(curNode);
			curNode = curNode.left as any;
		}
		if (stack.length) {
			curNode = stack.pop() as TreeNode;
			curNode = curNode.right as any;
		}
	}
	return res;
}

export default preOrderTraversal;
