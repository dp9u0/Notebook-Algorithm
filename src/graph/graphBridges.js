const depthFirstSearch = require('./depthFirstSearch');

/**
 * VertexData
 */
class VertexData {

  /**
   * 
   * @param {number} discoveryTime discoveryTime
   * @param {number} lowDiscoveryTime lowDiscoveryTime
   */
  constructor(discoveryTime, lowDiscoveryTime = discoveryTime) {
    this.discoverTime = discoveryTime;
    this.lowDiscoveryTime = lowDiscoveryTime;
  }
}

/**
 * graphBridges
 * @param {Graph} graph graph
 * @returns {GraphEdge}  bridges
 */
function graphBridges(graph) {
  let bridges = new Set();
  let seen = new Map();
  let start = graph.allVertices[0];
  let discoverTime = 0;
  let callback = {
    entering: ({
      current
    }) => {
      discoverTime++;
      seen.set(current, new VertexData(discoverTime));
    },
    entered: ({
      previous,
      current
    }) => {
      if (previous === null) {
        return;
      }
      // 更新当前current 的统计值
      let neighbors = current.neighbors;
      let data = seen.get(current);
      for (const neighbor of neighbors) {
        if (neighbor !== previous) {
          data.lowDiscoveryTime = Math.min(seen.get(neighbor).lowDiscoveryTime, data.lowDiscoveryTime);
        }
      }
      let previousData = seen.get(previous);
      // 更新 previous 节点能到达的最早节点
      if (data.lowDiscoveryTime < previous.lowDiscoveryTime) {
        previous.lowDiscoveryTime = data.lowDiscoveryTime;
      }
      // 判断 Edge (previous, current) 是否是桥
      // 如果当前节点不通过 (previous, current) 不能到达的时间较早的点
      // 说明(previous, current)是桥
      if ((data.lowDiscoveryTime > previousData.discoverTime)) {
        bridges.add(graph.findEdge(previous, current));
      }
    },
    canTraverse: ({
      next
    }) => {
      return !seen.has(next);
    },
  }

  depthFirstSearch(graph, start, callback);
  return Array.from(bridges);
}

module.exports = graphBridges;