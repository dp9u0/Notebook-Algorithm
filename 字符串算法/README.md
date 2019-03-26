# 字符串算法

字符串是非常常见的数据结构.

## 排序

字符串排序参照[排序](../排序算法/README.md)章节

## 字符串匹配

### Brute-Force

### Knuth-Morris-Pratt

### Boyer-Moore

## Distance

### Hamming Distance

将一个字符串变换成另外一个字符串所需要**替换**的字符个数

### Levenshtein Distance

指两个字串之间,由一个转成另一个所需的最少编辑操作次数.允许的编辑操作包括:替换,插入,删除

常使用动态规划解决,

d[i, j] := min(
  d[i-1, j  ] + 1,     // DELETE
  d[i  , j-1] + 1,     // INSERT
  d[i-1, j-1] + cost   // REPLACE(WHEN NOT EQUAL) OR DO NOTHING
)

## [正则表达式](./RegExp.md)