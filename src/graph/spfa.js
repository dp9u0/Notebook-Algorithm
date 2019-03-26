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
 * spfa
 * @param {Graph} graph graph
 * @param {GraphVertex} start startVertex
 * @return {ShortestPath} ShortestPath
 */
function spfa(graph, start, expectMaxLoopCount = graph.allVertices.length) {
  let dist = {};
  let prev = {};
  let inCount = {};// for negative-weight cycle check
  let Q = new PriorityQueue();
  // STEP 1 : init
  for (let i = 0; i < graph.allVertices.length; i++) {
    const v = graph.allVertices[i];
    inCount[v] = 0;
    dist[v] = Infinity;
    prev[v] = null;
  }
  dist[start] = 0;
  Q.add(start, dist[start]);
  // STEP 2 : loop
  while (!Q.isEmpty) {
    let u = Q.pop();
    // Go through all vertex edges.
    u.neighbors.forEach((v) => {
      const edge = graph.findEdge(u, v);
      if ((dist[u] + edge.weight) < dist[v]) {
        dist[v] = dist[u] + edge.weight;
        prev[v] = u;
        if (Q.has(v)) {
          Q.changePriority(v, dist[v]);
        } else {
          Q.add(v, dist[v]);
        }
      }
    });
    inCount[u]++;
    if (expectMaxLoopCount < inCount[u]) {
      throw new Error(`Graph contains a negative-weight cycle`);
    }
  }

  return {
    dist,
    prev
  }
}

module.exports = spfa;