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
 * spfa
 * @param {Graph} graph graph
 * @param {GraphVertex} start startVertex
 * @return {ShortestPath} ShortestPath
 */
function spfa(graph, start) {
  let dist = {};
  let prev = {};
  return {
    dist,
    prev
  }
}

module.exports = spfa;