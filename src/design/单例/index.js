/**
 * @description
 * 单例模式在 js 中即指一个唯一对象，对象内属性、方法对自身的改变会影响到到所有用到改对象的地方
 * 通常用于一个通用工具类的实现，通常为了保持工具类表现的一致性或者减少实例对内存的损耗，全局都只使用一个实例
 */

/** -------------------------- 原型链模式 --------------------------------- */
// 由于 js 的语言特性（原型链模式，非类式模式）
function Single() {
  this.name = 'single';
  this.type = 'function';
}
// 添加方法
Single.prototype.hi = function() {
  console.log('hello, I‘m single function')
}

const s1 = new Single();

console.log(s1);

s1.hi();

/** -------------------------- 类式模式（语法糖，非真正的类范式，无静态分派概念） --------------------------------- */
class Singleton {
  constructor() {
    this.name = 'singleton';
    this.type = 'class';
  }
  // 方法
  hi () {
    console.log('hello, I‘m singleton class')
  }
}

const s2 = new Singleton();

console.log(s2);

s2.hi();

/** -------------------------- JavaScript 单例模式 --------------------------------- */
/**
 * 对于 js 而言，函数才是主角，几乎每一个函数其本质都相当于一个单例，函数可以直接利用`闭包特性`从而实现属性和方法的一致
 * 所以这里单例模式在 js 中实现主要是指一个对象的单例，主要使用场景是减少重复对象对计算机资源的占用
 */
// 1. 直接定义全局单例，省略构造函数，缺点是也不能创建另外的实例
const onlyOne = {
  prop: 1,
  method() {
    console.log('this is a method')
  }
}

// 2. 利用闭包，缺点必须使用专用函数获取实例，对于用户来说有点绕（获取实例和类无关）
function getSingleton() {
  let only = null;
  return function() {
    if (only === null) {
      only = new Singleton();
    }
    return only;
  }
}
// 传入类生成单例获取函数
function buildSingleton(classConstruct) {
  let only = null;
  return function() {
    if (only === null) {
      only = new classConstruct();
    }
    return only;
  }
}

// 3. 直接把实例写入类属性，通过类直接获取唯一单例
class Instance {
  static singleton = null
  constructor() {
    this.type = 'single';
    this.name = 'instance';
  }
  static instance() {
    if (Instance.singleton === null) {
      Instance.singleton = new Instance();
    }
    return Instance.singleton;
  }
}

const in1 = Instance.instance();

in1.name = 'onlyone';

console.log(in1.name);

const in2 = Instance.instance();

console.log(in2.name);

console.log(in1);

console.dir(Instance);

console.dir(Object);
