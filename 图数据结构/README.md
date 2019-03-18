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

## 最小生成树

### kruskal

### prim

## 单源最短路径

### Floyd

### Dijkstra

### bellman-ford

### SPFA

### A*