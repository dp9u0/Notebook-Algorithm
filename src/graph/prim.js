const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('./Graph')

const quickSort = require('../sort/quickSort');

const MinHeap = require('../heap/MinHeap');

/**
 * prim for minimum spanning tree
 * @param {Graph} graph graph
 */
function prim(graph) {
  // It should fire error if graph is directed since the algorithm works only
  // for undirected graphs.
  if (graph.isDirected) {
    throw new Error(`Prim's algorithms works only for undirected graphs`);
  }
  // Init new graph to present minimum spanning tree
  const mst = new Graph();
  const minHeap = new MinHeap((edgeA, edgeB) => edgeA.weight - edgeB.weight);
  let currentVertex = graph.allVertices[0];
  let seen = new Set([currentVertex]);
  for (const edge of currentVertex.edges) {
    minHeap.insert(edge);
  }
  let verticesCount = graph.allVertices.length;
  while (verticesCount !== seen.size) {
    let edge = minHeap.pop();
    let {
      startVertex,
      endVertex
    } = edge;
    /**
     * @type {GraphVertex}
     */
    let nextVertex;
    if (seen.has(startVertex) && !seen.has(endVertex)) {
      nextVertex = endVertex;
    } else if (!seen.has(startVertex) && seen.has(endVertex)) {
      nextVertex = startVertex;
    }
    if (nextVertex) {
      mst.addEdge(edge);
      seen.add(nextVertex);
      for (const edge of nextVertex.edges) {
        if (!seen.has(edge.startVertex) || !seen.has(edge.endVertex)) {
          minHeap.insert(edge);
        }
      }
    }
  }
  return mst;
}

module.exports = prim;