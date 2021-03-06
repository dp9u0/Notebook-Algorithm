# 穷举搜索法

穷举搜索又称暴力搜索,是最简单的一种算法,其基本思想就是从所有可能的情况中搜索正确的答案

## 搜索策略

* DFS : 深度优先
* BFS : 广度优先

## 组合爆炸

虽然暴力搜索很容易实现,并且如果解决方案存在它就一定能够找到,但是它的代价是和候选方案的数量成比例的,例如在"八皇后问题"中,挑战就是将八个皇后放置在标准的棋盘上,以致没有皇后能够攻击到其它任何皇后.因为每一个皇后可以被放在64个方格中的任何一个上，理论上来讲就有= 281,474,976,710,656个待测的可能性,这对于暴力搜索来说计算量会变得非常庞大

## 优化

加快暴力搜索的一种方法是通过使用具体问题类的启发式方法减小搜索空间,也就是减小候选解决方案的集合,例如依旧是"八皇后问题",因为所有皇后都是相似的,而且任意两个都不能放在同一个方格中,候选项为从所有64个方格集合中选出的8个方格集合的所有可能的方式,这就意味着64选8,即64!/56!/8! = 4,426,165,368个候选解决方案,这就大大减少了搜索范围

又例如,BFS,DFS搜索中,可以通过剪枝策略,就是通过某种判断,避免一些不必要的遍历过程.