# 算法与数据结构

## 介绍

介绍算法与数据结构:首先介绍算法分析和设计,然后介绍一些常见的数据结构,最后介绍排序算法,查找算法,字符串算法等,以及一些深入探索.

## [算法分析](./算法分析/README.md)

* [渐进记号](./算法分析/README.md#渐进记号)
* [常用函数和记号](./算法分析/README.md#常用函数和记号)

## [算法设计](./算法设计/README.md)

* [迭代法](./算法设计/iterative.md)
* [递推法与递归式](./算法设计/recursion.md)
* [随机算法](./算法设计/random.md)
* [穷举搜索法](./算法设计/brute-force-search.md)
* [分治算法](./算法设计/divide-and-conquer.md)
* [回溯法](./算法设计/backtracking.md)
* [动态规划](./算法设计/dynamic-programing.md)
* [贪心算法](./算法设计/greedy.md)
* [平摊分析](./算法设计/amortized-analysis.md)

## [线性数据结构](./线性数据结构/README.md)

### 基本

* [数组](./线性数据结构/1.Array.md)
* [字符串](./线性数据结构/2.String.md)

### 链表

* [链表](./线性数据结构/3.LinkedList.md)
* [双向链表](./线性数据结构/4.DoublyLinkedList.md)
* [循环链表](./线性数据结构/5.CircleLinkedList.md)

### 其他线性结构

* [栈与队列](./线性数据结构/6.StackAndQueue.md)

## [树形数据结构](./树形数据结构/README.md)

### [树](./树形数据结构/README.md#树)

* [二叉查找树(BST)](./树形数据结构/BinaryTree.md)
* [平衡树/平衡二叉树(AVL)](./树形数据结构/AVLTree.md)
* [伸展树(Splay Tree)](./树形数据结构/SplayTree.md)
* [红黑树(Red Black Tree)](./树形数据结构/RedBlackTree.md)
* [B-Tree](./树形数据结构/BTree.md)
* [R-Tree](./树形数据结构/RTree.md)
* [前缀树(Trie Tree)/后缀树(Suffix Tree)](./树形数据结构/TrieTreeAndSuffixTree.md)
* [最优二叉树((Huffman Tree)](./树形数据结构/HuffmanTree.md) : 给定n个权值作为n个叶子结点,构造一棵二叉树,若该树的带权路径长度达到最小,称这样的二叉树为最优二叉树

### [堆](./树形数据结构/Heap.md)

* [二叉堆(大根堆 小根堆)](./树形数据结构/Heap.md#二叉堆)
* [二项树](./树形数据结构/Heap.md#二项树)
* [二项堆](./树形数据结构/Heap.md#二项堆)
* [左倾堆](./树形数据结构/Heap.md#左倾堆)
* [斐波那契堆(Fibonacci Heap)](./树形数据结构/Heap.md#斐波那契堆)
* [优先队列(Priority Queue)](./树形数据结构/Heap.md#优先队列)

### 其他(类)树形结构

* [跳表(Skip List)](./树形数据结构/SkipList.md)
* [森林](./树形数据结构/Forest.md)

## [散列数据结构](./散列数据结构/README.md)

## [排序算法](./排序算法/README.md)

### 交换排序

* 冒泡排序
* 插入排序
* 选择排序
* 希尔排序
* 快排
* 归并排序
* 堆排序

### 线性排序

* 计数排序
* 基数排序
* 桶排序
  
## [查找算法](./查找算法/README.md)

* 顺序表查找: 顺序查找  
* 有序表查找: 二分查找  
* 分块查找: 块内无序,块之间有序;可以先二分查找定位到块,然后再到`块`中顺序查找  
* 动态查找: 二叉排序树,AVL树,B- ,B+ (这里之所以叫 `动态查找`,是因为数据结构是查找的过程中动态生成的)
* 哈希表查找: O(1)

## [图数据结构](./图数据结构/README.md)

* 图基本算法
  * 对象和指针
  * 矩阵
  * 邻接表
  * 广度优先
  * 深度优先
* 最小生成树
* 单源最短路径 :
  * Floyd
  * Dijkstra
  * bellman-ford
  * SPFA
  * A*
* 每对顶点间最短路径
* 最大流
* 拓扑排序

## [字符串算法](./字符串算法/README.md)

* 排序
* 字符串匹配
  * KMP算法  
  * BM(Boyer-Moore)算法  
  * BF算法
* 正则表达式
* 数据压缩
* 游程编码
* Trie树

## [算法研究](./算法研究/README.md)

### 线性规划

### NP完全性

## 参考资料

### 基础

* 《算法导论》
* 《Algorithms》

### 面试算法

* 《剑指offer》
* 《编程之美》

### 延伸阅读

* 《深入理解计算机系统》
* 《计算机程序的构造和解释》

### 博客与网站

* The-Art-Of-Programming-By-July : [\[GitHub\]](https:/github.com/julycoding/The-Art-Of-Programming-By-July)
* leetcode : [[leetcode]](http:/leetcode.com/)
* 算法和数据结构词典:[[Dictionary of Algorithms and Data Structures]](https:/xlinux.nist.gov/dads/)

### 其它