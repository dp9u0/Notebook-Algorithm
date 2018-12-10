# 递推法与递归式

数学上,递推法定义了一个序列的方程 : 序列的每一项目是定义为前一项的函数,通过前一项计算后一项称为正推,通过后一项计算前一项称为逆推.而递归式则是计算机领域的一种算法技术,通过定义一个递归式函数,这个函数内部可以通过调用自己.

实际上,递归式是用来解决递推问题的一种计算机算法技术.递推问题既可以通过[迭代](./iterative.md)(非递归方式)一项项的计算目标值,也可以通过定义递归式,的形式计算.

## 斐波那契数

```javascript
F[0] = 0
F[1] = 1
F[n] = F[n-1] + F[n-2]
```

### 正推迭代

```javascript
/**
 * 迭代式计算斐波那契数列
 * @param {number} n
 */
function Fibonacci(n) {
  let f = [];
  f[0] = 0;
  f[1] = 1;
  if (n === 0 || n === 1) {
    return f[n];
  }
  let index = 2;
  do {
    f[index] = f[index - 1] + f[index - 2];
  } while (n !== index++)

  return f[n];
}
```

### 递归

```javascript
/**
 * 递归式计算斐波那契数列
 * @param {number} n
 */
function Fibonacci_Recursion(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return Fibonacci_Recursion(n - 1) + Fibonacci_Recursion(n - 2);
}
```

与迭代式计算斐波那契数列相比,很明显递归式效率很低 : 这是由于 计算 `Fibonacci_Recursion(n - 1) + Fibonacci_Recursion(n - 2)` 时, `Fibonacci_Recursion(n - 1)` 会重新计算一次 `Fibonacci_Recursion(n - 2)`

### 尾调用与尾递归

尾调用,是指一个函数里的最后一个动作是返回一个函数的调用结果的情形.如下面

```javascript
function bar(data) {
    if (a(data)) {
        return b(data);
    }
    return c(data);
}
```

尾调用中有一种重要而特殊的情形叫做尾递归,尾调用原则上都可以通过简化函数调用栈的结构而获得性能优化(称为*尾调用消除*),但是优化尾调用是否方便可行取决于运行环境对此类优化的支持程度如何

例如斐波那契数列计算使用尾递归形式:

```javascript
/**
 * 递归式(尾递归)计算斐波那契数列
 * @param {number} n
 */
function Fibonacci_Tail_Recursion(n, fib_pre_1 = 0, fib_pre_2 = 1) {
  if (n === 0) {
    return fib_pre_1;
  }
  return Fibonacci_Tail_Recursion(n - 1, fib_pre_2, fib_pre_1 + fib_pre_2);
}
```

为了说明基于尾递归对函数调用栈的优化,对比下面两种递归 :

```javascript
/**
 * 递归求和
 * @param {number} x
 */
function recsum(x) {
  if (x === 1) {
    return x;
  }
  return x + recsum(x - 1);
}

/**
recsum(5)
5 + recsum(4)
5 + (4 + recsum(3))
5 + (4 + (3 + recsum(2)))
5 + (4 + (3 + (2 + recsum(1))))
5 + (4 + (3 + (2 + 1)))
5 + (4 + (3 + 3))
5 + (4 + 6)
5 + 10
15
*/

```

可观察,栈从左到右,增加到一个峰值后再计算从右到左缩小,同时,代码在执行过程中,系统需要维护所有栈帧信息,在函数调用时保存寄存器和函数返回时恢复寄存器,这些会占用明显的开销

```javascript
/**
 * 递归求和(尾递归)
 * @param {number} x
 */
function tailrecsum(x, sum = 0) {
  if (x === 0) {
    return sum;
  }
  return recsum(x - 1, sum + x);
}

/**
tailrecsum(5, 0)
tailrecsum(4, 5)
tailrecsum(3, 9)
tailrecsum(2, 12)
tailrecsum(1, 14)
tailrecsum(0, 15)
15
*/
```

而使用尾递归形式.根据运行环境的实现,可以复用之前调用的栈帧和寄存器状态,避免过程调用的开销.