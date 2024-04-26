/**
1146. 快照数组
实现支持下列接口的「快照数组」- SnapshotArray：

SnapshotArray(int length) - 初始化一个与指定长度相等的 类数组 的数据结构。初始时，每个元素都等于 0。
void set(index, val) - 会将指定索引 index 处的元素设置为 val。
int snap() - 获取该数组的快照，并返回快照的编号 snap_id（快照号是调用 snap() 的总次数减去 1）。
int get(index, snap_id) - 根据指定的 snap_id 选择快照，并返回该快照指定索引 index 的值。

示例：

输入：["SnapshotArray","set","snap","set","get"]
     [[3],[0,5],[],[0,6],[0,0]]
输出：[null,null,0,null,5]
解释：
SnapshotArray snapshotArr = new SnapshotArray(3); // 初始化一个长度为 3 的快照数组
snapshotArr.set(0,5);  // 令 array[0] = 5
snapshotArr.snap();  // 获取快照，返回 snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // 获取 snap_id = 0 的快照中 array[0] 的值，返回 5

## 首次答案

每个位置数据都使用一个 hashmap 记录数据的变更链，键值为 (snap_id, val) 

set O(1)
get O(n) 最差情况，n 是 snap 次数

空间 O(1) 空间没有任何冗余

## 解析答案

get 使用二分法

 */

class _SnapshotArray {
	snapId: number;
	snapMap: Map<number, number>[];
	length: number;

	constructor(length: number) {
		this.length = length;
		this.snapId = 0;
		this.snapMap = [];
		for (let i = 0; i < length; i++) {
			const map = new Map();
			map.set(0, 0);
			this.snapMap.push(map);
		}
	}

	set(index: number, val: number): void {
		this.snapMap[index].set(this.snapId, val);
	}

	snap(): number {
		return this.snapId++;
	}

	get(index: number, snap_id: number): number {
		const target = this.snapMap[index];
		let id = snap_id;
		while (!target.has(id)) {
			id--;
		}
		return target.get(id) as number;
	}
}

class SnapshotArray {
	length: number;
	snapId: number;
	data: Array<[number, number][]>;

	constructor(length: number) {
		this.length = length;
		this.snapId = 0;
		this.data = [];
		for (let i = 0; i < length; i++) {
			this.data.push([]);
		}
	}

	set(index: number, val: number): void {
		const target = this.data[index];
		const last = target[target.length - 1];
		if (last && last[0] == this.snapId) {
			last[1] = val;
		} else {
			target.push([this.snapId, val]);
		}
	}

	snap(): number {
		return this.snapId++;
	}

	get(index: number, snap_id: number): number {
		const data = this.data[index];
		// 二分查找，找  ==snap_id || <snap_id 最大那个
		let left = 0;
		let right = data.length - 1;
		while (left <= right) {
			const mid = (left + right) >> 1;
			const [id, val] = data[mid];
			if (id < snap_id) {
				left = mid + 1;
			} else if (id > snap_id) {
				right = mid - 1;
			} else {
				return val;
			}
		}
		return right < 0 ? 0 : data[right][1];
	}
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */

export default SnapshotArray;
