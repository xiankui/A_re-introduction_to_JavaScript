/**
 * 自定义对象
 * JavaScript 中函数代替了其它语言如Java中类的概念
 * 构造函数与其对象之间共享原型链
 * 对象之间通过原型链形成共享机制
 * 原型链的底端是 Object.prototype
 */

/**
 * 函数可以生产出对象；就像 Java 中类可以生产出对象
 * 单例，不会再有别的对象与其共享方法
 */
function makePerson(first, last) {
	return {
    first: first,
    last: last,
    fullName: function() {
    	// this 指代当前的对象，也就是调用了函数的对象。
      return this.first + ' ' + this.last;
    },
    fullNameReversed: function() {
      return this.last + ', ' + this.first;
    }
	}
}
var s = makePerson("Simon", "Willison");
s.fullName(); // Simon Willison
s.fullNameReversed(); // Willison, Simon


/**
 * 构造函数与原型共享
 */
function Person(first, last) {
  this.first = first;
  this.last = last;
}
Person.prototype.fullName = function() {
  return this.first + ' ' + this.last;
}
Person.prototype.fullNameReversed = function() {
  return this.last + ', ' + this.first;
}

// new 返回的一定是一个对象，该对象就是构造函数中 this 指向的对象
var p = new Person('Simon', 'Willison');
var pp = new Person('Kevin', 'Zhu');

// Person.prototype 是一个可以被Person的所有实例共享的对象。
p.__proto__ === pp.__proto__;
p.__proto__ === Person.prototype;


/**
 * 其实，本质上原型链是对象之间的事
 */
var personShare = {
	fullName: function () {
		return this.first + ' ' + this.last;
	},
	fullNameReversed: function () {
		return this.last + ', ' + this.first;
	}
}

var person = {
	first: 'Kevin',
	last: 'Zhu'
}

Object.setPrototypeOf(person, personShare);

person.fullName(); // Kevin Zhu

console.log('Object prototype chain from Object.setPrototypeOf', person.fullName())