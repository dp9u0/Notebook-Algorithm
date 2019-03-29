# 字符串算法

字符串是非常常见的数据结构.

## 排序

字符串排序参照[排序](../排序算法/README.md)章节

## 字符串匹配

### Rabin-Karp

Rabin-Karp 算法是通过 比较Hash匹配字符串的算法.

```js
RabinKarp(string s[1..n], string pattern[1..m])
  hpattern = hash(pattern[1..m]);
  for i from 1 to n-m+1
    hs = hash(s[i..i+m-1])
    if hs = hpattern
      if s[i..i+m-1] = pattern[1..m]
        return i
  return not found
```

上面算法中,每次都需要重新计算 hs,可以考虑通过 使用多项式 hash 函数,`hash(s[i..i+m-1])` 减去第一个字符(`s[i]`)的hash值然后加上下一个字符(`s[i+m]`)的hash值得到新的 `hs= hash(s[i+1..i+m])`,这样就能不需要重复计算重叠部分的 hash code了

[Rabin-Karp Source Code](../src/string/rabinKarp.js)

### Knuth-Morris-Pratt

KMP算法利用了部分匹配表的概念,部分匹配表,又称为失配函数,作用是让算法无需多次匹配S中的任何字符.

例如下面的匹配`TEST`中查找`WORD`,当匹配到 `WORD[6]` 时发现不匹配:

```js
T: ABC ABCDAB ABCDABCDABDE
P:            ABCDABD
I:            0123456
```

常规做法是WORD向后偏移一位,直接从头比较:

```js
T: ABC ABCDAB ABCDABCDABDE
P:             ABCDABD
I:             0123456
```

但是考虑到之前已经比较过了重复的 `AB`,并且匹配因此可以直接跳到比较过的重复部分,比较后面的就可以了

```js
T: ABC ABCDAB ABCDABCDABDE
P:                ABCDABD
I:                0123456
```

[Knuth-Morris-Pratt Source Code](../src/string/knuthMorrisPratt.js)

### Boyer-Moore

Boyer-Moore充分使用预处理`P`的信息来尽可能跳过更多的字符.

通常比较都是从首字母开始,逐个比较下去.一旦发现有不同的字符,就需要从头开始进行下一次比较.这就需要将字符串中的所有字符一一比较.

Boyer-Moore算法的关键在于,当P的最后一个字符被比较完成后,我们可以决定跳过一个或更多个字符.

#### 移动规则

移动字符数是通过两条规则决定的:坏字符规则和好后缀规则.实际移动为通过这两条规则计算出的最大移动个数.

* 坏字符规则: 当文本 `T` 中的某个字符跟模式 `P` 的某个字符不匹配时,称文本 `T` 中的这个失配字符为坏字符

  `模式后移位数 = 坏字符在模式中失配的位置 - 坏字符在模式中最后一次出现的位置`

* 好后缀规则: 当文本 `T` 中的某个字符跟模式 `P` 的某个字符不匹配时,称文本 `T` 中的已经匹配的字符串为好后缀.

  ```模式后移位数 = 好后缀在模式中的当前位置(P.lastIndex) - 好后缀在模式中最后一次出现的位置```

  可以按照下面的方式理解:

  假设有`P`和`T`,`T`中字符串`t`匹配到了`P`的一个后缀,但在比较位置`i`时发生不匹配.设匹配到的好后缀在`T`中为`t`,在P中为`t'`(`t = t'`).

  1. 在`P`中`i`位置的左侧最靠近`i`位置查找字符串`t'`使得`t'=t`,若存在,则移动相应的位数将找到的`t'`与`T`中的`t`对齐.(可以预处理为数组 `L`)
  2. 如果`t'`不存在,继续查找`t`的某一个后缀是否为P的前缀,若存在,则移动相应的位将`P`的前缀与`t`的后缀位置对齐.(可预处理为数组 `H`)
  3. 将`P`向后移动`n`个字符.

Boyer-Moore算法每次后移这坏字符规则和好后缀规则之中的较大值.

[Boyer-Moore Source Code](../src/string/boyerMoore.js)

## Distance

### Hamming Distance

将一个字符串变换成另外一个字符串所需要**替换**的字符个数

[Hamming Distance Source Code](../src/string/hammingDistance.js)

### Levenshtein Distance

指两个字串之间,由一个转成另一个所需的最少编辑操作次数.允许的编辑操作包括:替换,插入,删除

常使用动态规划解决,

```js
d[i, j] := min(
d[i-1, j  ] + 1,          // DELETE
d[i  , j-1] + 1,          // INSERT
d[i-1, j-1] + (0 or 1))   // REPLACE(WHEN NOT EQUAL) OR DO NOTHING
```

[Levenshtein Distance Source Code](../src/string/levenshteinDistance.js)

## [正则表达式](./RegExp.md)