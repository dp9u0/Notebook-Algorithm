const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('./Graph')

/**
 * ShortestPath
 * @typedef  {Object} ShortestPath path 
 * @property {GraphVertex[]} dist distances to vertex
 * @property {GraphVertex[]} prev prev vertex
 */

/**
 * Bellman Ford
 * @param {Graph} graph graph
 * @param {GraphVertex} start startVertex
 * @return {ShortestPath} ShortestPath
 */
function bellmanFord(graph, start) {
  let dist = {};
  let prev = {};
  // STEP 1 : init
  for (let i = 0; i < graph.allVertices.length; i++) {
    const v = graph.allVertices[i];
    dist[v] = Infinity;
    prev[v] = null;
  }
  dist[start] = 0;
  // STEP 2 : loop
  for (let i = 0; i < (graph.allVertices.length - 1); i++) {
    graph.allVertices.forEach(u => {
      // Go through all vertex edges.
      u.neighbors.forEach((v) => {
        const edge = graph.findEdge(u, v);
        if ((dist[u] + edge.weight) < dist[v]) {
          dist[v] = dist[u] + edge.weight;
          prev[v] = u;
        }
      });
    });
  }
  
  // STEP 3: check for negative-weight cycles
  for (let i = 0; i < graph.allEdges.length; i++) {
    const edge = graph.allEdges[i];
    let {
      startVertex: u,
      endVertex: v,
      weight: w
    } = edge;
    if ((dist[u] + w) < dist[v]) {
      throw new Error('Graph contains a negative-weight cycle');
    }
  }

  return {
    dist,
    prev
  }
}

module.exports = bellmanFord;