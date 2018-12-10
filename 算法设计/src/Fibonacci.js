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

console.log(Fibonacci(9));
console.log(Fibonacci_Recursion(9));
console.log(Fibonacci_Tail_Recursion(9));