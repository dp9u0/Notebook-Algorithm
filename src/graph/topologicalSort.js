const depthFirstSearch = require('./depthFirstSearch');

/**
 * topologicalSort
 * @param {Graph} graph graph
 */
function topologicalSort(graph) {
  const seen = new Set();
  const sortedArray = []
  for (const vertex of graph.allVertices) {
    if (!seen.has(vertex)) {
      depthFirstSearch(graph, vertex, {
        entering: ({
          current
        }) => {
          seen.add(current);
        },
        entered: ({
          current
        }) => {
          sortedArray.unshift(current)
        },
        canTraverse: ({
          next
        }) => {
          return !seen.has(next);
        }
      })
    }
  }
  return sortedArray;
}

module.exports = topologicalSort;