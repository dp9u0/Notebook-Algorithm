# 算法与数据结构

[Notebook系列](https://github.com/dp9u0/Notebook)

## 介绍

介绍算法与数据结构:首先介绍算法分析和设计,然后介绍一些常见的数据结构,最后介绍排序算法,查找算法,字符串算法等,以及一些深入探索.

## [算法分析](./算法分析/README.md)

* [渐进记号](./算法分析/README.md#渐进记号)
* [常用函数和记号](./算法分析/README.md#常用函数和记号)
* [平摊分析](./算法分析/README.md#平摊分析)

## [算法设计](./算法设计/README.md)

* [迭代法](./算法设计/iterative.md)
* [递推法与递归式](./算法设计/recursion.md)
* [随机算法](./算法设计/random.md)
* [穷举搜索法](./算法设计/brute-force-search.md)
* [分治算法](./算法设计/divide-and-conquer.md)
* [回溯法](./算法设计/backtracking.md)
* [动态规划](./算法设计/dynamic-programing.md)
* [贪心算法](./算法设计/greedy.md)

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

## [散列数据结构](./散列数据结构/README.md)

## [树形数据结构](./树形数据结构/README.md)

### 二叉查找树

* [二叉查找树(BST)](./树形数据结构/BinarySearchTree.md): 每个结点最多有2个子树的树结构
* [AVL树](./树形数据结构/AVLTree.md): 一种自调整的平衡二叉查找树
* [伸展树(Splay Tree)](./树形数据结构/SplayTree.md): 又叫分裂树,是一种自调整的二叉查找树
* [红黑树(Red Black Tree)](./树形数据结构/RedBlackTree.md): 一种自调整的平衡二叉查找树
* [Treap](./树形数据结构/Treap.md)

### [堆](./树形数据结构/Heap.md)

* [二叉堆(大根堆 小根堆)](./树形数据结构/Heap.md#二叉堆)
* [左倾堆](./树形数据结构/Heap.md#左倾堆)
* [二项堆](./树形数据结构/Heap.md#二项堆)
* [斐波那契堆(Fibonacci Heap)](./树形数据结构/Heap.md#斐波那契堆)

### 其他树/树形结构

* [B-Tree](./树形数据结构/BTree.md)
* [R-Tree](./树形数据结构/RTree.md)
* [前缀树(Trie Tree)/后缀树(Suffix Tree)](./树形数据结构/TrieTreeAndSuffixTree.md)
* [最优二叉树(Huffman Tree)](./树形数据结构/HuffmanTree.md)
* [Segment Tree](./树形数据结构/SegmentTree.md)
* [跳表](./树形数据结构/SkipList.md)

## [排序算法](./排序算法/README.md)

### [交换排序](./排序算法/README.md#交换排序)

* [冒泡排序](./排序算法/README.md#冒泡排序)
* [插入排序](./排序算法/README.md#插入排序)
* [选择排序](./排序算法/README.md#选择排序)
* [希尔排序](./排序算法/README.md#希尔排序)
* [快速排序](./排序算法/README.md#快速排序)
* [归并排序](./排序算法/README.md#归并排序)
* [堆排序](./排序算法/README.md#堆排序)

### [线性排序](./排序算法/README.md#线性排序)

* [计数排序](./排序算法/README.md#计数排序)
* [基数排序](./排序算法/README.md#基数排序)
* [桶排序](./排序算法/README.md#桶排序)
  
## [查找算法](./查找算法/README.md)

* [顺序表查找](./查找算法/README.md#顺序表查找): 顺序查找  
* [有序表查找](./查找算法/README.md#有序表查找): 二分查找 (分块查找:块内无序,块之间有序;可以先二分查找定位到块,然后再到`块`中顺序查找)
* [树查找](./查找算法/README.md#树查找): 二叉排序树,AVL树,B- ,B+
* [哈希表查找](./查找算法/README.md#哈希表查找): O(1)

## [图数据结构](./图数据结构/README.md)

* 图基本算法
  * 图结构: (对象和指针,矩阵,邻接表)
  * 图搜索/遍历: DFS BFS
* 最小生成树: kruskal prim
* 单源最短路径: Floyd,Dijkstra,bellman-ford,SPFA,A*

## [字符串算法](./字符串算法/README.md)

* [排序](./字符串算法/README.md#排序)
* [字符串匹配](./字符串算法/README.md#字符串匹配)
  * KMP
  * BM
  * BF
* [正则表达式](./字符串算法/README.md#正则表达式)

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

* [DataStructure](https://www.growingwiththeweb.com/p/explore.html?t=Data%20structure)
* The-Art-Of-Programming-By-July : [\[GitHub\]](https:/github.com/julycoding/The-Art-Of-Programming-By-July)
* leetcode : [[leetcode]](http:/leetcode.com/)
* 算法和数据结构词典:[[Dictionary of Algorithms and Data Structures]](https:/xlinux.nist.gov/dads/)

### 其它
