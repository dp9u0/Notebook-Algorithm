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

### DFS

[实现源码](../src/graph/depthFirstSearch.js)

### BFS

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

#### 桥

[实现源码](../src/graph/bridges.js)

#### 割点

[实现源码](../src/graph/cut-vertex.js)

### 欧拉路径

[实现源码](../src/graph/eulerianPath.js)

### 检测图中的环

[实现源码](../src/graph/detect-cycle.js)

### 强连通分量

[实现源码](../src/graph/strongly-connected-components.js)

### 哈密顿图

[实现源码](../src/graph/hamiltonian-cycle.js)

### 拓扑排序

[实现源码](../src/graph/topologicalSort.js)