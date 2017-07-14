/**
 * closures
 * 闭包就是变量（包括值类型和引用类型）在函数作用域链的留存问题
 * https://stackoverflow.com/questions/111102/how-do-javascript-closures-work?page=1
 */

// Example 1
function sayHello(name) {
	var text = 'Hello ' + name;
	var say = function() { console.log(text); }
	say();
}
sayHello('Joe'); // hello Joe

// Example 2
function sayHello2(name) {
	var text = 'Hello ' + name;
	var say = function() { console.log(text); }
	return say;
}
var say2 = sayHello2('Kevin');
say2(); // Hello Kevin

// Example 3
function say667() {
  // Local variable that ends up within closure
  var num = 42;
  var say = function() { console.log(num); }
  num++;
  return say;
}
var sayNumber = say667();
sayNumber(); // logs 43

console.log('Example 4-------------------------------')

// Example 4
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
  // Local variable that ends up within closure
  var num = 42;

  var obj = {
  	num: 42
  }

  // Store some references to functions as global variables
  gLogNumber = function() { console.log(num + '------' + obj.num); }
  gIncreaseNumber = function() { num++; obj.num++ }
  gSetNumber = function(x) { num = x; obj.num = x; }
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43-------43
gSetNumber(5);
gLogNumber(); // 5-------5

// 可见，闭包作用域内保留了完整的所需变量，包括引用类型的对象
var oldLog = gLogNumber;

// gLogNumber gIncreaseNumber gSetNumber 指向了新的函数，产生了新的闭包
setupSomeGlobals();
gLogNumber(); // 42------42
oldLog(); // 5-------5

// Example 5
function buildList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    var item = 'item' + i;
    result.push( function() {console.log(item + ' ' + list[i])} );
  }

  // result 里面的所有函数共享变量 i ，形成闭包
  return result;
}

function testList() {
  var fnlist = buildList([1,2,3]);
  // Using j only to help prevent confusion -- could use i.
  for (var j = 0; j < fnlist.length; j++) {
    fnlist[j]();
  }
}

testList() //logs "item2 undefined" 3 times

// Example 6
function sayAlice() {
	var say = function() { console.log(alice); }
	// Local variable that ends up within closure
	var alice = 'Hello Alice';
	return say;
}
sayAlice()();// logs "Hello Alice"

// Example 7
console.log('-----------------------------------')
function newClosure(someNum, someRef) {
  // Local variables that end up within closure
  var num = someNum;
  var anArray = [1,2,3];
  var ref = someRef;
  return function(x) {
    num += x;
    anArray.push(num);
    console.log('num: ' + num +
      '; anArray: ' + anArray.toString() +
      '; ref.someVar: ' + ref.someVar + ';');
  }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;