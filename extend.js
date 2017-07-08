/**
 * 一个返回函数的函数，apply只是实现函数式编程的一种方法而已
 *
  splat()函数接受一个函数fun作为参数，并返回另一个函数
  返回的函数接受一个数组并用apply来执行函数fun
  这样，传入函数splat()的数组的元素是函数fun的参数
 */
function splat (fun) {
  return function (array) {
    return fun.apply(null, array)
  }
}
var addArrayElement = splat(function (x, y) { return x + y })
console.log(addArrayElement([1, 2])) // 3

/**
 * unsplat()接受一个函数fun并返回另一个接受任意多个参数的函数，将参数转为数组传入函数fun并调用它
 */
function unsplat (fun) {
  return function () {
    return fun.call(null, _.toArray(arguments))
  }
}
var joinElements = unsplat(function (array) { return array.join(' ') })
console.log(joinElements(1, 2)) // "1 2"
/*
 * 抽象方法
 */
function fail (thing) {
  throw new Error(thing)
}
function warn (thing) {
  console.log(['WARNING:', thing].join(' '))
}
function note (thing) {
  console.log(['NOTE:', thing].join(' '))
}
/**
 * isIndexed()提供了判断某个数据是否是字符串或数组的函数抽象
 */
function isIndexed (data) {
  return _.isArray(data) || _.isString(data)
}
/**
 * nth()返回一个存储在允许索引访问的数据类型中的有效元素
 */
function nativeNth (a, index) {
  if (!_.isNumber(index)) fail('Expected a number as the index')
  if (!isIndexed(a)) fail('Not supported on non-indexed type')
  if ((index < 0) || (index > a.length - 1)) { fail('Index value is out of bounds') }
  return a[index]
}
// console.log(nativeNth('letters', 1)) // e
// console.log(nativeNth({}, 2)) // Error: Not supported on non-indexed type
// console.log(nativeNth('letters', 2000)) // Error: Index value is out of bounds

console.log([2, 3, -1, -6, 0, -108, 42, 10].sort())
// (8) [-1, -108, -6, 0, 10, 2, 3, 42]
/**
  当有不同数据混合出现时，sort出现问题；
  由于在没有给定参数的情况下，Array#sort方法执行字符串的比较
  Array#sort需要一个比较器
 */
function compareLessThanOrEqual (x, y) {
  if (x < y) return -1
  if (x > y) return 1
  return 0
}
console.log([2, 3, -1, -6, 0, -108, 42, 10].sort(compareLessThanOrEqual))
// (8) [-108, -6, -1, 0, 2, 3, 10, 42]
