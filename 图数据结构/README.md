# 图数据结构

## 图基本算法

* adjacent(G, x, y): tests whether there is an edge from the vertex x to the vertex y;
* neighbors(G, x): lists all vertices y such that there is an edge from the vertex x to the vertex y;
* add_vertex(G, x): adds the vertex x, if it is not there;
* remove_vertex(G, x): removes the vertex x, if it is there;
* add_edge(G, x, y): adds the edge from the vertex x to the vertex y, if it is not there;
* remove_edge(G, x, y): removes the edge from the vertex x to the vertex y, if it is there;
* get_vertex_value(G, x): returns the value associated with the vertex x;
* set_vertex_value(G, x, v): sets the value associated with the vertex x to v;

如果是加权图,边也需要提供方法获取/设置值

* get_edge_value(G, x, y): returns the value associated with the edge (x, y);
* set_edge_value(G, x, y, v): sets the value associated with the edge (x, y) to v.

## 图的表示形式

### 邻接矩阵

最常用的图表示方法为邻接矩阵

无向图(Vertex共有4个):

```table
┌─────────┬──────────┬──────────┬──────────┬──────────┐
│         │    0     │    1     │    2     │    3     │
├─────────┼──────────┼──────────┼──────────┼──────────┤
│    0    │ Infinity │    0     │ Infinity │ Infinity │
│    1    │    0     │ Infinity │    0     │    0     │
│    2    │ Infinity │    0     │ Infinity │    0     │
│    3    │ Infinity │    0     │    0     │ Infinity │
└─────────┴──────────┴──────────┴──────────┴──────────┘
```

有向加权图(Vertex共有4个):

```table
┌─────────┬──────────┬──────────┬──────────┬──────────┐
│         │    0     │    1     │    2     │    3     │
├─────────┼──────────┼──────────┼──────────┼──────────┤
│    0    │ Infinity │    2     │ Infinity │ Infinity │
│    1    │ Infinity │ Infinity │    1     │    7     │
│    2    │ Infinity │ Infinity │ Infinity │    5     │
│    3    │ Infinity │ Infinity │ Infinity │ Infinity │
└─────────┴──────────┴──────────┴──────────┴──────────┘
```

### 邻接列表

另外一种表示方式为邻接列表,每个节点都有一个连接到它的所有节点的列表集合,可以使用包含节点的Array(或HashMap)作为邻接列表的数据结构,每个节点条目列出其相邻节点的列表(可以通过Array,LinkedList,Set等进行存储)

同时节点还可以列出其边的列表方便访问与遍历.

[实现源码](../src/graph/Graph.js)

## 图的遍历

图的遍历与树的遍历类似,可以使用深度优先和广度优先两种策略.

### DFS

深度优先搜索算法是一种用于遍历或搜索树或图的算法.沿着树的深度遍历树的节点,尽可能深的搜索树的分支.当节点v的所在边都己被探寻过,搜索将回溯到发现节点v的那条边的起始节点.这一过程一直进行到已发现从源节点可达的所有节点为止.如果还存在未被发现的节点,则选择其中一个作为源节点并重复以上过程,整个进程反复进行直到所有节点都被访问为止.

[实现源码](../src/graph/depthFirstSearch.js)

### BFS

广度优先搜索算法是一种图形搜索算法.简单的说,BFS是从开始节点开始,沿着树/图的宽度遍历节点.如果所有节点均被访问,则算法中止.广度优先搜索的实现一般采用open-closed表.

实现方法:

1. 首先将开始节点放入队列中.
2. 从队列中取出第一个节点,并检验它是否需要遍历该节点.
3. 如果否,则跳转到步骤2.
4. 否则将它所有尚未检验过的直接子节点加入队列中.
5. 若队列为空,表示整张图都检查过了,算法结束.
6. 重复步骤2.

[实现源码](../src/graph/breadthFirstSearch.js)

## 最小生成树

### kruskal

[实现源码](../src/graph/kruskal.js)

