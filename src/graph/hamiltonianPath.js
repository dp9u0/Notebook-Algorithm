const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('./Graph')



/**
 * hamiltonian Path in backtrace
 * @param {Graph} graph  graphs
 * @returns {GraphVertex[]} path
 */
function hamiltonianPath(graph) {
  let allVertices = new Set(graph.allVertices);
  let hamiltonianPaths = [];
  /**
   * 
   * @param {GraphVertex} current 
   * @param {Set} vertices 
   * @param {GraphVertex[]} path 
   */
  function backtrace(current, vertices, path = []) {
    // remove from vertices to test
    vertices.delete(current);
    // add to path
    path.push(current);
    if (!vertices.size) {
      // no more vertices to traverse, it's a vaildate hamiltonian path
      hamiltonianPaths.push([...path]);
    } else {
      // has more vertices to traverse
      for (const neighbor of current.neighbors) {
        if (vertices.has(neighbor)) {
          backtrace(neighbor, vertices, path);
        }
      }
    }
    // restore
    vertices.add(current);
    path.pop();
  }
  // backtrace for all vertices as start
  for (const start of graph.allVertices) {
    backtrace(start, allVertices);
  }
  return hamiltonianPaths;
}

module.exports = hamiltonianPath;