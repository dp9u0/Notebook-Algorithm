const depthFirstSearch = require('./depthFirstSearch');

/**
 * VertexData
 */
class VertexData {

  /**
   * 
   * @param {number} discoveryTime 
   * @param {number} children 
   * @param {number} lowDiscoveryTime 
   */
  constructor(discoveryTime, lowDiscoveryTime = discoveryTime) {
    this.discoverTime = discoveryTime;
    this.lowDiscoveryTime = lowDiscoveryTime;
  }
}

/**
 * 
 * @param {Graph} graph 
 */
function Tarjan(graph) {
  let scc = [];
  let sccCount = 0;
  let seen = new Map();
  let stack = [];
  let discoverTime = 0;
  for (const vertex of graph.allVertices) {
    if (!seen.has(vertex)) {
      depthFirstSearch(graph, vertex, {
        entering: ({
          current
        }) => {
          discoverTime++;
          seen.set(current, new VertexData(discoverTime));
          stack.push(current);
        },
        entered: ({
          current
        }) => {
          // 更新当前current 的统计值
          let data = seen.get(current);
          for (const neighbor of current.neighbors) {
            if (stack.indexOf(neighbor) !== -1) { // 不属于其他的强连通分量 NOTE: 这里可能性能较慢,可以考虑使用 Set O(1)
              data.lowDiscoveryTime = Math.min(seen.get(neighbor).lowDiscoveryTime, data.lowDiscoveryTime);
            }
          }
          // 判断current 是否是根节点
          if ((data.lowDiscoveryTime === data.discoverTime)) {
            scc[sccCount] = [];
            while (stack[stack.length - 1] !== current) {
              scc[sccCount].push(stack.pop());
            }
            scc[sccCount].push(stack.pop());
            sccCount++;
          }
        },
        canTraverse: ({
          next
        }) => {
          return !seen.has(next);
        }
      });
    }
  }
  return scc;
}

/**
 * Kosaraju SCC
 * @param {Graph} graph graph
 */
function Kosaraju(graph) {
  let scc = [];
  let seen = new Set();
  let verties = [];
  // 1. reverse graph
  graph.reverse();
  // 2. inverted sequence
  for (const vertex of graph.allVertices) {
    if (!seen.has(vertex)) {
      depthFirstSearch(graph, vertex, {
        entering: ({
          current
        }) => {
          seen.add(current);
        },
        entered: ({
          current,
        }) => {
          verties.push(current);
        },
        canTraverse: ({
          next
        }) => {
          return !seen.has(next);
        }
      });
    }
  }
  // 3. dfs graph
  graph.reverse();
  let sccCount = 0;
  seen.clear();
  while (verties.length) {
    let vertex = verties.pop();
    if (!seen.has(vertex)) {
      scc[sccCount] = [];
      depthFirstSearch(graph, vertex, {
        entering: ({
          current
        }) => {
          seen.add(current);
        },
        entered: ({
          current
        }) => {
          scc[sccCount].push(current);
        },
        canTraverse: ({
          next
        }) => {
          return !seen.has(next);
        }
      });
      sccCount++;
    }
  }
  return scc;
}

/**
 * 
 * @param {Graph} graph 
 */
function scc(graph, tarjan = true) {
  if (tarjan) {
    return Tarjan(graph)
  } else {
    return Kosaraju(graph);
  }
}

module.exports = scc;