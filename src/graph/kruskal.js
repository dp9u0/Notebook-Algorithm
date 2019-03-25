const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('./Graph')

const {
  DisjointSet
} = require('../tree/DisjointSet')
const quickSort = require('../sort/quickSort');

/**
 * kruskal for min spanning tree
 * @param {Graph} graph graph
 * @returns {Graph} minimum spanning tree
 */
function kruskal(graph) {
  if (graph.isDirected) {
    throw new Error(`Kruskal's algorithms works only for undirected graphs`);
  }
  // Init new graph to present minimum spanning tree
  const mst = new Graph();
  // sort edges
  const sortedEdges = quickSort([...graph.allEdges], (edgeA, edgeB) => {
    return edgeA.weight > edgeB.weight;
  });
  // Create disjoint sets for all graph vertices.
  const disjointSet = new DisjointSet(vertex => vertex.value);
  graph.allVertices.forEach((vertex) => {
    disjointSet.add(vertex);
  });
  for (let index = 0; index < sortedEdges.length; index++) {
    /** @type {GraphEdge} currentEdge */
    const edge = sortedEdges[index];
    // Check for edge (u, v) if `u, v` in same connected component,if not add edge to spanning tree
    if (!disjointSet.inSameSet(edge.startVertex, edge.endVertex)) {
      disjointSet.union(edge.startVertex, edge.endVertex);
      mst.addEdge(edge);
    }
  }
  return mst;
}

module.exports = kruskal;