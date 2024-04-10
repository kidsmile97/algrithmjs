class Comparator<T = number> {
	/** 比较方法实现 */
	compare(a: T, b: T) {
		return (a as number) - (b as number);
	}

	/** 设置比较方法 */
	comparing(compare: (a: T, b: T) => number) {
		this.compare = compare;
		return this;
	}

	constructor(compare?: (a: T, b: T) => number) {
		if (typeof compare === 'function') {
			this.compare = compare;
		}
	}
}

export default Comparator;
