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
 * ShortestPath
 * @param {Graph} graph graph
 * @param {GraphVertex} start start Vertex
 * @param {GraphVertex} end end Vertex
 * @param {(first:GraphVertex,second:GraphVertex)=>number} h heuristic function
 * @returns {ShortestPath} path
 */
function astar(graph, start, end, h) {
  let dist = [];
  let prev = [];
  dist[start] = 0;
  prev[start] = null;
  let closed = new Set();
  let open = new PriorityQueue(); // use as open
  open.add(start, dist[start]);
  while (!open.isEmpty && (!open.has(end))) {
    /**
     * @type {GraphVertex}
     */
    let u = open.pop();
    if (!u) {
      debugger;
    }
    for (const v of u.neighbors) {
      if (!closed.has(v) && !open.has(v)) {
        let edge = graph.findEdge(u, v) || graph.findEdge(v, u);
        if (!edge) {
          debugger;
        }
        if (!v) {
          debugger;
        }
        // f = g + h
        dist[v] = dist[u] + edge.weight;
        prev[v] = u;
        open.add(v, (dist[v] + h(v, end)));
      }
    }
    closed.add(u);
  }
  return {
    dist,
    prev
  };
}

module.exports = astar;