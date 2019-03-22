const graphBridges = require('./graphBridges');
const dfs = require('./depthFirstSearch');
/**
 * Fleury Algorithms
 * @param {Graph} graph graph
 * @returns {GraphVertex[]} paths
 */
function eulerianPath(graph) {
  let edges = new Set(graph.allEdges);
  let vertices = graph.allVertices;
  let ccCount = 0; // connected component count
  let oddDegreeVerties = [];
  let evenDegreeVerties = [];
  let zeroDegreeVerties = [];
  let seen = new Set();
  // 是否符合欧拉路径充要条件
  for (const vertex of vertices) {
    if (!seen.has(vertex)) {
      ccCount++;
      dfs(graph, vertex, {
        entering: ({
          current
        }) => {
          seen.add(current);
          if (current.degree === 0) {
            zeroDegreeVerties.push(current);
          } else if (current.degree % 2 === 0) {
            evenDegreeVerties.push(current);
          } else {
            oddDegreeVerties.push(current);
          }
        },
        canTraverse: ({
          next
        }) => {
          return !seen.has(next);
        }
      })
    }
  }
  // 判断是否有欧拉路径
  if (ccCount !== (zeroDegreeVerties.length + 1)) {
    throw new Error('Vertices with nonzero degree belong to more than one connected component');
  }
  const isCircuit = !oddDegreeVerties.length;
  if (!isCircuit && oddDegreeVerties.length !== 2) {
    throw new Error('Eulerian path must contain zero or two odd-degree vertices');
  }
  // 获取欧拉路径
  let paths = [];
  /**@type {GraphVertex} */
  let currentVertex = isCircuit ? evenDegreeVerties[0] : oddDegreeVerties[0];
  while (edges.size) {
    let edgesOfCurrentVertex = [...currentVertex.edges];
    let deletingEdge;
    if (edgesOfCurrentVertex.length === 1) {
      deletingEdge = edgesOfCurrentVertex[0];
    } else {
      let bridges = new Set(graphBridges(graph));
      deletingEdge = edgesOfCurrentVertex.filter(e => {
        return !bridges.has(e);
      })[0];
    }
    paths.push(currentVertex);
    currentVertex = deletingEdge.startVertex === currentVertex ? deletingEdge.endVertex : deletingEdge.startVertex;
    graph.removeEdge(deletingEdge);
    edges.delete(deletingEdge);
  }
  paths.push(currentVertex);
  return paths;
}

module.exports = eulerianPath;