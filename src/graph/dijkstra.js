const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('./Graph');

const PriorityQueue = require('../heap/PriorityQueue');

/**
 * ShortestPath
 * @typedef  {Object} ShortestPath path 
 * @property {GraphVertex[]} dist distances to vertex
 * @property {GraphVertex[]} prev prev vertex
 */

/**
 * Dijkstra
 * @param {Graph} graph graph
 * @param {GraphVertex} start startVertex
 * @return {ShortestPath} ShortestPath
 */
function dijkstra(graph, start) {
  let dist = {};
  let prev = {};
  let Q = new PriorityQueue();
  for (let i = 0; i < graph.allVertices.length; i++) {
    const v = graph.allVertices[i];
    dist[v] = Infinity;
    Q.add(v, dist[v]);
    prev[v] = null;
  }
  dist[start] = 0;
  Q.changePriority(start, dist[start]);
  while (!Q.isEmpty) {
    /**
     * @type {GraphVertex}
     */
    let u = Q.pop();
    for (let i = 0; i < u.neighbors.length; i++) {
      const v = u.neighbors[i];
      if (Q.has(v)) {
        const e = graph.findEdge(u, v);
        if ((e.weight + dist[u]) < dist[v]) {
          dist[v] = e.weight + dist[u];
          prev[v] = u;
          Q.changePriority(v, dist[v]);
        }
      }
    }
  }
  return {
    dist,
    prev
  }
}

module.exports = dijkstra;