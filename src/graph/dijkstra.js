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
 * Dijkstra
 * @param {Graph} graph graph
 * @param {GraphVertex} start startVertex
 * @return {ShortestPath} ShortestPath
 */
function dijkstra(graph, start) {
  let dist = {};
  let prev = {};
  return {
    dist,
    prev
  }
}

module.exports = dijkstra;