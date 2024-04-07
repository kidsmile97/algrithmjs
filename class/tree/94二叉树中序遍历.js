/**
94. 二叉树的中序遍历

分析：
1. 中序遍历，即`左根右`的遍历顺序
 
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

/**
 * 先使用最简单的递归完成
 * @param {*} root
 * @returns
 */
function _inorderTraversal(root) {
	let result = [];
	if (root && root.val !== null) {
		result = result.concat(_inorderTraversal(root.left));
		result.push(root.val);
		result = result.concat(_inorderTraversal(root.right));
	}
	return result;
}

/**
 * 非递归模式，自定义栈实现
 * 递归转循环，递归之所以理解简单是因为递归的过程父子节点关系被函数保留了下来，不需要额外写代码处理这个关系
 * @param {*} root
 * @returns
 */
function __inorderTraversal(root) {
	let result = [];
	const stack = [];
	let curNode = root;
	while (curNode || stack.length) {
		while (curNode) {
			stack.push(curNode);
			curNode = curNode.left;
		}
		curNode = stack.pop();
		result.push(curNode.val);
		curNode = curNode.right;
	}
	return result;
}
