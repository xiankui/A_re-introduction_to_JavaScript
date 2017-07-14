# [A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

## 概览

JavaScript语言的类型

* Number
* String
* Boolean
* Symbol (符号，ES6新增)
* Object (**引用类型**)
  - Function
  - Array
  - Date
  - RegExp
* Null
* Undefined

## 数字

JavaScript 采用“IEEE 754 标准定义的双精度64位格式”（"double-precision 64-bit format IEEE 754 values"）表示数字。据此我们能得到一个有趣的结论，和其他编程语言（如 C 和 Java）不同，JavaScript 不区分整数值和浮点数值，所有数字在 JavaScript 中均用浮点数值表示，所以在进行数字运算的时候要特别注意。

	
	0.1 + 0.2 = 0.30000000000000004
	

JavaScript支持标准的算术运算符，还包含内置对象Math

	
	Math.max(2, 3, 5); // 5
	

数字字符串转换成数字的方法

* parseInt("42.2a", 10); // 42
* parseFloat("42.2a");  // 42.2 只支持10进制
* + "42.2a"; // NaN 等同于Number("42.2a")
* + "42.2a"; // 42.2

常用的内置函数

* isNaN(NaN);  // true
* isFinite("42.2"); // true
* Number.isFinite("42.2"); // false

*备注：isFinite !== Number.isFinite; isFinite会将字符串进行强制转换（Number()）*

## 字符串

JavaScript 中的字符串是一串Unicode 字符序列。更准确地说，它们是一串UTF-16编码单元的序列，每一个编码单元由一个 16 位二进制数表示。

字符串是值类型，但是却能够调用原型的方法

	"hello".length; // 5
	"hello".charAt(0); // "h" 
	"hello, world".replace("hello", "goodbye"); // "goodbye, world"
	"hello".toUpperCase(); // "HELLO"

## 其它类型

* null 表示一个空值 (non-value)
* undefined 表示一个声明但未初始化的值
* 根据具体需要，JavaScript 将以下变量转换成布尔类型false：
  - false
  - 0
  - ""
  - NaN
  - null
  - undefined
* 所有其他值被转换为 true

## 变量

	var a; // undefined
	var name = "kevin";
	// ES6 增加了块作用域的变量 let 和 const

## 运算符

JavaScript的算术操作符包括 +、-、*、/ 和 % ——求余（与模运算不同）

`+` 操作符还可以用来连接字符串：

	"3" + 4 + 5; // 345
	3 + 4 + "5"; // 75

`==` 比较运算符的隐式类型转换问题

	1 == true; // true 转换为布尔类型(Boolean())再进行比较
	123 == "123.0"; // true 转换为数字类型(Number())再进行比较

`===` 则不存在类型转换问题
	
	1 === true; // false

## 控制结构

* if else
* while do-while
* for
* switch(action) { case "": break;}
* && 运算符假值短路，可以事先检测该对象是否为空
* || 运算符真值短路，可以用来设置默认值
* 常用于赋值的三元操作符

运算符
	
	// && 运算符假值短路，真值则继续运行后面的代码
	var name = o && o.getName(); 

	// || 运算符真值短路，假值则继续运行后面的代码
	var name = othername || "default";

	// 三元操作符
	var allowed = (age > 18) ? "yes" : "no";

基于一个数字或字符串的switch 语句
	
	// 在 switch 的表达式和 case 的表达式是使用 === 严格相等运算符进行比较的
	// 她们都可以使用算术表达式
	var action = 1;
	switch(action + 1) {
		case 1:
		case 1 + 1: // case 2:
		case 1 + 2:
			console.log('action is number 0 or 1 or 2');
			break;
		case "1":
			console.log('action is string 1');
			break;
		default:
			console.log('hi, this is default case');
	}
	

## 对象

JavaScript 中的对象可以简单理解成“名称-值”对，不难联想 JavaScript 中的对象与下面这些概念类似：

* Python 中的字典
* Perl中的散列
* C/C++ 中的散列表
* Java 中的 HashMap
* PHP 中的关联数组

用对象字面量 (object literal) 创建对象

	var obj = {
		name: 'kevin',
		for: '从 EcmaScript 5 开始，预留关键字可以作为对象的属性名'
	}

	obj.for; // yes, it's right

## 数组

JavaScript 中的数组是一种特殊的对象。它以数字为属性名，包含一些内置方法。

	// 使用数组字面量（array literal）创建数组：
	var arr = ['dog', 'cat', 'hen'];
	arr.lengh; // 3 长度比最大索引大1

	// ECMAScript 5 增加了遍历数组的另一个方法 forEach()：
	arr.forEach(function(currentValue, index, array){
		// each currentValue goes here
	})

	// ECMAScript 6 又增加了遍历数组的方法 for ...of:
	for(let item of arr) {
		// arr item goes here
		console.log(item)
	}

	// 一些安全的方法（不会改变数组自身）
	var arr_slice = arr.slice();
	var arr_concat = arr.concat()
	

## 函数

函数定义与函数表达式

	// 函数定义（解析时，函数定义会提升）
	function add(x, y) {
		return x + y;
	}

	// 函数表达式（解析时，只会提升变量声明）
	var multi = function(x, y) {
		// 匿名函数
		return x * y;
	}

内置的函数参数引用

	var avg = function () {
		console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
		console.log(arguments); // [3, 5, 7, length:3, callee:fn, ...]
		var sum = 0, len = arguments.length;
		for (var i = 0; i<len; i++) {
			sum += arguments[i];
		}

		return sum / len;
	}

	// 函数的四种调用方法之apply调用
	avg.apply(null, [3, 5, 7]); // 5

模块与函数作用域

	var charsInBody = (function counter(elm) {
	    if (elm.nodeType == 3) { // 文本节点
	        return elm.nodeValue.length;
	    }
	    var count = 0;
	    for (var i = 0, child; child = elm.childNodes[i]; i++) {
	        count += counter(child);
	    }
	    return count;
	})(document.body);

## 自定义对象

* JavaScript 中函数代替了其它语言如Java中类的概念
* 对象之间通过原型链形成共享机制，原型链的底端是 Object.prototype
* 参考 custom-object.js

## 内部函数

* 减少全局污染的良好实践
* 内部函数可以访问父函数作用域的变量

示例

	function betterExampleNeeded() {
	    var a = 1;
	    function oneMoreThanA() {
	        return a + 1;
	    }
	    return oneMoreThanA();
	}

## 闭包

一个闭包就是一个函数和被创建的函数中的作用域对象的组合。[how-do-javascript-closures-work](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work)

* 每当 JavaScript 执行一个函数时，都会创建一个作用域对象（scope object），用来保存在这个函数中创建的局部变量。
* 当函数中嵌套着另一个函数，闭包（作用域链）就产生了。
* 内部函数被返回时，保留了引用到的父函数的变量的副本。

示例

	function makeAdder(a) {
	    return function(b) {
	        return a + b;
	    }
	}
	var x = makeAdder(5);
	var y = makeAdder(20);
	x(6); // 11
	y(7); // 27


## 内存泄露

JavaScript 是一种具有垃圾回收机制的语言——对象在被创建的时候分配内存，然后当指向这个对象的引用计数为零时，浏览器会回收内存。

应当注意：对象之间形成循环引用时，容易发生内存泄露。