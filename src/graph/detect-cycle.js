const depthFirstSearch = require('./depthFirstSearch');


/**
 * Detect cycle in Graph using Depth First Search.
 * @param {Graph} graph graph
 */
function detectCycle(graph) {
  let isDirected = graph.isDirected;// 无向图的情况下不允许 A-B 再 B-A 但有向图允许
  let cycle = null;
  const white = new Set(graph.allVertices);
  const black = new Set();
  const gray = new Set();
  const parents = new Map();
  let callback = {
    entering: ({
      current,
      previous
    }) => {
      // 说明从子节点又遍历回了该节点,存在环
      if (gray.has(current)) {
        cycle = {};
        let [c, p] = [current, previous];
        while (p && p !== current) {
          [cycle[c.value], c, p] = [p, p, parents.get(p)];
        }
        cycle[c.value] = p;
      } else {
        gray.add(current);
        white.delete(current);
        //记录父节点
        parents.set(current, previous);
      }
    },
    entered: ({
      current
    }) => {
      black.add(current);
      gray.delete(current);
    },
    canTraverse: ({
      previous,
      next
    }) => {
      if (cycle) {
        return false;
      }
      return !black.has(next) && (isDirected || previous !== next);
    }
  }

  for (const vertex of graph.allVertices) {
    if (white.has(vertex)) {
      depthFirstSearch(graph, vertex, callback);
    }
  }

  return cycle;
}

module.exports = detectCycle