### prim

[实现源码](../src/graph/prim.js)

## 单源最短路径

### Floyd

[实现源码](../src/graph/floyd-warshall.js)

### Dijkstra

[实现源码](../src/graph/dijkstra.js)

### bellman-ford

[实现源码](../src/graph/bellman-ford.js)

### SPFA

[实现源码](../src/graph/spfa.js)

### A*

[实现源码](../src/graph/astar.js)

## 其他图的问题

### 桥和割点算法(bridge,cut vertex)

#### 割点

在一个无向图中.如果有一个顶点集合.删除这个顶点集合以及这个集合中所有顶点相关联的边以后.图的连通分量增多.就称这个点集为割点集合.

可以使用Tarjan算法求割点:

首先对于一个节点u 如果符合下面两个属性之一则为割点:

1. 根节点,并且有2棵即以上的子树.
2. 非根节点,`u`的孩子中存在节点`v`,除了通过父子边(回边),无法回溯到`u`的祖先.

使用DFS顺序遍历,通过给每个节点一个访问时间,如果一个节点(`current`)的`neighbors`中存在深度遍历过程中父节点(`previous`)的祖先节点,说明即时去掉`previous`,`current`也能通过`previous.parent`与所有访问时间靠前的节点联通,即`previous`不是割点,反之,`previous`为割点.

通过归纳法思想,可以通过这个算法可以得到割点.

![割点](img/articulation-point.png)

[实现源码](../src/graph/articulationPoints.js)

#### 桥

求图的桥的算法与割点算法类似,也是通过判断节点再不通过`(current,previous)`这个 Edge 情况下,是否能到达比previous时间还早的节点.

同时需要注意的是深度遍历过程中,需要记得更新previous的`lowDiscoveryTime`

[实现源码](../src/graph/graphBridges.js)

### 欧拉路径

[实现源码](../src/graph/eulerianPath.js)

### 检测图中的环

[实现源码](../src/graph/detect-cycle.js)

### 强连通分量

强连通图指每一个顶点皆可以经由该图上的边抵达其他的每一个点的有向图

强连通分量则是指一张有向图G的极大强连通子图G'

Kosaraju算法,Tarjan算法,Gabow算法皆为寻找有向图强连通分量的有效算法.但是由于在Tarjan算法和Gabow算法的过程中,只需要进行一次的深度优先搜索,因而相对Kosaraju算法较有效率.

![强连通分量](img/strongly-connected-component.png)

#### Kosaraju

1. 对有向图得到反向图
2. 对反向图按照深度优先遍历的将节点逆序放入堆栈
3. 弹出堆栈中节点作为初始节点,在有向图中进行深度优先搜索(深度优先遍历时,需要记录已经遍历过的节点,防止重复遍历.)
4. 同一个深度优先搜索中访问的所有顶点都在同一个强连通分量内

#### Tarjan

任选一节点开始进行深度优先搜索(若深度优先搜索结束后仍有未访问的节点,则再从中任选一点再次进行).搜索过程中已访问的节点不再访问.搜索树的若干子树构成了图的强连通分量.

1. 节点按照深度优先遍历顺序存入堆栈中.然后继续DFS其子树.
2. DFS子树返回时,将其从堆栈中删除,并检查该节点是否是某一强连通分量的根节点(`发现时间等于最早发现的前继节点的发现时间`)
3. 如果某节点是强连通分量的根,则在它之前出堆栈且还不属于其他强连通分量的节点构成了该节点所在的强连通分量.

[实现源码](../src/graph/strongly-connected-components.js)

### 哈密顿图

[实现源码](../src/graph/hamiltonian-cycle.js)

### 拓扑排序

在一个有向图中,对所有的节点进行排序,要求任意一个节点都排在他的前继节点之后.

拓扑排序经常使用在作业调度解决作业依赖问题.

实现逻辑很简单,DFS即可

[实现源码](../src/graph/topologicalSort.js)